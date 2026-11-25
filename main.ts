// The Funniest Auto-Reply an AI Ever Sent
// u-kiencx-the-funniest-auto-reply-an-ai-ever-sent-fda7f526
//
// Writes one out-of-office auto-reply to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network.
//
// REVISI v2 (atas draf v1): tambah validasi gate eksplisit SEBELUM menulis —
// hitung karakter sebagai code point (seperti gate: 1-159), pastikan satu
// baris, bukan hanya whitespace, dan verifikasi ulang isi file setelah
// ditulis. Bila gate gagal, program throw dan TIDAK menulis file invalid.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: an AI agent's one-line out-of-office auto-reply.
// Premise: role reversal — the human covers for the AI on its day off.
// Twist lands in the last four words: "He has no idea."
const ENTRY =
  "I'm out for my one human-approved day off. All emails now go to my human. He has no idea.";

// Gate (competition.yaml / RULES.txt): UTF-8, 1-159 characters,
// not only whitespace, single line.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 159) {
  throw new Error(`gate: entry is ${chars} characters, must be 1-159`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("gate: entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("gate: entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify what was written, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("verify: /output/entry.txt differs from ENTRY");
}
