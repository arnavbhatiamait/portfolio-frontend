"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

type SiteHeaderProps = {
    content: SiteContent;
};

export function SiteHeader({ content }: SiteHeaderProps) {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleRoute = () => setOpen(false);
        window.addEventListener("hashchange", handleRoute);

        // Theme initialization
        const savedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
        /*
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } else {
        */
        // Default to dark mode unconditionally for now
        setTheme("dark");
        document.documentElement.classList.add("dark");
        /*
        }
        */

        return () => window.removeEventListener("hashchange", handleRoute);
    }, []);

    const toggleTheme = () => {
        /* Light mode functionality temporarily commented out
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);
        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        */
    };

    return (
        <>
            <motion.div
                className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                style={{ scaleX: scrollYProgress }}
            />
            <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-card-border bg-card-bg px-4 py-3 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl transition-colors duration-300">
                    <a href="#home" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 text-sm font-bold text-white shadow-glow">
                            AB
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-text-title">{content.name}</p>
                            <p className="text-xs text-text-muted">AI/ML Engineer Portfolio</p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {content.navigation.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-sm text-text-muted transition hover:bg-foreground/5 hover:text-text-title"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Theme Switcher + CTA */}
                    <div className="hidden items-center gap-3 sm:flex">
                        {/* 
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="h-9 w-9 rounded-full p-0 flex items-center justify-center border border-card-border hover:bg-foreground/10 text-text-title transition-colors"
                            onClick={toggleTheme}
                            aria-label="Toggle light/dark theme"
                        >
                            {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-cyan-300" /> : <Moon className="h-4.5 w-4.5 text-violet-600" />}
                        </Button>
                        */}
                        <Button asChild variant="secondary" size="sm">
                            <a href={content.resumeHref} target="_blank" rel="noreferrer">
                                Resume
                            </a>
                        </Button>
                        <Button asChild variant="accent" size="sm">
                            <a href="#contact">Let&apos;s talk</a>
                        </Button>
                    </div>

                    {/* Mobile Theme Switcher + Menu */}
                    <div className="flex items-center gap-2 lg:hidden">
                        {/*
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="h-10 w-10 rounded-full p-0 flex items-center justify-center border border-card-border bg-card-bg text-text-title hover:bg-foreground/10 transition-colors"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-cyan-300" /> : <Moon className="h-4.5 w-4.5 text-violet-600" />}
                        </Button>
                        */}
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card-bg text-text-title transition hover:bg-foreground/10"
                            onClick={() => setOpen((value) => !value)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={open}
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {open ? (
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            className="glass-panel mt-3 overflow-hidden rounded-3xl border border-card-border lg:hidden"
                        >
                            <div className="flex flex-col gap-1 p-3">
                                {content.navigation.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "rounded-2xl px-4 py-3 text-sm text-text-muted transition hover:bg-foreground/5 hover:text-text-title"
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