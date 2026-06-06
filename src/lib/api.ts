export function getApiBaseUrl() {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  // Server-side execution requires an absolute URL
  if (typeof window === "undefined") {
    const host = process.env.VERCEL_URL || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}/api`;
  }
  // Client-side can use standard relative paths
  return "/api";
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
