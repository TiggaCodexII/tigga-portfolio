import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Mail, Inbox, RefreshCw } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: "Could not load messages.", variant: "destructive" });
      return;
    }
    setSubmissions(data ?? []);
  };

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/auth", { replace: true });
        return;
      }
      // Claim admin if no admin exists yet (first user becomes admin).
      await supabase.rpc("claim_admin_role");

      const { data: isAdmin, error } = await supabase.rpc("has_role", {
        _user_id: sessionData.session.user.id,
        _role: "admin",
      });

      if (error || !isAdmin) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setAuthorized(true);
      await loadSubmissions();
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background dark text-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-md bento-tile gold-border p-8 text-center">
          <h1 className="font-display text-2xl font-extrabold mb-3">Access denied</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your account doesn't have admin access to this inbox.
          </p>
          <Button onClick={handleSignOut} variant="outline" className="rounded-full border-primary/30">
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark text-foreground antialiased px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">
              Admin
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold">
              Message <span className="gold-text">Inbox</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={loadSubmissions}
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </Button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bento-tile gold-border p-12 text-center">
            <Inbox className="w-10 h-10 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <div key={s.id} className="bento-tile gold-border p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-display text-lg font-bold">{s.name}</p>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-sm text-primary inline-flex items-center gap-1.5 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" /> {s.email}
                    </a>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {s.message}
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full text-xs h-8 px-4"
                  >
                    <a href={`mailto:${s.email}?subject=Re: Your message`}>Reply</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;