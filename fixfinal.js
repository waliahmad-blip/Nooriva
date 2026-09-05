const fs = require("fs");
const p = "components/noorix/NoorixChat.jsx";
let c = fs.readFileSync(p, "utf8");

// 1. Remove EVERY line that uses speak(msg.content)
let before = c;
c = c.split("\n").filter(line => !line.includes("speak(msg.content)")).join("\n");
console.log("Removed lines with speak(msg.content):", before.split("\n").length - c.split("\n").length);

// 2. Ensure speak is imported once
if (!c.includes("import { speak } from '@/lib/noorixVoice';")) {
  c = c.replace("import { useStore } from '@/lib/store';", "import { useStore } from '@/lib/store';\nimport { speak } from '@/lib/noorixVoice';");
  console.log("speak import ensured");
}

// 3. Insert exactly ONE Listen button inside noorix-msg-actions, after Share button
const marker = '<div className="noorix-msg-actions">';
const idx = c.indexOf(marker);
if (idx > -1) {
  const firstClose = c.indexOf("</button>", idx);
  if (firstClose > -1) {
    const insertAt = firstClose + "</button>".length;
    const listen = '<button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
    c = c.slice(0, insertAt) + listen + c.slice(insertAt);
    console.log("Inserted one Listen button after Share");
  }
}

fs.writeFileSync(p, c, "utf8");

// Final verify
const final = fs.readFileSync(p, "utf8");
const speakCount = (final.match(/speak\(msg\.content\)/g) || []).length;
const listenCount = (final.match(/> Listen<\/button>/g) || []).length;
const badAdjacent = final.includes("</button><button type=\"button\" onClick={() => speak(msg.content)}");
console.log("speak(msg.content):", speakCount);
console.log("Listen buttons:", listenCount);
console.log("Bad adjacent in header:", badAdjacent);
console.log(speakCount === 1 && listenCount === 1 && !badAdjacent ? "PASS ✅" : "FAIL ❌");
