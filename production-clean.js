const fs = require("fs");
const path = require("path");

/* ═══ 1. Add BackToHome to 5 standalone pages ═══ */
const pages = [
  "components/weather/WeatherGlow.jsx",
  "components/quiz/GlowQuizPage.jsx",
  "components/ritual/RitualOfDay.jsx",
  "components/ambassador/AmbassadorHub.jsx",
  "components/ingredients/IngredientStory.jsx",
];

const rootRe = /<div\s+className="relative min-h-screen[^"]*"/;

for (const file of pages) {
  if (!fs.existsSync(file)) { console.log("MISS", file); continue; }
  let c = fs.readFileSync(file, "utf8");
  let changed = false;

  // Import
  if (!c.includes("import BackToHome")) {
    c = c.replace(
      'import ScrollToTop from "@/components/ui/ScrollToTop";',
      'import BackToHome from "@/components/ui/BackToHome";\nimport ScrollToTop from "@/components/ui/ScrollToTop";'
    );
    changed = true;
  }

  // Mount
  if (!c.includes("<BackToHome")) {
    const m = c.match(rootRe);
    if (m) {
      const tagEnd = c.indexOf(">", m.index + m[0].length);
      if (tagEnd > -1) {
        const insert = '\n      <BackToHome className="fixed top-6 left-6 z-50" />';
        c = c.slice(0, tagEnd + 1) + insert + c.slice(tagEnd + 1);
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, c, "utf8");
    console.log("✅ BackToHome →", file);
  } else {
    console.log("ℹ️ already fixed →", file);
  }
}

/* ═══ 2. Replace BackToTop with ScrollToTop ═══ */
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const allFiles = walk("app").concat(walk("components")).concat(walk("lib"));
let replacedBackToTop = 0;
for (const file of allFiles) {
  let c = fs.readFileSync(file, "utf8");
  if (c.includes('@/components/ui/BackToTop')) {
    c = c.replace(/@\/components\/ui\/BackToTop/g, "@/components/ui/ScrollToTop");
    fs.writeFileSync(file, c, "utf8");
    replacedBackToTop++;
    console.log("🔁 BackToTop → ScrollToTop in", file);
  }
}
if (replacedBackToTop === 0) console.log("ℹ️ No BackToTop imports found");

/* ═══ 3. Delete orphaned duplicate components ═══ */
const orphans = [
  "components/ui/BackToTop.jsx",
  "components/ui/FlavorQuiz.jsx",
  "components/ui/CommandPalette.jsx",
  "components/ui/DashboardExtras.jsx",
];

for (const file of orphans) {
  if (!fs.existsSync(file)) continue;
  const name = path.basename(file, path.extname(file));
  const referenced = allFiles.some((f) => {
    if (f === file) return false;
    return fs.readFileSync(f, "utf8").includes(`/${name}`);
  });
  if (!referenced) {
    fs.unlinkSync(file);
    console.log("🗑️ Deleted orphan →", file);
  } else {
    console.log("⚠️ Still referenced →", file);
  }
}

console.log("\nPATCH COMPLETE");
