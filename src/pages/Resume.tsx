import { Link } from "react-router-dom";
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
    { label: "Frontend", value: "HTML5, CSS3, React" },
    { label: "Backend & Services", value: "Firebase (Authentication, Firestore)" },
    { label: "Tools", value: "Git, GitHub, Version Control, Responsive Design" },
    { label: "Practices", value: "Component-Based Architecture, Clean Code, UI/UX Principles" },
  ];

  const projects = [
    {
      title: "Alumni Management Platform",
      points: [
        "Built a scalable alumni platform enabling user registration, profile management, and engagement",
        "Developed modular React components for maintainability and reuse",
        "Integrated Firebase Authentication and Firestore for real-time data synchronization",
        "Implemented dynamic slideshow feature for showcasing alumni profiles",
        "Optimized UI for cross-device responsiveness and accessibility",
      ],
    },
    {
      title: "SwiftDrop – Logistics Web App",
      points: [
        "Developed a delivery management interface for tracking orders and user interactions",
        "Used TypeScript to improve code quality and reduce runtime errors",
        "Designed structured and reusable UI components for scalability",
        "Focused on intuitive UX and efficient state handling",
      ],
    },
    {
      title: "MoodQuote+ – Mood Tracking Application",
      points: [
        "Designed a user-friendly mood tracking system for logging and analyzing emotional patterns",
        "Built responsive and interactive UI with React",
        "Integrated Firebase for secure, real-time data storage",
        "Emphasized simplicity and engagement in user experience design",
      ],
    },
    {
      title: "BrandForge – Brand Name Generator",
      points: [
        "Created a tool for generating business and brand name ideas dynamically",
        "Implemented efficient input handling and suggestion logic",
        "Designed a clean and minimal interface for ease of use",
        "Structured for future enhancements such as AI-powered suggestions",
      ],
    },
    {
      title: "Perfume Business Landing Page",
      points: [
        "Developed a high-conversion landing page with strong visual hierarchy",
        "Implemented responsive design for optimal viewing across devices",
        "Integrated WhatsApp checkout flow to streamline customer communication",
        "Focused on performance, layout clarity, and product presentation",
      ],
    },
    {
      title: "Personal Portfolio Website",
      points: [
        "Built a modern portfolio to showcase projects and technical capabilities",
        "Designed for clarity, fast loading, and easy navigation",
        "Highlights selected projects with live demos and code access",
        "Serves as a professional entry point for recruiters and collaborators",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
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
        <Card className="p-6 md:p-10 bg-card/80 backdrop-blur-sm border-border/50 card-glow text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Saad Tajudeen Olayinka
          </h1>
          <p className="mt-2 text-primary font-medium">Frontend Developer</p>

          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Ilorin, Nigeria (Open to Remote Roles)
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" /> 08142696998
            </span>
            <a
              href="mailto:saadolayinkatajudeen@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" /> saadolayinkatajudeen@gmail.com
            </a>
            <a
              href="https://github.com/TiggaCodex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4 text-primary" /> github.com/TiggaCodex
            </a>
            <a
              href="https://tiggaportfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4 text-primary" /> Portfolio
            </a>
          </div>
        </Card>

        {/* Professional Summary */}
        <Section icon={<Briefcase className="w-5 h-5" />} title="Professional Summary">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Frontend Developer focused on building responsive, user-centered web applications using
            React and modern JavaScript technologies. Experienced in developing and deploying
            real-world projects with Firebase integration. Strong attention to UI detail,
            performance, and usability, with the ability to work independently and collaborate
            effectively in remote environments.
          </p>
        </Section>

        {/* Technical Skills */}
        <Section icon={<Code2 className="w-5 h-5" />} title="Technical Skills">
          <div className="grid gap-3">
            {skills.map((s) => (
              <div key={s.label} className="flex flex-col sm:flex-row sm:gap-3">
                <span className="text-sm font-semibold text-foreground sm:w-48 sm:flex-shrink-0">
                  {s.label}
                </span>
                <span className="text-sm text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section icon={<ExternalLink className="w-5 h-5" />} title="Projects">
          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.title}>
                <h3 className="text-base md:text-lg font-bold text-foreground">{p.title}</h3>
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
              </div>
            ))}
          </div>
        </Section>

        {/* Experience & Achievements */}
        <Section icon={<Award className="w-5 h-5" />} title="Experience & Achievements">
          <h3 className="text-base md:text-lg font-bold text-foreground">
            3rd Place – Kwara AI Summit Hackathon
          </h3>
          <ul className="mt-2 space-y-1.5">
            {[
              "Collaborated in a team environment to deliver a working solution under time constraints",
              "Contributed to ideation, development, and presentation",
              "Demonstrated adaptability and problem-solving in a fast-paced setting",
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
          <h3 className="text-base md:text-lg font-bold text-foreground">
            Federal University of Technology, Minna
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            B.Tech in Agricultural Economics and Extension Technology
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
  <Card className="mt-6 p-6 md:p-8 bg-card/80 backdrop-blur-sm border-border/50 card-glow">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-primary">{icon}</span>
      <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
    </div>
    {children}
  </Card>
);

export default Resume;