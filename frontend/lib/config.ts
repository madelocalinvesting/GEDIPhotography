export function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

export function getApiBaseUrl(): string {
  const baseUrl = getRequiredEnv("NEXT_PUBLIC_API_BASE_URL");
  try {
    // Validate it's an absolute URL
    // eslint-disable-next-line no-new
    new URL(baseUrl);
  } catch {
    throw new Error(`NEXT_PUBLIC_API_BASE_URL must be an absolute URL. Got: ${baseUrl}`);
  }
  return baseUrl;
}

