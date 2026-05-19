export type NavigationItem = {
  label: string;
  href: string;
};

export type SkillGroup = {
  label: string;
  summary: string;
  items: string[];
};

export type Project = {
  name: string;
  description: string;
  features: string[];
  tech: string[];
  link?: string;
  tag: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  category: string;
};

export type SiteContent = {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  siteUrl: string;
  github: string;
  linkedin: string;
  huggingFace: string;
  resumeHref: string;
  navigation: NavigationItem[];
  roles: string[];
  stats: { label: string; value: number; suffix?: string }[];
  skillGroups: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  techStack: string[];
  seo: {
    title: string;
    description: string;
  };
};

export const siteContent: SiteContent = {
  name: "Arnav Bhatia",
  role: "AI/ML Engineer | Generative AI Developer | Full Stack Developer",
  tagline:
    "Building AI-powered applications, intelligent automation systems, and scalable cloud solutions.",
  summary:
    "I am an AI/ML Engineer and Full Stack Developer passionate about Generative AI, Deep Learning, Automation Systems, and Scalable Cloud Infrastructure. I enjoy building intelligent applications that solve real-world problems using cutting-edge AI technologies.",
  location: "India",
  email: "arnavbhatiamait@gmail.com",
  siteUrl: "https://arnavbhatia.dev",
  github: "https://github.com/arnavbhatiamait",
  linkedin: "https://www.linkedin.com/in/arnav-bhatia-77500425a/",
  huggingFace: "https://huggingface.co/spaces/Arnavbhatia/Food_Vision",
  resumeHref: "/Arnav-Bhatia-Resume.pdf",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  roles: [
    "AI/ML Engineer",
    "Generative AI Developer",
    "Full Stack Developer",
    "LLM Builder",
    "Computer Vision Engineer",
  ],
  stats: [
    { label: "Featured projects", value: 6, suffix: "+" },
    { label: "Internships", value: 3, suffix: "+" },
    { label: "AI domains", value: 4, suffix: "+" },
    { label: "Certification tracks", value: 4, suffix: "+" },
  ],
  skillGroups: [
    {
      label: "Languages",
      summary: "Strong scripting and systems foundation for AI workflows and backend services.",
      items: ["Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      label: "Frontend",
      summary: "Modern interfaces with fast rendering, motion, and responsive design.",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      label: "Backend",
      summary: "API-first systems for automation, contact flows, and AI product integration.",
      items: ["FastAPI", "Node.js", "Express.js"],
    },
    {
      label: "AI/ML",
      summary: "Production-oriented machine learning, LLM, and computer vision tooling.",
      items: [
        "PyTorch",
        "TensorFlow",
        "Hugging Face",
        "XGBoost",
        "OpenAI APIs",
        "Gemini API",
        "Ollama",
        "LangChain",
      ],
    },
    {
      label: "Cloud & DevOps",
      summary: "Deployment and infrastructure tooling for dependable launches.",
      items: ["Docker", "OpenStack", "MongoDB", "Redis"],
    },
    {
      label: "Tools",
      summary: "Daily workflow and collaboration stack.",
      items: ["Git", "Linux", "Postman"],
    },
  ],
  experiences: [
    {
      company: "PAN Science Innovators",
      role: "LLM Engineer Intern",
      period: "Aug 2025 - Present",
      highlights: [
        "Designing Nyaay AI, a legal RAG system with intelligent case law retrieval and contextual reasoning.",
        "Benchmarking OpenAI, Gemini, Groq, and Ollama across accuracy, latency, hallucination, and domain adaptation.",
        "Integrating structured retrieval with Postgres and FAISS to improve query precision for research workflows.",
      ],
    },
    {
      company: "Aura AI",
      role: "Artificial Intelligence Intern",
      period: "Jun 2024 - Sep 2024",
      highlights: [
        "Developed deepfake detection models with CNN and XceptionNet architectures.",
        "Built SRGAN-based super-resolution pipelines that improved image clarity by 4x.",
        "Engineered GenAI applications with Stable Diffusion and ControlNet using Streamlit and FastAPI.",
      ],
    },
    {
      company: "PNB Housing Finance",
      role: "Sales Force Intern",
      period: "Oct 2024 - Nov 2024",
      highlights: [
        "Optimized the Loan Management System, reducing manual workflows and improving operational efficiency.",
        "Worked with REST APIs, database workflows, and backend integration for finance operations.",
      ],
    },
  ],
  projects: [
    {
      name: "AI Meeting Scheduler Agent",
      tag: "Automation",
      description:
        "An AI-powered scheduling assistant with transcript analysis, task management, and multi-LLM support for production workflows.",
      features: [
        "Meeting scheduling with Google Meet integration",
        "Transcript understanding for actionable planning",
        "Todoist API support for task creation",
        "OpenAI, Gemini, Ollama, and Groq-ready backend",
      ],
      tech: ["FastAPI", "Python", "Telegram API", "Todoist API", "OpenAI", "Gemini", "Ollama"],
    },
    {
      name: "Food Vision",
      tag: "Computer Vision",
      description:
        "AI-powered food recognition application hosted on Hugging Face Spaces for fast demo-driven inference.",
      features: [
        "Responsive inference demo",
        "Hugging Face deployment",
        "Computer vision classification workflow",
      ],
      tech: ["Python", "Hugging Face Spaces", "Computer Vision"],
      link: "https://huggingface.co/spaces/Arnavbhatia/Food_Vision",
    },
    {
      name: "Gas Leak Detection ML System",
      tag: "Predictive ML",
      description:
        "Machine learning system for predictive gas leak detection using PHMSA data and optimized anomaly modeling.",
      features: [
        "XGBoost-driven prediction pipeline",
        "Advanced analytics on PHMSA datasets",
        "Visualization for risk exploration and monitoring",
      ],
      tech: ["Python", "XGBoost", "Pandas", "Plotly", "Scikit-learn"],
    },
    {
      name: "Underwater Object Detection",
      tag: "Vision AI",
      description:
        "Advanced underwater object detection pipeline using YOLO for demanding computer vision scenarios.",
      features: [
        "Real-time object detection experiments",
        "YOLO-based model workflow",
        "Applied to underwater imagery challenges",
      ],
      tech: ["YOLO", "Python", "OpenCV", "Computer Vision"],
    },
    {
      name: "AI Image & DeepFake Platform",
      tag: "GenAI",
      description:
        "A creative platform for image generation, GIF generation, DeepFake creation, and AI-powered editing workflows.",
      features: [
        "Image and GIF generation experiences",
        "DeepFake creation pipeline",
        "Background removal and editing tools",
      ],
      tech: ["Stable Diffusion", "FastAPI", "Python", "GenAI"],
    },
    {
      name: "OpenStack Automation Dashboard",
      tag: "Cloud Ops",
      description:
        "Backend APIs and dashboard integrations for VM and network management through OpenStack automation.",
      features: [
        "VM lifecycle management",
        "Network and resource orchestration",
        "FastAPI-powered backend services",
      ],
      tech: ["FastAPI", "OpenStack", "Python", "APIs"],
    },
  ],
  certifications: [
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI & Stanford University",
      category: "Core ML",
    },
    {
      name: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      category: "Deep Learning",
    },
    {
      name: "Advanced Generative AI with LangChain & Hugging Face",
      issuer: "Kris Naik",
      category: "Generative AI",
    },
    {
      name: "Agentic AI Development Bootcamp",
      issuer: "Kris Naik",
      category: "Agentic Systems",
    },
  ],
  techStack: [
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "FastAPI",
    "Framer Motion",
    "Tailwind CSS",
    "PyTorch",
    "TensorFlow",
    "Hugging Face",
    "Docker",
    "OpenStack",
    "Postgres",
    "FAISS",
  ],
  seo: {
    title: "Arnav Bhatia | AI/ML Engineer Portfolio",
    description:
      "Portfolio of Arnav Bhatia showcasing AI engineering, Generative AI, Machine Learning, Computer Vision, and Full Stack Development projects.",
  },
};