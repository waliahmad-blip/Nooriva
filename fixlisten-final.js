const fs = require("fs");
const p = "components/noorix/NoorixChat.jsx";
let c = fs.readFileSync(p, "utf8");

// 1. Remove ALL Listen buttons (correct or misplaced)
const listenRegex = /<button[^>]*onClick=\{\(\) => speak\(msg\.content\)\}[^>]*>[\s\S]*?<\/button>/g;
c = c.replace(listenRegex, "");
console.log("Removed all existing Listen buttons");

// 2. Insert exactly ONE Listen button right after the Share button
if (!c.includes("> Listen</button>")) {
  const shareIndex = c.indexOf("shareResult(msg)");
  if (shareIndex > -1) {
    const closeIndex = c.indexOf("</button>", shareIndex);
    if (closeIndex > -1) {
      const insertAt = closeIndex + "</button>".length;
      const listenButton = '<button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
      c = c.slice(0, insertAt) + listenButton + c.slice(insertAt);
      console.log("Inserted one correct Listen button after Share");
    } else {
      console.log("ERROR: closing </button> after Share not found");
    }
  } else {
    console.log("ERROR: shareResult(msg) anchor not found");
  }
} else {
  console.log("Listen button already present correctly");
}

fs.writeFileSync(p, c);

// 3. Verify
const final = fs.readFileSync(p, "utf8");
const count = (final.match(/> Listen<\/button>/g) || []).length;
const backCount = (final.match(/onClick=\{backNoorix\}/g) || []).length;
console.log("Listen buttons:", count);
console.log("Back buttons:", backCount);
if (count !== 1) {
  console.error("FAIL: expected exactly 1 Listen button, found " + count);
  process.exit(1);
}
