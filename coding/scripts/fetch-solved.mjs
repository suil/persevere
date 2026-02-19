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

  // 2. Fetch all accepted submissions
  // The library paginates internally in batches of 20
  const allSubs = await lc.submissions({ limit: 5000, offset: 0 });

  // Keep only accepted JavaScript submissions, deduplicate by titleSlug (keep most recent = first seen)
  const accepted = new Map();
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
        lang: sub.lang,
      });
    }
  }

  console.log(
    `Fetched ${allSubs.length} total submissions, ${accepted.size} unique accepted problems.`
  );

  // 3. Scan existing .md files
  const existingFiles = fs
    .readdirSync(LEETCODE_DIR)
    .filter((f) => f.endsWith(".md"));
  const existingNumbers = new Set();
  for (const file of existingFiles) {
    const match = file.match(/^(\d+)\./);
    if (match) existingNumbers.add(parseInt(match[1], 10));
  }

  console.log(`Existing .md files: ${existingNumbers.size}`);

  // 4. For each accepted problem, check if file exists, create if not
  let created = 0;
  let skipped = 0;

  for (const [slug, sub] of accepted) {
    // Fetch problem detail to get the problem number
    let problem;
    try {
      problem = await lc.problem(sub.titleSlug);
    } catch (e) {
      console.error(
        `  Failed to fetch problem: ${sub.titleSlug} - ${e.message}`
      );
      continue;
    }

    if (!problem || !problem.questionFrontendId) {
      console.error(`  No problem data for: ${sub.titleSlug}`);
      continue;
    }

    const num = parseInt(problem.questionFrontendId, 10);

    if (existingNumbers.has(num)) {
      skipped++;
      continue;
    }

    // Strip HTML tags from problem description
    const description = (problem.content || "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // Get first paragraph as brief description
    const briefDesc =
      description.split("\n\n")[0] || description.slice(0, 300);

    // Determine code language for markdown
    const langMap = {
      javascript: "javascript",
      python3: "python",
      python: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      typescript: "typescript",
      go: "go",
      rust: "rust",
    };
    const mdLang = langMap[sub.lang] || sub.lang;

    // Fetch the actual submission code
    let code = "";
    try {
      const detail = await lc.submission(sub.id);
      code = detail?.code || "";
    } catch (e) {
      console.error(
        `  Failed to fetch submission code for: ${sub.titleSlug}`
      );
    }

    const paddedNum = String(num).padStart(4, "0");
    const fileName = `${paddedNum}.${sub.titleSlug}.md`;
    const filePath = path.join(LEETCODE_DIR, fileName);

    const content = `# ${problem.title}
[${problem.questionFrontendId}. ${problem.title}](https://leetcode.com/problems/${sub.titleSlug}/)

${briefDesc}

# Key insights
*

# Code
\`\`\`${mdLang}
${code}
\`\`\`

# Complexity
**Time:**
**Space:**
`;

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would create: ${fileName} \n${content}`);
    } else {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`  Created: ${fileName}`);
    }

    created++;
    existingNumbers.add(num);
  }

  console.log(
    `\nDone! Created: ${created}, Skipped (already exist): ${skipped}`
  );
  if (DRY_RUN) console.log("(Dry run mode - no files were written)");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
/*
cd coding/leetcode/scripts
LEETCODE_SESSION="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfYXV0aF91c2VyX2lkIjoiMTg5MzkyMCIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImFmNmRmZWE4MjQwZGZhNDFiNWRiOGU4OTc0NDA3ODA3NWRmMzUxNWYyMzcyYWRmMjNkOGJkOTY2NzcyMTBlZWEiLCJzZXNzaW9uX3V1aWQiOiIzZjQ3OWM4MyIsImlkIjoxODkzOTIwLCJlbWFpbCI6ImduYXVoc3VpbEBsaXZlLmNvbSIsInVzZXJuYW1lIjoiZ25hdWhzdWlsIiwidXNlcl9zbHVnIjoiZ25hdWhzdWlsIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2duYXVoc3VpbC9hdmF0YXJfMTYwNzg3OTUzOC5wbmciLCJyZWZyZXNoZWRfYXQiOjE3NzEzNDc5ODYsImlwIjoiNjcuMTc1LjIzNi4xMzAiLCJpZGVudGl0eSI6Ijk0MDY3NmMzYThhODU3MmZmZmJhOWUzODgxZDBmYjE5IiwiZGV2aWNlX3dpdGhfaXAiOlsiOTNjYWU2YTVlZTc4Njc0Yjc0MDE1YmQ1ZjZiZmFkNDEiLCI2Ny4xNzUuMjM2LjEzMCJdLCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.mJz1bvESfHlkLTSq0Zvov4DwXrPyI8N559ooP6vUxCI" node fetch-solved.mjs --dry-run
*/