const fs = require("fs");
const p = "components/noorix/NoorixChat.jsx";
let c = fs.readFileSync(p, "utf8");

// Exact bad button stuck to Back button (contains > inside onClick, so regex failed)
const bad = '</button><button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
let removed = false;
while (c.includes(bad)) {
  c = c.split(bad).join('</button>');
  removed = true;
}

// Remove any other Listen buttons anywhere
const re = /<button[^]*?onClick=\{\(\) => speak\(msg\.content\)\}[^]*?Listen<\/button>/g;
c = c.replace(re, "");

// Insert exactly one Listen button inside noorix-msg-actions
if (!c.includes("> Listen</button>")) {
  const marker = '<div className="noorix-msg-actions">';
  const idx = c.indexOf(marker);
  if (idx > -1) {
    const firstClose = c.indexOf('</button>', idx);
    if (firstClose > -1) {
      const insertAt = firstClose + '</button>'.length;
      const listen = '<button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
      c = c.slice(0, insertAt) + listen + c.slice(insertAt);
    }
  }
}

fs.writeFileSync(p, c);

// Verify
const final = fs.readFileSync(p, "utf8");
const listenCount = (final.match(/> Listen<\/button>/g) || []).length;
const headerBad = final.includes('</button><button type="button" onClick={() => speak(msg.content)}');
const actionsBad = final.includes('noorix-msg-actions"><button type="button" onClick={() => speak(msg.content)}');
console.log("Removed from header:", removed);
console.log("Listen buttons:", listenCount);
console.log("Header bad button:", headerBad);
console.log("In-correct-spot button:", actionsBad);
if (listenCount === 1 && !headerBad && !actionsBad) {
  console.log("PASS");
} else {
  console.log("FAIL");
}
