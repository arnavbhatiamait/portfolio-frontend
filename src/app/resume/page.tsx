import type { Metadata } from "next";

import { ResumeViewer } from "@/components/resume-viewer";
import { buildApiUrl } from "@/lib/api";
import { siteContent } from "@/lib/content";

type ResumeApiResponse = {
  title: string;
  filename: string;
  view_url: string;
  download_url: string;
};

const fallbackResume: ResumeApiResponse = {
  title: `${siteContent.name} Resume`,
  filename: "Arnav-Bhatia-Resume.pdf",
  view_url: "/resume/view",
  download_url: "/resume/download",
};

export const metadata: Metadata = {
  title: `Resume | ${siteContent.name}`,
  description: `View and download the latest resume for ${siteContent.name}.`,
};

async function getResumeInfo(): Promise<ResumeApiResponse> {
  try {
    const response = await fetch(buildApiUrl("/resume"), {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackResume;
    }

    return response.json();
  } catch {
    return fallbackResume;
  }
}

export default async function ResumePage() {
  const resume = await getResumeInfo();

  return (
    <ResumeViewer
      title={resume.title}
      filename={resume.filename}
      viewUrl={buildApiUrl(resume.view_url.replace(/^\/api/, ""))}
      downloadUrl={buildApiUrl(resume.download_url.replace(/^\/api/, ""))}
    />
  );
}
