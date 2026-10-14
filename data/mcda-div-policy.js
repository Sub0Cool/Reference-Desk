// MCDA diversion-screening policy. This is office policy, NOT statutory eligibility.
// Conditions requiring case facts deliberately remain conditional in the UI.
window.REFERENCE_DESK_MCDA_POLICY = (function () {
  const vcExceptions = new Set(["20","31","2800(a)","4462.5","4461(b)","4461(c)","4463(c)","10852","12951(b)","14604(a)","14610(a)"]);
  for (let letter = 97; letter <= 102; letter++) vcExceptions.add("13004(" + String.fromCharCode(letter) + ")");

  const exactPC = new Set(["69","136.1","186.22","241(c)","241.6","241.7","243.4","243.6","243.7","244.5","243(b)","261.5","273a","288.2","286.5","314","647(a)","245(a)(1)","487(d)(2)","422","487(c)","487(d)(1)","496d","666.1","602.5(b)","647(j)","647.6","653.23","243.25","368","11174.4"]);
  const conditionalPC = new Set(["148(a)(1)"]);
  // Subdivision-inclusive parent matches, without accidentally matching e.g. 243.40.
  const groupedPC = ["136.1","186.22","243.4","244.5","261.5","273a","288.2","286.5","314","647(j)","647.6","666.1","368","243.25","11174.4"];
  const startsWithSub = (section, parent) => section === parent || section.startsWith(parent + "(");
  function evaluate(query, title) {
    if (!query || !query.code || !query.section) return null;
    const code = String(query.code).toUpperCase();
    const section = String(query.section).toLowerCase().replace(/\s+/g,"");
    const base = section.split("/")[0];
    const label = code + " § " + section;
    if (code === "HS" || code === "FG") return {kind:"yes",reason:"Code-wide exclusion: " + (code === "HS" ? "Health and Safety Code" : "Fish and Game Code") + "."};
    if (code === "VC") {
      if (vcExceptions.has(base)) return null;
      return {kind:"yes",reason:"Vehicle Code offense (not one of the listed exceptions)."};
    }
    if (code === "BP" && startsWithSub(base,"729(a)")) return {kind:"yes",reason:"BP § 729(a)."};
    if (code === "HN") {
      const m = base.match(/^655\(([a-z])\)/);
      if (m && m[1] >= "a" && m[1] <= "l") return {kind:"yes",reason:"Harbors and Navigation Code § 655(a)–(l)."};
      if (base === "655") return {kind:"conditional",reason:"Applies to HN § 655(a)–(l); verify the charged subdivision."};
      return null;
    }
    if (code !== "PC") return null;
    if (conditionalPC.has(base) || startsWithSub(base,"148(a)(1)"))
      return {kind:"conditional",reason:"PC § 148(a)(1): ineligible only when the conduct involved active physical resistance. Confirm the facts."};
    if (startsWithSub(base,"245(a)(1)") || startsWithSub(base,"487(d)(1)") || startsWithSub(base,"487(d)(2)") || startsWithSub(base,"487(c)") || startsWithSub(base,"602.5(b)") || startsWithSub(base,"647(a)") || startsWithSub(base,"243(b)") || startsWithSub(base,"241(c)"))
      return {kind:"yes",reason:"Specifically listed Penal Code offense."};
    const numeric = parseFloat(base);
    if (Number.isFinite(numeric) && ((numeric >= 596 && numeric <= 600.5) || (numeric >= 417 && numeric <= 417.6) || (numeric >= 422.55 && numeric <= 422.85)))
      return {kind:"yes",reason:numeric >= 422.55 && numeric <= 422.85 ? "Hate-crime provision in PC §§ 422.55–422.85." : "Within an expressly listed Penal Code range."};
    if (exactPC.has(base) || groupedPC.some(parent => startsWithSub(base,parent)))
      return {kind:"yes",reason:"Specifically listed Penal Code offense or subdivision."};

    const name = String(title || "").toLowerCase();
    const flags = [];
    if (/domestic violence|domestic battery|family violence|intimate.partner|spouse|cohabitant|protective order/.test(name)) flags.push("family violence under PC § 13700 / Family Code §§ 6203, 6211, 6320");
    if (/elder abuse|dependent adult|elder or dependent/.test(name)) flags.push("elder abuse");
    if (/hate crime|bias.motivated/.test(name)) flags.push("hate crime");
    if (/serious bodily injury|great bodily injury|\bgb[i]\b|\bsbi\b/.test(name)) flags.push("serious or great bodily injury");
    if (/sex offender registration|register as a sex offender|pc ?290 registration/.test(name)) flags.push("mandatory PC § 290 registration");
    if (flags.length) return {kind:"conditional",reason:"Determine whether this offense meets the case-specific exclusion for " + flags.join("; ") + "."};
    return null;
  }
  return {evaluate};
})();
