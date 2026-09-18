import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";
import NotFound from "./NotFound";

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (project) {
      document.title = `${project.title} — Case Study | Saad Olayinka Tajudeen`;
    }
    return () => {
      document.title = "Saad Olayinka Tajudeen — Frontend Developer & Digital Product Builder";
    };
  }, [project]);

  if (!project) return <NotFound />;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <Button asChild variant="outline" className="rounded-full border-foreground/20">
          <Link to="/#work">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to work
          </Link>
        </Button>

        <header className="mt-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            {project.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button asChild className="rounded-full">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  View live site
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
            {project.codeUrl && (
              <Button asChild variant="outline" className="rounded-full border-primary/40">
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  View code
                  <Github className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </header>

        <figure className="bento-tile mt-10 overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} interface`}
            width={1280}
            height={800}
            className="w-full object-cover"
          />
        </figure>

        <Block title="The problem">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.problem}
          </p>
        </Block>

        <Block title="Approach">
          <List items={project.approach} />
        </Block>

        <Block title="What it does">
          <List items={project.features} />
        </Block>

        {project.sections?.map((section) => (
          <Block key={section.title} title={section.title}>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {section.body}
            </p>
            {section.items && (
              <div className="mt-4">
                <List items={section.items} />
              </div>
            )}
          </Block>
        ))}


        {project.loanProducts && (
          <Block title="Loan products">
            <div className="grid gap-4 sm:grid-cols-3">
              {project.loanProducts.map((product) => (
                <div key={product.name} className="rounded-xl border border-border p-4">
                  <h3 className="font-display text-base font-bold">{product.name}</h3>
                  <ul className="mt-2 space-y-1">
                    {product.details.map((d) => (
                      <li key={d} className="text-sm leading-relaxed text-muted-foreground">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        )}

        {project.eligibility && (
          <Block title="Eligibility">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.eligibility}
            </p>
          </Block>
        )}

        {project.result && (
          <Block title="Result">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.result}
            </p>
          </Block>
        )}


        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Block title="Stack" className="mt-0">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="My role" className="mt-0">
            <p className="text-sm leading-relaxed text-muted-foreground">{project.role}</p>
          </Block>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="ghost" className="rounded-full justify-start">
            <Link to={`/work/${next.slug}`}>
              Next project: {next.title}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/#contact">Let's work together</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Block = ({
  title,
  children,
  className = "mt-6",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`bento-tile p-6 md:p-8 ${className}`}>
    <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default CaseStudy;
