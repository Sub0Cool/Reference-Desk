/* node --test tests/dui-offer.spec.js */
const test = require("node:test");
const assert = require("node:assert/strict");
const { bacExposure, calculate } = require("../dui-offer.js");

test("BAC thresholds, including the 0.130 overlap", () => {
  assert.equal(bacExposure(0.130), 0);
  assert.equal(bacExposure(0.131), 5);
  assert.equal(bacExposure(0.179), 5);
  assert.equal(bacExposure(0.180), 10);
  assert.equal(bacExposure(0.229), 10);
  assert.equal(bacExposure(0.230), 10);
  assert.equal(bacExposure(0.299), 10);
  assert.equal(bacExposure(0.300), 15);
});
test("readings are auto-sorted and high exposure determines offer", () => {
  const result = calculate({readings: [0.301, 0.151], collision: "property", refusal: true});
  assert.equal(result.lowReading, 0.151);
  assert.equal(result.highReading, 0.301);
  assert.equal(result.lowTotal, 20);
  assert.equal(result.maxTotal, 30);
  assert.equal(result.early, 7);
  assert.equal(result.iid, true);
});
test("collision and passenger choices cannot be double counted", () => {
  const result = calculate({readings: [0.130], collision: "person-hit-run", passengers: "multiple-or-under-five", stalePriors: 2, dangerous: true});
  assert.equal(result.factorDays, 55);
  assert.equal(result.maxTotal, 55);
  assert.equal(result.early, 13);
  assert.equal(result.iid, true);
});
test("single reading, one-day floor and no IID", () => {
  const result = calculate({readings: [0.175]});
  assert.equal(result.lowTotal, 5);
  assert.equal(result.maxTotal, 5);
  assert.equal(result.early, 1);
  assert.equal(result.iid, false);
});
test("confirmed zero-max office rule produces one day", () => {
  assert.equal(calculate({readings: [0.100]}).early, 1);
});
test("early resolution keeps the 5-day threshold before rounding down", () => {
  const threshold = calculate({readings: [0.130], stalePriors: 4});
  assert.equal(threshold.maxTotal, 20);
  assert.equal(threshold.quarter, 5);
  assert.equal(threshold.early, 1);

  const fractional = calculate({readings: [0.130], stalePriors: 5});
  assert.equal(fractional.maxTotal, 25);
  assert.equal(fractional.quarter, 6.25);
  assert.equal(fractional.early, 6);
});
test("invalid readings and stale prior counts rejected", () => {
  assert.throws(() => calculate({readings: [1.2]}));
  assert.throws(() => calculate({readings: []}));
  assert.throws(() => calculate({readings: [0.140], stalePriors: 2.5}));
  assert.throws(() => calculate({readings: [0.140], collision: "invalid"}));
});
