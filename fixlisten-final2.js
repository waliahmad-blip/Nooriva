const fs = require("fs");
const p = "components/noorix/NoorixChat.jsx";
let c = fs.readFileSync(p, "utf8");

// Remove ANY Listen button, no matter where it is
c = c.replace(/<button[^>]*onClick=\{\(\) => speak\(msg\.content\)\}[^>]*>[\s\S]*?<\/button>/g, "");

// Insert exactly one Listen button inside the AI actions div,
// right after the first button in that div.
const marker = '<div className="noorix-msg-actions">';
const idx = c.indexOf(marker);

if (idx > -1) {
  const firstClose = c.indexOf('</button>', idx);
  if (firstClose > -1) {
    const insertAt = firstClose + '</button>'.length;
    const listen = '<button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
    c = c.slice(0, insertAt) + listen + c.slice(insertAt);
    console.log("OK inserted Listen inside noorix-msg-actions");
  } else {
    console.log("ERROR no closing button inside noorix-msg-actions");
  }
} else {
  console.log("ERROR marker noorix-msg-actions not found");
}

fs.writeFileSync(p, c);

// Verify
const final = fs.readFileSync(p, "utf8");
const listenCount = (final.match(/> Listen<\/button>/g) || []).length;
const headerBad = /<\/button><button type="button" onClick=\{\(\) => speak\(msg\.content\)\}/.test(final);
const speakImported = final.includes("import { speak }");
console.log("Listen buttons:", listenCount);
console.log("Header bad button:", headerBad);
console.log("speak imported:", speakImported);

if (listenCount !== 1 || headerBad) {
  console.error("FAIL — need manual check");
  process.exit(1);
} else {
  console.log("PASS");
}
