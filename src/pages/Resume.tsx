import { Link } from "react-router-dom";
import { getProject } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Github,
  Globe,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Download,
} from "lucide-react";

const Resume = () => {
  const skills = [
    { label: "Languages", value: "JavaScript, TypeScript" },
    { label: "Frontend", value: "HTML5, CSS3, React, Tailwind CSS" },
    { label: "Backend & Data", value: "Supabase, PostgreSQL, Firebase" },
    { label: "Application Development", value: "Authentication, Role-Based Access Control, REST/API Integration, Responsive Web Applications" },
    { label: "Tools", value: "Git, GitHub, Vite" },
    { label: "Practices", value: "Component-Based Architecture, UI/UX Principles, Responsive Design, Clean Code" },
  ];

  const projects = [
    {
      slug: "zarin-ventures",
      title: "Zarin Business Management System",
      description: "Multi-module business management platform integrating point of sale, inventory, sales, expenses, financial reporting, staff operations, services and business analytics into one centralized system.",
      points: [
        "Built staff POS workflows for carts, sales, payment methods and printable receipts, connected to inventory and stock movements.",
        "Developed administrative dashboards for sales, inventory, expenses, services and financial performance, including revenue, COGS, gross profit, net profit and margins.",
        "Added staff management, role-based permissions, shift management and sales reconciliation workflows.",
        "Implemented service-based sales alongside product sales and administrative reporting.",
        "Used Supabase/PostgreSQL authentication and database-level access controls to protect business data.",
      ],
      technology: "React, TypeScript, Tailwind CSS, Supabase, PostgreSQL",
    },
    {
      slug: "al-amanah-cooperative",
      title: "Al-Amanah Multipurpose Cooperative Loan Management System",
      description: "Digital cooperative management system designed to streamline staff loan applications, eligibility assessment, approval, repayment management and administrative reporting.",
      points: [
        "Digitized loan applications and administrative review, recommendation and approval workflows.",
        "Implemented salary and deduction calculations for loan eligibility across Humanitarian, Commodity and Real Loan categories and their repayment rules.",
        "Implemented loan records and repayment tracking.",
        "Added role-based access and audit logging for sensitive cooperative operations.",
        "Built reporting and administrative views to monitor loan activity and cooperative records.",
      ],
      technology: "React, TypeScript, Tailwind CSS, Supabase, PostgreSQL",
    },
    {
      slug: "kwara-cails-alumni-platform",
      title: "KWARA CAILS Alumni Platform",
      description: "Digital alumni platform designed to centralize alumni registration, profile management, alumni visibility and administrative activities.",
      points: [
        "Built alumni registration and profile management workflows with authentication and database integration.",
        "Developed reusable React components for a maintainable application structure.",
        "Designed responsive interfaces for desktop and mobile users.",
        "Supported administrative management of alumni information and activities.",
      ],
      technology: "React, JavaScript/TypeScript, Firebase",
    },
    {
      slug: "farm-produce-traceability",
      title: "Farm Produce Traceability System",
      description: "Web-based agricultural traceability application designed to improve visibility and record management across the farm produce workflow.",
      points: [
        "Designed digital traceability workflows for agricultural produce.",
        "Implemented structured data management using Supabase.",
        "Built responsive interfaces for practical field and administrative use.",
        "Focused on clear data visibility and traceability across the production workflow.",
      ],
      technology: "React, Supabase, PostgreSQL",
    },
    {
      slug: "swiftdrop",
      title: "SwiftDrop — Delivery Tracking Product",
      description: "Delivery and logistics web application designed around order tracking and a straightforward customer delivery experience.",
      points: [
        "Designed responsive interfaces for delivery and tracking workflows.",
        "Implemented tracking-focused user interactions and a clear customer-facing experience for delivery information.",
        "Focused on usability, responsive design and straightforward navigation.",
      ],
      technology: "React, TypeScript, Tailwind CSS",
    },
  ];

  return (
    <div className="resume-page min-h-screen bg-background dark">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Top bar */}
        <div className="resume-actions flex items-center justify-between gap-4 mb-8">
          <Button asChild variant="outline" className="rounded-full border-foreground/20">
            <Link to="/#home">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
          <Button
            onClick={() => window.print()}
            className="bg-primary hover:bg-primary/90 rounded-full"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>

        {/* Header */}
        <Card className="resume-header p-6 md:p-10 bg-card/80 backdrop-blur-sm border-border/50 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-normal break-words">
            <span className="gold-text">Saad Tajudeen Olayinka</span>
          </h1>
          <p className="mt-2 text-primary font-medium">Frontend Developer & Digital Product Builder</p>

          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Ilorin, Nigeria (Open to Remote Roles)
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" /> 08142696998
            </span>
            <a
              href="mailto:saadolayinkatajudeen@gmail.com"
              className="flex min-w-0 max-w-full items-center gap-2 break-all hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" /> saadolayinkatajudeen@gmail.com
            </a>
            <a
              href="https://github.com/TiggaCodex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 max-w-full items-center gap-2 break-all hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4 text-primary" /> github.com/TiggaCodex
            </a>
            <a
              href="https://tiggaportfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 max-w-full items-center gap-2 break-all hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4 text-primary" /> Portfolio
            </a>
          </div>
        </Card>

        {/* Professional Summary */}
        <Section icon={<Briefcase className="w-5 h-5" />} title="Professional Summary">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Frontend Developer & Digital Product Builder focused on building responsive, user-centered
            web applications and business systems. Experienced in developing real-world digital products
            using React, TypeScript, Tailwind CSS and Supabase, with a strong focus on business workflows,
            usability, performance and maintainable application architecture. Comfortable working
            independently and collaboratively to turn real-world requirements into functional digital products.
          </p>
        </Section>

        {/* Technical Skills */}
        <Section icon={<Code2 className="w-5 h-5" />} title="Technical Skills">
          <div className="grid gap-3">
            {skills.map((s) => (
              <div key={s.label} className="flex flex-col sm:flex-row sm:gap-3">
                <span className="text-sm font-semibold text-foreground sm:w-52 sm:flex-shrink-0">
                  {s.label}
                </span>
                <span className="text-sm text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section icon={<ExternalLink className="w-5 h-5" />} title="Selected Projects">
          <div className="space-y-8">
            {projects.map((p) => {
              const links = getProject(p.slug);
              return (
              <article key={p.title} className="resume-project border-b border-border/50 pb-8 last:border-0 last:pb-0">
                <h3 className="text-base md:text-lg font-bold tracking-normal text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                <ul className="mt-2 space-y-1.5">
                  {p.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Technology: </span>{p.technology}
                </p>
                {(links?.liveUrl || links?.codeUrl) && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    {links.liveUrl && <Button asChild variant="outline" size="sm"><a href={links.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink />Live Demo</a></Button>}
                    {links.codeUrl && <Button asChild variant="outline" size="sm"><a href={links.codeUrl} target="_blank" rel="noopener noreferrer"><Github />GitHub</a></Button>}
                  </div>
                )}
              </article>
              );
            })}
          </div>
          <div className="mt-6 border-t border-border/50 pt-5">
            <h3 className="text-base font-bold tracking-normal text-foreground">Selected Product Development Experience</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Designed and developed production-oriented web applications spanning business management,
              POS, inventory, cooperative loan management, alumni administration, agricultural traceability and logistics.
            </p>
          </div>
        </Section>

        <Section icon={<Briefcase className="w-5 h-5" />} title="Professional Experience">
          <h3 className="text-base md:text-lg font-bold tracking-normal text-foreground">
            KWARA State College of Arabic and Islamic Legal Studies (KWARA CAILS)
          </h3>
          <p className="mt-2 text-sm font-semibold text-primary">Secretary / Alumni Officer</p>
          <p className="mt-1 text-sm text-muted-foreground">Centre for Alumni, Public and International Relations (CAPIR)</p>
          <ul className="mt-3 space-y-2">
            {[
              "Managed alumni-related administrative activities and records.",
              "Coordinated communication with alumni representatives.",
              "Developed digital alumni data collection workflows and online surveys.",
              "Contributed to the planning and development of the alumni platform.",
              "Supported alumni engagement initiatives and institutional events.",
            ].map((point) => (
              <li key={point} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Award className="w-5 h-5" />} title="Achievements">
          <h3 className="text-base md:text-lg font-bold tracking-normal text-foreground">
            3rd Place — Kwara AI Summit Hackathon
          </h3>
          <ul className="mt-2 space-y-1.5">
            {[
              "Collaborated in a team environment to develop and present a working solution under time constraints.",
              "Contributed to ideation, development and presentation.",
              "Demonstrated rapid problem-solving and adaptability in a competitive environment.",
            ].map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Education */}
        <Section icon={<GraduationCap className="w-5 h-5" />} title="Education">
          <h3 className="text-base md:text-lg font-bold tracking-normal text-foreground">
            Federal University of Technology, Minna
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            B.Tech. Agricultural Economics & Extension Technology
          </p>
        </Section>
      </div>
    </div>
  );
};

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="resume-section mt-6 p-5 sm:p-6 md:p-8 bg-card/80 backdrop-blur-sm border-border/50">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-primary">{icon}</span>
      <h2 className="text-xl md:text-2xl font-bold tracking-normal text-foreground">{title}</h2>
    </div>
    {children}
  </Card>
);

export default Resume;