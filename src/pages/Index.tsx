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
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 text-2xl">
                <span>👋</span>
                <span className="text-muted-foreground">Hi, I'm</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-foreground">
                Saad Olayinka
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground">
                Frontend Developer & UI/UX Designer
              </p>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                I create sleek, high-performing digital experiences with modern design principles and clean, efficient code.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="#contact">Hire Me</a>
                </Button>
                <Button size="lg" variant="outline">
                  View Resume
                </Button>
                <Button size="lg" variant="outline">
                  <a href="#portfolio">My Work</a>
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center animate-slide-in-right">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-card flex items-center justify-center text-8xl glow-effect">
                👨‍💻
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-5xl mb-4">👨‍💻</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Services</h2>
            <p className="text-muted-foreground text-lg">Comprehensive digital solutions tailored to your needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-border hover:border-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h2>
            <p className="text-muted-foreground text-lg">A showcase of my recent work and technical expertise</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-primary transition-all duration-300 group animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{project.emoji}</div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                
                {project.features && (
                  <div className="mb-4 space-y-1">
                    <p className="font-semibold text-sm mb-2">Key Features:</p>
                    {project.features.map((feature, i) => (
                      <p key={i} className="text-xs text-muted-foreground">• {feature}</p>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {project.demoLink && (
                    <Button size="sm" asChild>
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        View Demo <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                  {project.liveLink && (
                    <Button size="sm" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        Live <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                  {project.codeLink && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        Code <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">👨‍💻</div>
            <h2 className="text-4xl md:text-5xl font-bold">Hello, I'm Saad 👋</h2>
          </div>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              I'm a passionate Frontend Developer and UI/UX Designer focused on creating seamless 
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
            
            <Button size="lg" className="mt-6">
              <a href="#contact">Let's Collaborate</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
            <p className="text-muted-foreground text-lg">What others say about working with me</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-border animate-slide-in-right"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">Let's work together!</p>
            <p className="text-muted-foreground mt-2">
              I'm available for freelance work, collaborations, or full-time roles. Drop me a message and I'll respond promptly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-2">Email</h3>
                <p className="text-muted-foreground">saadolayinkatajudeen@gmail.com</p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-2">Phone</h3>
                <p className="text-muted-foreground">+234(0)8142696998</p>
                <p className="text-muted-foreground">+234(0)8114965493</p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-2">Location</h3>
                <p className="text-muted-foreground">Ilorin, Kwara State, Nigeria</p>
              </div>
            </div>
            
            <Card className="p-8 bg-card border-border">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name *"
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
                    placeholder="Your Email *"
                    {...register("email")}
                    className="bg-background border-border"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    placeholder="Your Message *"
                    {...register("message")}
                    className="bg-background border-border min-h-[150px]"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-xl font-bold">Saad Olayinka Tajudeen</p>
              <p className="text-muted-foreground mt-2">Frontend Developer & UI/UX Designer</p>
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
