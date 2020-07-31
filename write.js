const fs = require("fs");
const slugg = require("slugg");
const isms = require("./truisms.json");

for (let ism of isms) {
  fs.writeFileSync(
    `truisms/${slugg(ism)}.md`,
    `---
tags: truism
title: ${ism}
layout: truism.njk
---

${ism}`
  );
}
