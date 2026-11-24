import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, Code2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProject } from "@/data/projects";

type ResumeEntry = {
  title: string;
  subtitle?: string;
  points: string[];
  slug?: string;
};

const technicalSkills = [
  ["Languages", "JavaScript, TypeScript, SQL, HTML5, CSS3"],
  ["Frontend", "React, Tailwind CSS, Shadcn/UI, Redux Toolkit"],
  ["Backend & Data", "Supabase, PostgreSQL, Firebase, REST APIs, database functions"],
  ["Infrastructure", "Cloudflare Workers, GitHub, Codespaces, Wrangler, Vite"],
  ["Payments", "Paystack, VTPass, Clubkonnect, wallet workflows, reconciliation"],
  ["Security", "Authentication, OAuth 2.0, RBAC, Row Level Security, audit logging"],
  ["Practices", "Data modelling, responsive design, PWA development, operational testing"],
];

const professionalSkills = [
  ["Administration", "Records management, institutional coordination, programme administration"],
  ["Communication", "Stakeholder engagement, correspondence, public and international relations"],
  ["Management", "Workflow coordination, strategic reporting, team leadership"],
  ["Technology", "Digital transformation, business process automation, web applications"],
  ["Data Analysis", "SPSS, Microsoft Excel, data collection and reporting"],
  ["Office Productivity", "Microsoft Word, Excel and PowerPoint"],
  ["Domain Knowledge", "Agricultural economics, extension technology and cooperative management"],
];

const technicalProjects: ResumeEntry[] = [
  {
    title: "My Billpadi",
    subtitle: "Fintech & Digital Payments | React, Supabase, PostgreSQL, Cloudflare",
    slug: "my-billpadi",
    points: [
      "Developed a wallet-based utility payment platform supporting airtime, data, electricity and television subscriptions.",
      "Integrated Paystack, VTPass and Clubkonnect with configurable supplier selection and catalogue synchronization.",
      "Implemented transaction reconciliation, supplier dispatch workflows and administrative financial monitoring.",
      "Migrated production infrastructure to Supabase and Cloudflare, including historical data recovery and operational validation.",
    ],
  },
  {
    title: "Zarin Business Management",
    subtitle: "Business Management & POS | React, TypeScript, PostgreSQL",
    slug: "zarin-ventures",
    points: [
      "Developed integrated POS, inventory, sales, expense and staff management workflows.",
      "Implemented departmental operations, production batches, cost allocation and profitability reporting.",
      "Integrated role-based permissions, audit logging, shift management and sales reconciliation.",
      "Performed database migration, historical transaction recovery and production deployment.",
    ],
  },
  {
    title: "Zarin Travels & Tours",
    subtitle: "Travel Operations | React, Supabase, Cloudflare",
    slug: "zarin-travels",
    points: [
      "Developed client registration, payment tracking, outstanding balance and financial reporting workflows.",
      "Structured commission recognition around fully paid client accounts.",
      "Configured independent database infrastructure, authentication and cloud deployment.",
    ],
  },
  {
    title: "Al-Amanah Cooperative",
    subtitle: "Financial Workflow Automation | React, Supabase",
    slug: "al-amanah-cooperative",
    points: [
      "Digitized cooperative loan applications, eligibility calculations, approvals and repayment tracking.",
      "Translated salary thresholds and loan product rules into structured application workflows.",
      "Implemented administrative reporting and role-based access controls.",
    ],
  },
  {
    title: "Alumni Voting Platform",
    subtitle: "Institutional Technology | PostgreSQL, Supabase",
    slug: "alumni-voting",
    points: [
      "Designed electronic voting workflows around voter eligibility, ballot privacy and controlled result publication.",
      "Structured database access controls and one-vote-per-position rules.",
    ],
  },
];

const technicalExperience: ResumeEntry[] = [
  {
    title: "Independent Software Developer — TiggaCodex",
    subtitle: "Full-Stack Development & Business Solutions",
    points: [
      "Design and develop web applications for financial services, business operations and institutional administration.",
      "Translate operational requirements into data models, application workflows and maintainable interfaces.",
      "Manage application deployment, database integration, migration, recovery and functional validation.",
    ],
  },
  {
    title: "Secretary — CAPIR",
    subtitle: "Kwara State College of Arabic and Islamic Legal Studies",
    points: [
      "Support institutional digital transformation through alumni data collection, online platforms and administrative workflows.",
      "Coordinate records, stakeholder communication and strategic reporting.",
    ],
  },
];

const professionalExperience: ResumeEntry[] = [
  {
    title: "Secretary — CAPIR",
    subtitle: "Kwara State College of Arabic and Islamic Legal Studies",
    points: [
      "Coordinate administrative activities within the Centre for Alumni, Public and International Relations.",
      "Prepare institutional reports, official correspondence and administrative documentation.",
      "Support alumni engagement, stakeholder meetings, data collection and institutional partnerships.",
      "Contribute to international academic outreach, public relations and institutional development initiatives.",
      "Develop digital tools to improve records management and administrative processes.",
    ],
  },
  {
    title: "Administrative Officer",
    subtitle: "CAILS–KWASU Foundation Diploma Programme",
    points: [
      "Supported academic programme administration and student records management.",
      "Coordinated administrative documentation and day-to-day programme activities.",
      "Provided operational support for academic and institutional requirements.",
    ],
  },
  {
    title: "Independent Software Developer — TiggaCodex",
    subtitle: "Business Solutions & Digital Transformation",
    points: [
      "Develop business management applications, financial platforms and institutional digital systems.",
      "Analyse operational processes and translate manual workflows into practical software solutions.",
      "Support application implementation, database management and digital infrastructure.",
    ],
  },
  {
    title: "Information Technology Experience",
    subtitle: "National Centre for Agricultural Mechanization (NCAM)",
    points: [
      "Gained practical experience in statistical data processing and analysis using SPSS.",
      "Supported data management and information technology activities.",
    ],
  },
  {
    title: "Farm Management Experience",
    subtitle: "Agricultural Operations",
    points: [
      "Gained practical experience in farm management and agricultural operations.",
      "Applied agricultural economics and extension knowledge to operational activities.",
    ],
  },
  {
    title: "Teaching & Community Development",
    subtitle: "National Youth Service Corps (NYSC)",
    points: [
      "Taught Economics, Agriculture and Marketing.",
      "Served as President of the Sustainable Development Goals Community Development Service group.",
      "Supported community engagement, team coordination and development initiatives.",
    ],
  },
];

const summaries = {
  technical:
    "Full-stack developer and business solutions engineer experienced in developing business management systems, fintech applications and institutional digital platforms. Skilled in React, TypeScript, Supabase, PostgreSQL, payment integrations and cloud deployment. Combines business process analysis with application development, database management, security controls and operational validation.",
  professional:
    "Multidisciplinary professional with experience in institutional administration, agricultural economics, stakeholder engagement, data analysis and software development. Combines administrative coordination and leadership with practical digital transformation capabilities, including business process automation, database management and development of operational information systems.",
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="cv-section mt-8">
    <h2 className="cv-heading mb-4 border-b border-border pb-2 text-xl font-bold">
      {title}
    </h2>
    {children}
  </section>
);

const Entry = ({ entry }: { entry: ResumeEntry }) => {
  const project = entry.slug ? getProject(entry.slug) : undefined;

  return (
    <article className="cv-entry mb-5">
      <h3 className="font-bold text-base">{entry.title}</h3>

      {entry.subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">
          {entry.subtitle}
        </p>
      )}

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
        {entry.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {(project?.liveUrl || project?.codeUrl) && (
        <div className="cv-links mt-2 flex flex-wrap gap-3 text-xs">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {project.liveUrl}
            </a>
          )}

          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Source repository
            </a>
          )}
        </div>
      )}
    </article>
  );
};

const Resume = () => {
  const [params, setParams] = useSearchParams();

  const version =
    params.get("type") === "professional"
      ? "professional"
      : "technical";

  const technical = version === "technical";

  const headline = technical
    ? "Full-Stack Developer & Business Solutions Engineer"
    : "Administrative Professional & Digital Transformation Specialist";

  const skills = technical
    ? technicalSkills
    : professionalSkills;

  const experience = technical
    ? technicalExperience
    : professionalExperience;

  useEffect(() => {
    const previousTitle = document.title;

    document.title = technical
      ? "Saad Tajudeen Olayinka - Technical Resume"
      : "Saad Tajudeen Olayinka - Professional Resume";

    return () => {
      document.title = previousTitle;
    };
  }, [technical]);

  const changeVersion = (
    next: "technical" | "professional"
  ) => {
    const updated = new URLSearchParams(params);
    updated.set("type", next);
    setParams(updated);
  };

  return (
    <main className="resume-page dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-14">

        <div className="resume-actions mb-8 space-y-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <Button asChild variant="outline" className="rounded-full">
              <Link to="/#home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Portfolio
              </Link>
            </Button>

            <Button
              onClick={() => window.print()}
              className="rounded-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>

          </div>

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              TiggaCodex
            </p>

            <h1 className="mt-3 font-display text-3xl font-extrabold">
              Résumé Centre
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              Choose the résumé most relevant to your opportunity.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              aria-pressed={technical}
              onClick={() => changeVersion("technical")}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                technical
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <Code2 className="mb-3 h-6 w-6 text-primary" />
              <span className="block font-bold">Technical résumé</span>
              <span className="mt-2 block text-xs text-muted-foreground">
                Software engineering, fintech and cloud solutions
              </span>
            </button>

            <button
              type="button"
              aria-pressed={!technical}
              onClick={() => changeVersion("professional")}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                !technical
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <Briefcase className="mb-3 h-6 w-6 text-primary" />
              <span className="block font-bold">
                Professional résumé
              </span>
              <span className="mt-2 block text-xs text-muted-foreground">
                Administration, leadership and digital transformation
              </span>
            </button>

          </div>

          <p className="text-center text-xs text-muted-foreground">
            Select Download PDF, then choose Save as PDF in your browser's print dialog.
          </p>

        </div>

        <article className="cv-document rounded-3xl border border-border bg-card p-6 md:p-10">

          <header className="cv-header">
            <h1 className="break-words text-3xl font-extrabold md:text-4xl">
              Saad Tajudeen Olayinka
            </h1>

            <p className="mt-2 font-semibold text-primary">
              {headline}
            </p>

            <div className="cv-contact mt-4 flex flex-wrap gap-x-4 gap-y-2 break-all text-xs text-muted-foreground">
              <span>Ilorin, Nigeria</span>

              <a href="tel:+2348142696998">
                +234 814 269 6998
              </a>

              <a href="mailto:saadolayinkatajudeen@gmail.com">
                saadolayinkatajudeen@gmail.com
              </a>

              <a href="https://github.com/TiggaCodex">
                github.com/TiggaCodex
              </a>

              <a href="https://www.linkedin.com/in/saad-olayinka-tajudeen-6372a9257">
                LinkedIn
              </a>

              <a href="https://tiggacodexii-tigga-portfolio.tiggacodex.workers.dev">
                Portfolio
              </a>
            </div>
          </header>

          <Section title="Professional Summary">
            <p className="text-sm leading-relaxed">
              {summaries[version]}
            </p>
          </Section>

          <Section title={technical ? "Technical Skills" : "Core Competencies"}>
            <dl className="space-y-2 text-sm">
              {skills.map(([label, value]) => (
                <div key={label}>
                  <dt className="inline font-semibold">{label}: </dt>
                  <dd className="inline">{value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Professional Experience">
            {experience.map((entry) => (
              <Entry key={entry.title} entry={entry} />
            ))}
          </Section>

          {technical && (
            <Section title="Selected Software Projects">
              {technicalProjects.map((entry) => (
                <Entry key={entry.title} entry={entry} />
              ))}
            </Section>
          )}

          {!technical && (
            <Section title="Selected Digital Transformation Initiatives">
              <Entry
                entry={{
                  title: "Institutional & Business Process Digitization",
                  points: [
                    "Developed alumni registration and profile management platforms.",
                    "Designed cooperative loan management and electronic voting workflows.",
                    "Developed operational business systems covering sales, inventory, payments and financial reporting.",
                  ],
                }}
              />
            </Section>
          )}

          <Section title="Education">
            <h3 className="font-bold">
              Federal University of Technology, Minna
            </h3>
            <p className="mt-1 text-sm">
              B.Tech. Agricultural Economics & Extension Technology — 2021
            </p>
          </Section>

          <Section title="Achievements & Leadership">
            <Entry
              entry={{
                title: "3rd Place — Kwara AI Summit Hackathon",
                points: [
                  "Contributed frontend development within a three-person team comprising product management, frontend development and design.",
                  "Collaborated to develop and present a working solution under competitive time constraints.",
                ],
              }}
            />

            {!technical && (
              <p className="text-sm">
                Additional leadership experience: SDG CDS President
                and Ballerz FC Captain (2017–2023).
              </p>
            )}
          </Section>

        </article>
      </div>
    </main>
  );
};

export default Resume;
