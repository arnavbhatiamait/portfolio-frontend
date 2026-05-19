"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Play,
    Pause,
    Database,
    Cpu,
    FileText,
    Activity,
    Sparkles,
    RefreshCw,
    User,
    Bot,
    ArrowRight,
    Search,
    Scissors,
    BarChart3,
    Smile,
    Volume2,
    Hourglass,
    CheckCircle2,
    Send,
    Lock,
    Unlock,
    Shield,
    Sliders,
    TrendingUp,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ==========================================
// OFFLINE CHATBOT KNOWLEDGE BASE & SIMULATOR
// ==========================================
type KnowledgeKey = "default" | "nyaay" | "council" | "voice_agent" | "opticall" | "skills" | "internships" | "contact" | "benchmarking" | "speech2vec" | "investor_base";

const OFFLINE_KB: Record<KnowledgeKey, string> = {
    default: "Hi! I am Arnav's AI Assistant. I can tell you all about his projects, skills, and professional experience. Ask me anything or click one of the suggestions below!",
    nyaay: "**NYAAY AI** is a legal technology platform designed by Arnav during his internship at PAN Science Innovations. \n\n" +
           "**Key Highlights:**\n" +
           "- **Event-Driven Ingestion:** Uses S3 file upload triggers connected to SQS message queues, processed by EC2 workers.\n" +
           "- **Smart Chunking:** Employs LangChain's `RecursiveCharacterTextSplitter` configured with custom legal boundaries (Chapters, Parts, Sections) to preserve context.\n" +
           "- **Vector Database:** Utilizes PostgreSQL with the `pgvector` extension for storing 1536-dimensional embeddings.\n" +
           "- **Hybrid Retrieval:** Merges keyword matches (`ts_rank`) and vector distance (`<->`) using Reciprocal Rank Fusion (RRF) for top accuracy.",
    council: "**Council** is a B2B CRM and Enterprise Resource Planning (ERP) platform built by Arnav to modernize book publishing workflows. It is live at **[council.panscience.ai](https://council.panscience.ai)**.\n\n" +
              "**Technical Accomplishments:**\n" +
              "- **Relational Schema:** Designed a highly normalized PostgreSQL schema tracking authors, contracts, rights, and physical books.\n" +
              "- **Inventory Control:** Developed RESTful APIs with automated database triggers tracking ISBN records, stock levels, and threshold alerts.\n" +
              "- **Rights Management:** Integrated logical portals to manage submission pipelines and distinguish print vs. digital and regional rights.",
    voice_agent: "The **Real-Time AI Voice Calling Agent** is a full-telephony Generative AI integration.\n\n" +
                  "**Technical Stack & Logic:**\n" +
                  "- **Telephony Stream:** Connected Twilio Voice API over bidirectional WebSockets to stream raw, base64 audio.\n" +
                  "- **Streaming Speech Pipeline:** Whisper/Deepgram STT (sub-300ms transcription) -> LangChain prompt orchestration -> ElevenLabs TTS streaming chunks token-by-token.\n" +
                  "- **Barge-in Handler:** Built backend audio analysis that detects vocal spikes, flushes the speech output buffer instantly, halts audio, and updates LLM memory.",
    opticall: "**Opticall** is an audio analytics and intelligence engine parsing call center dialogues.\n\n" +
               "**Analytical Features:**\n" +
               "- **Diarization Pipeline:** Segments mono audio tracks, identifying timestamps for Agent vs. Customer channels.\n" +
               "- **Metrics Extraction:** Calculates Talk-to-Listen ratios, flags awkward silence/dead air (indicating CRM bottlenecks), and tracks customer satisfaction trends.",
    skills: "Arnav is a full-stack engineer specialized in AI systems:\n\n" +
             "- **Languages:** Python, JavaScript, TypeScript, SQL, C++\n" +
             "- **Frontend:** React, Next.js, Tailwind CSS, Framer Motion, Streamlit, Gradio\n" +
             "- **Backend & DB:** FastAPI, Node.js, Express, PostgreSQL (pgvector), Supabase, FAISS, Redis\n" +
             "- **AI/ML:** PyTorch, TensorFlow, LangChain, LangGraph, Model Context Protocol (MCP), OpenCV\n" +
             "- **Cloud/DevOps:** AWS (S3, SQS, RDS, EC2), Docker, OpenStack, Git",
    internships: "Arnav has completed **4 internships**:\n\n" +
                 "1. **PAN Science Innovations (LLM Engineer Intern - Aug 2025 - Present):** Built NYAAY AI, Council ERP, Twilio Voice Agent, and Opticall.\n" +
                 "2. **Aura AI (AI Intern - Jun 2024 - Sep 2024):** Deepfake classification (CNN + XceptionNet), SRGAN image 4x upscaling, Stable Diffusion Streamlit portals.\n" +
                 "3. **PNB Housing Finance (Salesforce Intern - Oct 2024 - Nov 2024):** Optimized loan CRM databases and integrated secure finance REST APIs.\n" +
                 "4. **CARTT CDC MAIT (Placement Coordinator - Jul 2024 - Aug 2024):** Scheduled and managed major placement drives (D E Shaw, Josh, RTDS, ITC).",
    contact: "You can reach Arnav through the following channels:\n\n" +
             "- **Email:** [arnavbhatiamait@gmail.com](mailto:arnavbhatiamait@gmail.com)\n" +
             "- **LinkedIn:** [linkedin.com/in/arnav-bhatia-77500425a](https://www.linkedin.com/in/arnav-bhatia-77500425a/)\n" +
             "- **GitHub:** [github.com/arnavbhatiamait](https://github.com/arnavbhatiamait)\n" +
             "- **Hugging Face:** [huggingface.co/spaces/Arnavbhatia/Food_Vision](https://huggingface.co/spaces/Arnavbhatia/Food_Vision)",
    benchmarking: "**The Benchmark Hub** is a specialized framework Arnav built to test model baselines:\n\n" +
                  "- **Histopathology (Histoscan):** Compared general LLMs (Gemini Vision) against specialized classifiers (AWS Rekognition) on 1,000 cancer cells, proving Gemini Vision achieved 94.5% detection accuracy.\n" +
                  "- **Transcription (WER):** Benchmark reports evaluated ElevenLabs, Whisper, and Gemini on word-error-rate and cost/second parameters.\n" +
                  "- **Text Generation:** Audited LLMs for factual hallucination rates in legal contract summarization.",
    speech2vec: "**speech2vec Voice Biometrics** is a machine learning solution for identity mapping:\n\n" +
                 "- **Preprocessing:** Ingests raw voice streams from AWS S3, normalizes audio levels, filters out telephony static, and extracts Mel-Frequency Cepstral Coefficients (MFCCs).\n" +
                 "- **Vector Spaces:** Projects voice segments into fixed embeddings via self-supervised speech2vec & wav2vec 2.0 (PyTorch).\n" +
                 "- **Clustering:** Segments speaker clusters organically using DBSCAN/K-Means to identify distinct agent voices with high confidence.",
    investor_base: "**Investor Base** is a secure fintech MVP platform designed on Supabase:\n\n" +
                   "- **Auth Integration:** Used triggers on auth.users to auto-populate public user profile roles.\n" +
                   "- **RLS Security:** Engineered row-level database policies filter access to private investor groups using `EXISTS` conditions.\n" +
                   "- **SQL Functions:** Implemented atomic database operations like `pledge_to_deal` functions to ensure transaction safety."
};

const matchKeyword = (msg: string): KnowledgeKey => {
    const text = msg.toLowerCase();
    if (text.includes("nyaay")) return "nyaay";
    if (text.includes("council") || text.includes("panscience.ai")) return "council";
    if (text.includes("voice") || text.includes("twilio") || text.includes("phone")) return "voice_agent";
    if (text.includes("opticall") || text.includes("analytics") || text.includes("audio")) return "opticall";
    if (text.includes("skill") || text.includes("tech") || text.includes("stack")) return "skills";
    if (text.includes("intern") || text.includes("experience") || text.includes("job") || text.includes("work")) return "internships";
    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach")) return "contact";
    if (text.includes("benchmark") || text.includes("histoscan") || text.includes("wer")) return "benchmarking";
    if (text.includes("speech2vec") || text.includes("biometric") || text.includes("voiceprint") || text.includes("wav2vec")) return "speech2vec";
    if (text.includes("investor") || text.includes("supabase") || text.includes("rls") || text.includes("pledge")) return "investor_base";
    return "default";
};

// ==========================================
// NYAAY AI RAG SIMULATOR DATA
// ==========================================
type LegalDocType = "nda" | "lease";

const RAG_DOCS = {
    nda: {
        title: "Mutual Non-Disclosure Agreement (NDA)",
        file: "NDA_Final_Draft.pdf (142 KB)",
        text: "CONFIDENTIALITY AGREEMENT ... SECTION 4: In the event of an unauthorized disclosure or leak of Confidential Information by the Receiving Party, the Receiving Party shall immediately (within 24 hours) notify the Disclosing Party in writing. The Receiving Party agrees to mitigate any damage and cooperate in legal remedies. Breach of confidentiality warrants injunctive relief without posting bond ... SECTION 5: Termination of this Agreement will not release either party from obligations of confidentiality, which shall persist for a period of five (5) years from disclosure."
    },
    lease: {
        title: "Commercial Lease Agreement",
        file: "Lease_Suite_404.pdf (256 KB)",
        text: "LEASE CONTRACT ... SECTION 2: RENT PAYMENT. Tenant shall pay Landlord a monthly rent of $4,500. Rent is due on the 1st day of each calendar month. A grace period of five (5) business days is permitted. Payments received after 5:00 PM on the 5th business day shall incur a late charge of 10% of the overdue balance ... SECTION 3: MAINTENANCE. Landlord is responsible for structural integrity, including HVAC and plumbing overhauls exceeding $1,000."
    }
};

const RAG_QUERIES = {
    nda: {
        query: "What happens if there is a data leak under confidentiality?",
        vector: "[-0.084, 0.221, -0.412, 0.089, 0.763, -0.198, ... 1530 more]",
        chunks: [
            { id: "chunk_4", text: "...SECTION 4: In the event of an unauthorized disclosure or leak of Confidential Information by the Receiving Party, the Receiving Party shall immediately (within 24 hours) notify the Disclosing Party in writing...", score: "0.892 (Cosine Distance)" },
            { id: "chunk_5", text: "...The Receiving Party agrees to mitigate any damage and cooperate in legal remedies. Breach of confidentiality warrants injunctive relief without posting bond...", score: "0.814 (Cosine Distance)" }
        ],
        sql: "SELECT content, (embedding <=> $1) as distance FROM legal_docs WHERE source = 'NDA' ORDER BY distance LIMIT 2",
        synthesis: "Based on **Section 4** of the Mutual NDA, if an unauthorized disclosure or data leak occurs, the Receiving Party must **immediately notify** the Disclosing Party in writing **within 24 hours**. They are also contractually obligated to mitigate any damages, cooperate in legal remedies, and may face injunctive relief."
    },
    lease: {
        query: "When is rent due and what is the grace period and late fee?",
        vector: "[0.122, -0.093, 0.542, 0.311, -0.045, 0.612, ... 1530 more]",
        chunks: [
            { id: "chunk_2", text: "...SECTION 2: RENT PAYMENT. Tenant shall pay Landlord a monthly rent of $4,500. Rent is due on the 1st day of each calendar month. A grace period of five (5) business days is permitted...", score: "0.915 (Cosine Distance)" },
            { id: "chunk_3", text: "...Payments received after 5:00 PM on the 5th business day shall incur a late charge of 10% of the overdue balance...", score: "0.874 (Cosine Distance)" }
        ],
        sql: "SELECT content, (embedding <=> $1) as distance FROM legal_docs WHERE source = 'Lease' ORDER BY distance LIMIT 2",
        synthesis: "According to **Section 2**, rent is due on the **1st day** of each calendar month. A grace period of **five (5) business days** is allowed. If payment is received after 5:00 PM on the 5th business day, a late charge of **10%** of the overdue rent will be applied."
    }
};

// ==========================================
// OPTICALL AUDIO ANALYTICS DATA
// ==========================================
type CallType = "billing" | "sales";

const CALL_SAMPLES = {
    billing: {
        title: "Escalated Call: Billing Discrepancy",
        duration: "45s",
        sentiment: ["Anxious", "Impatient", "Frustrated", "Neutral", "Relieved", "Satisfied"],
        agentTalk: 40,
        customerTalk: 60,
        silence: "3s",
        summary: "Customer called regarding a double billing error. Agent verified payment gateway log, confirmed API delay, initiated instant refund, and customer left satisfied.",
        transcript: [
            { time: "0:02", speaker: "Customer", text: "Hi, I'm calling because my card was charged twice for the subscription yesterday, this is unacceptable.", sentiment: "Frustrated" },
            { time: "0:09", speaker: "Agent", text: "I apologize for that inconvenience. Let me pull up your account immediately. Can I have your billing email?", sentiment: "Neutral" },
            { time: "0:16", speaker: "Customer", text: "Yes, it is arnav@test.com. I need this refunded right away.", sentiment: "Impatient" },
            { time: "0:21", speaker: "Agent", text: "(Checking ledger API) Ah, I see it. It looks like a webhook timeout on our payment gateway created two entries. I am reversing the duplicate transaction now.", sentiment: "Neutral" },
            { time: "0:32", speaker: "Agent", text: "Done. The refund is processed and should reflect in your account within 10 minutes. I've also emailed you the receipt.", sentiment: "Helpful" },
            { time: "0:39", speaker: "Customer", text: "Oh, wow, that was incredibly fast. I already see the pending credit on my bank app. Thank you so much for fixing it!", sentiment: "Satisfied" }
        ]
    },
    sales: {
        title: "Onboarding Call: Publisher ERP Demo",
        duration: "60s",
        sentiment: ["Curious", "Neutral", "Interested", "Engaged", "Excited", "Very Satisfied"],
        agentTalk: 65,
        customerTalk: 35,
        silence: "1.5s",
        summary: "Demo of the Council CRM event modules and ISBN inventory API. Client showed extreme interest in manuscript status workflows.",
        transcript: [
            { time: "0:03", speaker: "Customer", text: "Hello, I wanted to learn how Council manages manuscript reviews. We have over 50 authors submitting drafts monthly.", sentiment: "Curious" },
            { time: "0:12", speaker: "Agent", text: "Absolutely. In Council, we build a pipeline. When an author uploads a manuscript, it gets tagged in the database as 'Under Review'. Literary agents receive automated alerts.", sentiment: "Helpful" },
            { time: "0:23", speaker: "Customer", text: "Oh, that's clean. And what about physical book warehouse stocks? Do you track print vs. digital distribution?", sentiment: "Interested" },
            { time: "0:30", speaker: "Agent", text: "Yes. Our normalized schema separates book files and warehouse levels. Triggers automatically flag when physical stocks drop below thresholds based on monthly sales velocity.", sentiment: "Helpful" },
            { time: "0:45", speaker: "Customer", text: "That is exactly what we need. The low-stock threshold logic solves our manual warehousing audit problem.", sentiment: "Excited" },
            { time: "0:52", speaker: "Agent", text: "Great! I can set up a sandbox environment for your editors to try by tomorrow morning.", sentiment: "Helpful" },
            { time: "0:57", speaker: "Customer", text: "Yes, please do. This is a game changer for our publishing house.", sentiment: "Satisfied" }
        ]
    }
};

// ==========================================
// THE BENCHMARK HUB DATA
// ==========================================
type BenchmarkCategory = "asr" | "histoscan" | "summarization";

const BENCHMARK_METRICS = {
    asr: [
        { model: "ElevenLabs API", wer: 8.2, latency: 280, cost: 0.015, color: "from-cyan-400 to-cyan-500" },
        { model: "Whisper Large v3", wer: 11.5, latency: 620, cost: 0.008, color: "from-blue-400 to-blue-500" },
        { model: "OpenAI Whisper API", wer: 12.1, latency: 410, cost: 0.010, color: "from-violet-400 to-violet-500" },
        { model: "Gemini 2.5 Flash", wer: 14.3, latency: 350, cost: 0.003, color: "from-pink-400 to-pink-500" }
    ],
    histoscan: {
        description: "Medical classification benchmark executed on 1,000 high-res cancer cell biopsy histology images.",
        results: [
            { system: "AWS Rekognition", accuracy: 76.2, latency: 120, cost: 1.00, notes: "Missed micro-tumor aggregates, fast bounding box detection" },
            { system: "Gemini 2.5 Flash (Vision)", accuracy: 94.5, latency: 450, cost: 0.15, notes: "Identified anomalous nuclei morphology, detailed visual reasoning" }
        ]
    },
    summarization: [
        { model: "LLaMA-3-70B (Groq)", accuracy: 91.2, conciseness: 85, tps: 42 },
        { model: "GPT-4o (OpenAI)", accuracy: 94.8, conciseness: 90, tps: 26 },
        { model: "Gemini 2.5 Pro", accuracy: 93.5, conciseness: 88, tps: 32 }
    ]
};

// ==========================================
// SPEECH2VEC BIOMETRICS DATA
// ==========================================
type BiometricSample = "sample_a" | "sample_b" | "unknown";

const BIOMETRIC_CLUSTERS = [
    // Agent John (Cyan)
    { x: 30, y: 40, label: "John (Agent A)", color: "fill-cyan-400 shadow-cyan-500/50" },
    { x: 25, y: 45, label: "John (Agent A)", color: "fill-cyan-400" },
    { x: 35, y: 38, label: "John (Agent A)", color: "fill-cyan-400" },
    { x: 28, y: 35, label: "John (Agent A)", color: "fill-cyan-400" },
    // Agent Sarah (Violet)
    { x: 70, y: 75, label: "Sarah (Agent B)", color: "fill-violet-400 shadow-violet-500/50" },
    { x: 75, y: 70, label: "Sarah (Agent B)", color: "fill-violet-400" },
    { x: 68, y: 80, label: "Sarah (Agent B)", color: "fill-violet-400" },
    { x: 72, y: 68, label: "Sarah (Agent B)", color: "fill-violet-400" },
    // Agent Michael (Blue)
    { x: 45, y: 78, label: "Michael (Agent C)", color: "fill-blue-400 shadow-blue-500/50" },
    { x: 42, y: 74, label: "Michael (Agent C)", color: "fill-blue-400" },
    { x: 48, y: 82, label: "Michael (Agent C)", color: "fill-blue-400" },
    { x: 50, y: 75, label: "Michael (Agent C)", color: "fill-blue-400" }
];

const BIOMETRIC_SAMPLES = {
    sample_a: {
        file: "agent_john_validation.wav",
        targetX: 31,
        targetY: 41,
        agent: "John (Agent A)",
        confidence: 97.8,
        mfccs: [12.4, -4.5, 8.2, -1.1, 5.7, 2.3, -3.4, 6.1, 1.2, -0.8, 3.4, 0.9, -1.5]
    },
    sample_b: {
        file: "agent_sarah_validation.wav",
        targetX: 71,
        targetY: 73,
        agent: "Sarah (Agent B)",
        confidence: 98.6,
        mfccs: [-5.2, 14.1, -2.1, 9.8, -1.2, 7.4, 5.1, -2.3, 4.8, 2.1, -1.9, 3.2, 0.4]
    },
    unknown: {
        file: "background_noise_static.wav",
        targetX: 52,
        targetY: 58,
        agent: "Unknown / Low Confidence",
        confidence: 34.2,
        mfccs: [2.1, 1.2, -0.5, 0.8, -1.1, 0.2, 1.4, -0.7, 0.3, -0.4, 0.9, -0.2, 0.5]
    }
};

// ==========================================
// SUPABASE RLS DATA
// ==========================================
type RLSRole = "guest" | "member_101" | "member_102" | "admin";

const DATABASE_DEALS = [
    { id: 1, title: "NYAAY AI Legal Tech", group: 101, is_public: true, valuation: "$2.5M" },
    { id: 2, title: "Opticall Analytics", group: 101, is_public: false, valuation: "$4.8M" },
    { id: 3, title: "Aura Super-Res GAN", group: 102, is_public: false, valuation: "$1.9M" },
    { id: 4, title: "Publisher Council ERP", group: 103, is_public: true, valuation: "$8.5M" }
];

export function AISandbox() {
    const [activeTab, setActiveTab] = useState<"chatbot" | "rag" | "opticall" | "benchmark" | "biometrics" | "rls">("chatbot");

    // ----------------------------------------
    // CHATBOT TAB STATE
    // ----------------------------------------
    const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
        { sender: "bot", text: OFFLINE_KB.default }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (activeTab === "chatbot") {
            scrollToBottom();
        }
    }, [messages, isTyping, activeTab]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { sender: "user", text }]);
        setInputValue("");
        setIsTyping(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 900));

        // Try hitting backend first, fallback to client-side KB
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api"}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: messages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }))
                })
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
            } else {
                const kbKey = matchKeyword(text);
                setMessages(prev => [...prev, { sender: "bot", text: OFFLINE_KB[kbKey] }]);
            }
        } catch (e) {
            const kbKey = matchKeyword(text);
            setMessages(prev => [...prev, { sender: "bot", text: OFFLINE_KB[kbKey] }]);
        } finally {
            setIsTyping(false);
        }
    };

    // ----------------------------------------
    // RAG SIMULATOR TAB STATE
    // ----------------------------------------
    const [ragDocType, setRagDocType] = useState<LegalDocType>("nda");
    const [ragStep, setRagStep] = useState(0);
    const totalRagSteps = 5;

    const handleRagNext = () => {
        if (ragStep < totalRagSteps - 1) {
            setRagStep(prev => prev + 1);
        }
    };

    const handleRagPrev = () => {
        if (ragStep > 0) {
            setRagStep(prev => prev - 1);
        }
    };

    useEffect(() => {
        setRagStep(0);
    }, [ragDocType]);

    // ----------------------------------------
    // OPTICALL TAB STATE
    // ----------------------------------------
    const [callType, setCallType] = useState<CallType>("billing");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playProgress, setPlayProgress] = useState(0);
    const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(-1);
    const timerRef = useRef<number | null>(null);

    const currentCall = CALL_SAMPLES[callType];

    const handlePlayPause = () => {
        if (isPlaying) {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            timerRef.current = window.setInterval(() => {
                setPlayProgress(prev => {
                    const next = prev + 1.5;
                    if (next >= 100) {
                        setIsPlaying(false);
                        if (timerRef.current) window.clearInterval(timerRef.current);
                        return 100;
                    }
                    return next;
                });
            }, 100);
        }
    };

    const handleResetCall = () => {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsPlaying(false);
        setPlayProgress(0);
        setActiveTranscriptIndex(-1);
    };

    useEffect(() => {
        handleResetCall();
    }, [callType]);

    useEffect(() => {
        if (playProgress === 0) {
            setActiveTranscriptIndex(-1);
            return;
        }
        const numItems = currentCall.transcript.length;
        const index = Math.min(Math.floor((playProgress / 100) * numItems), numItems - 1);
        setActiveTranscriptIndex(index);
    }, [playProgress, currentCall.transcript.length]);

    const getCustomerSentiment = () => {
        const numSentiments = currentCall.sentiment.length;
        const index = Math.min(Math.floor((playProgress / 100) * numSentiments), numSentiments - 1);
        return currentCall.sentiment[index] || "Neutral";
    };

    const getSentimentColor = (sentiment: string) => {
        const s = sentiment.toLowerCase();
        if (["frustrated", "impatient", "anxious"].some(keyword => s.includes(keyword))) {
            return "text-red-400 border-red-500/20 bg-red-500/10";
        }
        if (["neutral", "curious", "interested"].some(keyword => s.includes(keyword))) {
            return "text-amber-400 border-amber-500/20 bg-amber-500/10";
        }
        return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
    };

    // ----------------------------------------
    // BENCHMARK HUB TAB STATE
    // ----------------------------------------
    const [benchmarkCat, setBenchmarkCat] = useState<BenchmarkCategory>("asr");
    const [simulatingHistoscan, setSimulatingHistoscan] = useState(false);
    const [histoscanProgress, setHistoscanProgress] = useState(0);
    const [histoscanOutputs, setHistoscanOutputs] = useState<{ id: string; label: string; prediction: string; correct: boolean }[]>([]);

    const runHistoscanSimulation = () => {
        setSimulatingHistoscan(true);
        setHistoscanProgress(0);
        setHistoscanOutputs([]);
        
        let counter = 0;
        const interval = setInterval(() => {
            counter += 1;
            setHistoscanProgress(counter);
            
            const newOutput = {
                id: `slide_${Math.floor(Math.random() * 900) + 100}`,
                label: Math.random() > 0.4 ? "Tumor Cell (Cancer)" : "Normal Tissue (Benign)",
                prediction: Math.random() > 0.15 ? "Tumor Cell (Cancer)" : "Normal Tissue (Benign)",
                correct: false
            };
            newOutput.correct = newOutput.label === newOutput.prediction;
            
            setHistoscanOutputs(prev => [newOutput, ...prev].slice(0, 5));

            if (counter >= 100) {
                clearInterval(interval);
                setSimulatingHistoscan(false);
            }
        }, 30);
    };

    // ----------------------------------------
    // SPEECH2VEC BIOMETRICS TAB STATE
    // ----------------------------------------
    const [selectedBioSample, setSelectedBioSample] = useState<BiometricSample>("sample_a");
    const [isVerifyingBio, setIsVerifyingBio] = useState(false);
    const [bioStep, setBioStep] = useState<"idle" | "filtering" | "mfcc" | "projection" | "done">("idle");
    const [bioPlotDot, setBioPlotDot] = useState<{ x: number; y: number } | null>(null);

    const handleVerifyBiometrics = () => {
        setIsVerifyingBio(true);
        setBioStep("filtering");
        setBioPlotDot(null);

        setTimeout(() => {
            setBioStep("mfcc");
            setTimeout(() => {
                setBioStep("projection");
                // Animate dot shifting from center (50, 50) to target coordinates
                const sample = BIOMETRIC_SAMPLES[selectedBioSample];
                setBioPlotDot({ x: sample.targetX, y: sample.targetY });
                setTimeout(() => {
                    setBioStep("done");
                    setIsVerifyingBio(false);
                }, 1000);
            }, 1200);
        }, 1200);
    };

    // ----------------------------------------
    // SUPABASE RLS TAB STATE
    // ----------------------------------------
    const [rlsRole, setRlsRole] = useState<RLSRole>("guest");

    const getSQLQuery = () => {
        switch (rlsRole) {
            case "guest":
                return "-- Executing public security policy filter\nSELECT * FROM deals\nWHERE is_public = TRUE;";
            case "member_101":
                return "-- Filtering query based on authenticated user JWT (Group 101)\nSELECT * FROM deals\nWHERE is_public = TRUE \n   OR associated_group_id = 101;";
            case "member_102":
                return "-- Filtering query based on authenticated user JWT (Group 102)\nSELECT * FROM deals\nWHERE is_public = TRUE \n   OR associated_group_id = 102;";
            case "admin":
                return "-- Superuser bypasses Row-Level Security policies\nSELECT * FROM deals;";
        }
    };

    const getFilteredRows = () => {
        return DATABASE_DEALS.filter(deal => {
            if (rlsRole === "admin") return true;
            if (deal.is_public) return true;
            if (rlsRole === "member_101" && deal.group === 101) return true;
            if (rlsRole === "member_102" && deal.group === 102) return true;
            return false;
        });
    };

    return (
        <section id="ai-playground" className="scroll-mt-28 py-20 sm:py-24">
            <div className="max-w-3xl space-y-4 mb-10">
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    Interactive Sandbox
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Experience the <span className="text-gradient">AI Applications</span> Live
                </h2>
                <p className="text-base leading-7 text-slate-300 sm:text-lg">
                    Interact directly with the systems and simulators built by Arnav. Toggle the tabs below to explore legal RAG pipelines, model benchmark matrices, voice biometrics, and database security mechanisms.
                </p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
                <button
                    onClick={() => setActiveTab("chatbot")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border",
                        activeTab === "chatbot"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <MessageSquare className="h-4 w-4" />
                    Ask AI Clone
                </button>
                <button
                    onClick={() => setActiveTab("rag")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border",
                        activeTab === "rag"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <Database className="h-4 w-4" />
                    NYAAY AI RAG
                </button>
                <button
                    onClick={() => setActiveTab("opticall")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border",
                        activeTab === "opticall"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <Activity className="h-4 w-4" />
                    Opticall Call Console
                </button>
                <button
                    onClick={() => setActiveTab("benchmark")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border",
                        activeTab === "benchmark"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <BarChart3 className="h-4 w-4" />
                    Benchmark Hub
                </button>
                <button
                    onClick={() => setActiveTab("biometrics")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border",
                        activeTab === "biometrics"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <Volume2 className="h-4 w-4" />
                    speech2vec Biometrics
                </button>
                <button
                    onClick={() => setActiveTab("rls")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border",
                        activeTab === "rls"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <Shield className="h-4 w-4" />
                    Supabase RLS
                </button>
            </div>

            {/* MAIN PLAYGROUND DISPLAY */}
            <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-blue-500/10 blur-xl" />

                <Card className="glass-panel border-white/10 overflow-hidden min-h-[500px]">
                    <CardContent className="p-6 sm:p-8">
                        <AnimatePresence mode="wait">
                            {/* ========================================================
                                TAB 1: CHATBOT CONTAINER
                                ======================================================== */}
                            {activeTab === "chatbot" && (
                                <motion.div
                                    key="chatbot"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-[520px]"
                                >
                                    <div className="border-b border-white/15 pb-4 mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                                                <Bot className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">Arnav's AI Copilot</h3>
                                                <p className="text-xs text-cyan-300/80 flex items-center gap-1">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                                                    Online Agent (Auto-Switching Simulation)
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setMessages([{ sender: "bot", text: OFFLINE_KB.default }])}
                                            title="Clear conversation"
                                        >
                                            <RefreshCw className="h-4 w-4 text-slate-400 hover:text-white" />
                                        </Button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 scrollbar-thin scrollbar-thumb-white/10">
                                        {messages.map((msg, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "flex items-start gap-3 max-w-[85%]",
                                                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs",
                                                    msg.sender === "user"
                                                        ? "bg-slate-700"
                                                        : "bg-gradient-to-br from-cyan-500 to-blue-600"
                                                )}>
                                                    {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                                </div>
                                                <div className={cn(
                                                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line border",
                                                    msg.sender === "user"
                                                        ? "bg-white/10 border-white/10 text-white"
                                                        : "bg-[#0b1531]/75 border-cyan-500/20 text-slate-200 animate-fade-in"
                                                )}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}

                                        {isTyping && (
                                            <div className="flex items-start gap-3 max-w-[80%]">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 text-white">
                                                    <Bot className="h-4 w-4" />
                                                </div>
                                                <div className="rounded-2xl px-4 py-3 bg-[#0b1531]/75 border border-cyan-500/10 text-slate-400 text-sm flex gap-1.5 items-center">
                                                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                    <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" />
                                                </div>
                                            </div>
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <button
                                            onClick={() => handleSendMessage("What benchmarks did you run on The Benchmark Hub?")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            📊 Model Benchmarking
                                        </button>
                                        <button
                                            onClick={() => handleSendMessage("How does speech2vec voice biometric clustering work?")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            🎙️ speech2vec Biometrics
                                        </button>
                                        <button
                                            onClick={() => handleSendMessage("Explain Supabase Row Level Security in Investor Base")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            🔒 Supabase RLS
                                        </button>
                                        <button
                                            onClick={() => handleSendMessage("Explain the NYAAY AI project")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            ⚖️ Legal RAG
                                        </button>
                                    </div>

                                    <form
                                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                                        className="relative flex items-center"
                                    >
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Ask about projects, internships, or contact info..."
                                            className="w-full rounded-full border border-white/15 bg-slate-950/60 py-3.5 pl-5 pr-14 text-sm text-white placeholder-slate-400 focus-ring"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2.5 h-9 w-9 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center text-white hover:brightness-110 transition shadow-md"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* ========================================================
                                TAB 2: RAG SIMULATOR CONTAINER
                                ======================================================== */}
                            {activeTab === "rag" && (
                                <motion.div
                                    key="rag"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">NYAAY AI Legal RAG Simulator</h3>
                                            <p className="text-sm text-slate-400">Step-by-step visualizer of custom pgvector hybrid search.</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Document:</span>
                                            <select
                                                value={ragDocType}
                                                onChange={(e) => setRagDocType(e.target.value as LegalDocType)}
                                                className="rounded-lg border border-white/15 bg-slate-950/80 px-3 py-1.5 text-xs text-white focus-ring"
                                            >
                                                <option value="nda">Mutual NDA File</option>
                                                <option value="lease">Lease Agreement</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* PIPELINE PROGRESS BAR */}
                                    <div className="grid grid-cols-5 gap-2 relative">
                                        {[
                                            { label: "1. Upload", icon: FileText },
                                            { label: "2. Chunk", icon: Scissors },
                                            { label: "3. Vector", icon: Cpu },
                                            { label: "4. Retrieve", icon: Search },
                                            { label: "5. Synthesize", icon: Sparkles }
                                        ].map((step, idx) => {
                                            const StepIcon = step.icon;
                                            return (
                                                <div key={idx} className="flex flex-col items-center text-center">
                                                    <div className={cn(
                                                        "h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md",
                                                        ragStep === idx
                                                            ? "bg-cyan-400 border-cyan-400 text-slate-950 scale-110"
                                                            : ragStep > idx
                                                                ? "bg-cyan-950 border-cyan-500/50 text-cyan-300"
                                                                : "bg-white/5 border-white/10 text-slate-500"
                                                    )}>
                                                        <StepIcon className="h-5 w-5" />
                                                    </div>
                                                    <span className={cn(
                                                        "mt-2 text-[10px] sm:text-xs font-medium tracking-tight",
                                                        ragStep === idx ? "text-cyan-200" : "text-slate-400"
                                                    )}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        <div className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-white/5 -z-10" />
                                        <div
                                            className="absolute left-[10%] top-5 h-0.5 bg-cyan-400/50 -z-10 transition-all duration-300"
                                            style={{ width: `${(ragStep / 4) * 80}%` }}
                                        />
                                    </div>

                                    {/* STEP DETAILS CARD */}
                                    <Card className="border-cyan-500/10 bg-slate-950/50 min-h-[220px] relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400/50" />
                                        <CardHeader className="py-4">
                                            <CardTitle className="text-base text-cyan-200 flex items-center gap-2">
                                                {ragStep === 0 && "Step 1: Event-Driven Document S3 Upload"}
                                                {ragStep === 1 && "Step 2: Recursive Character Text Splitter (Chunking)"}
                                                {ragStep === 2 && "Step 3: Generating Embedding Vectors"}
                                                {ragStep === 3 && "Step 4: Hybrid Search & pgvector Cosine Retrieval"}
                                                {ragStep === 4 && "Step 5: LLM Context Synthesis"}
                                            </CardTitle>
                                            <CardDescription className="text-xs text-slate-400">
                                                {ragStep === 0 && "File uploaded to bucket -> S3 notification triggers SQS message queue -> EC2 poller retrieves file."}
                                                {ragStep === 1 && "Document broken into 1000-char semantic chunks, preserving legal syntax headers."}
                                                {ragStep === 2 && "Generates 1536-dimensional vector representing search semantics."}
                                                {ragStep === 3 && "Fuses full-text SQL search and vector cosine query in PostgreSQL via Reciprocal Rank Fusion."}
                                                {ragStep === 4 && "Reranked chunks are sent as system instructions to the LLM to output a verified answer."}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-sm font-mono leading-relaxed pb-4">
                                            {ragStep === 0 && (
                                                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <FileText className="h-10 w-10 text-cyan-300" />
                                                        <div>
                                                            <p className="text-white font-medium">{RAG_DOCS[ragDocType].title}</p>
                                                            <p className="text-xs text-slate-400">{RAG_DOCS[ragDocType].file}</p>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-xs text-emerald-400 flex items-center gap-1 font-sans">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Uploaded to S3
                                                    </div>
                                                </div>
                                            )}

                                            {ragStep === 1 && (
                                                <div className="space-y-3">
                                                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-sans">Applied legal boundary split tags:</div>
                                                    <div className="flex flex-wrap gap-2 text-xs font-sans">
                                                        {["\\n\\nPART ", "\\n\\nCHAPTER ", "\\n\\nSECTION ", "\\n\\n"].map(tag => (
                                                            <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 border border-white/10 text-cyan-200">{tag}</span>
                                                        ))}
                                                    </div>
                                                    <div className="rounded-2xl border border-cyan-500/10 bg-cyan-950/20 p-3 text-xs max-h-36 overflow-y-auto leading-relaxed whitespace-pre-line text-slate-300">
                                                        {RAG_DOCS[ragDocType].text}
                                                    </div>
                                                </div>
                                            )}

                                            {ragStep === 2 && (
                                                <div className="space-y-2">
                                                    <div className="text-xs text-slate-300 font-sans font-medium">Query: <span className="text-cyan-200 font-mono">"{RAG_QUERIES[ragDocType].query}"</span></div>
                                                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-sans mt-2">OpenAI `text-embedding-3-small` Output:</div>
                                                    <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 text-xs text-cyan-400 break-words leading-5">
                                                        {RAG_QUERIES[ragDocType].vector}
                                                    </div>
                                                </div>
                                            )}

                                            {ragStep === 3 && (
                                                <div className="space-y-3">
                                                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-sans">Executing Hybrid SQL query:</div>
                                                    <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-3 text-xs text-violet-300 break-all leading-4">
                                                        {RAG_QUERIES[ragDocType].sql}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-sans">Retrieved Chunks from pgvector:</div>
                                                        {RAG_QUERIES[ragDocType].chunks.map((chk, i) => (
                                                            <div key={i} className="rounded-xl border border-cyan-500/10 bg-[#0b1531]/30 p-2.5 text-xs">
                                                                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-semibold mb-1">
                                                                    <span>{chk.id}</span>
                                                                    <span>Similarity Score: {chk.score}</span>
                                                                </div>
                                                                <p className="text-slate-300 italic">"{chk.text}"</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {ragStep === 4 && (
                                                <div className="space-y-3 font-sans">
                                                    <div className="text-xs text-slate-300 font-medium">Synthesized Answer:</div>
                                                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-4 text-sm text-slate-200 leading-relaxed">
                                                        {RAG_QUERIES[ragDocType].synthesis}
                                                    </div>
                                                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-400 flex items-center gap-1.5">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        Verified with zero-hallucination constraint model
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* NAVIGATION CONTROLS */}
                                    <div className="flex justify-between items-center pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleRagPrev}
                                            disabled={ragStep === 0}
                                        >
                                            Previous Step
                                        </Button>
                                        <div className="text-xs text-slate-400">
                                            Step {ragStep + 1} of {totalRagSteps}
                                        </div>
                                        <Button
                                            onClick={handleRagNext}
                                            disabled={ragStep === totalRagSteps - 1}
                                            className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-medium"
                                        >
                                            Next Step
                                            <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ========================================================
                                TAB 3: OPTICALL CONTAINER
                                ======================================================== */}
                            {activeTab === "opticall" && (
                                <motion.div
                                    key="opticall"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">Opticall Call Analytics Console</h3>
                                            <p className="text-sm text-slate-400">Diarization, sentiment tracing, and silence extraction.</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Recording:</span>
                                            <select
                                                value={callType}
                                                onChange={(e) => setCallType(e.target.value as CallType)}
                                                className="rounded-lg border border-white/15 bg-slate-950/80 px-3 py-1.5 text-xs text-white focus-ring"
                                            >
                                                <option value="billing">Billing Dispute (Escalated)</option>
                                                <option value="sales">Publisher Demo (Onboarding)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* WAVEFORM ANIMATION */}
                                    <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 space-y-4">
                                        <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span className="font-semibold text-slate-300">{currentCall.title}</span>
                                            <span className="font-mono text-cyan-400">Status: {isPlaying ? "Streaming Analysis..." : "Paused"}</span>
                                        </div>

                                        <div className="h-20 bg-slate-900/60 rounded-xl relative overflow-hidden flex items-center justify-around px-2 border border-white/5">
                                            {/* Waves bars */}
                                            {Array.from({ length: 35 }).map((_, i) => {
                                                const height = isPlaying
                                                    ? Math.max(15, Math.sin(i + playProgress * 0.4) * 35 + 25)
                                                    : 10 + (i % 5) * 6;
                                                return (
                                                    <div
                                                        key={i}
                                                        className="w-1.5 bg-gradient-to-t from-cyan-500 to-violet-500 rounded-full transition-all duration-100"
                                                        style={{ height: `${height}%` }}
                                                    />
                                                );
                                            })}
                                            {/* Playhead line */}
                                            <div
                                                className="absolute top-0 bottom-0 w-0.5 bg-red-400 transition-all duration-100 ease-linear"
                                                style={{ left: `${playProgress}%` }}
                                            />
                                        </div>

                                        {/* PLAYER BUTTONS */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={handlePlayPause}
                                                    className="h-9 w-9 rounded-full p-0 flex items-center justify-center bg-white hover:bg-slate-200 text-slate-950"
                                                >
                                                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleResetCall}
                                                    className="border-white/10 text-white hover:bg-white/5"
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                            <div className="text-xs text-slate-400 font-mono">
                                                Playhead: {Math.floor((playProgress / 100) * parseInt(currentCall.duration)) || 0}s / {currentCall.duration}
                                            </div>
                                        </div>
                                    </div>

                                    {/* AUDIO INTELLIGENCE ANALYTICS CARDS */}
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <Card className="border-white/5 bg-slate-900/40 p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">Diarization Talk Ratio</p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <BarChart3 className="h-5 w-5 text-cyan-300" />
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                                                        <span>Agent {currentCall.agentTalk}%</span>
                                                        <span>Cust {currentCall.customerTalk}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                                                        <div className="h-full bg-cyan-400" style={{ width: `${currentCall.agentTalk}%` }} />
                                                        <div className="h-full bg-purple-500" style={{ width: `${currentCall.customerTalk}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="border-white/5 bg-slate-900/40 p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">Silence / Dead Air</p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <Hourglass className="h-5 w-5 text-amber-300" />
                                                <div>
                                                    <span className="text-xl font-bold text-white">{currentCall.silence}</span>
                                                    <span className="text-xs text-slate-400 block">Total Silence Duration</span>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="border-white/5 bg-slate-900/40 p-4">
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">Live Customer Sentiment</p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <Smile className="h-5 w-5 text-emerald-300" />
                                                <div className={cn(
                                                    "rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                                                    getSentimentColor(getCustomerSentiment())
                                                )}>
                                                    {getCustomerSentiment()}
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* DIARIZED TRANSCRIPT SYNC */}
                                    <Card className="border-white/5 bg-slate-900/40">
                                        <CardHeader className="py-3 px-4 border-b border-white/5">
                                            <CardTitle className="text-xs text-slate-400 uppercase tracking-wider">Diarized Audio Transcript Timeline</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 max-h-[160px] overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin scrollbar-thumb-white/10">
                                            {currentCall.transcript.map((line, idx) => {
                                                const isActive = activeTranscriptIndex === idx;
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "p-2.5 rounded-xl border transition-all duration-300 flex flex-col gap-1",
                                                            isActive
                                                                ? "bg-[#0b1531]/60 border-cyan-500/40 scale-[1.01]"
                                                                : "bg-slate-950/20 border-transparent text-slate-400"
                                                        )}
                                                    >
                                                        <div className="flex items-center justify-between text-[10px] mb-0.5">
                                                            <span className={cn(
                                                                "font-semibold uppercase tracking-wider",
                                                                line.speaker === "Agent" ? "text-cyan-300" : "text-purple-300"
                                                            )}>
                                                                 {line.speaker}
                                                            </span>
                                                            <span className="font-mono text-slate-500">{line.time}</span>
                                                        </div>
                                                        <p className={isActive ? "text-slate-100 font-medium" : "text-slate-400"}>
                                                            {line.text}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>

                                    {/* BUSINESS SUMMARY METRICS */}
                                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-xs">
                                        <span className="font-semibold text-slate-300 block mb-1 font-sans">Automated AI Call Summary:</span>
                                        <p className="text-slate-400 leading-relaxed italic">
                                            "{currentCall.summary}"
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* ========================================================
                                TAB 4: BENCHMARK HUB CONTAINER
                                ======================================================== */}
                            {activeTab === "benchmark" && (
                                <motion.div
                                    key="benchmark"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">The Benchmark Hub Console</h3>
                                            <p className="text-sm text-slate-400">Comparing transcription WER, Histoscan medical vision, and text generation latency.</p>
                                        </div>
                                        <div className="flex border border-white/10 rounded-full p-0.5 bg-slate-950/80">
                                            <button
                                                onClick={() => setBenchmarkCat("asr")}
                                                className={cn("px-3 py-1 rounded-full text-xs font-medium transition", benchmarkCat === "asr" ? "bg-white text-slate-950" : "text-slate-400 hover:text-white")}
                                            >
                                                ASR Audio
                                            </button>
                                            <button
                                                onClick={() => setBenchmarkCat("histoscan")}
                                                className={cn("px-3 py-1 rounded-full text-xs font-medium transition", benchmarkCat === "histoscan" ? "bg-white text-slate-950" : "text-slate-400 hover:text-white")}
                                            >
                                                Histoscan Vision
                                            </button>
                                            <button
                                                onClick={() => setBenchmarkCat("summarization")}
                                                className={cn("px-3 py-1 rounded-full text-xs font-medium transition", benchmarkCat === "summarization" ? "bg-white text-slate-950" : "text-slate-400 hover:text-white")}
                                            >
                                                Legal Text
                                            </button>
                                        </div>
                                    </div>

                                    {/* ASR Tab */}
                                    {benchmarkCat === "asr" && (
                                        <div className="space-y-6">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {/* WER Chart */}
                                                <Card className="border-white/5 bg-slate-900/40 p-4">
                                                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                                        <TrendingUp className="h-4 w-4 text-cyan-400" />
                                                        Word Error Rate (WER %) - Lower is Better
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {BENCHMARK_METRICS.asr.map((item, idx) => (
                                                            <div key={idx} className="space-y-1">
                                                                <div className="flex justify-between text-xs text-slate-300 font-medium">
                                                                    <span>{item.model}</span>
                                                                    <span className="font-mono text-cyan-300">{item.wer}%</span>
                                                                </div>
                                                                <div className="h-2.5 bg-slate-950/80 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${(item.wer / 20) * 100}%` }}
                                                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                                                        className={cn("h-full bg-gradient-to-r", item.color)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Card>

                                                {/* Latency Chart */}
                                                <Card className="border-white/5 bg-slate-900/40 p-4">
                                                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                                        <Hourglass className="h-4 w-4 text-violet-400" />
                                                        Transcription Latency (ms) - Lower is Better
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {BENCHMARK_METRICS.asr.map((item, idx) => (
                                                            <div key={idx} className="space-y-1">
                                                                <div className="flex justify-between text-xs text-slate-300 font-medium">
                                                                    <span>{item.model}</span>
                                                                    <span className="font-mono text-violet-300">{item.latency} ms</span>
                                                                </div>
                                                                <div className="h-2.5 bg-slate-950/80 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${(item.latency / 800) * 100}%` }}
                                                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                                                        className={cn("h-full bg-gradient-to-r", item.color.replace("cyan", "violet").replace("blue", "violet"))}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Card>
                                            </div>
                                            <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4 text-xs flex justify-between items-center text-slate-400">
                                                <span>Average Cost per 1k characters:</span>
                                                <span className="text-emerald-400 font-mono font-semibold">Gemini 2.5 Flash ($0.003) &lt; Whisper ($0.008) &lt; ElevenLabs ($0.015)</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Histoscan Tab */}
                                    {benchmarkCat === "histoscan" && (
                                        <div className="space-y-6">
                                            <Card className="border-white/5 bg-slate-900/40 p-4 space-y-4">
                                                <div className="text-xs text-slate-300 leading-relaxed font-sans">{BENCHMARK_METRICS.histoscan.description}</div>
                                                
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    {BENCHMARK_METRICS.histoscan.results.map((res, idx) => (
                                                        <div key={idx} className="rounded-xl border border-white/5 bg-slate-950/50 p-4 space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm font-semibold text-white">{res.system}</span>
                                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300">{res.accuracy}% Accuracy</span>
                                                            </div>
                                                            <div className="text-xs text-slate-400 space-y-1 font-mono">
                                                                <div>Latency: {res.latency} ms</div>
                                                                <div>Pricing: ${res.cost.toFixed(2)} / 1K requests</div>
                                                                <div className="text-slate-300 font-sans italic mt-2">"{res.notes}"</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>

                                            {/* Ingestion Simulator */}
                                            <div className="rounded-xl border border-cyan-500/10 bg-slate-950/70 p-4 space-y-4">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="font-semibold text-slate-300">Histopathology Tissue Scan Simulator (1,000 Slide Run)</span>
                                                    <Button
                                                        size="sm"
                                                        onClick={runHistoscanSimulation}
                                                        disabled={simulatingHistoscan}
                                                        className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-[10px] font-semibold px-3 py-1.5 h-auto rounded-md"
                                                    >
                                                        {simulatingHistoscan ? `Scanning (${histoscanProgress}%)` : "Trigger 1000 slide Benchmark"}
                                                    </Button>
                                                </div>

                                                {/* SCANNING PROGRESS VISUAL */}
                                                {simulatingHistoscan && (
                                                    <div className="space-y-2">
                                                        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                                            <div className="h-full bg-cyan-400 transition-all duration-75" style={{ width: `${histoscanProgress}%` }} />
                                                        </div>
                                                        
                                                        {/* Scanning cell grid mock */}
                                                        <div className="grid grid-cols-5 gap-1 h-12">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <div key={i} className="bg-cyan-950/20 border border-cyan-500/10 rounded flex items-center justify-center relative overflow-hidden">
                                                                    <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                                                                    <span className="text-[8px] text-cyan-400 font-mono">CELL_{100 + i * 2}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {histoscanOutputs.length > 0 && (
                                                    <div className="space-y-2">
                                                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">Live Pipeline Output Stream:</div>
                                                        <div className="space-y-1.5">
                                                            {histoscanOutputs.map((out, idx) => (
                                                                <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-lg p-2 text-xs font-mono">
                                                                    <span className="text-slate-300">{out.id}</span>
                                                                    <span className="text-slate-400">Ground Truth: {out.label}</span>
                                                                    <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-semibold", out.correct ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400")}>
                                                                        Pred: {out.prediction} ({out.correct ? "PASS" : "FAIL"})
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Summarization Tab */}
                                    {benchmarkCat === "summarization" && (
                                        <div className="space-y-6">
                                            <Card className="border-white/5 bg-slate-900/40 overflow-hidden">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left text-xs">
                                                        <thead className="bg-slate-950/80 border-b border-white/10 uppercase tracking-wider text-[10px] text-slate-400 font-sans">
                                                            <tr>
                                                                <th className="px-4 py-3 font-semibold">Model Baseline</th>
                                                                <th className="px-4 py-3 font-semibold">Factual Accuracy (%)</th>
                                                                <th className="px-4 py-3 font-semibold">Conciseness Score</th>
                                                                <th className="px-4 py-3 font-semibold">Inference Speed (Tokens/s)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                                                            {BENCHMARK_METRICS.summarization.map((row, idx) => (
                                                                <tr key={idx} className="hover:bg-white/5 transition">
                                                                    <td className="px-4 py-3 font-sans text-white font-medium">{row.model}</td>
                                                                    <td className="px-4 py-3 text-cyan-300">{row.accuracy}%</td>
                                                                    <td className="px-4 py-3 text-violet-300">{row.conciseness} / 100</td>
                                                                    <td className="px-4 py-3 text-emerald-300">{row.tps} tps</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Card>
                                            <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4 text-xs text-slate-400 leading-relaxed font-sans flex items-start gap-3">
                                                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                                <p>
                                                    <strong>Factual Accuracy Metric:</strong> Calculated by auditing references in summarized legal headnotes against core citations inside primary source drafts using LLM-as-a-judge evaluation frameworks.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* ========================================================
                                TAB 5: SPEECH2VEC BIOMETRICS CONTAINER
                                ======================================================== */}
                            {activeTab === "biometrics" && (
                                <motion.div
                                    key="biometrics"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">speech2vec Voice Biometrics</h3>
                                            <p className="text-sm text-slate-400">Self-supervised acoustic word embeddings & DBSCAN voice clustering.</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Select Voice Sample:</span>
                                            <select
                                                value={selectedBioSample}
                                                onChange={(e) => setSelectedBioSample(e.target.value as BiometricSample)}
                                                className="rounded-lg border border-white/15 bg-slate-950/80 px-3 py-1.5 text-xs text-white focus-ring"
                                            >
                                                <option value="sample_a">Validation Sample A (John)</option>
                                                <option value="sample_b">Validation Sample B (Sarah)</option>
                                                <option value="unknown">Static Background Sample</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* SCATTER CLUSTER GRAPH */}
                                        <Card className="border-white/5 bg-slate-900/40 p-4 space-y-4">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-semibold text-slate-300">speech2vec Embedding Latent Space</span>
                                                <div className="flex gap-2 text-[10px]">
                                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan-400" />John</span>
                                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet-400" />Sarah</span>
                                                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-400" />Michael</span>
                                                </div>
                                            </div>

                                            {/* SVG Graph */}
                                            <div className="h-60 bg-slate-950/90 rounded-xl relative overflow-hidden border border-white/5 flex items-center justify-center">
                                                <svg className="w-full h-full p-4" viewBox="0 0 100 100">
                                                    {/* Grid lines */}
                                                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                                                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                                                    
                                                    {/* Clusters */}
                                                    {BIOMETRIC_CLUSTERS.map((pt, i) => (
                                                        <circle
                                                            key={i}
                                                            cx={pt.x}
                                                            cy={pt.y}
                                                            r="2.5"
                                                            className={cn("transition-all duration-300", pt.color)}
                                                        >
                                                            <title>{pt.label}</title>
                                                        </circle>
                                                    ))}

                                                    {/* Test Point (Target projection) */}
                                                    {bioPlotDot && (
                                                        <motion.circle
                                                            initial={{ cx: 50, cy: 50, r: 8, opacity: 0 }}
                                                            animate={{ cx: bioPlotDot.x, cy: bioPlotDot.y, r: 3.5, opacity: 1 }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className="fill-red-500 stroke-white stroke-1"
                                                        />
                                                    )}
                                                </svg>
                                                {/* Latent space labels */}
                                                <div className="absolute bottom-2 left-2 text-[9px] text-slate-500 font-mono">speech2vec dim_1</div>
                                                <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono rotate-90 origin-top-left">speech2vec dim_2</div>
                                            </div>
                                        </Card>

                                        {/* INFERENCE WORKFLOW */}
                                        <Card className="border-white/5 bg-slate-900/40 p-4 flex flex-col justify-between">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                                    <span className="font-semibold text-slate-300">Biometric Verification Pipeline</span>
                                                    <span className="font-mono text-cyan-400 text-[10px]">{BIOMETRIC_SAMPLES[selectedBioSample].file}</span>
                                                </div>

                                                <div className="space-y-3 text-xs">
                                                    {/* Step 1: Band-pass filter */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-slate-400">1. Audio Level Normalization & Noise Filters</span>
                                                        <span className={cn("font-medium", bioStep !== "idle" ? "text-emerald-400 font-mono" : "text-slate-500")}>
                                                            {bioStep === "idle" ? "Pending" : bioStep === "filtering" ? "Filtering..." : "COMPLETED"}
                                                        </span>
                                                    </div>

                                                    {/* Step 2: MFCC */}
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-slate-400">2. Mel-Frequency Coefficients (MFCC)</span>
                                                            <span className={cn("font-medium", (bioStep !== "idle" && bioStep !== "filtering") ? "text-emerald-400 font-mono" : "text-slate-500")}>
                                                                {bioStep === "idle" || bioStep === "filtering" ? "Pending" : bioStep === "mfcc" ? "Extracting..." : "13-MFCC EXTRACTED"}
                                                            </span>
                                                        </div>
                                                        {bioStep !== "idle" && bioStep !== "filtering" && (
                                                            <div className="flex gap-1 items-end h-6 px-1 bg-slate-950/80 rounded border border-white/5 py-1">
                                                                {BIOMETRIC_SAMPLES[selectedBioSample].mfccs.map((val, i) => {
                                                                    const normalizedHeight = Math.min(100, Math.max(10, (Math.abs(val) / 15) * 100));
                                                                    return (
                                                                        <div
                                                                            key={i}
                                                                            className="flex-1 bg-cyan-400 rounded-t"
                                                                            style={{ height: `${normalizedHeight}%` }}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Step 3: Projection */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-slate-400">3. Latent Vector Mapping (wav2vec 2.0)</span>
                                                        <span className={cn("font-medium", (bioStep === "projection" || bioStep === "done") ? "text-emerald-400 font-mono" : "text-slate-500")}>
                                                            {bioStep === "projection" ? "Projecting..." : bioStep === "done" ? "MAPPED" : "Pending"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/5 mt-4 space-y-4">
                                                {bioStep === "done" && (
                                                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs space-y-1 font-sans">
                                                        <div className="flex justify-between font-semibold text-emerald-400">
                                                            <span>Speaker Identity: {BIOMETRIC_SAMPLES[selectedBioSample].agent}</span>
                                                            <span>Match: {BIOMETRIC_SAMPLES[selectedBioSample].confidence}%</span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                                                            Euclidean cluster distance: {(1 - BIOMETRIC_SAMPLES[selectedBioSample].confidence/100).toFixed(4)} (DBSCAN classified)
                                                        </p>
                                                    </div>
                                                )}

                                                <Button
                                                    onClick={handleVerifyBiometrics}
                                                    disabled={isVerifyingBio}
                                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold"
                                                >
                                                    {isVerifyingBio ? "Verifying Voice Print..." : "Analyze & Verify Voiceprint"}
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}

                            {/* ========================================================
                                TAB 6: SUPABASE RLS CONTAINER
                                ======================================================== */}
                            {activeTab === "rls" && (
                                <motion.div
                                    key="rls"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">Supabase Row-Level Security Console</h3>
                                            <p className="text-sm text-slate-400">Simulate how PostgreSQL isolates rows dynamically based on JWT headers.</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">User Role JWT:</span>
                                            <select
                                                value={rlsRole}
                                                onChange={(e) => setRlsRole(e.target.value as RLSRole)}
                                                className="rounded-lg border border-white/15 bg-slate-950/80 px-3 py-1.5 text-xs text-white focus-ring"
                                            >
                                                <option value="guest">Guest (Anonymous auth.uid = null)</option>
                                                <option value="member_101">Venture Member (Group 101 JWT)</option>
                                                <option value="member_102">Ad-hoc Investor (Group 102 JWT)</option>
                                                <option value="admin">Admin / Superuser (Bypass RLS)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* SQL policy viewer */}
                                        <Card className="border-white/5 bg-slate-900/40 p-4 space-y-4">
                                            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                                <span className="font-semibold text-slate-300">Compiled Security Policies</span>
                                                <Lock className="h-4 w-4 text-cyan-400" />
                                            </div>

                                            <div className="space-y-3 font-mono text-xs">
                                                <div className="rounded-xl border border-white/5 bg-slate-950/90 p-3 leading-relaxed text-slate-400">
                                                    <span className="text-violet-400">CREATE POLICY</span> "deals_policy" <br />
                                                    <span className="text-violet-400">ON</span> deals <br />
                                                    <span className="text-violet-400">FOR SELECT USING</span> (<br />
                                                    &nbsp;&nbsp;is_public = TRUE <br />
                                                    &nbsp;&nbsp;<span className="text-violet-400">OR EXISTS</span> (<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">SELECT</span> 1 <br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">FROM</span> group_members <br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">WHERE</span> group_id = deals.associated_group_id <br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">AND</span> user_id = auth.uid()<br />
                                                    &nbsp;&nbsp;)<br />
                                                    );
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans">Active Postgres Execution Query:</div>
                                                    <div className="rounded-xl border border-cyan-500/10 bg-cyan-950/15 p-3 text-cyan-300 whitespace-pre-wrap leading-relaxed">
                                                        {getSQLQuery()}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Resulting database table */}
                                        <Card className="border-white/5 bg-slate-900/40 p-4 space-y-4">
                                            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                                                <span className="font-semibold text-slate-300">Resulting Database Rows</span>
                                                <span className="font-mono text-slate-400">{getFilteredRows().length} rows returned</span>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-[11px] font-sans">
                                                    <thead className="bg-slate-950/80 uppercase tracking-wider text-[9px] text-slate-400 font-sans border-b border-white/5">
                                                        <tr>
                                                            <th className="px-3 py-2">ID</th>
                                                            <th className="px-3 py-2">Deal name</th>
                                                            <th className="px-3 py-2">Group ID</th>
                                                            <th className="px-3 py-2">Visibility</th>
                                                            <th className="px-3 py-2">Valuation</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                                                        {getFilteredRows().map((row, idx) => (
                                                            <tr key={idx} className="hover:bg-white/5 transition">
                                                                <td className="px-3 py-2 text-slate-500">{row.id}</td>
                                                                <td className="px-3 py-2 text-white font-sans font-medium">{row.title}</td>
                                                                <td className="px-3 py-2 text-cyan-300">{row.group}</td>
                                                                <td className="px-3 py-2 text-violet-300">{row.is_public ? "PUBLIC" : "PRIVATE"}</td>
                                                                <td className="px-3 py-2 text-emerald-300">{row.valuation}</td>
                                                            </tr>
                                                        ))}
                                                        {getFilteredRows().length === 0 && (
                                                            <tr>
                                                                <td colSpan={5} className="px-3 py-6 text-center text-slate-500 italic">No accessible rows (RLS query blocked all rows).</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="rounded-lg bg-cyan-950/20 border border-cyan-500/10 p-3 text-[10px] text-slate-300 leading-relaxed font-sans">
                                                <strong>Security Analysis:</strong> When querying `/deals`, Supabase automatically intercepts the client JWT, extracts `auth.uid()`, compiles RLS policies as filters inside the SQL execution plan, and isolates data at the DB level, preventing leakage of private deals.
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
