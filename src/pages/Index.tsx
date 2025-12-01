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
import { Github, Linkedin, Twitter, Mail, Code2, Palette, Zap } from "lucide-react";

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
      icon: <Code2 className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Building responsive and performant web applications with modern frameworks and best practices.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces that users love with attention to detail and accessibility.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Custom Solutions",
      description: "Developing tailored solutions to meet your specific business needs and technical requirements.",
    },
  ];

  const projects = [
    {
      title: "Task Manager App",
      description: "A full-featured task management application with real-time updates and collaboration features.",
      tech: ["React", "TypeScript", "Supabase"],
    },
    {
      title: "SwiftDrop",
      description: "Fast and secure file sharing platform with advanced encryption and user management.",
      tech: ["React", "Node.js", "PostgreSQL"],
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio showcasing projects and skills with smooth animations.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "Saad delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise made the project a huge success.",
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      content: "Working with Saad was a game-changer for our startup. He transformed our vision into reality with clean, scalable code.",
    },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient animate-glow">Saad Olayinka</span>
            <br />
            <span className="text-foreground">Tajudeen</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Full-Stack Developer | UI/UX Enthusiast | Problem Solver
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            What I Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group animate-slide-in-left"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            I'm a passionate full-stack developer with a keen eye for design and a love for creating 
            seamless user experiences. With expertise in modern web technologies and a commitment to 
            writing clean, maintainable code, I help businesses bring their digital visions to life.
          </p>
          <p className="text-lg text-muted-foreground">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
            projects, or sharing knowledge with the developer community.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            What Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-border animate-slide-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <p className="text-lg text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Have a project in mind? Let's work together to create something amazing.
          </p>
          
          <Card className="p-8 bg-card border-border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  {...register("name")}
                  className="bg-background border-border"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  className="bg-background border-border"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  {...register("message")}
                  className="bg-background border-border min-h-[150px]"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gradient">Saad Olayinka Tajudeen</p>
              <p className="text-muted-foreground mt-2">Full-Stack Developer</p>
            </div>
            
            <div className="flex gap-6">
              <a
                href="https://github.com/TiggaCodex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/saad-olayinka-tajudeen-6372a9257"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/Savage_Tigga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href={`https://wa.me/2348142696998`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 text-muted-foreground text-sm">
            © {new Date().getFullYear()} Saad Olayinka Tajudeen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
