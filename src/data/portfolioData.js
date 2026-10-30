export const personalInfo = {
  name: "Karthick",
  fullName: "Karthick",
  tagline: "Aspiring Full Stack Developer & Data Analyst",
  bio: "Passionate Computer Science graduate specializing in building scalable web architectures, modern interactive user experiences, and data-driven analytical solutions. Proficient in React, JavaScript, SQL, and Oracle Cloud ecosystems.",
  about: [
    "I am an Aspiring Full Stack Developer & Data Analyst with a strong foundation in modern web technologies, computational problem solving, and database management.",
    "Graduated with a Bachelor of Science in Computer Science (B.Sc CS) from Madurai Kamaraj University, I have focused on combining high-performance frontends using React and JavaScript with structured database designs and cloud backbones.",
    "Driven by curiosity and engineering rigor, I build production-ready applications spanning hands-free desktop AI automation, comprehensive productivity systems, and scalable relational data pipelines."
  ],
  education: {
    degree: "BSc Computer Science",
    institution: "Madurai Kamaraj University",
    location: "Tamil Nadu, India",
    focus: "Full Stack Web Development, Database Management Systems (DBMS), Data Structures, Cloud Computing & Analytics",
    period: "2023 - 2026"
  },
  stats: [
    { label: "Core Technologies", value: "6+" },
    { label: "Completed Projects", value: "4+" },
    { label: "Cloud & DB Focus", value: "OCI & SQL" },
    { label: "Commitment", value: "100%" }
  ],
  contact: {
    email: "dineshkarthick1610@gmail.com",
    github: "https://github.com/dineshkarthickd",
    linkedin: "https://www.linkedin.com/in/dineshkarthickd",
    location: "Tamil Nadu, India"
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
    github: "https://github.com/dineshkarthickd",
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
    github: "https://github.com/dineshkarthickd",
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
    github: "https://github.com/dineshkarthickd",
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
    github: "https://github.com/dineshkarthickd",
    demo: "#",
    metrics: ["3NF Normalization", "Optimized Query Plans", "Actionable Reporting"],
    icon: "Database"
  }
];

export const certificationsData = [
  {
    id: "oci-foundations",
    title: "Oracle Cloud Infrastructure (OCI) Foundations",
    issuer: "Oracle",
    date: "Certified Professional Track",
    skills: ["Cloud Architecture", "Compute & Networking", "OCI Storage", "Security & Identity"],
    description: "Validates foundational knowledge of cloud concepts, Oracle Cloud Infrastructure core services, security compliance, architecture, and deployment models.",
    icon: "Cloud",
    verifyUrl: "https://www.oracle.com/cloud/"
  },
  {
    id: "fullstack-react",
    title: "Full Stack Web Development & React Architecture",
    issuer: "Modern Web Engineering Track",
    date: "Practical Certification",
    skills: ["React", "JavaScript ES6+", "HTML5 & CSS3", "Vite Ecosystem", "Component State"],
    description: "Comprehensive practical specialization in component-driven development, asynchronous JavaScript, dynamic routing, state architecture, and responsive UI engineering.",
    icon: "Code2",
    verifyUrl: "https://github.com/dineshkarthickd"
  },
  {
    id: "bsc-cs",
    title: "Bachelor of Science in Computer Science (B.Sc CS)",
    issuer: "Madurai Kamaraj University",
    date: "Graduated with Academic Honors",
    skills: ["Data Structures", "Database Management Systems", "Software Engineering", "Algorithms"],
    description: "Rigorous academic curriculum covering computer science fundamentals, operating systems, database management, software development life cycles, and computing principles.",
    icon: "GraduationCap",
    verifyUrl: "https://mkuniversity.ac.in/"
  },
  {
    id: "sql-data-analytics",
    title: "Relational Database Design & SQL Analytics",
    issuer: "Data Management & Analytics Specialization",
    date: "Professional Credential",
    skills: ["SQL", "Relational Modeling", "Data Analysis", "Schema Design", "Query Optimization"],
    description: "Specialized training covering structured query language, relational database engineering, data extraction, transformation, analytical reporting, and indexing optimization.",
    icon: "Database",
    verifyUrl: "https://github.com/dineshkarthickd"
  }
];
