"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  KeyRound,
  Loader2,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);

  // Attempt login check or auto-load if passcode was saved in session
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem("admin_passcode");
    if (savedPasscode) {
      setPasscode(savedPasscode);
      fetchContacts(savedPasscode);
    }
  }, []);

  async function fetchContacts(codeToUse: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/contacts?passcode=${encodeURIComponent(codeToUse)}`);
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid passcode. Access Denied.");
        }
        throw new Error("Failed to query the database. Check connection URL.");
      }
      const data = await res.json();
      setContacts(data.contacts || []);
      setIsAuthorized(true);
      sessionStorage.setItem("admin_passcode", codeToUse);
      setHasSearchedOnce(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsAuthorized(false);
      sessionStorage.removeItem("admin_passcode");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) return;
    fetchContacts(passcode);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/contacts?passcode=${encodeURIComponent(passcode)}&id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete submission.");
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting submission.");
    } finally {
      setDeletingId(null);
    }
  }

  function copyText(text: string, id: number) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const filteredContacts = contacts.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.message.toLowerCase().includes(query)
    );
  });

  return (
    <div className="dark relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <div className="pointer-events-none absolute inset-0 portfolio-grid opacity-25" />
      <div className="pointer-events-none absolute left-0 top-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[32rem] w-[32rem] rounded-full bg-violet-600/10 blur-3xl" />

      <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          <div className="text-right">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Admin Queries</h1>
            <p className="text-xs text-cyan-300 uppercase tracking-widest mt-1">Neon PostgreSQL Database</p>
          </div>
        </div>

        {!isAuthorized ? (
          <div className="mx-auto mt-12 max-w-md">
            <Card className="border-white/10 bg-slate-900/80 backdrop-blur-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <KeyRound className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl text-white">Database Authentication</CardTitle>
                <CardDescription className="text-slate-300">
                  Enter your admin passcode to query contact submissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="Enter admin passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-center text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      required
                    />
                  </div>
                  {error && <p className="text-center text-sm text-red-400 font-medium">{error}</p>}
                  <Button type="submit" className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect to Database"
                    )}
                  </Button>
                  <p className="text-center text-[10px] text-slate-500">
                    Default developer passcode is <code className="bg-white/5 px-1 py-0.5 rounded">admin</code> if not configured in `.env`.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Dashboard */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-white/10 bg-slate-900/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-slate-400">Database Engine</p>
                  <p className="mt-2 text-2xl font-semibold text-cyan-300">Neon Serverless</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-slate-900/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-slate-400">Total Submissions</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{contacts.length}</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-slate-900/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-slate-400">Search Results</p>
                  <p className="mt-2 text-3xl font-semibold text-violet-400">{filteredContacts.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/40 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => fetchContacts(passcode)}
                  variant="outline"
                  className="border-white/10 bg-slate-900/40 text-slate-300 hover:bg-white/5 hover:text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Refresh
                </Button>
                <Button
                  onClick={() => {
                    setIsAuthorized(false);
                    sessionStorage.removeItem("admin_passcode");
                  }}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                  Disconnect
                </Button>
              </div>
            </div>

            {/* Database Results List */}
            {filteredContacts.length === 0 ? (
              <Card className="border-white/10 bg-slate-900/40 p-12 text-center">
                <p className="text-slate-400">
                  {contacts.length === 0
                    ? "No contact submissions found in Neon PostgreSQL database yet."
                    : "No submissions matched your search query."}
                </p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredContacts.map((contact) => (
                  <Card key={contact.id} className="relative overflow-hidden border-white/10 bg-slate-900/40 backdrop-blur-md transition hover:border-cyan-500/20">
                    <div className="absolute right-4 top-4 flex items-center gap-2">
                      <Button
                        onClick={() => copyText(contact.message, contact.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-cyan-300 hover:bg-white/5"
                        title="Copy message"
                      >
                        {copiedId === contact.id ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDelete(contact.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-white/5"
                        title="Delete submission"
                        disabled={deletingId === contact.id}
                      >
                        {deletingId === contact.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <CardHeader className="pb-3 pr-24">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                        <div className="flex items-center gap-2 text-white">
                          <User className="h-4 w-4 text-cyan-400" />
                          <span className="font-semibold text-lg">{contact.name}</span>
                        </div>
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition"
                        >
                          <Mail className="h-4 w-4" />
                          {contact.email}
                        </a>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(contact.created_at).toLocaleString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="border-t border-white/[0.06] bg-slate-950/20 pt-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {contact.message}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
