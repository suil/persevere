import { LeetCode, Credential } from "leetcode-query";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEETCODE_DIR = path.resolve(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");
const SESSION = process.env.LEETCODE_SESSION || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiMTg5MzkyMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImFmNmRmZWE4MjQwZGZhNDFiNWRiOGU4OTc0NDA3ODA3NWRmMzUxNWYyMzcyYWRmMjNkOGJkOTY2NzcyMTBlZWEiLCJzZXNzaW9uX3V1aWQiOiIzZjQ3OWM4MyIsImlkIjoxODkzOTIwLCJlbWFpbCI6ImduYXVoc3VpbEBsaXZlLmNvbSIsInVzZXJuYW1lIjoiZ25hdWhzdWlsIiwidXNlcl9zbHVnIjoiZ25hdWhzdWlsIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2duYXVoc3VpbC9hdmF0YXJfMTYwNzg3OTUzOC5wbmciLCJyZWZyZXNoZWRfYXQiOjE3NzEzNDc5ODYsImlwIjoiNjcuMTc1LjIzNi4xMzAiLCJpZGVudGl0eSI6Ijk0MDY3NmMzYThhODU3MmZmZmJhOWUzODgxZDBmYjE5IiwiZGV2aWNlX3dpdGhfaXAiOlsiOTNjYWU2YTVlZTc4Njc0Yjc0MDE1YmQ1ZjZiZmFkNDEiLCI2Ny4xNzUuMjM2LjEzMCJdLCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.mJz1bvESfHlkLTSq0Zvov4DwXrPyI8N559ooP6vUxCI';


if (!SESSION) {
  console.error("Error: LEETCODE_SESSION environment variable is required.");
  console.error(
    "Get it from browser DevTools > Application > Cookies > leetcode.com > LEETCODE_SESSION"
  );
  process.exit(1);
}

async function main() {
  // 1. Authenticate
  const credential = new Credential();
  await credential.init(SESSION);
  const lc = new LeetCode(credential);

  console.log("Authenticated. Fetching submissions...");

  // 2. Fetch all accepted JavaScript submissions
  const allSubs = await lc.submissions({ limit: 5000, offset: 0 });

  const accepted = new Map(); // titleSlug -> { id, title, titleSlug }
  for (const sub of allSubs) {
    if (
      sub.statusDisplay === "Accepted" &&
      sub.lang === "javascript" &&
      !accepted.has(sub.titleSlug)
    ) {
      accepted.set(sub.titleSlug, {
        id: sub.id,
        title: sub.title,
        titleSlug: sub.titleSlug,
      });
    }
  }

  console.log(
    `Fetched ${allSubs.length} total submissions, ${accepted.size} unique accepted JS problems.\n`
  );

  // 3. Scan existing .md files and build number -> filename map
  const existingFiles = fs
    .readdirSync(LEETCODE_DIR)
    .filter((f) => f.endsWith(".md"));
  const numberToFile = new Map(); // problem number -> filename
  for (const file of existingFiles) {
    const match = file.match(/^(\d+)\./);
    if (match) numberToFile.set(parseInt(match[1], 10), file);
  }

  console.log(`Existing .md files: ${numberToFile.size}`);
  console.log(`Fetching problem details to match files...\n`);

  // 4. For each accepted submission, check if we have a local file and update it
  let updated = 0;
  let unchanged = 0;
  let skipped = 0;
  let noFile = 0;

  for (const [slug, sub] of accepted) {
    // Fetch problem detail to get problem number
    let problem;
    try {
      problem = await lc.problem(sub.titleSlug);
    } catch (e) {
      console.error(`  Failed to fetch problem: ${sub.titleSlug} - ${e.message}`);
      continue;
    }

    if (!problem || !problem.questionFrontendId) {
      console.error(`  No problem data for: ${sub.titleSlug}`);
      continue;
    }

    const num = parseInt(problem.questionFrontendId, 10);

    if (!numberToFile.has(num)) {
      noFile++;
      continue;
    }

    const fileName = numberToFile.get(num);
    const filePath = path.join(LEETCODE_DIR, fileName);
    const content = fs.readFileSync(filePath, "utf-8");

    // Find all ```javascript ... ``` blocks
    const codeBlockRegex = /```javascript\n([\s\S]*?)```/g;
    const matches = [...content.matchAll(codeBlockRegex)];

    if (matches.length === 0) {
      skipped++;
      continue;
    }

    // Fetch the submission code
    let code = "";
    try {
      const detail = await lc.submission(sub.id);
      code = detail?.code || "";
    } catch (e) {
      console.error(`  Failed to fetch submission code for: ${sub.titleSlug}`);
      continue;
    }

    if (!code) {
      skipped++;
      continue;
    }

    // Compare existing first code block with fetched code
    const firstMatch = matches[0];
    const existingCode = firstMatch[1].replace(/\n$/, ""); // trim trailing newline from capture

    if (existingCode === code) {
      unchanged++;
      continue;
    }

    // Replace only the first ```javascript ... ``` block
    const newBlock = "```javascript\n" + code + "\n```";
    const newContent =
      content.slice(0, firstMatch.index) +
      newBlock +
      content.slice(firstMatch.index + firstMatch[0].length);

    if (DRY_RUN) {
      const label =
        matches.length > 1
          ? ` [${matches.length} code blocks - updating first only]`
          : "";
      console.log(`  [DRY RUN] Would update: ${fileName}${label}`);
      if (matches.length > 1) {
        console.log(`    Existing blocks:`);
        matches.forEach((m, i) => {
          const preview = m[1].trim().split("\n")[0];
          console.log(`      Block ${i + 1}: ${preview}...`);
        });
        console.log(`    New first block: ${code.trim().split("\n")[0]}...`);
      }
    } else {
      fs.writeFileSync(filePath, newContent, "utf-8");
      const label = matches.length > 1 ? ` (${matches.length} blocks, updated first)` : "";
      console.log(`  Updated: ${fileName}${label}`);
    }

    updated++;
  }

  console.log(
    `\nDone! Updated: ${updated}, Unchanged: ${unchanged}, Skipped (no code block or no submission): ${skipped}, No local file: ${noFile}`
  );
  if (DRY_RUN) console.log("(Dry run mode - no files were written)");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
