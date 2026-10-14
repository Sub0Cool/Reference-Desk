const { test, expect } = require('@playwright/test');

test('MCDA code-wide exclusions and Vehicle Code carve-outs', async ({page}) => {
  await page.goto('http://127.0.0.1:8000/');
  await page.locator('[data-tool-target="charges"]').click();
  async function lookup(value) {
    await page.locator('#charge-lookup').fill(value);
    await page.locator('#charge-form button[type=submit]').click();
  }
  await lookup('HS 11377(a)');
  await expect(page.locator('#mcda-div-result')).toBeVisible();
  await expect(page.locator('#mcda-div-result')).toContainText('MCDA Div Ineligible');
  await lookup('FG 2000');
  await expect(page.locator('#mcda-div-result')).toBeVisible();
  await lookup('VC 20002(a)');
  await expect(page.locator('#mcda-div-result')).toBeVisible();
  await lookup('VC 4462.5');
  await expect(page.locator('#mcda-div-result')).toBeHidden();
  await lookup('VC 13004(f)');
  await expect(page.locator('#mcda-div-result')).toBeHidden();
});

test('MCDA conditional active resistance and exact offense exclusions', async ({page}) => {
  await page.goto('http://127.0.0.1:8000/');
  await page.locator('[data-tool-target="charges"]').click();
  const input=page.locator('#charge-lookup');
  const submit=page.locator('#charge-form button[type=submit]');
  await input.fill('PC 148(a)(1)');await submit.click();
  await expect(page.locator('#mcda-div-result')).toContainText('Conditional');
  await expect(page.locator('#mcda-div-result')).toContainText('active physical resistance');
  await input.fill('PC 136.1(a)(1)');await submit.click();
  await expect(page.locator('#mcda-div-result')).toBeVisible();
  await expect(page.locator('#mcda-div-result')).not.toContainText('Conditional');
  await input.fill('PC 647(j)(1)');await submit.click();
  await expect(page.locator('#mcda-div-result')).toBeVisible();
  await input.fill('PC 240');await submit.click();
  await expect(page.locator('#mcda-div-result')).toBeHidden();
});

test('named domestic violence charges display the MCDA notice', async ({page}) => {
 await page.goto('http://127.0.0.1:8000/');
 await page.locator('[data-tool-target="charges"]').click();
 for (const section of ['243(e)(1)','166(c)(1)','273.5(a)','273.6(a)']) {
  await page.locator('#charge-lookup').fill('PC '+section);
  await page.locator('#charge-form button[type=submit]').click();
  await expect(page.locator('#mcda-div-result')).toBeVisible();
 }
});
