"use client";

import { useMemo, useState } from "react";
import { Loader2, MailCheck, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

type ContactFormProps = {
    content: SiteContent;
};

type ContactState = {
    name: string;
    email: string;
    message: string;
};

const initialState: ContactState = {
    name: "",
    email: "",
    message: "",
};

export function ContactForm({ content }: ContactFormProps) {
    const apiBase = useMemo(() => {
        return process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000/api";
    }, []);
    const [form, setForm] = useState<ContactState>(initialState);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [feedback, setFeedback] = useState<string>("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");
        setFeedback("");

        try {
            const response = await fetch(`${apiBase}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Failed to submit contact form");
            }

            setStatus("success");
            setFeedback("Message sent. I’ll get back to you soon.");
            setForm(initialState);
        } catch {
            setStatus("error");
            setFeedback(
                "Could not reach the backend yet. Set NEXT_PUBLIC_BACKEND_URL and run the FastAPI app to enable the form."
            );
        }
    }

    return (
        <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_30%)]" />
            <CardHeader className="relative">
                <CardTitle>Contact me</CardTitle>
                <CardDescription>
                    For collaborations, internship opportunities, or AI product conversations, send a message directly.
                </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-text-title">
                            <span>Name</span>
                            <input
                                required
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                className="focus-ring w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-text-title placeholder:text-text-muted transition-colors hover:border-cyan-300/40"
                                placeholder="Your name"
                            />
                        </label>
                        <label className="space-y-2 text-sm text-text-title">
                            <span>Email</span>
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={(event) => setForm({ ...form, email: event.target.value })}
                                className="focus-ring w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-text-title placeholder:text-text-muted transition-colors hover:border-cyan-300/40"
                                placeholder="you@example.com"
                            />
                        </label>
                    </div>
                    <label className="space-y-2 text-sm text-text-title">
                        <span>Message</span>
                        <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={(event) => setForm({ ...form, message: event.target.value })}
                            className="focus-ring w-full rounded-3xl border border-card-border bg-card-bg px-4 py-3 text-text-title placeholder:text-text-muted transition-colors hover:border-cyan-300/40 resize-none"
                            placeholder="Tell me about the project, role, or collaboration."
                        />
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
                            {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                            Send message
                        </Button>
                        <p
                            className={cn(
                                "text-sm",
                                status === "success" ? "text-emerald-300" : status === "error" ? "text-amber-300" : "text-slate-400"
                            )}
                            aria-live="polite"
                        >
                            {feedback || `Prefer email? Reach me at ${content.email}.`}
                        </p>
                    </div>
                </form>

                <div className="grid gap-3 sm:grid-cols-3">
                    <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10" href={`mailto:${content.email}`}>
                        <MailCheck className="mb-2 h-4 w-4 text-cyan-300" />
                        Email
                    </a>
                    <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10" href={content.github} target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10" href={content.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}