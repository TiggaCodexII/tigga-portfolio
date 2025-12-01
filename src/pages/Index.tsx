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
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-3 text-2xl">
                <span className="text-4xl animate-[wave_2s_ease-in-out_infinite]">👋</span>
                <span className="text-muted-foreground font-light">Hi, I'm</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
                Saad <span className="text-gradient">Olayinka</span>
              </h1>
              
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Frontend Developer & UI/UX Designer
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                I create sleek, high-performing digital experiences with modern design principles and clean, efficient code.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  <a href="#contact">Hire Me</a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-primary/10">
                  View Resume
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-accent/10">
                  <a href="#portfolio">My Work</a>
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center text-9xl glow-effect border-2 border-primary/30">
                  👨‍💻
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="text-6xl mb-6 animate-bounce">👨‍💻</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              My Services
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary transition-all duration-500 animate-fade-in card-glow group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-primary mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 group animate-slide-in-left card-glow overflow-hidden relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={projectImage} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {project.emoji}
                  </div>
                </div>
                
                <div className="p-8">
                
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
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
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12 md:p-16 card-glow">
            <div className="flex items-center gap-4 mb-10">
              <div className="text-6xl animate-bounce">👨‍💻</div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hello, I'm Saad 👋
              </h2>
            </div>
            
            <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                I'm a passionate <span className="text-primary font-semibold">Frontend Developer</span> and{' '}
                <span className="text-accent font-semibold">UI/UX Designer</span> focused on creating seamless 
                and visually engaging user experiences.
              </p>
              
              <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                My approach combines modern design thinking with performance-driven development, 
                ensuring every project looks stunning and works fast.
              </p>
              
              <p className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Beyond coding, I enjoy exploring new technologies, mentoring junior developers, 
                and contributing to innovative projects that solve real problems.
              </p>
              
              <div className="pt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  <a href="#contact">Let's Collaborate</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Testimonials
            </h2>
            <p className="text-muted-foreground text-xl">What others say about working with me</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-10 bg-card/80 backdrop-blur-sm border-border/50 animate-slide-in-right card-glow hover:border-accent/50 group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="text-6xl text-accent/20 mb-4 relative z-10">"</div>
                
                <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed relative z-10">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl font-semibold mb-3">Let's work together!</p>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'm available for freelance work, collaborations, or full-time roles. Drop me a message and I'll respond promptly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div className="group">
                <h3 className="font-bold text-2xl mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail className="w-6 h-6" />
                  Email
                </h3>
                <p className="text-muted-foreground text-lg">saadolayinkatajudeen@gmail.com</p>
              </div>
              
              <div className="group">
                <h3 className="font-bold text-2xl mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                  📞 Phone
                </h3>
                <p className="text-muted-foreground text-lg">+234(0)8142696998</p>
                <p className="text-muted-foreground text-lg">+234(0)8114965493</p>
              </div>
              
              <div className="group">
                <h3 className="font-bold text-2xl mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                  📍 Location
                </h3>
                <p className="text-muted-foreground text-lg">Ilorin, Kwara State, Nigeria</p>
              </div>
            </div>
            
            <Card className="p-10 bg-card/80 backdrop-blur-sm border-border/50 card-glow">
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
      <footer className="py-16 px-4 border-t border-border/50 bg-card/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Saad Olayinka Tajudeen
              </p>
              <p className="text-muted-foreground mt-3 text-lg">Frontend Developer & UI/UX Designer</p>
            </div>
            
            <div className="flex gap-6">
              <a
                href="https://github.com/TiggaCodex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/saad-olayinka-tajudeen-6372a9257"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Savage_Tigga"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/2348142696998`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12 text-muted-foreground">
            © {new Date().getFullYear()} Saad Olayinka Tajudeen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
