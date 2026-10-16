/* DUI Offer Calculator: proposed office offer math, separate from statutory exposure. */
(function (root) {
  "use strict";

  const COLLISIONS = Object.freeze({
    none: { days: 0, iid: false, label: "No collision factor" },
    property: { days: 5, iid: false, label: "Property damage collision" },
    "property-hit-run": { days: 20, iid: false, label: "Property damage collision and hit and run" },
    person: { days: 10, iid: false, label: "Collision with person" },
    "person-hit-run": { days: 25, iid: true, label: "Collision with person and hit and run" }
  });
  const PASSENGERS = Object.freeze({
    none: { days: 0, iid: false, label: "No minor passenger factor" },
    "single-over-five": { days: 10, iid: true, label: "One minor passenger over age 5" },
    "multiple-or-under-five": { days: 15, iid: true, label: "Multiple minor passengers or any minor under 5" }
  });

  function bacExposure(bac) {
    if (!Number.isFinite(bac) || bac < 0 || bac > 1) {
      throw new Error("BAC readings must be numbers between 0 and 1.");
    }
    if (bac <= 0.130) return 0;
    if (bac < 0.180) return 5;
    if (bac < 0.300) return 10;
    return 15;
  }

  function calculate({ readings = [], collision = "none", passengers = "none",
    refusal = false, dangerous = false, stalePriors = 0 } = {}) {
    const values = readings.filter(value => value !== "" && value != null);
    if (!values.length) throw new Error("Enter at least one BAC reading.");
    const parsed = values.map(value => Number(value));
    parsed.forEach(bacExposure);
    if (!Object.hasOwn(COLLISIONS, collision) || !Object.hasOwn(PASSENGERS, passengers)) {
      throw new Error("Choose a valid aggravating factor.");
    }
    const priors = Number(stalePriors);
    if (!Number.isInteger(priors) || priors < 0 || priors > 30) {
      throw new Error("Stale prior DUIs must be a whole number between 0 and 30.");
    }
    const sortedReadings = [...parsed].sort((a, b) => a - b);
    const lowReading = sortedReadings[0];
    const highReading = sortedReadings[sortedReadings.length - 1];
    const factors = [
      { ...COLLISIONS[collision] },
      { ...PASSENGERS[passengers] },
      ...(refusal ? [{ days: 10, iid: true, label: "Chemical test refusal" }] : []),
      ...(priors ? [{ days: priors * 5, iid: false, label: "Stale prior DUI (" + priors + " × 5)" }] : []),
      ...(dangerous ? [{ days: 5, iid: false, label: "Dangerous driving" }] : [])
    ].filter(factor => factor.days > 0);
    const factorDays = factors.reduce((total, factor) => total + factor.days, 0);
    const lowBacDays = bacExposure(lowReading);
    const highBacDays = bacExposure(highReading);
    const lowTotal = lowBacDays + factorDays;
    const maxTotal = highBacDays + factorDays;
    const quarter = maxTotal * 0.25;
    // Compare against the unrounded 25% threshold, then round down
    // offers above five days. A zero-day maximum still yields one day.
    const early = quarter <= 5 ? 1 : Math.floor(quarter);
    return {
      lowReading, highReading, sortedReadings, readingCount: parsed.length,
      lowBacDays, highBacDays,
      factorDays, lowTotal, maxTotal, early,
      quarter, factors, iid: factors.some(factor => factor.iid)
    };
  }

  const api = { bacExposure, calculate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ReferenceDeskDuiOffer = api;

  if (typeof document === "undefined") return;
  const form = document.querySelector("#dui-offer-form");
  if (!form) return;
  const el = id => document.getElementById(id);
  const results = el("dui-offer-results");
  const prompt = el("dui-offer-prompt");
  const error = el("dui-offer-error");
  const days = n => n + (n === 1 ? " day" : " days");
  const bac = value => Number(value).toFixed(3);
  const extraReadings = el("dui-offer-extra-readings");
  const addReadingButton = el("dui-offer-add-reading");

  function renumberExtraReadings() {
    [...extraReadings.children].forEach((row, index) => {
      const number = index + 3;
      const input = row.querySelector("input");
      input.id = "dui-offer-reading-" + number;
      row.querySelector("label").htmlFor = input.id;
      row.querySelector(".dui-offer-extra-label-text").textContent = "BAC reading " + number;
      row.querySelector("button").setAttribute("aria-label", "Remove BAC reading " + number);
    });
  }

  function addReading() {
    const row = document.createElement("div");
    row.className = "dui-offer-extra-row";
    const label = document.createElement("label");
    label.className = "dui-offer-extra-label";
    const caption = document.createElement("span");
    caption.className = "dui-offer-extra-label-text";
    const input = document.createElement("input");
    input.className = "dui-offer-extra-input";
    input.type = "number";
    input.min = "0";
    input.max = "1";
    input.step = "0.001";
    input.inputMode = "decimal";
    input.placeholder = "e.g., 0.185";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "dui-offer-remove-reading";
    remove.textContent = "Remove";
    label.append(caption, input);
    row.append(label, remove);
    extraReadings.append(row);
    renumberExtraReadings();
    input.focus();
  }

  addReadingButton.addEventListener("click", addReading);
  extraReadings.addEventListener("click", event => {
    const remove = event.target.closest(".dui-offer-remove-reading");
    if (!remove) return;
    remove.closest(".dui-offer-extra-row").remove();
    renumberExtraReadings();
    render();
  });

  function hideResult(message = "") {
    results.hidden = true;
    error.hidden = !message;
    error.textContent = message;
    prompt.hidden = !!message;
  }

  function render() {
    const reading1 = el("dui-offer-reading-1").value.trim();
    const reading2 = el("dui-offer-reading-2").value.trim();
    const readings = [
      reading1,
      reading2,
      ...[...extraReadings.querySelectorAll(".dui-offer-extra-input")].map(input => input.value.trim())
    ];
    if (readings.every(reading => reading === "")) {
      hideResult();
      return;
    }
    if (!reading1) {
      hideResult("Enter BAC reading 1. Other readings are optional.");
      return;
    }
    let result;
    try {
      result = calculate({
        readings,
        collision: el("dui-offer-collision").value,
        passengers: el("dui-offer-passengers").value,
        stalePriors: el("dui-offer-priors").value,
        refusal: el("dui-offer-refusal").checked,
        dangerous: el("dui-offer-dangerous").checked
      });
    } catch (err) {
      hideResult(err.message);
      return;
    }

    error.hidden = true;
    prompt.hidden = true;
    results.hidden = false;
    el("dui-offer-max").textContent = days(result.maxTotal);
    el("dui-offer-max-detail").textContent = days(result.highBacDays) + " for higher BAC + " + days(result.factorDays) + " in aggravators";
    el("dui-offer-early").textContent = days(result.early);
    el("dui-offer-low-reading").textContent = bac(result.lowReading);
    el("dui-offer-high-reading").textContent = bac(result.highReading);
    el("dui-offer-low-days").textContent = days(result.lowTotal) + " (" + result.lowBacDays + " BAC + " + result.factorDays + " aggravators)";
    el("dui-offer-high-days").textContent = days(result.maxTotal) + " (" + result.highBacDays + " BAC + " + result.factorDays + " aggravators)";
    el("dui-offer-readings-used").textContent =
      result.readingCount + " BAC " + (result.readingCount === 1 ? "reading" : "readings") +
      " evaluated: " + result.sortedReadings.map(bac).join(", ") +
      ". Lowest and highest readings determine the range.";
    const rows = [
      "Lower BAC " + bac(result.lowReading) + ": " + days(result.lowBacDays),
      "Higher BAC " + bac(result.highReading) + ": " + days(result.highBacDays),
      ...result.factors.map(factor => factor.label + ": +" + days(factor.days)),
      "Total aggravators: +" + days(result.factorDays),
      "Early resolution: 25% × " + days(result.maxTotal) + " = " + days(result.quarter) +
        (result.quarter <= 5
          ? "; 1-day offer under the office's threshold rule."
          : "; rounded down to " + days(result.early) + ".")
    ];
    el("dui-offer-breakdown-list").replaceChildren(...rows.map(text => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }));
    el("dui-offer-iid").textContent = result.iid
      ? "IID: indicated by the selected office aggravator(s)."
      : "IID: no selected office aggravator requires an IID under this grid.";
    el("dui-offer-zero-note").hidden = result.maxTotal !== 0;
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);
  form.addEventListener("submit", event => { event.preventDefault(); render(); });
  function reset() {
    form.reset();
    extraReadings.replaceChildren();
    hideResult();
    el("dui-offer-zero-note").hidden = true;
    const detail = form.querySelector(".dui-offer-details");
    if (detail) detail.open = false;
  }
  el("dui-offer-clear").addEventListener("click", reset);
  api.reset = reset;
  hideResult();
})(typeof window !== "undefined" ? window : globalThis);
