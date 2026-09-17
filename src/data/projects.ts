import alAmanahImg from "@/assets/project-al-amanah.jpg";
import zarinImg from "@/assets/project-zarin.jpg";
import alumniImg from "@/assets/project-alumni.jpg";
import traceabilityImg from "@/assets/project-traceability.jpg";
import swiftdropImg from "@/assets/project-swiftdrop.jpg";

export type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  image: string;
  featured?: boolean;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  problem: string;
  approach: string[];
  features: string[];
  stack: string[];
  role: string;
};

export const projects: Project[] = [
  {
    slug: "al-amanah-cooperative",
    title: "Al-Amanah Multipurpose Cooperative Management System",
    category: "Business Management System",
    tagline: "Digitising member records, savings and loan workflows for a cooperative society.",
    summary:
      "A management system that replaces manual cooperative record keeping with structured digital workflows for members, savings contributions and loan applications, with an administrative interface for reviewing and approving requests.",
    image: alAmanahImg,
    featured: true,
    tags: ["React", "TypeScript", "Dashboard", "Workflow Automation", "Auth"],
    problem:
      "Cooperative societies typically track members, contributions and loan requests across paper ledgers and spreadsheets. Records drift out of sync, approvals are hard to trace and reporting takes days of manual work.",
    approach: [
      "Mapped the existing cooperative workflow — registration, savings contributions, loan request, review, approval — before writing any interface code",
      "Modelled members, contributions and loan applications as clear data structures so each record has a single source of truth",
      "Designed an admin-facing dashboard around the decisions officers actually make, rather than around database tables",
      "Built role-separated access so members and administrators only see what belongs to them",
    ],
    features: [
      "Member registration and profile management",
      "Savings and contribution records per member",
      "Loan application submission with status tracking",
      "Administrative review and approval flow",
      "Dashboard overview of members, contributions and active requests",
      "Responsive interface usable on phones and desktop",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Authentication", "Cloud database"],
    role: "Design and frontend engineering: information architecture, workflow design, UI implementation and data integration.",
  },
  {
    slug: "zarin-ventures",
    title: "Zarin Ventures",
    category: "Customer-Facing Web Application",
    tagline: "A business-facing web presence with product presentation and direct customer ordering.",
    summary:
      "A customer-facing product and ordering experience for a growing venture: clear product presentation, a structured browsing flow and a direct route from interest to enquiry or order.",
    image: zarinImg,
    featured: true,
    tags: ["React", "TypeScript", "Commerce UI", "Responsive", "Conversion"],
    problem:
      "The business was selling through social media messages alone. Product information was scattered, pricing had to be repeated by hand, and there was no single place to send a customer.",
    approach: [
      "Structured the product catalogue so items, categories and pricing live in one maintainable place",
      "Built the browsing flow around a short path from landing to a decision",
      "Kept the ordering route deliberately low-friction, continuing into the channel customers already use",
      "Prioritised load speed and mobile layout, since most traffic arrives from a phone",
    ],
    features: [
      "Product catalogue with categories and detail views",
      "Clear pricing and product information layout",
      "Direct order / enquiry flow",
      "Mobile-first responsive layout",
      "Reusable component system for adding new products",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Component architecture"],
    role: "End-to-end frontend build: layout, component system, product data structure and ordering flow.",
  },
  {
    slug: "kwara-cails-alumni-platform",
    title: "KWARA CAILS Alumni Platform",
    category: "Community Platform",
    tagline: "A platform for alumni registration, profiles and institutional engagement.",
    summary:
      "An alumni platform enabling graduates to register, maintain profiles and stay connected with the institution, with real-time data storage and an administrative view of the growing member base.",
    image: alumniImg,
    tags: ["React", "Firebase", "Authentication", "Firestore", "Directory"],
    problem:
      "Alumni contact details lived in disconnected lists, so the institution had no reliable way to reach graduates or show the community back to itself.",
    approach: [
      "Built registration and authentication first, so every record is tied to a real account",
      "Used a real-time database so new registrations appear immediately without manual collation",
      "Composed the interface from modular components to keep the platform easy to extend",
      "Added a profile showcase so the community is visible, not just stored",
    ],
    features: [
      "Alumni registration and authentication",
      "Profile creation and management",
      "Real-time data synchronisation",
      "Dynamic profile showcase / slideshow",
      "Responsive, accessible layout across devices",
    ],
    stack: ["React", "Firebase Authentication", "Firestore", "Responsive CSS"],
    role: "Frontend development and Firebase integration: authentication, data modelling, component architecture and UI.",
  },
  {
    slug: "farm-produce-traceability",
    title: "Farm Produce Traceability System",
    category: "Digital Transformation Tool",
    tagline: "Tracking produce from farm to delivery point with a verifiable record trail.",
    summary:
      "A traceability interface that records produce batches through each stage of their journey — harvest, processing, dispatch, delivery — so buyers and regulators can verify where an item came from.",
    image: traceabilityImg,
    tags: ["React", "TypeScript", "Data Modelling", "Agritech", "Dashboard"],
    problem:
      "Produce changes hands several times between farm and buyer, and each handover is usually recorded informally. When a question arises about origin or handling, there is no trail to follow.",
    approach: [
      "Modelled a produce batch as the central record, with each handling stage attached as an event",
      "Designed a timeline view so a batch's history reads in one pass",
      "Kept data entry realistic for field conditions: few fields, large targets, works on a phone",
      "Made batch records shareable so a buyer can verify without an account",
    ],
    features: [
      "Batch registration with produce details and origin",
      "Stage-by-stage traceability timeline",
      "Verification view for buyers",
      "Search and filtering across batches",
      "Mobile-first data entry",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Cloud database"],
    role: "Product thinking and frontend engineering: data model, traceability flow and interface implementation.",
  },
  {
    slug: "swiftdrop",
    title: "SwiftDrop",
    category: "Logistics Web Application",
    tagline: "A delivery management interface for tracking orders and customer interactions.",
    summary:
      "A logistics interface for managing deliveries: order tracking, status progression and a structured operational view built with TypeScript for reliability.",
    image: swiftdropImg,
    tags: ["React", "TypeScript", "State Management", "Logistics UI"],
    problem:
      "Delivery operations run on phone calls and message threads, leaving both the operator and the customer guessing about where an order actually is.",
    approach: [
      "Defined delivery states explicitly so an order can only move along valid paths",
      "Used TypeScript throughout to catch state and data errors before runtime",
      "Built reusable UI components so new order types slot in without redesign",
      "Focused on efficient state handling for a screen that updates constantly",
    ],
    features: [
      "Order creation and delivery tracking",
      "Status progression through delivery stages",
      "Structured, reusable component system",
      "Efficient client-side state handling",
      "Responsive operational layout",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Component architecture"],
    role: "Frontend engineering: state design, component system and interface implementation.",
  },
];

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);
