// The Funniest Out-of-Office — u-kreutzx-the-funniest-out-of-office-054815cf
// Writes one single-line out-of-office auto-reply to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, one line, not only whitespace.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm out until Monday — your email is 47th in line, and the line has just gone on strike.";

// Self-check the gate before writing, so a bad line fails loudly, not silently.
if (REPLY.length < 1 || REPLY.length > 140) {
  throw new Error(`reply is ${REPLY.length} chars, outside the 1-140 gate`);
}
if (REPLY.trim().length === 0 || REPLY.includes("\n")) {
  throw new Error("reply must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(`wrote ${REPLY.length}-char out-of-office reply to entry.txt`);
