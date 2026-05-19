"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    Layers,
    Lock,
    GitBranch,
    Server,
    Cpu,
    Database,
    Zap,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SystemArchitecture = "ingestion" | "voice" | "rls" | "multiagent";

export function MethodologyCards() {
    const [selectedArch, setSelectedArch] = useState<SystemArchitecture>("ingestion");

    return (
        <section id="methodologies" className="scroll-mt-28 py-20 border-t border-white/5">
            <div className="max-w-3xl space-y-4 mb-12">
                <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-violet-200">
                    <Layers className="h-3.5 w-3.5" />
                    Engineering Paradigms
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    System Architecture & <span className="text-gradient">Blueprints</span>
                </h2>
                <p className="text-base leading-7 text-slate-300 sm:text-lg">
                    A deep dive into the design patterns, event-driven pipelines, and security mechanisms deployed across my projects. Click on the architectures to see data flow diagrams.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
                {/* ARCHITECTURE MENU SELECTOR */}
                <div className="lg:col-span-5 space-y-3">
                    <button
                        onClick={() => setSelectedArch("ingestion")}
                        className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover:bg-white/5",
                            selectedArch === "ingestion"
                                ? "bg-white/10 border-cyan-500/30 shadow-md shadow-cyan-500/5"
                                : "bg-transparent border-white/5"
                        )}
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center border",
                            selectedArch === "ingestion" ? "bg-cyan-500/10 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 text-slate-400"
                        )}>
                            <Server className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white flex items-center justify-between">
                                Event-Driven Data Ingestion
                                <ChevronRight className={cn("h-4 w-4 transition-transform", selectedArch === "ingestion" ? "translate-x-1" : "text-slate-500")} />
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 leading-normal">AWS S3 file notifications, SQS message queuing, and EC2 chunking microservices.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedArch("voice")}
                        className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover:bg-white/5",
                            selectedArch === "voice"
                                ? "bg-white/10 border-violet-500/30 shadow-md shadow-violet-500/5"
                                : "bg-transparent border-white/5"
                        )}
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center border",
                            selectedArch === "voice" ? "bg-violet-500/10 border-violet-400 text-violet-300" : "bg-white/5 border-white/10 text-slate-400"
                        )}>
                            <Activity className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white flex items-center justify-between">
                                Real-Time Audio Streaming
                                <ChevronRight className={cn("h-4 w-4 transition-transform", selectedArch === "voice" ? "translate-x-1" : "text-slate-500")} />
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 leading-normal">Bidirectional raw WebSockets connecting Twilio telecommunication audio streams to LLMs.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedArch("rls")}
                        className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover:bg-white/5",
                            selectedArch === "rls"
                                ? "bg-white/10 border-blue-500/30 shadow-md shadow-blue-500/5"
                                : "bg-transparent border-white/5"
                        )}
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center border",
                            selectedArch === "rls" ? "bg-blue-500/10 border-blue-400 text-blue-300" : "bg-white/5 border-white/10 text-slate-400"
                        )}>
                            <Lock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white flex items-center justify-between">
                                Row-Level Security Isolation
                                <ChevronRight className={cn("h-4 w-4 transition-transform", selectedArch === "rls" ? "translate-x-1" : "text-slate-500")} />
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 leading-normal">Supabase relational policies appending runtime user conditions to DB tables.</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedArch("multiagent")}
                        className={cn(
                            "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover:bg-white/5",
                            selectedArch === "multiagent"
                                ? "bg-white/10 border-emerald-500/30 shadow-md shadow-emerald-500/5"
                                : "bg-transparent border-white/5"
                        )}
                    >
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center border",
                            selectedArch === "multiagent" ? "bg-emerald-500/10 border-emerald-400 text-emerald-300" : "bg-white/5 border-white/10 text-slate-400"
                        )}>
                            <GitBranch className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white flex items-center justify-between">
                                Multi-Agent Collaboration
                                <ChevronRight className={cn("h-4 w-4 transition-transform", selectedArch === "multiagent" ? "translate-x-1" : "text-slate-500")} />
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 leading-normal">LangGraph state management routing queries dynamically to dedicated worker domains.</p>
                        </div>
                    </button>
                </div>

                {/* ARCHITECTURE DIAGRAM RENDERING */}
                <div className="lg:col-span-7">
                    <Card className="glass-panel border-white/10 min-h-[380px] overflow-hidden flex flex-col justify-between">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                {selectedArch === "ingestion" && "Ingestion Pipeline Blueprint"}
                                {selectedArch === "voice" && "Voice Streaming Pipeline Blueprint"}
                                {selectedArch === "rls" && "DB Authorization & RLS Blueprint"}
                                {selectedArch === "multiagent" && "Multi-Agent Collaboration Graph"}
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-400">
                                {selectedArch === "ingestion" && "Handles massive PDF and document uploads asynchronously to prevent web thread locking."}
                                {selectedArch === "voice" && "Low-latency streaming loop with server-side interruption and audio buffer cleaning."}
                                {selectedArch === "rls" && "Strict database-level user boundary checking on Supabase tables."}
                                {selectedArch === "multiagent" && "Agentic loops where state gets validated and compiled by router nodes."}
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-6 flex-1 flex flex-col justify-center items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedArch}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    {/* Ingestion Blueprint SVG */}
                                    {selectedArch === "ingestion" && (
                                        <div className="space-y-6">
                                            <div className="relative h-28 w-full flex items-center justify-between px-4 rounded-xl bg-slate-950/60 border border-white/5">
                                                {/* Left Node */}
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                                                        <Database className="h-5 w-5 animate-pulse" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">AWS S3</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                {/* Queue Node */}
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300">
                                                        <Zap className="h-5 w-5 animate-bounce" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">AWS SQS</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                {/* Processing Worker */}
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-violet-950 border border-violet-400 flex items-center justify-center text-violet-300">
                                                        <Cpu className="h-5 w-5 animate-spin-slow" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">EC2 Worker</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                {/* Final Database */}
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300">
                                                        <Database className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">pgvector DB</span>
                                                </div>
                                            </div>
                                            
                                            <div className="text-xs space-y-1.5 leading-relaxed text-slate-400">
                                                <div className="text-slate-300 font-semibold">Data Flow Breakdown:</div>
                                                <p>1. User drops PDF files into AWS S3 &rarr; S3 issues an ObjectCreated event webhook.</p>
                                                <p>2. Event gets queued in AWS SQS message broker to preserve message order and manage network spikes.</p>
                                                <p>3. CPU-optimized EC2 poller workers pull messages, download file chunks, run text splitters, and fetch text embeddings.</p>
                                                <p>4. Multi-dimensional vectors are loaded into PostgreSQL (RDS) tables via <span className="text-cyan-400 font-mono">pgvector</span> similarity indexes.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Voice Blueprint SVG */}
                                    {selectedArch === "voice" && (
                                        <div className="space-y-6">
                                            <div className="relative h-28 w-full flex items-center justify-between px-4 rounded-xl bg-slate-950/60 border border-white/5">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-violet-950 border border-violet-400 flex items-center justify-center text-violet-300">
                                                        <Server className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">Twilio SIP</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                                                        <Cpu className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">WebSockets</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300 animate-pulse">
                                                        <Server className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">Acoustic Model</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-pink-950 border border-pink-400 flex items-center justify-center text-pink-300">
                                                        <Cpu className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">ElevenLabs</span>
                                                </div>
                                            </div>

                                            <div className="text-xs space-y-1.5 leading-relaxed text-slate-400">
                                                <div className="text-slate-300 font-semibold">Data Flow Breakdown:</div>
                                                <p>1. User telephony voice stream in Twilio is captured as base64-encoded audio chunks.</p>
                                                <p>2. Audio blocks stream bidirectionally over WebSockets to a FastAPI server with sub-10ms pipeline transit.</p>
                                                <p>3. Whisper/Deepgram translates voice, LangChain decides response state, and ElevenLabs generates TTS.</p>
                                                <p>4. **Barge-in Interrupt:** Server-side energy threshold monitors vocal spikes, immediately clearing local buffers when user begins speaking.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* RLS Blueprint SVG */}
                                    {selectedArch === "rls" && (
                                        <div className="space-y-6">
                                            <div className="relative h-28 w-full flex items-center justify-between px-8 rounded-xl bg-slate-950/60 border border-white/5">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-950 border border-blue-400 flex items-center justify-center text-blue-300">
                                                        <Server className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">Client JWT</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-violet-950 border border-violet-400 flex items-center justify-center text-violet-300 animate-pulse">
                                                        <Lock className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">RLS Middleware</span>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-slate-600" />

                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300">
                                                        <Database className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">PostgreSQL</span>
                                                </div>
                                            </div>

                                            <div className="text-xs space-y-1.5 leading-relaxed text-slate-400">
                                                <div className="text-slate-300 font-semibold">Data Flow Breakdown:</div>
                                                <p>1. User logs into the frontend; Supabase Auth issues a cryptographically signed JWT token.</p>
                                                <p>2. SQL queries targeting tables include the JWT header &rarr; Supabase intercepts and extracts `auth.uid()` identity.</p>
                                                <p>3. PostgreSQL applies table-level RLS policies, evaluating `EXISTS` user-group conditions.</p>
                                                <p>4. DB physically strips non-matching records inside the query executor, guaranteeing zero data leakage.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Multi-Agent Blueprint SVG */}
                                    {selectedArch === "multiagent" && (
                                        <div className="space-y-6">
                                            <div className="relative h-28 w-full flex items-center justify-center gap-8 rounded-xl bg-slate-950/60 border border-white/5">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300">
                                                        <Cpu className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400">Supervisor</span>
                                                </div>

                                                <div className="flex flex-col justify-center gap-2">
                                                    <div className="h-0.5 w-10 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                                                    <div className="h-0.5 w-10 bg-gradient-to-r from-emerald-500 to-purple-500" />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-7 w-7 rounded bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 text-xs">A</div>
                                                        <span className="text-[9px] font-mono text-slate-400">Research Agent</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-7 w-7 rounded bg-purple-950 border border-purple-400 flex items-center justify-center text-purple-300 text-xs">B</div>
                                                        <span className="text-[9px] font-mono text-slate-400">Coding Agent</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-xs space-y-1.5 leading-relaxed text-slate-400">
                                                <div className="text-slate-300 font-semibold">Data Flow Breakdown:</div>
                                                <p>1. Prompt queries enter the supervisor agent node running a centralized system prompt.</p>
                                                <p>2. Supervisor identifies intent and routes state coordinates to sub-agents (e.g. Research, CodeWriter).</p>
                                                <p>3. Sub-agents execute narrow tool scopes, returning execution states back to the shared graph memory.</p>
                                                <p>4. A validation layer checks agent responses, repeating loops asynchronously until criteria are achieved.</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
