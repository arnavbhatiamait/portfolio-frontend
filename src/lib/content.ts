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
        { label: "AI Playground", href: "#ai-playground" },
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
        { label: "Internships", value: 4, suffix: "" },
        { label: "AI domains", value: 5, suffix: "+" },
        { label: "Certification tracks", value: 4, suffix: "+" },
    ],
    skillGroups: [
        {
            label: "Languages",
            summary: "Strong scripting and systems foundation for AI workflows and backend services.",
            items: ["Python", "JavaScript", "TypeScript", "SQL", "C++"],
        },
        {
            label: "Frontend",
            summary: "Modern interfaces with fast rendering, motion, and responsive design.",
            items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Gradio", "Streamlit"],
        },
        {
            label: "Backend & DB",
            summary: "API-first systems for automation, contact flows, and AI product integration.",
            items: ["FastAPI", "Node.js", "Express.js", "PostgreSQL", "Supabase", "pgvector", "FAISS", "Redis"],
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
                "LangGraph",
                "Model Context Protocol (MCP)",
                "speech2vec",
                "wav2vec 2.0"
            ],
        },
        {
            label: "Cloud & DevOps",
            summary: "Deployment and infrastructure tooling for dependable launches.",
            items: ["Docker", "AWS (S3, SQS, RDS, EC2)", "OpenStack", "MongoDB"],
        },
        {
            label: "Tools",
            summary: "Daily workflow and collaboration stack.",
            items: ["Git", "Linux", "Postman", "WebSockets"],
        },
    ],
    experiences: [
        {
            company: "PAN Science Innovations",
            role: "LLM Engineer Intern",
            period: "Aug 2025 - Present",
            location: "India (Venture Studio)",
            highlights: [
                "Designed NYAAY AI, a legal RAG system integrating Amazon S3 event notifications, SQS message queuing, and EC2 workers for RecursiveCharacterTextSplitter chunking and RDS PostgreSQL pgvector storage.",
                "Engineered a Real-Time AI Voice Calling Agent over Twilio Voice and WebSockets, streaming raw audio payloads bidirectionally with Deepgram STT, LangChain, ElevenLabs TTS, and custom server-side barge-in interruption logic.",
                "Solely responsible for the database schema design and frontend/backend architecture of Council (council.panscience.ai), a publishing CRM/ERP with complex normal forms, ISBN stock triggers, and rights mappings.",
                "Developed Opticall, a call center audio intelligence system that ingests recordings, performs speaker diarization, tracks Talk-to-Listen ratios, and evaluates customer sentiment/silences.",
                "Implemented voice biometric verification and clustering pipelines using speech2vec acoustic modeling and wav2vec 2.0 for agent recognition.",
            ],
        },
        {
            company: "Aura AI",
            role: "Artificial Intelligence Intern",
            period: "Jun 2024 - Sep 2024",
            location: "India",
            highlights: [
                "Developed deepfake detection classification models utilizing CNN and XceptionNet neural network architectures to identify synthetic media.",
                "Built SRGAN (Super-Resolution Generative Adversarial Network) image reconstruction pipelines, enhancing low-resolution clarity by 4x.",
                "Engineered GenAI creative suites using Stable Diffusion, ControlNet, and IP-Adapter, wrapping pipelines with FastAPI backends and Streamlit developer interfaces.",
            ],
        },
        {
            company: "PNB Housing Finance",
            role: "Sales Force Intern",
            period: "Oct 2024 - Nov 2024",
            location: "India",
            highlights: [
                "Optimized the core Loan Management System, redesigning database workflows and reducing manual processing times.",
                "Integrated secure Salesforce backend processes with external REST APIs and automated financial database workflows.",
            ],
        },
        {
            company: "CARTT CDC MAIT",
            role: "Placement Cell Coordinator",
            period: "Jul 2024 - Aug 2024",
            location: "MAIT Delhi",
            highlights: [
                "Coordinated logistics, candidate scheduling, and online assessments for major placement drives (D E Shaw, Josh, RTDS, ITC).",
                "Managed communication channels between corporate HR partners and university administration to ensure seamless candidate pipelines.",
            ],
        },
    ],
    projects: [
        {
            name: "The Benchmark Hub",
            tag: "AI Benchmarking / ML",
            description:
                "A centralized analytics platform to evaluate and compare transcription accuracy, vision classification, and text generation models.",
            features: [
                "Audio transcription benchmarks comparing WER, latency, and cost for Gemini, ElevenLabs, Whisper, and OpenAI",
                "Histoscan medical benchmark comparing AWS Rekognition and Gemini Vision on 1,000 histology images for tumor cell classification",
                "Generative LLM benchmarks evaluating factual accuracy and conciseness trade-offs for legal headnote summaries",
                "Data ingestion piping metrics directly into structured comparative reports and CSV databases",
            ],
            tech: ["Python", "PyTorch", "boto3", "Gemini API", "Whisper ASR", "Pandas", "Librosa"],
        },
        {
            name: "speech2vec Voice Biometrics",
            tag: "Acoustic ML / Signal Processing",
            description:
                "Self-supervised voice biometric model capable of identifying individual speakers purely based on acoustic embeddings.",
            features: [
                "Ingests raw audio, normalizes signal levels, and applies band-pass filters using Librosa and NumPy",
                "Extracts Mel-Frequency Cepstral Coefficients (MFCCs) isolating speaker vocal tract physical details",
                "Projects variable-length speech segments into high-dimensional speech2vec and wav2vec 2.0 acoustic vectors",
                "Groups voice signatures organically using DBSCAN and K-Means clustering, training a classification layer for fast inference",
            ],
            tech: ["Python", "PyTorch", "Librosa", "Scikit-Learn", "wav2vec 2.0", "NumPy", "AWS S3"],
        },
        {
            name: "Investor Base Fintech MVP",
            tag: "FinTech / BaaS / Database",
            description:
                "A secure fintech venture platform connecting angel investors with startup deals, built on top of Supabase.",
            features: [
                "Automated database triggers syncing GoTrue Auth accounts to public profile tables",
                "Designed strict Row-Level Security (RLS) policies separating investor access to private, public, and group deals",
                "Created database functions (pledge_to_deal) for atomic, secure transactional pledges",
                "Interactive investor scorecard dashboards showing market research, AI viability, and financial criteria",
            ],
            tech: ["Supabase", "PostgreSQL", "SQL (RLS Policies)", "React", "Next.js", "Tailwind CSS"],
        },
        {
            name: "Council CRM / ERP",
            tag: "B2B SaaS / FinTech",
            description:
                "A highly specialized Enterprise Resource Planning and CRM system modernizing author operations, inventory tracking, and events for publishing houses.",
            features: [
                "Production deployment live at council.panscience.ai",
                "Highly normalized PostgreSQL database schema for authors, contracts, and inventory",
                "Inventory triggers monitoring ISBN metadata and warehouse stock levels",
                "Dynamic author submission tracking and contract territory rights mapping",
            ],
            tech: ["React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
            link: "https://council.panscience.ai",
        },
        {
            name: "NYAAY AI Legal Tech",
            tag: "AI / RAG",
            description:
                "An event-driven legal document question-answering assistant running on AWS with hybrid keyword-vector retrieval.",
            features: [
                "Decoupled ingestion pipeline using S3 upload notifications, SQS queues, and EC2 workers",
                "Intelligent legal document chunking utilizing custom RecursiveCharacterTextSplitter separators",
                "Hybrid keyword-search (ts_rank) and vector similarity search (pgvector) fused using Reciprocal Rank Fusion",
                "Interactive evaluation workbench comparing accuracy and latency across multiple LLMs",
            ],
            tech: ["Python", "FastAPI", "AWS (S3, SQS, RDS)", "pgvector", "LangChain", "OpenAI API", "PostgreSQL"],
        },
        {
            name: "Real-Time AI Voice Calling Agent",
            tag: "Voice AI / WebSockets",
            description:
                "An autonomous phone agent conducting human-like telephone conversations with ultra-low latency.",
            features: [
                "Bidirectional WebSockets streaming base64-encoded audio directly to Twilio",
                "Real-time streaming speech-to-text (STT) and ElevenLabs chunked-transfer TTS speaking token-by-token",
                "Empathetic conversational flow and persona orchestration via LangChain system prompts",
                "Server-side vocal spike detection that flushes audio buffers and updates memory on user barge-ins",
            ],
            tech: ["Python", "FastAPI", "WebSockets", "Twilio API", "Deepgram STT", "ElevenLabs TTS", "LangChain"],
        },
        {
            name: "Opticall call Center Analytics",
            tag: "Audio NLP",
            description:
                "Call analytics dashboard segmenting agent-customer calls and deriving critical performance metrics.",
            features: [
                "Speaker diarization separating Agent and Customer waveforms with millisecond timestamps",
                "Talk-to-Listen ratio calculation and dead-air/silence detection alerts",
                "Call sentiment timeline classification (detecting customer satisfaction transitions)",
                "Automated ingestion webhooks processing raw call recordings in background workers",
            ],
            tech: ["Python", "FastAPI", "Whisper ASR", "Transformers", "Speaker Diarization", "Webhooks"],
        },
        {
            name: "Food Vision Classifier",
            tag: "Computer Vision",
            description:
                "Deep learning computer vision system classifying images into food categories with instant UI validation.",
            features: [
                "Fine-tuned PyTorch convolutional neural network architecture for image feature extraction",
                "Interactive Gradio-based interface hosted on Hugging Face Spaces for public inference",
                "Optimized pipeline for real-time preprocessing, scaling, and batch predictions",
            ],
            tech: ["Python", "PyTorch", "Gradio", "Hugging Face Spaces", "Computer Vision"],
            link: "https://huggingface.co/spaces/Arnavbhatia/Food_Vision",
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
        "AWS (S3, SQS, RDS, EC2)",
        "PostgreSQL",
        "Supabase",
        "pgvector",
        "FAISS",
    ],
    seo: {
        title: "Arnav Bhatia | AI/ML Engineer Portfolio",
        description:
            "Portfolio of Arnav Bhatia showcasing AI engineering, Generative AI, Machine Learning, Computer Vision, and Full Stack Development projects.",
    },
};