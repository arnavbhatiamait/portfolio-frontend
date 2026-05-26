"use client";

import Link from "next/link";
import { Download, ExternalLink, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ResumeViewerProps = {
  title: string;
  filename: string;
  viewUrl: string;
  downloadUrl: string;
};

export function ResumeViewer({
  title,
  filename,
  viewUrl,
  downloadUrl,
}: ResumeViewerProps) {
  const pdfViewerUrl = `${viewUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`;

  return (
    <div className="dark relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 portfolio-grid opacity-20" />
      <div className="pointer-events-none absolute left-0 top-0 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent" />

      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-slate-900/85 backdrop-blur-xl">
          <CardHeader className="gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                <FileText className="h-3.5 w-3.5" />
                Resume
              </p>
              <CardTitle className="text-3xl text-white sm:text-4xl">{title}</CardTitle>
              <CardDescription className="text-base text-slate-300">
                View the latest backend-served PDF here, or download a local copy.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
              <Button asChild variant="outline" size="lg" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/">
                  Home
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href={viewUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
              </Button>
              <Button asChild variant="accent" size="lg">
                <a href={downloadUrl}>
                  <Download className="h-4 w-4" />
                  Download resume
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              File: {filename}
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl shadow-cyan-950/20">
              <object
                data={pdfViewerUrl}
                type="application/pdf"
                aria-label={title}
                className="h-[75vh] w-full bg-white"
              >
                <iframe
                  src={pdfViewerUrl}
                  title={title}
                  className="h-[75vh] w-full bg-white"
                />
                <div className="flex h-[75vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center text-slate-700">
                  <p className="max-w-md text-sm leading-6">
                    This browser could not render the PDF inline. Open it in a new tab
                    or download the file below.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="secondary">
                      <a href={viewUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Open PDF
                      </a>
                    </Button>
                    <Button asChild variant="accent">
                      <a href={downloadUrl}>
                        <Download className="h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </div>
              </object>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
