export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  return "http://localhost:8000";
}

