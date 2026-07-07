// ============================================================
// portfolioData.js — Centralized configuration for Karthik Salupala's Portfolio
// Update this file to change the personal content across the site.
// ============================================================

export const personalInfo = {
  name: "Karthik Salupala",
  firstName: "Karthik",
  brandName: "Karthik Salupala",
  title: "AI Engineer & Full Stack Developer",
  location: "Hyderabad, India",
  phone: "+91-7702398745",
  emails: {
    primary: "karthiksalupala@gmail.com",
    secondary: "karthiksalupala@gmail.com",
  },
  summary:
    "Results-driven AI Engineer and Full Stack Developer shipping production-grade applications that combine large language models, REST APIs, and modern React architectures. Recognized for rapid execution, clean system design, and performance under pressure in competitive hackathon environments.",
  resumeUrl: "/Karthik_Salupala_Resume_2026.pdf",
};

export const socialLinks = {
  github: "https://github.com/karthiksalupala-ds",
  linkedin: "https://linkedin.com/in/karthik-salupala-0a9829326",
  email: "mailto:karthiksalupala@gmail.com",
};

export const heroContent = {
  greeting: "Hi, I'm Karthik Salupala",
  titleHighlight: "Data Science Engineer", 
  title:"AI Engineer & Full Stack Developer",
  subtitle:
    "I build AI-powered web apps with React, Python, OpenAI, Supabase, and Vercel.",
  ctaPrimary: { text: "View My Work", href: "#projects" },
  ctaSecondary: {
    text: "Contact Me",
    href: "mailto:karthiksalupala@gmail.com?subject=Portfolio%20Inquiry&body=Hello%20Karthik,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards,",
  },
  ctaResume: { text: "Download Resume", href: "/Karthik_Salupala_Resume_2026.pdf" },
};

export const aboutContent = {
  heading: "Hello!",
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">Karthik Salupala</span>, an AI Engineer and Full Stack Developer based in Hyderabad, India, focused on building clean, scalable, production-ready applications with strong UX and robust backend systems.`,
  techStack: ["Python", "React", "AI / LLM"],
};

export const skillsContent = {
  badge: "Experience",
  heading: "Selected projects and hackathon work",
  description:
    "A concise view of the work I’ve shipped, the systems I’ve built, and the environments where I’ve delivered under pressure.",
  cards: [
    {
      number: "01",
      title: "Planzo.ai",
      text: "Built an AI travel intelligence platform that generates personalized multi-day itineraries from natural-language user inputs using OpenAI, React, Supabase, and Vercel.",
    },
    {
      number: "02",
      title: "Context API Agent",
      text: "Designed a multi-turn conversational AI system with React Context API, stateful memory, optimistic UI updates, and streaming responses for a smooth chat experience.",
    },
    {
      number: "03",
      title: "Quantum Hackers",
      text: "Led front-end delivery for a 24-hour hackathon build, prioritizing core features, demo readiness, and clean execution with a small team under deadline pressure.",
    },
  ],
  endText: "Ready to ship!",
};

export const technicalSkills = {
  categories: [
    {
      title: "Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 84 },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 92 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 92 },
        { name: "Context API", level: 90 },
      ],
    },
    {
      title: "AI / LLM",
      skills: [
        { name: "OpenAI API", level: 90 },
        { name: "Prompt Engineering", level: 88 },
        { name: "LLM Integration", level: 88 },
        { name: "Chatbots", level: 85 },
      ],
    },
    {
      title: "Backend / DB",
      skills: [
        { name: "REST APIs", level: 90 },
        { name: "Supabase", level: 88 },
        { name: "PostgreSQL", level: 84 },
        { name: "Authentication", level: 85 },
      ],
    },
    {
      title: "DevOps / Tools",
      skills: [
        { name: "Git & GitHub", level: 92 },
        { name: "Vercel", level: 88 },
        { name: "CI/CD", level: 84 },
        { name: "VS Code", level: 95 },
      ],
    },
    {
      title: "CS Fundamentals",
      skills: [
        { name: "Data Structures", level: 88 },
        { name: "Algorithms", level: 86 },
        { name: "OOP", level: 90 },
        { name: "State Management", level: 84 },
      ],
    },
  ],
};

export const experienceContent = {
  badge: "Selected Work",
  heading: "Experience through shipped projects",
  description:
    "These are the portfolio pieces that best reflect my hands-on experience in AI, frontend architecture, and fast-paced delivery.",
  cards: [
    {
      number: "01",
      title: "Planzo.ai",
      text: "AI travel planning platform with personalized itinerary generation, structured output parsing, JWT authentication, and Supabase-backed persistence.",
    },
    {
      number: "02",
      title: "Context API Agent",
      text: "Conversational AI system with context retention, streaming responses, and global state architecture to support long-running chats.",
    },
    {
      number: "03",
      title: "Quantum Hackers",
      text: "Hackathon build delivered within 24 hours with a 3-person team, focused on core functionality, demo quality, and rapid execution.",
    },
  ],
  categories: [
    {
      title: "Planzo.ai",
      description: "AI travel planning platform with personalized itinerary generation, structured output parsing, JWT authentication, and Supabase-backed persistence.",
      stats: "2026",
      icon: "🤖",
    },
    {
      title: "Context API Agent",
      description: "Conversational AI system with context retention, streaming responses, and global state architecture to support long-running chats.",
      stats: "2025",
      icon: "💬",
    },
    {
      title: "Quantum Hackers",
      description: "Hackathon build delivered within 24 hours with a 3-person team, focused on core functionality, demo quality, and rapid execution.",
      stats: "2026",
      icon: "⚡",
    },
  ],
  endText: "Built to ship.",
};

export const educationContent = {
  badge: "Education",
  heading: "Academic background",
  description: "The academic path that supports my engineering and AI work.",
  categories: [
    {
      title: "AVN Institute of Engineering and Technology",
      description: "Bachelor of Technology (B.Tech), Data Science",
      stats: "2024 – 2028",
      icon: "🎓",
    },
    {
      title: "Vidwan Junior College",
      description: "Intermediate, MPC Stream",
      stats: "2022 – 2024",
      icon: "📘",
    },
    {
      title: "TS Model School",
      description: "SSC / Class X",
      stats: "2022",
      icon: "🏫",
    },
  ],
};

export const projects = [
  {
    id: "planzo",
    number: "01",
    badge: "AI Product",
    title: "Planzo.ai",
    description:
      "A full-stack AI travel intelligence platform that generates personalized itineraries, destination recommendations, activity plans, and budget breakdowns from natural-language prompts.",
    techTags: ["React", "OpenAI API", "Supabase", "Vercel", "Python"],
    links: {
      github: socialLinks.github,
      demo: null,
    },
    isFlagship: true,
  },
  {
    id: "context-api-agent",
    number: "02",
    badge: null,
    title: "Context API Agent",
    description:
      "A production conversational AI system built around React Context API with persistent state, streaming responses, and a smooth multi-turn chat experience.",
    techTags: ["React", "Context API", "LLM Integration", "REST APIs"],
    links: {
      github: socialLinks.github,
      demo: null,
    },
    isFlagship: false,
  },
  {
    id: "quantum-hackers",
    number: "03",
    badge: null,
    title: "Quantum Hackers",
    description:
      "A rapid hackathon delivery focused on live demo quality, front-end execution, and collaborative problem solving under a 24-hour deadline.",
    techTags: ["Full Stack", "Rapid Prototyping", "Team Collaboration"],
    links: {
      github: socialLinks.github,
      demo: null,
    },
    isFlagship: false,
  },
];

export const certificates = {
  featured: [
    {
      name: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillsBuild",
      icon: "🤖",
    },
    {
      name: "Generative AI for Beginners",
      issuer: "Simplilearn SkillUp",
      icon: "✨",
    },
    {
      name: "Introduction to Generative AI Studio",
      issuer: "Google Cloud / Simplilearn",
      icon: "☁️",
    },
    {
      name: "Customer Engagement: Problem Solving & Process Controls",
      issuer: "IBM SkillsBuild",
      icon: "🧩",
    },
    {
      name: "Customer Engagement: Communication & Personality Dynamics",
      issuer: "IBM SkillsBuild",
      icon: "💬",
    },
    {
      name: "Object-Oriented Programming in Java",
      issuer: "Certified",
      icon: "☕",
    },
  ],
  viewAllUrl: "#contact",
};

export const footerContent = {
  taglines: [
    "AI Engineering & Full Stack",
    "React · Python · OpenAI",
    "Scalable Web Applications",
  ],
  credential: "B.Tech Data Science",
  copyright: `© ${new Date().getFullYear()} Karthik Salupala | Built with React`,
};

// EmailJS Configuration
// Will read directly from environment variables in Vite (starting with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
