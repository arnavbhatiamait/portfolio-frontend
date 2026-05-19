"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

type SiteHeaderProps = {
    content: SiteContent;
};

export function SiteHeader({ content }: SiteHeaderProps) {
    const [open, setOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleRoute = () => setOpen(false);
        window.addEventListener("hashchange", handleRoute);
        return () => window.removeEventListener("hashchange", handleRoute);
    }, []);

    return (
        <>
            <motion.div
                className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                style={{ scaleX: scrollYProgress }}
            />
            <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
                    <a href="#home" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-sm font-bold text-white shadow-glow">
                            AB
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-white">{content.name}</p>
                            <p className="text-xs text-slate-400">AI/ML Engineer Portfolio</p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {content.navigation.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 sm:flex">
                        <Button asChild variant="secondary" size="sm">
                            <a href={content.resumeHref} target="_blank" rel="noreferrer">
                                Resume
                            </a>
                        </Button>
                        <Button asChild variant="accent" size="sm">
                            <a href="#contact">Let&apos;s talk</a>
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
                        onClick={() => setOpen((value) => !value)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={open}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <AnimatePresence>
                    {open ? (
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            className="glass-panel mt-3 overflow-hidden rounded-3xl border border-white/10 lg:hidden"
                        >
                            <div className="flex flex-col gap-1 p-3">
                                {content.navigation.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <div className="grid gap-2 px-1 pb-1 pt-2 sm:grid-cols-2">
                                    <Button asChild variant="secondary" size="sm">
                                        <a href={content.resumeHref} target="_blank" rel="noreferrer">
                                            Download Resume
                                        </a>
                                    </Button>
                                    <Button asChild variant="accent" size="sm">
                                        <a href="#contact" onClick={() => setOpen(false)}>
                                            Contact Me
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </header>
        </>
    );
}