export const personalInfo = {
  name: "Karthick",
  fullName: "Karthick",
  brandName: "Karthick",
  tagline: "Aspiring Full Stack Developer & Data Analyst",
  bio: "Passionate Computer Science student at Arulmigu Palaniandavar College of Arts and Culture, Palani (affiliated with Madurai Kamaraj University). Focused on building high-performance web architectures, interactive user experiences, and data-driven solutions with React, JavaScript, and SQL.",
  about: [
    "I am an Aspiring Full Stack Developer & Data Analyst with a solid foundation in modern web technologies, computational problem solving, and database management.",
    "Currently pursuing a Bachelor of Science in Computer Science (B.Sc. CS, 2024–2027) at Arulmigu Palaniandavar College of Arts and Culture, Palani, affiliated with Madurai Kamaraj University. My focus bridges responsive React frontends with structured database architectures.",
    "Driven by curiosity and engineering rigor, I build production-ready applications spanning AI-assisted automation, comprehensive productivity systems, and scalable relational data pipelines."
  ],
  education: {
    degree: "B.Sc. Computer Science",
    college: "Arulmigu Palaniandavar College of Arts and Culture, Palani",
    institution: "Madurai Kamaraj University",
    location: "Palani, Dindigul, Tamil Nadu",
    focus: "Full Stack Web Development, Database Management Systems (DBMS), Data Structures, Cloud Computing & Analytics",
    period: "2024 - 2027",
    status: "Computer Science Student"
  },
  stats: [
    { label: "Core Technologies", value: "6+" },
    { label: "Completed Projects", value: "4+" },
    { label: "Cloud & DB Focus", value: "OCI & SQL" },
    { label: "Commitment", value: "100%" }
  ],
  contact: {
    email: "karthickt6190@gmail.com",
    github: "https://github.com/KARTHICKT2007",
    linkedin: "https://www.linkedin.com/in/karthick-thilagar-257a90375",
    location: "Dindigul, Tamil Nadu, India"
  }
};

export const skillsData = [
  {
    name: "React",
    category: "frontend",
    level: 90,
    icon: "Atom",
    badge: "Core Framework",
    description: "Component architecture, React Hooks, Vite ecosystem, state management, and modern responsive UI development.",
    highlights: ["React 19 & Hooks", "Component Reusability", "Vite Tooling", "Interactive SPAs"]
  },
  {
    name: "JavaScript",
    category: "frontend",
    level: 88,
    icon: "FileCode2",
    badge: "ES6+ Modern",
    description: "Deep knowledge of ES6+ syntax, asynchronous programming (Async/Await), DOM manipulation, and modular code design.",
    highlights: ["ES6+ Features", "Async / Promises", "Event-Driven Logic", "DOM APIs"]
  },
  {
    name: "HTML",
    category: "frontend",
    level: 95,
    icon: "Code2",
    badge: "Semantic Web",
    description: "Semantic HTML5 markup, web accessibility (a11y), SEO optimization best practices, and clean document structure.",
    highlights: ["HTML5 Standards", "Web Accessibility", "SEO Optimization", "Semantic Tagging"]
  },
  {
    name: "CSS",
    category: "frontend",
    level: 92,
    icon: "Palette",
    badge: "Modern Styling",
    description: "CSS3 architecture, Flexbox, CSS Grid layouts, custom animations, glowing themes, and responsive design for all viewports.",
    highlights: ["Flexbox & CSS Grid", "Custom Properties", "Responsive Media", "Keyframe Animations"]
  },
  {
    name: "SQL",
    category: "database",
    level: 86,
    icon: "Database",
    badge: "Data Modeling",
    description: "Relational database schema design, normalization, complex multi-table joins, subqueries, aggregation, and data analysis.",
    highlights: ["Relational Schema Design", "Complex Joins & Aggregations", "Query Optimization", "Data Analytics"]
  },
  {
    name: "Oracle Cloud",
    category: "cloud",
    level: 80,
    icon: "Cloud",
    badge: "Infrastructure",
    description: "Oracle Cloud Infrastructure (OCI) core tenets, Virtual Cloud Networks (VCN), compute instances, object storage, and database services.",
    highlights: ["OCI Architecture", "Compute & Virtual Cloud", "Object Storage", "Cloud Database Management"]
  }
];

export const projectsData = [
  {
    id: "voice-assistant",
    title: "AI-Based Voice-Controlled Desktop Assistant",
    subtitle: "Offline Windows PC Hands-Free Automation",
    category: "ai",
    featured: true,
    description: "A high-performance, real-time desktop automation system designed for complete hands-free navigation of Windows. Runs 100% locally with zero cloud dependencies using quantized Whisper speech recognition, Silero VAD noise rejection, and Win32 direct kernel control.",
    longDescription: "Engineered as an advanced hands-free operating system controller. Utilizes a thread-safe 16kHz audio circular ring buffer, deep-learning Voice Activity Detection (Silero VAD) to eliminate background noise, offline ONNX wake-word detection (<1% idle CPU), quantized Faster-Whisper INT8 ASR, and sub-5ms deterministic intent parsing to execute system commands via native Win32 API and UIAutomation.",
    tech: ["Python", "Faster-Whisper INT8", "Silero VAD", "Win32 API", "UIAutomation", "ONNX"],
    github: "https://github.com/KARTHICKT2007",
    demo: "#",
    metrics: ["100% Offline", "Sub-5ms Intent Latency", "<1% Idle CPU"],
    icon: "Cpu"
  },
  {
    id: "kymorix",
    title: "Kymorix — Productivity & Task Manager",
    subtitle: "React & Vite Workflow Management Suite",
    category: "frontend",
    featured: true,
    description: "A modern, responsive task and workflow management web application built with React and Vite. Features integrated Pomodoro focus cycles, smart priority categorization, productivity analytics, keyboard shortcuts, and JSON data backup.",
    longDescription: "Developed with modern React components and CSS styling. Includes an interactive Pomodoro timer with cycle states, color-coded priority tracking (High, Medium, Low), task checklist progress indicators, keyboard accessibility shortcuts, productivity statistics dashboards, and client-side persistence with exportable backup capability.",
    tech: ["React", "Vite", "JavaScript", "Bootstrap 5", "LocalStorage", "Analytics"],
    github: "https://github.com/KARTHICKT2007",
    demo: "#",
    metrics: ["Pomodoro Focus Timer", "Productivity Dashboard", "Instant Keyboard Shortcuts"],
    icon: "Layers"
  },
  {
    id: "mobilehub",
    title: "MobileHub — Tech Showcase & Catalog",
    subtitle: "Interactive Product Explorer Application",
    category: "frontend",
    featured: false,
    description: "Dynamic React application showcasing mobile technology catalogs with interactive specification comparison, search filtration, responsive layout grids, and modern product presentation cards.",
    longDescription: "Features modular React components rendering real-time device specifications, price filters, category switching, and detailed specification modals, optimized for mobile, tablet, and desktop viewing.",
    tech: ["React", "JavaScript", "CSS3", "Vite", "Responsive Design"],
    github: "https://github.com/KARTHICKT2007",
    demo: "#",
    metrics: ["Dynamic Filtering", "Fully Responsive Grid", "Fast Vite Bundling"],
    icon: "Smartphone"
  },
  {
    id: "sql-analytics",
    title: "Relational Database Analytics & SQL Engine",
    subtitle: "Data Analytics & Schema Engineering",
    category: "database",
    featured: false,
    description: "Comprehensive relational database design and analytical SQL suite solving real-world business queries, transactional integrity, data aggregation, and structured reporting workflows.",
    longDescription: "Engineered robust SQL queries, multi-table joins, nested grouping, window functions, and indexing strategies. Designed relational schemas adhering to 3NF normalization rules for data consistency and high-efficiency query execution.",
    tech: ["SQL", "Relational Modeling", "Query Optimization", "Data Aggregation", "Indexing"],
    github: "https://github.com/KARTHICKT2007",
    demo: "#",
    metrics: ["3NF Normalization", "Optimized Query Plans", "Actionable Reporting"],
    icon: "Database"
  }
];

export const certificationCategories = [
  { id: "all", label: "All Credentials" },
  { id: "database-cloud", label: "Database, Cloud & Oracle" },
  { id: "web-programming", label: "Web Development & Programming" },
  { id: "ai-tech", label: "AI & Technology" },
  { id: "professional", label: "Other Professional" },
  { id: "events", label: "Events & Participation" }
];

export const certificationsData = [
  // =========================================================================
  // 1. Database, Cloud & Oracle
  // =========================================================================
  {
    id: "oci-2025",
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    category: "database-cloud",
    type: "Formal Certification",
    skills: ["OCI Foundations", "Cloud Architecture", "Identity & Security", "Compute & Networking"],
    icon: "Cloud"
  },
  {
    id: "oracle-apex",
    title: "Oracle APEX",
    issuer: "Oracle",
    category: "database-cloud",
    type: "Specialization",
    skills: ["Low-Code Enterprise Apps", "APEX Architecture", "SQL Integration", "Data Modeling"],
    icon: "Database"
  },
  {
    id: "apex-data-analytics",
    title: "Data Analytics and Visualization using APEX",
    issuer: "Tamil Nadu Skill Development Corporation (Conducted by Oracle)",
    category: "database-cloud",
    type: "Course & Applied Project",
    skills: ["Data Analytics", "Interactive Dashboards", "Oracle APEX", "Business Reporting"],
    icon: "BarChart3"
  },
  {
    id: "sql-competency",
    title: "SQL",
    issuer: "Relational Database Management",
    category: "database-cloud",
    type: "Technical Competency",
    skills: ["Relational Modeling", "Complex Joins", "Aggregations", "Query Optimization"],
    icon: "Database"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    issuer: "Cloud Infrastructure Architecture",
    category: "database-cloud",
    type: "Technical Competency",
    skills: ["Cloud Deployment Models", "Virtualization", "Scalability", "SaaS / PaaS / IaaS"],
    icon: "Cloud"
  },

  // =========================================================================
  // 2. Web Development & Programming
  // =========================================================================
  {
    id: "html-css-js",
    title: "HTML, CSS and JavaScript",
    issuer: "Frontend Web Engineering",
    category: "web-programming",
    type: "Technical Competency",
    skills: ["Semantic HTML5", "Responsive CSS3", "Modern ES6+ JS", "DOM Manipulation"],
    icon: "Code2"
  },
  {
    id: "react-js",
    title: "React.js",
    issuer: "Frontend Framework Specialization",
    category: "web-programming",
    type: "Technical Competency",
    skills: ["Component Architecture", "React Hooks", "State Management", "SPA Development"],
    icon: "Atom"
  },
  {
    id: "oc-programming-js",
    title: "Learn Programming with JavaScript",
    issuer: "OpenClassrooms",
    category: "web-programming",
    type: "Course Completion",
    skills: ["JavaScript Fundamentals", "Conditional Logic", "Functions & Objects", "Algorithms"],
    icon: "FileCode2"
  },
  {
    id: "oc-logic-programming",
    title: "Think Like a Computer: The Logic of Programming",
    issuer: "OpenClassrooms",
    category: "web-programming",
    type: "Course Completion",
    skills: ["Algorithmic Thinking", "Problem Decomposition", "Computational Logic", "Flow Control"],
    icon: "Cpu"
  },
  {
    id: "github-beginners",
    title: "Git and GitHub for Beginners",
    issuer: "The GitHub Blog",
    category: "web-programming",
    type: "Course Completion",
    skills: ["Version Control", "Git CLI", "Branching & Merging", "Collaborative Repositories"],
    icon: "GitBranch"
  },

  // =========================================================================
  // 3. Artificial Intelligence & Technology
  // =========================================================================
  {
    id: "ai-realtime-project",
    title: "Artificial Intelligence with Real Time Project Development",
    issuer: "Applied AI Specialization",
    category: "ai-tech",
    type: "Project Certification",
    skills: ["AI Systems", "Real-Time Workflows", "Model Integration", "Python Automation"],
    icon: "Sparkles"
  },
  {
    id: "ai-basics-internship",
    title: "AI Basics Internship",
    issuer: "Industry Internship Experience",
    category: "ai-tech",
    type: "Internship",
    skills: ["AI Foundations", "Practical Industry Exposure", "Data Preparation", "Workplace Collaboration"],
    icon: "Briefcase"
  },

  // =========================================================================
  // 4. Other Professional Certifications
  // =========================================================================
  {
    id: "english-language",
    title: "English Language",
    issuer: "Professional Communication",
    category: "professional",
    type: "Professional Proficiency",
    skills: ["Technical Documentation", "Professional Communication", "Verbal & Written Fluency"],
    icon: "Globe"
  },
  {
    id: "digital-app-fundamentals",
    title: "Digital Application Fundamentals",
    issuer: "Applied Computing Track",
    category: "professional",
    type: "Professional Competency",
    skills: ["Productivity Software", "Digital Tools", "Operating Systems", "Workflow Efficiency"],
    icon: "Layers"
  },
  {
    id: "servicenow-goi",
    title: "SB-ServiceNow",
    issuer: "Government of India",
    category: "professional",
    type: "Government Credential",
    skills: ["ServiceNow Platform", "IT Service Management", "Workflow Automation", "Enterprise Portals"],
    icon: "ShieldCheck"
  },

  // =========================================================================
  // 5. Events & Participation
  // =========================================================================
  {
    id: "symposium-tech",
    title: "State Level Technical Symposium",
    issuer: "Inter-Collegiate Technical Symposium",
    category: "events",
    type: "Event Participation",
    skills: ["Technical Presentations", "Competitive Problem Solving", "Peer Collaboration"],
    icon: "Trophy"
  },
  {
    id: "myas-event",
    title: "Ministry of Youth Affairs and Sports",
    issuer: "Ministry of Youth Affairs and Sports",
    category: "events",
    type: "Event Participation",
    skills: ["Leadership & Organization", "Youth Engagement", "Team Collaboration"],
    icon: "Award"
  }
];
