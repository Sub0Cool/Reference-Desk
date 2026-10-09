# Moral Turpitude Lookup — research and QA audit (2026-10-09)

## Scope and limits
- California **criminal witness impeachment**, not professional discipline or immigration classification.
- 2022 user-provided compilation is a lead-finding index only. Holdings were evaluated from available public opinion text where possible.
- **Not a complete Shepard's/KeyCite report.** Public-access checks may miss later treatment and statutory changes. No representation that each authority remains controlling as of today.
- Existing result labels have distinct conviction and conduct meanings. No result determines admissibility in a particular case; Evidence Code § 352 and rules of proof still govern.

## Findings from targeted primary-opinion checks
- *People v. Castro* (1985) 38 Cal.3d 301, 317–318: felony prior limited to least adjudicated elements; simple possession versus possession for sale distinguished.
- *People v. Thomas* (1988) 206 Cal.App.3d 689, 694–701: simple assault, simple battery and battery resulting in serious injury differ from aggravated assault; former subdivision mapping matters.
- *People v. Thornton* (1992) 3 Cal.App.4th 419, 422–424: PC § 422 conviction moral turpitude.
- *People v. Campbell* (1994) 23 Cal.App.4th 1488, 1492–1496: felony vandalism holding based on 1983 law and a $1,000 threshold, not blanket current misdemeanor vandalism.
- *People v. Feaster* (2002) 102 Cal.App.4th 1084, 1092–1093: § 246.3 grossly negligent discharge moral turpitude; § 352 exclusion still permissible.
- *People v. Elwell* (1988) 206 Cal.App.3d 171, 175–178: assault by means likely to cause GBI under former § 245(a)(1); now generally addressed by § 245(a)(4).
- *People v. Williams* (1999) 72 Cal.App.4th 1460, 1463–1465: § 69; distinguish ordinary § 148.
- *People v. Aguilar* (2016) 245 Cal.App.4th 1010, 1017–1019: felony § 25400(a)(1).
- *People v. Bedolla* (2018) 28 Cal.App.5th 535: § 25850(a), concerning a juvenile adjudication, which must not be mislabeled a blanket felony conviction holding.
- *People v. Lindsay* (1989) 209 Cal.App.3d 849, 855–859: battery on officer under historical § 243(c), not all contemporary § 243 alternatives.

## Data integrity
- 25 unique (code, section) entries; no duplicated codes/sections in the dataset.
- Each referenced authority identifier resolves to an authority record.
- Conditional offenses and historical subdivision mismatches carry visible qualifications.
- All external URLs need manual spot checking if later updated; there is no automated complete link checker.
- Citation verification is **targeted and incomplete** across the full 25-entry set; independent subsequent-history research required before treating the dataset as a vetted legal reference.

## Browser tests
- The new Playwright Chromium regression tests cover lookup, suggestions, unknown queries, conditional results, and navigation.
- GitHub Actions workflow included at .github/workflows/moral-turpitude-test.yml.
- **PASSED:** GitHub Actions run 37978349026, Chromium browser regression job successful on commit b85b32e2b4e68a5e0862a62f87d5691b7e819726 (25-entry dataset). Browser testing is limited to the scripted scenarios, not exhaustive manual usability testing.

## Release hold
- PR #23 remains draft; browser regression passed. Full subsequent-history review remains an explicit prerequisite to a claim of comprehensive legal validation.

## Follow-up audit — 2026-10-09
- Confirmed **production** `main` and persistent `testing` branch have the original `index.html`; only `feature/moral-turpitude-lookup` contains the new tool. Preview requires selecting that feature branch through the dual-pages workflow's `preview_ref` input. No branch was merged or rewritten for this purpose.
- Confirmed from full opinion text: *People v. Castro* (1985) 38 Cal.3d 301 (least adjudicated elements; possession vs. possession for sale); *People v. Thomas* (1988) 206 Cal.App.3d 689 (simple assault/battery vs. aggravated assault); *People v. Aguilar* (2016) 245 Cal.App.4th 1010 (§ 25400(a)(1) felony); *People v. Burton* (2015) 243 Cal.App.4th 129 (§ 273.5 and the relevant 2001/2005 statutory versions); *People v. Cudjo* (1993) 6 Cal.4th 585 (grand theft); and *People v. Bedolla* (2018) 28 Cal.App.5th 535 (juvenile adjudication under § 25850(a)).
- Replaced an unreliable `People v. Maestas` link with the appellate opinion at `https://law.justia.com/cases/california/court-of-appeal/2005/a108030.html`.
- The opinion checks are **not a formal positive citator**, do not establish exhaustive subsequent history, and do not constitute a final entry-by-entry audit of all 25 offense conclusions or all hyperlinks. Continue to hold PR #23 for substantive legal review.
