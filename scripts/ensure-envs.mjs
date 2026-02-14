import { existsSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

function ensureEnv(exampleRel, targetRel) {
  const example = resolve(process.cwd(), exampleRel);
  const target = resolve(process.cwd(), targetRel);
  if (!existsSync(target) && existsSync(example)) {
    copyFileSync(example, target);
    // eslint-disable-next-line no-console
    console.log(`[env] Created ${targetRel} from ${exampleRel}`);
  }
}

ensureEnv("frontend/env.local.example", "frontend/.env.local");
ensureEnv("lovable-frontend/env.local.example", "lovable-frontend/.env.local");

