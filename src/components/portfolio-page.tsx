"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    BrainCircuit,
    BriefcaseBusiness,
    Code2,
    Download,
    MapPin,
    Sparkles,
    Star,
    Zap,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiHuggingface } from "react-icons/si";

import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { AISandbox } from "@/components/ai-sandbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

type PortfolioPageProps = {
    content: SiteContent;
};

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            <p className="text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
        </div>
    );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 900;
        const start = performance.now();
        let frame = 0;

        const tick = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            setCount(Math.floor(progress * value));

            if (progress < 1) {
                frame = window.requestAnimationFrame(tick);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => window.cancelAnimationFrame(frame);
    }, [value]);

    return (
        <span className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {count}
            {suffix}
        </span>
    );
}

function MotionSection({
    id,
    children,
    className,
}: {
    id: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={cn("scroll-mt-28 py-20 sm:py-24", className)}
        >
            {children}
        </motion.section>
    );
}

export function PortfolioPage({ content }: PortfolioPageProps) {
    const [activeRoleIndex, setActiveRoleIndex] = useState(0);
    const activeRole = content.roles[activeRoleIndex] ?? content.role;

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveRoleIndex((current) => (current + 1) % content.roles.length);
        }, 2200);

        return () => window.clearInterval(timer);
    }, [content.roles.length]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
            <div className="pointer-events-none absolute inset-0 portfolio-grid opacity-30" />
            <div className="pointer-events-none absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-36 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

            <SiteHeader content={content} />

            <main className="relative mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
                <section id="home" className="grid min-h-[calc(100vh-7rem)] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-6"
                        >
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
                                <Zap className="h-3.5 w-3.5 text-cyan-300" />
                                India-based AI engineer crafting startup-grade products
                            </p>

                            <div className="space-y-4">
                                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                    Arnav Bhatia builds <span className="text-gradient">AI systems</span> that feel like premium products.
                                </h1>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={activeRole}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35 }}
                                        className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
                                    >
                                        {content.tagline} Currently focused on {activeRole.toLowerCase()} workflows, intelligent automation,
                                        and full-stack AI experiences.
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button asChild variant="accent" size="lg">
                                    <a href="#projects">
                                        View Projects
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button asChild variant="secondary" size="lg">
                                    <a href="#contact">Contact Me</a>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <a href={content.resumeHref} target="_blank" rel="noreferrer">
                                        <Download className="h-4 w-4" />
                                        Download Resume
                                    </a>
                                </Button>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-slate-300">
                                <a className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white" href={content.github} target="_blank" rel="noreferrer">
                                    <FaGithub className="h-4 w-4" /> GitHub
                                </a>
                                <a className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white" href={content.linkedin} target="_blank" rel="noreferrer">
                                    <FaLinkedinIn className="h-4 w-4" /> LinkedIn
                                </a>
                                <a className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:text-white" href={content.huggingFace} target="_blank" rel="noreferrer">
                                    <SiHuggingface className="h-4 w-4" /> Hugging Face
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
                        <Card className="relative overflow-hidden border-white/10 bg-white/5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_26%)]" />
                            <CardHeader className="relative">
                                <p className="inline-flex items-center gap-2 text-sm text-cyan-200">
                                    <Sparkles className="h-4 w-4" /> AI portfolio snapshot
                                </p>
                                <CardTitle className="text-3xl sm:text-4xl">Premium engineering with a research mindset</CardTitle>
                                <CardDescription className="text-base text-slate-300">
                                    Legal RAG systems, LLM benchmarking, computer vision pipelines, and production-ready full-stack
                                    experiences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="relative space-y-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {content.stats.map((stat) => (
                                        <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                            <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-sm text-slate-300">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-cyan-300" /> {content.location}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Code2 className="h-4 w-4 text-violet-300" /> FastAPI, Next.js, React, Framer Motion, Tailwind CSS
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BriefcaseBusiness className="h-4 w-4 text-emerald-300" /> LLM engineering, GenAI, CV, automation
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </section>

                <MotionSection id="about">
                    <SectionHeading
                        eyebrow="About me"
                        title="AI-first problem solving with full-stack execution"
                        description={content.summary}
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <Card className="border-white/10">
                            <CardHeader>
                                <CardTitle>What I build</CardTitle>
                                <CardDescription>
                                    Systems that combine LLMs, robust backend architecture, and sharp frontend experiences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 sm:grid-cols-2">
                                {[
                                    "Generative AI products with real workflows",
                                    "Computer vision systems and inference demos",
                                    "Automation platforms powered by APIs and LLMs",
                                    "Cloud-ready, production-minded web applications",
                                ].map((item) => (
                                    <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300">
                                        {item}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-white/10">
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>Snapshot of the portfolio identity and current focus.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Role</p>
                                    <p className="mt-2 text-lg text-white">{content.role}</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Focus</p>
                                    <p className="mt-2 text-lg text-white">Generative AI, Deep Learning, Full Stack Development</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Email</p>
                                    <a className="mt-2 block text-lg text-cyan-200 transition hover:text-cyan-100" href={`mailto:${content.email}`}>
                                        {content.email}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </MotionSection>

                <MotionSection id="skills">
                    <SectionHeading
                        eyebrow="Skills"
                        title="A categorized stack for AI products and backend automation"
                        description="A balance of languages, frameworks, ML tooling, and deployment practices needed to ship polished AI systems."
                    />

                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {content.skillGroups.map((group) => (
                            <Card key={group.label} className="border-white/10">
                                <CardHeader>
                                    <CardTitle>{group.label}</CardTitle>
                                    <CardDescription>{group.summary}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </MotionSection>

                <MotionSection id="experience">
                    <SectionHeading
                        eyebrow="Experience"
                        title="Internships that shaped the product and research mindset"
                        description="A timeline of AI engineering, backend work, and product-oriented execution across legal AI, generative systems, and enterprise workflows."
                    />

                    <div className="mt-10 space-y-5">
                        {content.experiences.map((experience, index) => (
                            <Card key={`${experience.company}-${experience.role}`} className="border-white/10">
                                <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_2fr]">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">0{index + 1}</p>
                                        <h3 className="mt-2 text-2xl font-semibold text-white">{experience.company}</h3>
                                        <p className="mt-1 text-slate-300">{experience.role}</p>
                                        <p className="mt-2 text-sm text-slate-400">{experience.period}</p>
                                        {experience.location ? <p className="mt-1 text-sm text-slate-500">{experience.location}</p> : null}
                                    </div>

                                    <div className="space-y-3">
                                        {experience.highlights.map((highlight) => (
                                            <div key={highlight} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                                                <Star className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </MotionSection>

                <AISandbox />

                <MotionSection id="projects">
                    <SectionHeading
                        eyebrow="Projects"
                        title="Selected builds with AI startup energy"
                        description="Premium animated cards for the portfolio highlights you asked to showcase, with clear tech stacks and feature breakdowns."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                        {content.projects.map((project) => (
                            <Card key={project.name} className="group overflow-hidden border-white/10 transition hover:-translate-y-1 hover:border-cyan-300/30">
                                <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{project.tag}</p>
                                        {project.link ? (
                                            <a className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400" href={project.link} target="_blank" rel="noreferrer">
                                                Live Demo
                                                <ArrowRight className="h-3 w-3" />
                                            </a>
                                        ) : null}
                                    </div>
                                    <CardTitle className="text-2xl">{project.name}</CardTitle>
                                    <CardDescription className="text-base">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="grid gap-3">
                                        {project.features.map((feature) => (
                                            <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </MotionSection>

                <MotionSection id="certifications">
                    <SectionHeading
                        eyebrow="Certifications"
                        title="Continuous learning across ML, deep learning, and agentic AI"
                        description="Certifications that reinforce the foundations behind the portfolio's AI focus."
                    />

                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {content.certifications.map((certification) => (
                            <Card key={certification.name} className="border-white/10">
                                <CardHeader>
                                    <CardDescription>{certification.category}</CardDescription>
                                    <CardTitle className="text-xl">{certification.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-400">{certification.issuer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </MotionSection>

                <MotionSection id="tech-stack">
                    <SectionHeading
                        eyebrow="Tech stack"
                        title="The core tools behind the portfolio"
                        description="A compact view of the stack used to deliver the site and the work it represents."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <Card className="border-white/10">
                            <CardHeader>
                                <CardTitle>Selected stack</CardTitle>
                                <CardDescription>Core technologies used across engineering, ML, and frontend delivery.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {content.techStack.map((tech) => (
                                    <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                                        {tech}
                                    </span>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-white/10">
                            <CardHeader>
                                <CardTitle>Resume download</CardTitle>
                                <CardDescription>
                                    Keep the latest resume in the public folder at {content.resumeHref} so this button works in production.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3 sm:flex-row">
                                <Button asChild variant="accent" size="lg">
                                    <a href={content.resumeHref} target="_blank" rel="noreferrer">
                                        <Download className="h-4 w-4" />
                                        Download Resume
                                    </a>
                                </Button>
                                <Button asChild variant="secondary" size="lg">
                                    <a href={`mailto:${content.email}`}>Request a copy</a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </MotionSection>

                <MotionSection id="contact">
                    <SectionHeading
                        eyebrow="Contact"
                        title="Let’s build something intelligent and polished"
                        description="The contact section is wired to a FastAPI backend, ready for production email delivery once the backend is running."
                    />

                    <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                        <Card className="border-white/10">
                            <CardHeader>
                                <CardTitle>Reach out</CardTitle>
                                <CardDescription>Open for AI/ML internships, product builds, and collaborative research work.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-slate-300">
                                <p className="rounded-3xl border border-white/10 bg-white/5 p-5">Email: {content.email}</p>
                                <p className="rounded-3xl border border-white/10 bg-white/5 p-5">Location: {content.location}</p>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:bg-white/10" href={content.github} target="_blank" rel="noreferrer">
                                        GitHub
                                    </a>
                                    <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:bg-white/10" href={content.linkedin} target="_blank" rel="noreferrer">
                                        LinkedIn
                                    </a>
                                    <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/40 hover:bg-white/10" href={content.huggingFace} target="_blank" rel="noreferrer">
                                        Hugging Face
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <ContactForm content={content} />
                    </div>
                </MotionSection>

                <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p>© {new Date().getFullYear()} {content.name}. Built for AI, speed, and clarity.</p>
                        <div className="flex items-center gap-4">
                            <a className="transition hover:text-white" href="#home">Back to top</a>
                            <a className="transition hover:text-white" href={content.github} target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}