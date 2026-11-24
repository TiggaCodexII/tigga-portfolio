import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      navigate("/admin", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md bento-tile gold-border p-8 md:p-10">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-extrabold mb-2">
          Admin <span className="gold-text">Inbox</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-7">
          Sign in to read your contact form messages.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="bg-input border-border h-12 rounded-xl"
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="bg-input border-border h-12 rounded-xl"
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-semibold"
          >
            {isSubmitting ? "Please wait..." : "Sign In"}
          </Button>
        </form>
        
      </div>
    </div>
  );
};

export default Auth;