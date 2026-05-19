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
    FileSymlink,
    BarChart3,
    Smile,
    Volume2,
    Hourglass,
    CheckCircle2,
    Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ==========================================
// OFFLINE CHATBOT KNOWLEDGE BASE & SIMULATOR
// ==========================================
type KnowledgeKey = "default" | "nyaay" | "council" | "voice_agent" | "opticall" | "skills" | "internships" | "contact";

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
                 "- **telephony stream:** Connected Twilio Voice API over bidirectional WebSockets to stream raw, base64 audio.\n" +
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
             "- **Hugging Face:** [huggingface.co/spaces/Arnavbhatia/Food_Vision](https://huggingface.co/spaces/Arnavbhatia/Food_Vision)"
};

// Map message keywords to knowledge base keys
const matchKeyword = (msg: string): KnowledgeKey => {
    const text = msg.toLowerCase();
    if (text.includes("nyaay")) return "nyaay";
    if (text.includes("council") || text.includes("panscience.ai")) return "council";
    if (text.includes("voice") || text.includes("twilio") || text.includes("phone")) return "voice_agent";
    if (text.includes("opticall") || text.includes("analytics") || text.includes("audio")) return "opticall";
    if (text.includes("skill") || text.includes("tech") || text.includes("stack")) return "skills";
    if (text.includes("intern") || text.includes("experience") || text.includes("job") || text.includes("work")) return "internships";
    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach")) return "contact";
    return "default";
};

// ==========================================
// NYAAY AI RAG SIMULATOR DATA
// ==========================================
type LegalDocType = "nda" | "lease";
type LegalQueryType = "data_leak" | "rent_payment";

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

export function AISandbox() {
    const [activeTab, setActiveTab] = useState<"chatbot" | "rag" | "opticall">("chatbot");

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
                // Fallback to offline matcher
                const kbKey = matchKeyword(text);
                setMessages(prev => [...prev, { sender: "bot", text: OFFLINE_KB[kbKey] }]);
            }
        } catch (e) {
            // Fallback on error (backend offline)
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

    const handleRagReset = () => {
        setRagStep(0);
    };

    useEffect(() => {
        setRagStep(0);
    }, [ragDocType]);

    // ----------------------------------------
    // OPTICALL TAB STATE
    // ----------------------------------------
    const [callType, setCallType] = useState<CallType>("billing");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playProgress, setPlayProgress] = useState(0); // 0 to 100
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

    // Track transcript highlighting based on playhead
    useEffect(() => {
        if (playProgress === 0) {
            setActiveTranscriptIndex(-1);
            return;
        }
        const numItems = currentCall.transcript.length;
        const index = Math.min(Math.floor((playProgress / 100) * numItems), numItems - 1);
        setActiveTranscriptIndex(index);
    }, [playProgress, currentCall.transcript.length]);

    // Get dynamic customer sentiment during play progress
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
                    Interact directly with simulated and live AI platforms built by Arnav. Toggle the tabs below to explore the legal RAG engine, audio intelligence systems, or ask my AI clone questions.
                </p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
                <button
                    onClick={() => setActiveTab("chatbot")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border",
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
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border",
                        activeTab === "rag"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <Database className="h-4 w-4" />
                    NYAAY AI RAG Simulator
                </button>
                <button
                    onClick={() => setActiveTab("opticall")}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border",
                        activeTab === "opticall"
                            ? "bg-white text-slate-950 border-white"
                            : "border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5"
                    )}
                >
                    <Activity className="h-4 w-4" />
                    Opticall Call Console
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

                                    {/* MESSAGE LIST */}
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
                                                        : "bg-[#0b1531]/75 border-cyan-500/20 text-slate-200"
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

                                    {/* QUICK SUGGESTIONS */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <button
                                            onClick={() => handleSendMessage("Explain the NYAAY AI project")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            ⚖️ Legal RAG
                                        </button>
                                        <button
                                            onClick={() => handleSendMessage("Tell me about council.panscience.ai")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            📚 Council ERP
                                        </button>
                                        <button
                                            onClick={() => handleSendMessage("How does the real-time Twilio voice agent work?")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            📞 Voice Agent
                                        </button>
                                        <button
                                            onClick={() => handleSendMessage("What is your tech stack?")}
                                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white transition"
                                        >
                                            💻 Tech Stack
                                        </button>
                                    </div>

                                    {/* INPUT FIELD */}
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
                                        {/* Background connecting lines */}
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
                                                                <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans mb-1">
                                                                    <span>ID: {chk.id}</span>
                                                                    <span className="text-cyan-300">Distance Score: {chk.score}</span>
                                                                </div>
                                                                <p className="text-slate-300 italic">"{chk.text}"</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {ragStep === 4 && (
                                                <div className="space-y-2">
                                                    <div className="text-[11px] text-slate-400 uppercase tracking-wider font-sans">LLM Final Answer (Synthesized Context):</div>
                                                    <div className="rounded-2xl border border-emerald-500/10 bg-[#051c14]/40 p-4 text-xs font-sans text-emerald-200 leading-6">
                                                        <Sparkles className="h-4 w-4 text-emerald-400 inline-block mr-2 align-text-bottom" />
                                                        {RAG_QUERIES[ragDocType].synthesis}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* CONTROLS */}
                                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                        <div className="text-xs text-slate-400 font-sans">
                                            Step <span className="font-semibold text-white">{ragStep + 1}</span> of {totalRagSteps}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleRagReset}
                                                disabled={ragStep === 0}
                                            >
                                                Reset
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleRagPrev}
                                                disabled={ragStep === 0}
                                            >
                                                Back
                                            </Button>
                                            {ragStep < totalRagSteps - 1 ? (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={handleRagNext}
                                                    className="border border-cyan-400/20"
                                                >
                                                    Next Step
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="accent"
                                                    size="sm"
                                                    onClick={() => setRagDocType(ragDocType === "nda" ? "lease" : "nda")}
                                                >
                                                    Try Other Document
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ========================================================
                                TAB 3: OPTICALL CALL CONSOLE CONTAINER
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
                                            <h3 className="text-xl font-semibold text-white">Opticall Audio Intelligence Dashboard</h3>
                                            <p className="text-sm text-slate-400">Audio segmentation and sentiment evaluation dashboard.</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Select Call File:</span>
                                            <select
                                                value={callType}
                                                onChange={(e) => setCallType(e.target.value as CallType)}
                                                className="rounded-lg border border-white/15 bg-slate-950/80 px-3 py-1.5 text-xs text-white focus-ring"
                                            >
                                                <option value="billing">double_billing_escalation.wav</option>
                                                <option value="sales">publisher_erp_demo.wav</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* SIMULATED AUDIO WAVEFORM PLAYER */}
                                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 flex flex-col gap-3">
                                        <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span className="flex items-center gap-1.5 text-cyan-200">
                                                <Volume2 className="h-3.5 w-3.5" />
                                                {currentCall.title}
                                            </span>
                                            <span>Duration: {currentCall.duration}</span>
                                        </div>

                                        {/* WAVEFORM GRID AND PLAYHEAD */}
                                        <div className="relative h-16 bg-slate-900/60 rounded-xl overflow-hidden border border-white/5 flex items-end px-4 pb-2 gap-0.5">
                                            {/* Bar generation (40 bars) */}
                                            {Array.from({ length: 40 }).map((_, idx) => {
                                                const seed = Math.sin((idx + (callType === "billing" ? 2 : 5)) * 0.7);
                                                const heightPercent = 20 + Math.abs(seed) * 70;
                                                const isPassed = playProgress > (idx / 40) * 100;
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "flex-1 rounded-full transition-all duration-300",
                                                            isPassed
                                                                ? "bg-cyan-400"
                                                                : "bg-slate-700"
                                                        )}
                                                        style={{ height: `${heightPercent}%` }}
                                                    />
                                                );
                                            })}
                                            {/* Playhead bar */}
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
                                                    className="h-9 w-9 rounded-full p-0 flex items-center justify-center"
                                                >
                                                    {isPlaying ? <Pause className="h-4.5 w-4.5 text-white" /> : <Play className="h-4.5 w-4.5 text-white ml-0.5" />}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleResetCall}
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
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
