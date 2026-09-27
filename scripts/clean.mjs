/* Cross-platform clean: removes .next, out, and stale build artifacts.
 * Works identically on Windows (cmd/PowerShell) and Linux/macOS — no `rm -rf` needed. */
import { rm } from "node:fs/promises";

const targets = [".next", "out", "tsconfig.tsbuildinfo"];

for (const t of targets) {
  await rm(t, { recursive: true, force: true });
  console.log(`cleaned ${t}`);
}
