/**
 * Karthick AI Voice Assistant - Resume-Only Knowledge Base & Matching Engine
 * Strict rule: Answers ONLY using Karthick's verified portfolio and resume data.
 * If info is not present, responds with standard recruiter-friendly fallback.
 */

export const RESUME_SUGGESTED_QUESTIONS = [
  "Tell me about Karthick.",
  "What are his technical skills?",
  "Explain his projects.",
  "What is his educational background?",
  "What certifications does he have?",
  "What technologies does he use?",
  "Is he available for opportunities?"
];

/**
 * Knowledge query processor
 * Analyzes natural language input and returns the most accurate, concise, recruiter-friendly answer.
 */
export function processResumeQuestion(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return {
      text: "Hello! I'm Karthick AI. What would you like to know about Karthick?",
      category: 'greeting'
    };
  }

  const q = rawQuery.toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|what can you do)/i.test(q)) {
    return {
      text: "Hello! I'm Karthick AI, your voice assistant. I can answer questions about Karthick's technical skills, engineered projects, certifications, education, and availability.",
      category: 'greeting'
    };
  }

  // 2. Who is Karthick / Tell me about Karthick / Overview / Introduction
  if (/who is karthick|about karthick|tell me about (him|karthick|yourself)|intro|bio|summary|background/i.test(q) && !/education|school|college/i.test(q)) {
    return {
      text: "Karthick is an aspiring Full Stack Developer and Data Analyst based in Palani, Tamil Nadu. He specializes in React, modern JavaScript, and SQL databases, crafting high-performance web systems and data-driven solutions.",
      category: 'about'
    };
  }

  // 3. Educational Background / Degree / College / University
  if (/education|college|university|degree|school|study|academic|b\.?sc|graduation/i.test(q)) {
    return {
      text: "Karthick is currently pursuing his Bachelor of Science in Computer Science (2024 to 2027) at Arulmigu Palaniandavar College of Arts and Culture, Palani, affiliated with Madurai Kamaraj University.",
      category: 'education'
    };
  }

  // 4. Skills & Technologies
  if (/skill|technology|technologies|stack|language|framework|tool|programming|what can he code|what does he use/i.test(q) && !/project/i.test(q)) {
    return {
      text: "Karthick's core technical stack includes React 19, JavaScript (ES6+), HTML5, CSS3, Vite, and Bootstrap. On the backend and data side, he works with SQL, Oracle APEX, Oracle Cloud Infrastructure, and Git version control.",
      category: 'skills'
    };
  }

  // 5. Projects
  if (/project|portfolio work|built|apps|applications|desktop assistant|kymorix|mobilehub/i.test(q)) {
    // Specific project queries
    if (/voice|desktop assistant|offline|whisper/i.test(q)) {
      return {
        text: "Karthick engineered an AI-Based Voice-Controlled Desktop Assistant for offline Windows operation, integrating Whisper speech recognition, Silero VAD, and the Win32 API for hands-free PC automation.",
        category: 'project-detail'
      };
    }
    if (/kymorix|task|todo|pomodoro|productivity/i.test(q)) {
      return {
        text: "Kymorix is Karthick's productivity and workflow suite built with React and Vite. It features integrated Pomodoro focus cycles, priority tracking, task analytics, and local JSON backups.",
        category: 'project-detail'
      };
    }
    if (/mobilehub|phone|catalog|device/i.test(q)) {
      return {
        text: "MobileHub is a responsive React showcase catalog built by Karthick, featuring interactive device spec comparisons, dynamic filtering, and detailed specification modals.",
        category: 'project-detail'
      };
    }
    if (/database|relational|schema|sql project/i.test(q)) {
      return {
        text: "Karthick designed a Relational Database Analytics architecture using SQL with normalized schemas, complex join queries, and indexing for academic performance metrics.",
        category: 'project-detail'
      };
    }

    return {
      text: "Karthick has developed several standout projects: an AI Voice-Controlled Desktop Assistant using Whisper and Win32, Kymorix Productivity Suite with Pomodoro cycles, MobileHub React Tech Showcase, and Relational Database Analytics in SQL.",
      category: 'projects'
    };
  }

  // 6. Certifications & Achievements
  if (/certif|achievement|award|credential|oracle|hacker rank|course|nptel|coursera/i.test(q)) {
    return {
      text: "Karthick holds certifications in Oracle Cloud Infrastructure (OCI Foundations Associate), Oracle APEX Cloud Developer, HackerRank SQL, Accenture Data Analytics, NPTEL Cloud Computing, and Coursera Web Development.",
      category: 'certifications'
    };
  }

  // 7. Experience & Internships
  if (/experience|internship|work|job history|industry/i.test(q)) {
    return {
      text: "Karthick completed an AI Basics Internship through Edunet Foundation with IBM SkillsBuild and AICTE. He has hands-on practical experience engineering full-stack React web apps and Python automation software.",
      category: 'experience'
    };
  }

  // 8. Career Goals & Availability
  if (/availab|hire|opportunit|internship|full.?time|job|role|joining|start date|work with/i.test(q)) {
    return {
      text: "Yes, Karthick is actively available for full-stack developer internships, junior engineering roles, and freelance software projects. He is ready to contribute immediately.",
      category: 'availability'
    };
  }

  // 9. Contact details
  if (/contact|email|phone|mobile|call|reach|linkedin|github|message|touch/i.test(q)) {
    return {
      text: "You can reach Karthick by email at karthickt6190@gmail.com, by phone at 7845238807, or connect on LinkedIn at karthick-thilagar-257a90375 and GitHub at KARTHICKT2007.",
      category: 'contact'
    };
  }

  // 10. Location / Where is he from
  if (/location|city|country|where is he|where does he live|palani|tamil nadu|india/i.test(q)) {
    return {
      text: "Karthick is based in Palani, Tamil Nadu, India, and is open to both on-site and remote developer opportunities worldwide.",
      category: 'location'
    };
  }

  // 11. Strict Fallback for any unknown or off-topic questions
  return {
    text: "I don't have that information in Karthick's resume. You can contact him for more details at karthickt6190@gmail.com or call 7845238807.",
    category: 'fallback'
  };
}
