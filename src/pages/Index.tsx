import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  LayoutDashboard,
  Wallet,
  Cloud,
  Building2,
  Globe,
  Boxes,
  Search,
  Ruler,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProfessionalExperience from "@/components/ProfessionalExperience";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import portraitImage from "@/assets/lascotstudios-6.jpg";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298 0 .595.042.88.124V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().max(120).optional(),
  projectType: z.string().max(120).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Index = () => {
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [location.hash]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: data.name,
          email: data.email,
          company: data.company || null,
          project_type: data.projectType || null,
          message: data.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Message received",
        description: "Thanks for reaching out — I'll reply within 24 hours.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [projectCategory, setProjectCategory] = useState("All");
  const [projectSearch, setProjectSearch] = useState("");

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.sector ?? p.category))),
  ];

  const filteredProjects = projects.filter((p) => {
    const categoryMatches =
      projectCategory === "All" ||
      (p.sector ?? p.category) === projectCategory;

    const searchMatches = [
      p.title,
      p.summary,
      p.category,
      p.sector ?? "",
      ...p.tags,
      ...p.stack,
    ].join(" ").toLowerCase().includes(projectSearch.trim().toLowerCase());

    return categoryMatches && searchMatches;
  });

  const isBrowsingAll =
    projectCategory === "All" && !projectSearch.trim();

  const featured = isBrowsingAll
    ? filteredProjects.filter((p) => p.featured)
    : [];

  const rest = isBrowsingAll
    ? filteredProjects.filter((p) => !p.featured)
    : filteredProjects;

  const capabilities = [
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "Business Management Systems",
      description:
        "Centralized software for managing daily operations, financial records, inventory, staff and reporting.",
      points: [
        "Point of sale and inventory",
        "Financial and operational reporting",
        "Workflow automation"
      ],
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Fintech & Payment Solutions",
      description:
        "Digital payment experiences with structured transaction processing, wallet workflows and third-party service integrations.",
      points: [
        "Payment gateway integration",
        "Wallet and transaction management",
        "Supplier APIs and reconciliation"
      ],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Full-Stack Web Applications",
      description:
        "Responsive applications built with maintainable frontend architecture, structured databases and secure backend services.",
      points: [
        "React and TypeScript applications",
        "Supabase and PostgreSQL",
        "Progressive Web Applications"
      ],
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud & Database Solutions",
      description:
        "Independent application infrastructure, database migration and deployment workflows designed for operational reliability.",
      points: [
        "Cloudflare deployment",
        "Database migration and recovery",
        "Infrastructure configuration"
      ],
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Institutional Digital Transformation",
      description:
        "Digital systems that support institutions, associations and organizations in replacing fragmented administrative processes.",
      points: [
        "Membership and alumni platforms",
        "Electronic voting workflows",
        "Cooperative management"
      ],
    },
    {
      icon: <Boxes className="h-6 w-6" />,
      title: "Digital Product Development",
      description:
        "Practical product development from business requirements and workflow design to implementation, testing and deployment.",
      points: [
        "Product architecture",
        "Data modelling",
        "Operational validation"
      ],
    },
  ];

  const capabilityStack = [
    {
      label: "Languages",
      value: "JavaScript, TypeScript, SQL"
    },
    {
      label: "Frontend engineering",
      value: "React, HTML5, CSS3, Tailwind CSS, Shadcn/UI, Redux Toolkit"
    },
    {
      label: "Backend & databases",
      value: "Supabase, PostgreSQL, Firebase, Database Functions, Data Modelling"
    },
    {
      label: "Cloud & infrastructure",
      value: "Cloudflare Workers, GitHub, Codespaces, Wrangler, Vite, Database Migration"
    },
    {
      label: "Payments & integrations",
      value: "Paystack, VTPass, Clubkonnect, REST APIs, Payment Reconciliation"
    },
    {
      label: "Application security",
      value: "Authentication, OAuth 2.0, Role-Based Access Control, Row Level Security, Audit Logging"
    },
    {
      label: "Business systems",
      value: "POS, Inventory, Financial Reporting, Workflow Automation, Production Management"
    },
    {
      label: "Engineering practices",
      value: "Component Architecture, Responsive Design, Accessibility, Operational Testing, PWA Development"
    },
  ];

  const process = [
    {
      icon: <Search className="h-5 w-5" />,
      title: "Understand",
      description: "Learn the business, the people using it and the process being replaced.",
    },
    {
      icon: <Ruler className="h-5 w-5" />,
      title: "Structure",
      description: "Map the data, the workflow and the screens before any interface is built.",
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Build",
      description: "Implement in typed, reusable components so the product can keep growing.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Test",
      description: "Check real flows, edge cases, devices and performance before handover.",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Launch & improve",
      description: "Ship, watch how it is actually used, then refine what gets in the way.",
    },
  ];

  const testimonials = [
    {
      initials: "OA",
      name: "Omogbehinmi Angel",
      role: "Client",
      content:
        "Saad is a very talented developer. He is passionate about his work and always delivers high-quality results. I'd highly recommend him to anyone looking for a frontend developer.",
    },
    {
      initials: "OJ",
      name: "Oluyomi Josephine",
      role: "Client",
      content:
        "I had the pleasure of working with Saad on a complex project. He is a great team player and a very skilled developer. I was very impressed with his work.",
    },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background dark text-foreground antialiased">
      <Navbar />

      {/* Hero */}
      <section
        id="home"
        className="hero-gradient relative flex items-center overflow-hidden px-4 pt-28 pb-16 md:min-h-screen md:pb-24"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="grid items-stretch gap-5 lg:grid-cols-12">
            <div className="bento-tile gold-border flex flex-col justify-center p-8 md:p-12 lg:col-span-7">
              <span className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                Available for projects, partnerships & full-time roles
              </span>

              <h1 className="font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">
                Saad Tajudeen
                <br />
                <span className="gold-text">Olayinka</span>
              </h1>

              <p className="mt-5 text-lg font-semibold text-primary md:text-xl">
                Full-Stack Developer & Business Solutions Engineer
              </p>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                I design, develop and deploy digital products that solve real business problems — from financial platforms and operational management systems to secure institutional applications and cloud-based infrastructure.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollTo("work")}
                  className="rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  View My Work
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("contact")}
                  className="rounded-full border-primary/40 font-semibold"
                >
                  Let's Work Together
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full font-semibold">
                  <Link to="/resume">
                    <FileText className="mr-1 h-4 w-4" />
                    View Resume
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-5 lg:col-span-5">
              <div className="bento-tile gold-border aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                <img
                  src={portraitImage}
                  alt="Saad Tajudeen Olayinka working at his development setup"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="bento-tile gold-border grid grid-cols-3 divide-x divide-border p-6 text-center">
                {[
                  { value: String(projects.length), label: "Selected projects" },
                  { value: "3rd", label: "Kwara AI Summit" },
                  { value: "Full-stack", label: "Development" },
                ].map((s) => (
                  <div key={s.label} className="px-2">
                    <p className="font-display text-2xl font-extrabold gold-text">{s.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Build */}
      <section id="capabilities" className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="What I Build" title="Digital solutions for real-world businesses" />
          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="bento-tile gold-border p-7 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {c.icon}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Selected Work"
            title="Explore my projects"
          />

          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            Business systems, fintech applications, institutional platforms
            and digital products designed around real-world requirements.
          </p>

          <div className="mb-8 space-y-4">
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={projectSearch}
                onChange={(event) => setProjectSearch(event.target.value)}
                placeholder="Search projects or technologies..."
                aria-label="Search projects"
                className="h-12 rounded-full bg-card pl-11"
              />
            </div>

            <div
              className="flex flex-wrap justify-center gap-2"
              aria-label="Project categories"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={projectCategory === category ? "default" : "outline"}
                  aria-pressed={projectCategory === category}
                  onClick={() => setProjectCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div
              className="flex items-center justify-between gap-3 text-xs text-muted-foreground"
              aria-live="polite"
            >
              <span>
                Showing {filteredProjects.length} of {projects.length} projects
              </span>

              {!isBrowsingAll && (
                <button
                  type="button"
                  onClick={() => {
                    setProjectCategory("All");
                    setProjectSearch("");
                  }}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {filteredProjects.length === 0 && (
            <div className="bento-tile p-12 text-center">
              <Search className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-lg font-bold">
                No matching projects
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another project name, technology or category.
              </p>
            </div>
          )}
          <div className="grid gap-5">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} variant="featured" />
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="About" title="Engineering with product thinking" />
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="bento-tile gold-border overflow-hidden lg:col-span-5">
              <img
                src={portraitImage}
                alt="Saad Tajudeen Olayinka at work"
                loading="lazy"
                width={1280}
                height={800}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="bento-tile gold-border p-8 md:p-10 lg:col-span-7">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                I'm a full-stack developer and business solutions builder based in Ilorin, Nigeria, working with clients remotely. My
                work sits where engineering meets business process: I take how an organisation
                actually operates — its members, records, approvals and customers — and rebuild it
                as software that is faster, clearer and traceable.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                That means starting with the workflow rather than the screen. I map the data and the
                decisions first, then build interfaces in typed, reusable React components so the
                product can keep growing without being rewritten. I care about the details that
                decide whether software gets used: responsiveness, load speed, accessibility, and
                whether the next person can find what they need without being trained.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                My recent work spans fintech platforms, business management systems, payment integrations, database migration, cloud infrastructure, cooperative management and institutional digital transformation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <InfoRow icon={<MapPin className="h-4 w-4" />} text="Ilorin, Nigeria — remote friendly" />
                <InfoRow icon={<Mail className="h-4 w-4" />} text="saadolayinkatajudeen@gmail.com" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical capabilities */}
      <section id="skills" className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Technical Capabilities" title="My technical expertise" />
          <div className="bento-tile gold-border divide-y divide-border">
            {capabilityStack.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 p-6 sm:flex-row sm:gap-6 md:p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:w-48 sm:flex-shrink-0">
                  {row.label}
                </span>
                <span className="text-sm text-muted-foreground md:text-base">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <ProfessionalExperience />

      {/* Process */}
      <section id="process" className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="How I Work" title="From process to product" />
          <ol className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {process.map((step, i) => (
              <li key={step.title} className="bento-tile gold-border p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {step.icon}
                  </span>
                  <span className="font-display text-xs font-bold text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Kind Words" title="Testimonials" />
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="bento-tile gold-border p-8">
                <p className="mb-3 font-display text-4xl leading-none text-primary">"</p>
                <blockquote className="mb-6 text-sm leading-relaxed text-foreground/80 md:text-base">
                  {t.content}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-display font-bold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Let's Talk" title="Have a system or product to build?" />
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="grid auto-rows-min gap-5 lg:col-span-5">
              <div className="bento-tile gold-border p-7">
                <h3 className="font-display text-xl font-bold">
                  Tell me about the process you want to digitise
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Whether it's an internal system, a dashboard, or a customer-facing product — send
                  the details and I'll reply within 24 hours with how I'd approach it.
                </p>
              </div>

              <a
                href="mailto:saadolayinkatajudeen@gmail.com"
                className="bento-tile gold-border flex items-center gap-4 p-5"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="text-sm">saadolayinkatajudeen@gmail.com</span>
              </a>

              <a
                href="https://wa.me/2348142696998"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-tile gold-border flex items-center gap-4 p-5"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span className="text-sm">+234 814 269 6998 (WhatsApp)</span>
              </a>

              <div className="bento-tile gold-border flex items-center gap-4 p-5">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="text-sm">Ilorin, Nigeria — open to remote roles</span>
              </div>
            </div>

            <div className="bento-tile gold-border p-7 md:p-9 lg:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name?.message} htmlFor="name">
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      {...register("name")}
                      className="rounded-xl border-border bg-input"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message} htmlFor="email">
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      className="rounded-xl border-border bg-input"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Project / Company" optional htmlFor="company">
                    <Input
                      id="company"
                      autoComplete="organization"
                      placeholder="Organisation or project name"
                      {...register("company")}
                      className="rounded-xl border-border bg-input"
                    />
                  </Field>
                  <Field label="What would you like to build?" optional htmlFor="projectType">
                    <Input
                      id="projectType"
                      placeholder="e.g. management system, dashboard"
                      {...register("projectType")}
                      className="rounded-xl border-border bg-input"
                    />
                  </Field>
                </div>

                <Field label="Message" error={errors.message?.message} htmlFor="message">
                  <Textarea
                    id="message"
                    placeholder="Describe the process, product or problem you have in mind."
                    {...register("message")}
                    className="min-h-[150px] resize-none rounded-xl border-border bg-input"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 px-4 py-12 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-xl font-bold gold-text">Saad Tajudeen Olayinka</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-Stack Developer & Business Solutions Engineer
            </p>
          </div>

          <nav aria-label="Social links" className="flex gap-3">
            {[
              { href: "https://github.com/TiggaCodex", label: "GitHub", icon: <Github className="h-4 w-4" /> },
              {
                href: "https://www.linkedin.com/in/saad-olayinka-tajudeen-6372a9257",
                label: "LinkedIn",
                icon: <Linkedin className="h-4 w-4" />,
              },
              { href: "https://x.com/Savage_Tigga", label: "X (Twitter)", icon: <Twitter className="h-4 w-4" /> },
              { href: "https://wa.me/2348142696998", label: "WhatsApp", icon: <WhatsAppIcon className="h-4 w-4" /> },
              {
                href: "https://www.tiktok.com/@tiggadevs",
                label: "TikTok",
                icon: <TikTokIcon className="h-4 w-4" />,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-2 md:items-end">
            <Link
              to="/resume"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              View resume
            </Link>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Saad Tajudeen Olayinka. All rights reserved.
            </p>
            <Link
              to="/admin"
              className="text-[11px] text-muted-foreground/50 transition-colors hover:text-primary"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Field = ({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label htmlFor={htmlFor} className="mb-2 block text-xs font-medium text-muted-foreground">
      {label}
      {optional && <span className="ml-1 text-muted-foreground/60">(optional)</span>}
    </Label>
    {children}
    {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
  </div>
);

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3">
    <span className="text-primary">{icon}</span>
    <span className="text-xs text-muted-foreground">{text}</span>
  </div>
);

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-10 text-center md:mb-14">
    <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary">
      {eyebrow}
    </span>
    <h2 className="font-display text-3xl font-extrabold md:text-5xl">{title}</h2>
    <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
);

export default Index;
