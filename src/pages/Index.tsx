import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Code2,
  Palette,
  Users,
  Wrench,
  ArrowUpRight,
  Sparkles,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import projectImage from "@/assets/lascotstudios-6.jpg";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Index = () => {
  const { toast } = useToast();
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
          message: data.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
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

  const stats = [
    { value: "20+", label: "Projects Shipped" },
    { value: "3rd", label: "Kwara AI Hackathon" },
    { value: "100%", label: "Client Focused" },
  ];

  const services = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Web Development",
      description: "Responsive, high-performance websites using modern frameworks and clean code.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Intuitive interfaces with a focus on user experience and visual harmony.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Brand Strategy",
      description: "Define your digital identity through consistent, impactful design.",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Optimization",
      description: "Performance audits, SEO, and code improvements for smooth journeys.",
    },
  ];

  const projects = [
    {
      title: "GreenGov — Smart Waste Management",
      description:
        "AI-powered waste management platform for Kwara State with multilingual chatbot, real-time tracking, and geofencing.",
      tech: ["React", "TypeScript", "Supabase", "AI/ML", "Mapbox"],
      demoLink: "https://kwara-smart-waste-ai.lovable.app/greengov",
      featured: true,
    },
    {
      title: "SwiftDrop",
      description:
        "Modern delivery & logistics web app that lets users track their deliveries seamlessly.",
      tech: ["Vite", "React", "Tailwind", "JavaScript"],
      liveLink: "https://swifdrop.netlify.app/",
      codeLink: "https://github.com/TiggaCodex/Swiftdropcollab",
    },
    {
      title: "Task Manager App",
      description: "A clean productivity app for tracking and managing daily tasks efficiently.",
      tech: ["React", "Firebase", "Framer Motion"],
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing modern web design and animations.",
      tech: ["Vite", "PostCSS", "EmailJS"],
      liveLink: "https://tiggaportfolio.netlify.app/",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online store with cart, checkout, and admin panel.",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Weather App",
      description: "Real-time weather forecasting app with location-based data.",
      tech: ["React", "OpenWeather API", "CSS"],
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

  return (
    <div className="min-h-screen bg-background dark text-foreground antialiased">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden hero-gradient pt-28 pb-16 px-4"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            {/* Main intro tile */}
            <div className="lg:col-span-7 bento-tile gold-border p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Available for new projects
              </span>
              <p className="text-muted-foreground text-base md:text-lg mb-2">Hi, I'm</p>
              <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] mb-4">
                Saad <span className="gold-text">Olayinka</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/90 font-medium mb-3">
                Frontend Developer & UI/UX Designer
              </p>
              <p className="text-sm md:text-base text-muted-foreground max-w-lg mb-8">
                I craft sleek, high-performing digital experiences with modern design principles
                and clean, efficient code.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 font-semibold"
                >
                  <a href="#contact">Hire Me</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  <Link to="/resume">
                    <FileText className="w-4 h-4" /> View Resume
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  <a href="#portfolio">My Work</a>
                </Button>
              </div>
            </div>

            {/* Image + stats column */}
            <div className="lg:col-span-5 grid grid-rows-[1fr_auto] gap-6">
              <div className="bento-tile gold-border glow-effect min-h-[280px]">
                <img
                  src={projectImage}
                  alt="Saad Olayinka"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-lg font-bold">Saad Tajudeen</p>
                  <p className="text-xs text-primary">Ilorin, Nigeria · Open to Remote</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bento-tile gold-border p-4 text-center flex flex-col justify-center"
                  >
                    <p className="font-display text-2xl md:text-3xl font-extrabold gold-text">
                      {s.value}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="What I Do" title="My Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="bento-tile gold-border p-6 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-20 md:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Selected Work" title="My Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bento-tile gold-border p-6 flex flex-col ${
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary mb-4">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                <h3 className="font-display text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 5).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.demoLink && (
                    <Button asChild size="sm" className="rounded-full text-xs h-8 px-4">
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        Demo <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                  {project.liveLink && (
                    <Button asChild size="sm" className="rounded-full text-xs h-8 px-4">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        Live <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                  {project.codeLink && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs h-8 px-4 border-primary/30 hover:bg-primary/10 hover:text-primary"
                    >
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Get To Know Me" title="About Me" />
          <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
            <div className="lg:col-span-5 bento-tile gold-border glow-effect min-h-[320px]">
              <img
                src={projectImage}
                alt="Saad Olayinka"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="lg:col-span-7 bento-tile gold-border p-8 md:p-10 flex flex-col justify-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">
                Hello, I'm Saad <span className="gold-text">👋</span>
              </h3>
              <div className="space-y-4 text-sm md:text-base text-muted-foreground">
                <p>
                  I'm a passionate <span className="text-primary font-semibold">Frontend Developer</span>{" "}
                  and <span className="text-primary font-semibold">UI/UX Designer</span> focused on
                  creating seamless and visually engaging user experiences.
                </p>
                <p>
                  My approach combines modern design thinking with performance-driven development,
                  ensuring every project looks stunning and works fast.
                </p>
                <p>
                  Beyond coding, I enjoy exploring new technologies, mentoring junior developers, and
                  contributing to innovative projects that solve real problems.
                </p>
              </div>
              <div className="pt-7">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 font-semibold"
                >
                  <a href="#contact">Let's Collaborate</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 px-4 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading eyebrow="Kind Words" title="Testimonials" />
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bento-tile gold-border p-8">
                <p className="text-primary text-4xl font-display leading-none mb-3">"</p>
                <p className="text-sm md:text-base text-foreground/80 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-display font-bold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading eyebrow="Let's Talk" title="Get In Touch" />
          <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
            {/* Contact details */}
            <div className="lg:col-span-5 grid gap-4 md:gap-5 auto-rows-min">
              <div className="bento-tile gold-border p-7">
                <h3 className="font-display text-xl font-bold mb-2">
                  Available for freelance & full-time roles
                </h3>
                <p className="text-sm text-muted-foreground">
                  Drop me a message and I'll get back to you within 24 hours.
                </p>
              </div>
              <a
                href="mailto:saadolayinkatajudeen@gmail.com"
                className="bento-tile gold-border p-5 flex items-center gap-4"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="text-sm text-muted-foreground break-all">
                  saadolayinkatajudeen@gmail.com
                </span>
              </a>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <div className="bento-tile gold-border p-5 flex flex-col gap-2">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </span>
                  <span className="text-xs text-muted-foreground">+234(0)8142696998</span>
                </div>
                <div className="bento-tile gold-border p-5 flex flex-col gap-2">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="text-xs text-muted-foreground">Ilorin, Kwara State, Nigeria</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bento-tile gold-border p-7 md:p-9">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name *"
                    {...register("name")}
                    className="bg-input border-border h-12 rounded-xl"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    {...register("email")}
                    className="bg-input border-border h-12 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message *"
                    {...register("message")}
                    className="bg-input border-border min-h-[140px] resize-none rounded-xl"
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-display text-xl font-bold gold-text">Saad Olayinka Tajudeen</p>
            <p className="text-sm text-muted-foreground mt-1">
              Frontend Developer & UI/UX Designer
            </p>
          </div>

          <div className="flex gap-3">
            {[
              { href: "https://github.com/TiggaCodex", icon: <Github className="w-4 h-4" /> },
              {
                href: "https://www.linkedin.com/in/saad-olayinka-tajudeen-6372a9257",
                icon: <Linkedin className="w-4 h-4" />,
              },
              { href: "https://x.com/Savage_Tigga", icon: <Twitter className="w-4 h-4" /> },
              { href: "https://wa.me/2348142696998", icon: <Mail className="w-4 h-4" /> },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Saad Tigga. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-10 md:mb-14 text-center">
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
      {eyebrow}
    </span>
    <h2 className="font-display text-3xl md:text-5xl font-extrabold">{title}</h2>
    <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
);

export default Index;