import { getApiBaseUrl } from "./config";

export class ApiError extends Error {
  public readonly status: number;
  public readonly body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = new URL(path, baseUrl).toString();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(options.headers ?? {})
    },
    signal: options.signal
  });
  const text = await res.text();
  const parsed = safeParseJson(text);
  if (!res.ok) {
    throw new ApiError(`GET ${url} failed with ${res.status}`, res.status, parsed ?? text);
  }
  return parsed as T;
}

function safeParseJson(text: string): unknown | null {
  if (text.trim().length === 0) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

