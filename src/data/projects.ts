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
  loanProducts?: { name: string; details: string[] }[];
  eligibility?: string;
  result?: string;
  sections?: { title: string; body: string; items?: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "al-amanah-cooperative",
    title: "Al-Amanah Multipurpose Cooperative Management System",
    category: "Cooperative Loan & Financial Management System",
    tagline: "Digitising the cooperative's staff loan application, approval and repayment workflow.",
    summary:
      "A digital management system designed to streamline the cooperative's staff loan process, from loan application and eligibility assessment to approval, repayment management and financial reporting.",
    image: alAmanahImg,
    featured: true,
    tags: ["React", "TypeScript", "Loan Workflow", "Dashboard", "Role-Based Access"],
    problem:
      "The cooperative's loan process involved several manual steps across the applicant, bursary, treasurer/auditor and chairman. Applicants had to obtain and complete loan forms, have their salary and deductions calculated, and move the application through the appropriate approval stages. This created unnecessary administrative work and made loan processing and record management harder to coordinate.",
    approach: [
      "Studied the existing loan application and approval workflow and translated the manual process into a structured digital workflow",
      "Replaced the manual salary-calculation stage with structured inputs for gross salary and current total deductions, allowing the system to calculate the applicant's one-third salary threshold and determine eligibility",
      "Structured the system around the cooperative's actual loan products and their respective repayment rules",
      "Designed role-based access so administrative functions and sensitive financial information are only available to the appropriate users",
      "Built the application around a centralized database so loan applications, decisions and financial information can be managed from one system",
    ],
    features: [
      "Staff/member account and profile management",
      "Digital loan application workflow",
      "Support for the cooperative's three loan categories: Humanitarian, Commodity and Real Loan",
      "Automated salary and deduction calculations for loan eligibility",
      "Loan approval and administrative workflow",
      "Loan repayment information and tracking",
      "Administrative dashboard for monitoring cooperative activities",
      "Financial and operational reporting",
      "Role-based access for different administrative users",
      "Responsive interface for desktop and mobile devices",
    ],
    loanProducts: [
      {
        name: "Humanitarian Loan",
        details: ["Maximum: ₦100,000", "Interest: 0%", "Repayment period: 8 months"],
      },
      {
        name: "Commodity Loan",
        details: [
          "Minimum: ₦200,000",
          "Maximum: ₦500,000",
          "Interest: 10%",
          "Repayment period: 12 months",
        ],
      },
      {
        name: "Real Loan",
        details: [
          "Maximum: 3× the staff member's savings in the association",
          "Interest: 0%",
          "Repayment period: 24 months",
        ],
      },
    ],
    eligibility:
      "Loan eligibility incorporates the cooperative's salary rule: after approval, the applicant's take-home salary must not be below one-third of gross monthly salary. The system presents this calculation clearly rather than requiring the user to work it out manually.",
    result:
      "The system provides a structured digital workflow for managing cooperative loans and administration, reducing dependence on manual calculations and paperwork while giving authorized users a centralized view of applications, approvals and financial information.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    role: "Product design, frontend engineering, application architecture, workflow implementation and data integration.",
  },
  {
    slug: "zarin-ventures",
    title: "Zarin Business Management",
    category: "Business Management & POS Platform",
    tagline:
      "Centralising inventory, point of sale, sales, expenses, finance, staff operations and reporting in one platform.",
    summary:
      "An integrated business management platform that brings inventory, point of sale, sales, expenses, financial reporting, staff operations and business analytics into one centralized system.",
    image: zarinImg,
    featured: true,
    tags: ["React", "TypeScript", "POS", "Inventory", "Role-Based Access"],
    problem:
      "Managing products, stock, sales, expenses and staff activity across separate processes can make it difficult for a business to maintain accurate records and understand its financial performance. Zarin was designed to bring these operational activities together in one structured system while keeping sensitive business information accessible only to authorized users.",
    approach: [
      "Structured the platform around the core operational areas of a business: products, inventory, sales, expenses, services, staff and finance",
      "Built separate administrative and staff experiences so employees can perform their operational duties without accessing sensitive financial or administrative information",
      "Designed a POS workflow for staff to search products, manage carts, process payments and issue printable receipts",
      "Connected sales with inventory and financial calculations so completed transactions contribute to stock movement, revenue, cost of goods sold and profit reporting",
      "Added role-based access control and database-level security to protect sensitive business information",
      "Added reporting, analytics, reconciliation and audit functionality to give administrators greater visibility over business activity",
    ],
    features: [
      "Product and category management",
      "Inventory and stock movement management",
      "Staff point-of-sale (POS)",
      "Product search, category filtering and stock visibility",
      "Multiple payment methods",
      "Printable sales receipts",
      "Staff \"My Sales\" history and daily sales totals",
      "Administrative sales management and transaction details",
      "Cost of goods sold and gross profit tracking",
      "Sales cancellation and reversal",
      "Expense management",
      "Financial reporting and profit/loss analysis",
      "Staff management and role-based permissions",
      "Shift management and reconciliation",
      "Service sales management",
      "Business reports and CSV exports",
      "Dashboard analytics",
      "Audit logging and security controls",
    ],
    sections: [
      {
        title: "Point of Sale & Inventory",
        body: "Staff can search products, filter by category, view stock availability, build orders, select payment methods and generate printable receipts. Sales are connected to inventory movements and historical pricing so administrators can maintain a more accurate record of business activity.",
      },
      {
        title: "Services",
        body: "Zarin supports both product-based sales and selected service transactions, allowing businesses to record services alongside their regular sales activity. Currently implemented service categories:",
        items: [
          "Football Viewing — per customer",
          "Snooker — per game",
          "Table Football — per game",
        ],
      },
      {
        title: "Financial Management",
        body: "Administrators can track revenue, expenses, cost of goods sold, gross profit, net profit and margins across selected date ranges. Cancelled sales are excluded from relevant financial calculations.",
      },
      {
        title: "Staff & Access Control",
        body: "Zarin provides separate staff and administrative experiences with role-based permissions. Staff can perform authorized sales operations while sensitive information such as expenses, cost data, financial records and audit information remains restricted to authorized administrative users. Authentication and database-level access controls are part of the platform.",
      },
      {
        title: "Reporting & Analytics",
        body: "The platform provides business reports, dashboard analytics and CSV exports to help administrators review sales, inventory, services and financial activity.",
      },
    ],
    result:
      "Zarin brings core business operations into one centralized platform, giving staff a structured way to process sales while giving administrators greater control over inventory, financial records, staff activity and business reporting.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    role: "Product design, frontend engineering, application architecture, workflow implementation, data integration and business-system development.",
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
