import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Github, Linkedin, Twitter, Mail, Code2, Palette, Users, Wrench, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
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
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: data.name,
          email: data.email,
          message: data.message,
        }]);

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

  const services = [
    {
      icon: <Code2 className="w-12 h-12" />,
      title: "Web Development",
      description: "Responsive, high-performance websites using modern frameworks and clean code.",
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Intuitive interfaces with a focus on user experience and visual harmony.",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Brand Strategy",
      description: "I help businesses define their digital identity through consistent, impactful design.",
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Maintenance & Optimization",
      description: "Performance audits, SEO, and code improvements for smooth user journeys.",
    },
  ];

  const projects = [
    {
      emoji: "🚀",
      title: "GreenGov - Smart Waste Management",
      description: "AI-powered waste management platform for Kwara State with multilingual chatbot, real-time tracking, and geofencing.",
      features: [
        "Multilingual AI chatbot (English, Yoruba, Hausa, Igbo)",
        "Voice & text input for reporting",
        "Real-time driver tracking with geofencing"
      ],
      tech: ["React", "TypeScript", "Supabase", "AI/ML", "Mapbox", "Real-time"],
      demoLink: "https://kwara-smart-waste-ai.lovable.app/greengov",
    },
    {
      emoji: "🚀",
      title: "Task Manager App",
      description: "A clean productivity app for tracking and managing daily tasks efficiently.",
      tech: ["React", "Firebase", "Framer Motion"],
    },
    {
      emoji: "🚀",
      title: "SwiftDrop",
      description: "Modern Delivery and logistic web application that allows users to track their Deliveries seamlessly.",
      tech: ["Vite", "React", "Tailwind", "Javascript", "CSS"],
      liveLink: "https://swifdrop.netlify.app/",
      codeLink: "https://github.com/TiggaCodex/Swiftdropcollab",
    },
    {
      emoji: "🚀",
      title: "Portfolio Website",
      description: "Personal portfolio showcasing modern web design and animations.",
      tech: ["Vite", "PostCSS", "EmailJS"],
      liveLink: "https://tiggaportfolio.netlify.app/",
    },
    {
      emoji: "🚀",
      title: "E-Commerce Platform",
      description: "Full-featured online store with cart, checkout, and admin panel.",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      emoji: "🚀",
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
      content: "Saad is a very talented developer. He is passionate about his work and always delivers high-quality results. I would highly recommend him to anyone looking for a frontend developer.",
    },
    {
      initials: "OJ",
      name: "Oluyomi Josephine",
      role: "Client",
      content: "I had the pleasure of working with Saad on a complex project. He is a great team player and a very skilled developer. I was very impressed with his work.",
    },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-lg">
                <span className="text-3xl">👋</span>
                <span className="text-muted-foreground">Hi, I'm</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Saad Olayinka
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                Frontend Developer & UI/UX Designer
              </p>
              
              <p className="text-sm md:text-base text-muted-foreground/80 max-w-md mx-auto md:mx-0">
                I create sleek, high-performing digital experiences with modern design principles and clean, efficient code.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4 justify-center md:justify-start">
                <Button size="default" className="bg-primary hover:bg-primary/90 rounded-full px-6">
                  <a href="#contact">Hire Me</a>
                </Button>
                <Button size="default" variant="outline" className="rounded-full px-6 border-foreground/20 hover:bg-card">
                  <Link to="/resume">View Resume</Link>
                </Button>
                <Button size="default" variant="outline" className="rounded-full px-6 border-foreground/20 hover:bg-card">
                  <a href="#portfolio">My Work</a>
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden glow-effect border-4 border-primary/40 shadow-2xl">
                  <img 
                    src={projectImage} 
                    alt="Saad Olayinka" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              My Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 card-glow text-center"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-16 md:py-24 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              My Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 card-glow overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={projectImage} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent"></div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.demoLink && (
                      <Button size="sm" className="rounded-full text-xs h-8" asChild>
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.liveLink && (
                      <Button size="sm" className="rounded-full text-xs h-8" asChild>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          Live
                        </a>
                      </Button>
                    )}
                    {project.codeLink && (
                      <Button size="sm" variant="outline" className="rounded-full text-xs h-8" asChild>
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              About Me
            </h2>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 card-glow">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-primary/40 shadow-lg flex-shrink-0">
                <img 
                  src={projectImage} 
                  alt="Saad Olayinka" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Hello, I'm Saad 👋
                </h3>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground">
                  <p>
                    I'm a passionate <span className="text-primary font-semibold">Frontend Developer</span> and{' '}
                    <span className="text-accent font-semibold">UI/UX Designer</span> focused on creating seamless 
                    and visually engaging user experiences.
                  </p>
                  
                  <p>
                    My approach combines modern design thinking with performance-driven development, 
                    ensuring every project looks stunning and works fast.
                  </p>
                  
                  <p>
                    Beyond coding, I enjoy exploring new technologies, mentoring junior developers, 
                    and contributing to innovative projects that solve real problems.
                  </p>
                </div>
                
                <div className="pt-6">
                  <Button size="default" className="bg-primary hover:bg-primary/90 rounded-full px-6">
                    <a href="#contact">Let's Collaborate</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Testimonials
            </h2>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-border/50 card-glow"
              >
                <p className="text-sm md:text-base text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Get In Touch
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              I'm available for freelance work, collaborations, or full-time roles. Drop me a message!
            </p>
          </div>
          
          <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-border/50 card-glow">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name *"
                  {...register("name")}
                  className="bg-background border-border h-11"
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
                  className="bg-background border-border h-11"
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message *"
                  {...register("message")}
                  className="bg-background border-border min-h-[120px] resize-none"
                />
                {errors.message && (
                  <p className="text-destructive text-xs mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 rounded-full h-11"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">saadolayinkatajudeen@gmail.com</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary">📞</span>
                <span className="text-muted-foreground">+234(0)8142696998</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary">📍</span>
                <span className="text-muted-foreground">Ilorin, Kwara State, Nigeria</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6 text-center">
            <div>
              <p className="text-xl font-bold text-primary">
                Saad Olayinka Tajudeen
              </p>
              <p className="text-sm text-muted-foreground mt-1">Frontend Developer & UI/UX Designer</p>
            </div>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/TiggaCodex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/saad-olayinka-tajudeen-6372a9257"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Savage_Tigga"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/2348142696998`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Saad Tigga. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
