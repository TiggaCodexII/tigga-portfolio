import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "default";
}

const ProjectCard = ({ project, variant = "default" }: ProjectCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "bento-tile group flex flex-col",
        isFeatured && "md:flex-row md:items-stretch",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-secondary/40",
          isFeatured ? "md:w-[55%]" : "",
        )}
      >
        <img
          src={project.image}
          alt={project.coverType === "graphic" ? `${project.title} project cover` : `${project.title} project image`}
          loading="lazy"
          width={1280}
          height={800}
          className={cn(
            "h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]",
            isFeatured ? "aspect-[16/10] md:aspect-auto md:min-h-[340px]" : "aspect-[16/10]",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-6 md:p-8",
          isFeatured && "md:w-[45%] md:justify-center",
        )}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          {project.category}
        </span>

        {project.status && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium",
              project.status === "Live"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-border bg-secondary/50 text-muted-foreground"
            )}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {project.status}
            </span>
            {project.sector && (
              <span className="text-[10px] text-muted-foreground">
                {project.sector}
              </span>
            )}
          </div>
        )}

        <h3
          className={cn(
            "font-display font-extrabold leading-tight mt-3",
            isFeatured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {isFeatured ? project.summary : project.tagline}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild size="sm" variant="outline" className="rounded-full border-primary/40">
            <Link to={`/work/${project.slug}`} aria-label={`Read the case study for ${project.title}`}>
              Case study
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>

          {project.liveUrl && (
            <Button asChild size="sm" variant="ghost" className="rounded-full">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live site
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}

          {project.codeUrl && (
            <Button asChild size="sm" variant="ghost" className="rounded-full">
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                Code
                <Github className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
