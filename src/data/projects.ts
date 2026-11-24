import alAmanahImg from "@/assets/project-al-amanah.webp";
import zarinImg from "@/assets/project-zarin.webp";
import alumniImg from "@/assets/project-alumni.webp";
import traceabilityImg from "@/assets/project-traceability.webp";
import swiftdropImg from "@/assets/project-swiftdrop.webp";

export type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  image: string;
  featured?: boolean;
  status?: string;
  sector?: string;
  coverType?: "screenshot" | "graphic";
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


// Expanded professional project catalogue.
projects.push(
{
  "slug": "my-billpadi",
  "title": "My Billpadi",
  "category": "Fintech & Digital Payments",
  "sector": "Fintech",
  "status": "Live",
  "featured": true,
  "tagline": "A digital platform for everyday utility payments.",
  "summary": "A Nigerian digital payments platform providing wallet-funded airtime, mobile data, electricity, television subscriptions and other virtual top-up services.",
  "tags": [
    "Fintech",
    "Supabase",
    "Paystack",
    "REST APIs",
    "PWA"
  ],
  "liveUrl": "https://mybillpadi.app",
  "problem": "Customers need a convenient platform for everyday utility payments, while operators need reliable payment processing, supplier integration and transaction accountability.",
  "approach": [
    "Developed wallet-based purchasing workflows with transaction records.",
    "Integrated Paystack for customer wallet funding.",
    "Implemented supplier integrations with VTPass and Clubkonnect.",
    "Developed configurable supplier selection and catalogue synchronization.",
    "Migrated the application to independent Supabase and Cloudflare infrastructure.",
    "Validated financial workflows and recovered historical application data."
  ],
  "features": [
    "Customer accounts and digital wallets",
    "Airtime and mobile data purchases",
    "Electricity and television payments",
    "Paystack payment integration",
    "Multiple service supplier integrations",
    "Transaction history and order tracking",
    "Administrative financial monitoring",
    "Supplier dispatch and payment reconciliation",
    "Customer support and email communication",
    "Progressive Web Application"
  ],
  "sections": [
    {
      "title": "Payment Architecture",
      "body": "Wallet funding and service purchases are handled through structured financial workflows, with payment reconciliation and transaction tracking supporting operational accountability."
    },
    {
      "title": "Supplier Integration",
      "body": "The platform integrates VTPass and Clubkonnect, providing configurable supplier selection and synchronized service catalogues."
    },
    {
      "title": "Infrastructure Migration",
      "body": "Migrated from managed Lovable Cloud infrastructure to independent Supabase and Cloudflare hosting, including historical data recovery and operational validation."
    }
  ],
  "result": "A deployed digital payments platform with integrated payment and supplier workflows, independent infrastructure and administrative oversight.",
  "stack": [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "Cloudflare Workers",
    "Paystack",
    "Resend"
  ],
  "role": "Full-stack development, product architecture, payment integration, supplier integration, database migration, deployment and operational maintenance.",
  "image": "/projects/my-billpadi.svg",
  "coverType": "graphic"
},
{
  "slug": "zarin-travels",
  "title": "Zarin Travels & Tours",
  "category": "Travel Business Management",
  "sector": "Business Systems",
  "status": "Deployed",
  "featured": true,
  "tagline": "Centralized client, payment and commission management.",
  "summary": "A travel business management application designed to centralize client registration, payments, outstanding balances, commission recognition and financial reporting.",
  "tags": [
    "React",
    "Supabase",
    "Finance",
    "Business Automation"
  ],
  "problem": "Travel businesses need to manage multiple client payments, outstanding balances and commissions without relying on disconnected manual records.",
  "approach": [
    "Modelled client registration and payment records.",
    "Structured commission recognition around completed client payments.",
    "Designed administrative dashboards and reporting workflows.",
    "Migrated the application to independent Supabase infrastructure."
  ],
  "features": [
    "Client registration and management",
    "Sequential client references",
    "Payment and outstanding balance tracking",
    "Local and international commission management",
    "Commission recognition upon full payment",
    "Backdated transaction entry",
    "Operational reminders and reports"
  ],
  "result": "A centralized application for monitoring travel business records, client payments and financial performance.",
  "stack": [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "Cloudflare"
  ],
  "role": "Product development, business workflow implementation, database integration, authentication configuration and cloud deployment.",
  "image": "/projects/zarin-travels.svg",
  "coverType": "graphic"
},
{
  "slug": "bmb-bakery",
  "title": "BMB Bakery Management",
  "category": "Production & Inventory Management",
  "sector": "Business Systems",
  "status": "Project",
  "tagline": "Connecting raw materials, production costs and bakery sales.",
  "summary": "A bakery management system designed around raw material purchases, production batches, finished goods, inventory movements, sales and profitability.",
  "tags": [
    "Production",
    "Inventory",
    "Cost Accounting",
    "Dashboard"
  ],
  "problem": "Bakery operations require visibility into raw material consumption, production costs, finished goods, wastage and sales performance.",
  "approach": [
    "Structured raw material and finished goods inventory separately.",
    "Designed weighted-average inventory costing workflows.",
    "Modelled production batches and product output.",
    "Connected production, sales and financial reporting requirements."
  ],
  "features": [
    "Raw material purchases and inventory",
    "Weighted-average costing",
    "Production batch management",
    "Finished goods tracking",
    "Damaged, burnt, returned and unsold goods",
    "Sales and receivables",
    "Profit and loss reporting",
    "Cashier and administrator workflows"
  ],
  "stack": [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Database Integration"
  ],
  "role": "Business process modelling, product architecture, inventory workflow design and application development.",
  "image": "/projects/bmb-bakery.svg",
  "coverType": "graphic"
},
{
  "slug": "alumni-voting",
  "title": "Alumni Voting Platform",
  "category": "Electronic Voting System",
  "sector": "Institutional Technology",
  "status": "Project",
  "tagline": "Privacy-conscious electronic elections for alumni associations.",
  "summary": "An electronic voting platform designed to support structured alumni elections, voter eligibility, ballot privacy and controlled publication of election results.",
  "tags": [
    "Voting",
    "Supabase",
    "PostgreSQL",
    "Security"
  ],
  "problem": "Alumni elections need a practical digital voting process that preserves ballot privacy, prevents duplicate votes and provides controlled election administration.",
  "approach": [
    "Designed election, candidate and voter data structures.",
    "Structured voting rules around one eligible vote per position.",
    "Designed database-level access controls for ballot privacy.",
    "Separated voting operations from administrative result management."
  ],
  "features": [
    "Election and position management",
    "Candidate management",
    "Voter eligibility controls",
    "One vote per eligible voter per position",
    "Ballot privacy controls",
    "Controlled results publication",
    "Administrative election workflows"
  ],
  "stack": [
    "React",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Row Level Security"
  ],
  "role": "Product architecture, voting workflow design, database security and application development.",
  "image": "/projects/alumni-voting.svg",
  "coverType": "graphic"
},
{
  "slug": "moneymap",
  "title": "MoneyMap",
  "category": "AI-Assisted Personal Finance",
  "sector": "Fintech",
  "status": "Project",
  "tagline": "Receipt-first expense tracking and financial organization.",
  "summary": "A personal expense management product designed around receipt capture, assisted transaction extraction, expense classification and financial visibility.",
  "tags": [
    "AI",
    "OCR",
    "Personal Finance",
    "PWA"
  ],
  "problem": "Manual expense entry creates friction and makes it difficult for individuals to maintain consistent financial records.",
  "approach": [
    "Designed a receipt-first expense capture experience.",
    "Structured assisted extraction and categorization workflows.",
    "Designed duplicate detection and expense review processes.",
    "Focused on mobile-first personal finance management."
  ],
  "features": [
    "Receipt capture",
    "AI-assisted transaction extraction",
    "Expense categorization",
    "Duplicate detection",
    "Expense history and financial summaries",
    "Mobile-first application experience"
  ],
  "stack": [
    "React",
    "TypeScript",
    "AI Integration",
    "OCR",
    "PWA"
  ],
  "role": "Product design, application development and financial workflow architecture.",
  "image": "/projects/moneymap.svg",
  "coverType": "graphic"
},
{
  "slug": "zarin-product-showcase",
  "title": "Zarin Product Showcase",
  "category": "Digital Signage Platform",
  "sector": "Digital Products",
  "status": "Project",
  "tagline": "A digital product display for large-format business screens.",
  "summary": "A digital signage application designed to display products, prices, food items and services on television screens through an automated presentation experience.",
  "tags": [
    "Digital Signage",
    "React",
    "Multimedia",
    "4K"
  ],
  "problem": "Businesses need an attractive and easily maintainable alternative to static printed menus and product price displays.",
  "approach": [
    "Designed a large-screen presentation interface.",
    "Structured product images, prices and display ordering.",
    "Designed automated slide transitions and presentation loops.",
    "Separated content administration from the display experience."
  ],
  "features": [
    "Large-format product presentation",
    "Product and service price displays",
    "Automated presentation loops",
    "Configurable product ordering",
    "Administrative content management",
    "Transition and multimedia presentation workflows"
  ],
  "stack": [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Multimedia UI"
  ],
  "role": "Product design, frontend development, digital presentation architecture and content management workflow design.",
  "image": "/projects/zarin-product-showcase.svg",
  "coverType": "graphic"
}
);

// Update project metadata and preserve existing case studies.
for (const project of projects) {
  if (project.slug === "zarin-ventures") {
    project.status = "Private production";
    project.sector = "Business Systems";
    project.featured = true;

    project.features.push(
      "Department-based business management",
      "Production batches and cost allocation",
      "Department-scoped staff operations",
      "Progressive Web Application"
    );

    project.sections = [
      ...(project.sections ?? []),
      {
        title: "Departmental & Production Management",
        body: "The platform separates operational activities across business departments, integrates production batches and tracks inventory consumption, production costs and departmental profitability."
      },
      {
        title: "Infrastructure & Data Recovery",
        body: "Migrated the application to independent Supabase and Cloudflare infrastructure, with historical transaction recovery, database validation and reconciliation."
      }
    ];

    project.stack = [
      "React", "TypeScript", "Tailwind CSS",
      "Supabase", "PostgreSQL", "Cloudflare Workers"
    ];

    project.role = "Full-stack application development, business workflow architecture, database integration, operational reporting, cloud migration and data recovery.";
  }

  if (project.slug === "al-amanah-cooperative") {
    project.featured = false;
    project.sector = "Business Systems";
    project.status = "Project";
  }

  if (project.slug === "kwara-cails-alumni-platform") {
    project.sector = "Institutional Technology";
    project.status = "Project";
  }

  if (project.slug === "farm-produce-traceability") {
    project.sector = "AgriTech";
    project.status = "Project";
  }

  if (project.slug === "swiftdrop") {
    project.sector = "Logistics";
    project.status = "Project";
  }
}

const projectOrder = [
  "my-billpadi",
  "zarin-ventures",
  "zarin-travels",
  "bmb-bakery",
  "al-amanah-cooperative",
  "alumni-voting",
  "moneymap",
  "kwara-cails-alumni-platform",
  "zarin-product-showcase",
  "farm-produce-traceability",
  "swiftdrop",
];

projects.sort(
  (a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug)
);

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);
