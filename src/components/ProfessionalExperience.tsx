import {
  Briefcase,
  Code2,
  Building2,
  Database,
  Users,
  Trophy,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    icon: Code2,
    title: "Full-Stack Developer & Business Solutions Engineer",
    organization: "TiggaCodex",
    type: "Independent Software Development",
    description:
      "Designing, developing and deploying digital products that address real-world business and institutional requirements.",
    points: [
      "Full-stack web application development",
      "Fintech and third-party payment integrations",
      "Business management and workflow automation",
      "Database architecture, migration and recovery",
      "Cloud deployment and operational validation",
    ],
  },
  {
    icon: Building2,
    title: "Secretary — CAPIR",
    organization:
      "Kwara State College of Arabic and Islamic Legal Studies",
    type: "Institutional Administration",
    description:
      "Supporting the Centre for Alumni, Public and International Relations through administrative coordination, institutional engagement and digital transformation.",
    points: [
      "Alumni engagement and records management",
      "Institutional communication and coordination",
      "Public and international relations support",
      "Strategic reports and administrative documentation",
      "Digital platforms and process automation",
    ],
  },
  {
    icon: Briefcase,
    title: "Administrative Officer",
    organization: "CAILS–KWASU Foundation Diploma Programme",
    type: "Academic Administration",
    description:
      "Supported academic programme administration through student records management, administrative coordination and operational support.",
    points: [
      "Academic and student administration",
      "Records and documentation management",
      "Programme coordination",
    ],
  },
  {
    icon: Database,
    title: "Information Technology Experience",
    organization:
      "National Centre for Agricultural Mechanization (NCAM)",
    type: "Technology & Data",
    description:
      "Practical experience in information technology, data processing and statistical analysis within an agricultural research environment.",
    points: [
      "Statistical data analysis",
      "SPSS",
      "Digital records and data management",
    ],
  },
  {
    icon: Users,
    title: "Teaching & Community Leadership",
    organization: "National Youth Service Corps",
    type: "Education & Leadership",
    description:
      "Teaching experience combined with community development leadership and team coordination.",
    points: [
      "Economics, Agriculture and Marketing instruction",
      "SDG Community Development Service leadership",
      "Community engagement and team coordination",
    ],
  },
];

const ProfessionalExperience = () => (
  <section
    id="experience"
    className="relative px-4 py-20 md:py-28"
  >
    <div className="mx-auto max-w-6xl">

      <div className="mb-12 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Professional Journey
        </span>

        <h2 className="font-display text-3xl font-extrabold md:text-5xl">
          Experience beyond code
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Combining software development, business process
          understanding and institutional administration to
          deliver practical digital solutions.
        </p>
      </div>

      <div className="relative space-y-5">

        {experiences.map((experience) => {
          const Icon = experience.icon;

          return (
            <article
              key={experience.title}
              className="bento-tile gold-border p-6 md:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1">

                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {experience.type}
                  </span>

                  <h3 className="mt-2 font-display text-xl font-bold">
                    {experience.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-foreground">
                    {experience.organization}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {experience.description}
                  </p>

                  <ul className="mt-5 grid gap-2 md:grid-cols-2">

                    {experience.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />

                        {point}
                      </li>
                    ))}

                  </ul>

                </div>
              </div>
            </article>
          );
        })}

      </div>

      <div className="mt-16">

        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Milestones
          </span>

          <h2 className="mt-3 font-display text-3xl font-extrabold">
            Education & achievements
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <article className="bento-tile gold-border p-8">

            <Trophy
              className="mb-5 h-10 w-10 text-primary"
              aria-hidden="true"
            />

            <p className="font-display text-4xl font-extrabold gold-text">
              3rd Place
            </p>

            <h3 className="mt-3 font-display text-xl font-bold">
              Kwara AI Summit Hackathon
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Collaborated within a three-person team comprising
              product management, frontend development and design
              to develop and present a working solution under
              competitive time constraints.
            </p>

          </article>

          <article className="bento-tile gold-border p-8">

            <GraduationCap
              className="mb-5 h-10 w-10 text-primary"
              aria-hidden="true"
            />

            <p className="font-display text-4xl font-extrabold gold-text">
              B.Tech.
            </p>

            <h3 className="mt-3 font-display text-xl font-bold">
              Agricultural Economics & Extension Technology
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Federal University of Technology, Minna
            </p>

            <p className="mt-2 text-sm font-medium text-primary">
              Graduated in 2021
            </p>

          </article>

        </div>
      </div>

      <div className="mt-10 text-center">

        <Button
          asChild
          size="lg"
          className="rounded-full font-semibold"
        >
          <Link to="/resume">
            View my professional résumé
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

      </div>
    </div>
  </section>
);

export default ProfessionalExperience;
