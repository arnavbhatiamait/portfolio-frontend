const defaultApiBase = "http://localhost:8000/api";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? defaultApiBase;
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
