"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getApiBaseUrl } from "../lib/config";
import { apiGet } from "../lib/api";

export default function HomePage() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [backendStatus, setBackendStatus] = useState<string>("checking...");
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const data = await apiGet<{ status: string; service: string }>("/health", {
          signal: controller.signal
        });
        setBackendStatus(`${data.status} (${data.service})`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setBackendError(message);
        setBackendStatus("unreachable");
      }
    };
    run();
    return () => controller.abort();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Next.js Frontend</h1>
      <p style={{ color: "#555" }}>Basic scaffold is ready.</p>

      <section style={{ marginTop: 24 }}>
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link href="/api/health">Frontend API route: /api/health</Link>
          </li>
          <li>
            Backend health (FastAPI): <code>{getApiBaseUrl()}/health</code>
          </li>
          <li>
            Static HTML: open <code>html/index.html</code> or serve via <code>python -m http.server</code>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Backend Health (via env)</h2>
        <p>
          Status: <strong>{backendStatus}</strong>
          {backendError ? (
            <>
              {" "}
              <span style={{ color: "crimson" }}>({backendError})</span>
            </>
          ) : null}
        </p>
        <p style={{ color: "#666" }}>
          Base URL: <code>{getApiBaseUrl()}</code>
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Live Time</h2>
        <p>{time}</p>
        <button onClick={() => setTime(new Date().toLocaleTimeString())}>Refresh Time</button>
      </section>
    </main>
  );
}

