import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const leetcodeDir = path.join(__dirname, '..', 'leetcode');
const outputFile = path.join(__dirname, 'missing-key-insights.json');

const files = fs.readdirSync(leetcodeDir).filter(f => f.endsWith('.md'));

const result = {
  missingSection: [],
  emptySection: []
};

for (const file of files) {
  const filePath = path.join(leetcodeDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check for "# Key insights" section (case-insensitive for the header)
  const keyInsightsMatch = content.match(/^# Key insights\s*$/im);

  if (!keyInsightsMatch) {
    result.missingSection.push(file);
    continue;
  }

  // Find the position of "# Key insights"
  const startIndex = keyInsightsMatch.index + keyInsightsMatch[0].length;
  const afterSection = content.slice(startIndex);

  // Find the next section (starts with #) or end of file
  const nextSectionMatch = afterSection.match(/^#\s/m);
  const sectionContent = nextSectionMatch
    ? afterSection.slice(0, nextSectionMatch.index)
    : afterSection;

  // Check if section content is less than 3 characters
  if (sectionContent.trim().length < 3) {
    result.emptySection.push(file);
  }
}

// Sort results
result.missingSection.sort();
result.emptySection.sort();

// Write to JSON
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

console.log(`Missing "# Key insights" section: ${result.missingSection.length} files`);
console.log(`Empty "# Key insights" section: ${result.emptySection.length} files`);
console.log(`Results saved to: ${outputFile}`);
