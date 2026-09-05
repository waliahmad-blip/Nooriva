const fs = require("fs");
const p = "components/noorix/NoorixChat.jsx";
let c = fs.readFileSync(p, "utf8");

// Remove exactly the bad adjacent button stuck to Back button
const bad = '</button><button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
if (c.includes(bad)) {
  c = c.split(bad).join('</button>');
  console.log("REMOVED bad Listen button from header");
} else {
  console.log("Bad snippet already gone");
}

// Ensure exactly one correct Listen button after Share action
if (!c.includes('> Listen</button>')) {
  const idx = c.indexOf('shareResult(msg)');
  if (idx > -1) {
    const close = c.indexOf('</button>', idx);
    if (close > -1) {
      const btn = '<button type="button" onClick={() => speak(msg.content)} className="noorix-action-chip"><Volume2 size={11} /> Listen</button>';
      c = c.slice(0, close + '</button>'.length) + btn + c.slice(close + '</button>'.length);
      console.log("Correct Listen button inserted after Share");
    } else {
      console.log("ERROR: closing </button> not found");
    }
  } else {
    console.log("ERROR: shareResult(msg) anchor not found");
  }
} else {
  console.log("Listen button already present");
}

fs.writeFileSync(p, c);
console.log("Listen count:", (fs.readFileSync(p, "utf8").match(/> Listen<\/button>/g) || []).length);
