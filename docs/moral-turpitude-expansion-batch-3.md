# Moral Turpitude Lookup — Batch 3 (October 12, 2026)

**Scope:** California criminal witness impeachment. Added **15 offenses** to the 48 on main (63 entries on this branch). The source spreadsheet/list is *2022 CRIMES OF MORAL TURPITUDE LIST.pdf* (dated 2022-03-04), used as a research index rather than binding legal authority. Classification is based on the offense's least adjudicated elements; admissibility of misdemeanor conduct is a separate issue under *People v. Wheeler* (1992) 4 Cal.4th 284 and Evidence Code §352.

| New offense | Draft status | Most important evidence and limitation |
|---|---|---|
| PC 32 accessory | Conditional | *In re Young* (1989) 49 Cal.3d 257, 264 is attorney discipline; not a direct Castro conviction-impeachment holding. |
| PC 451 arson | **Yes** | *People v. Miles* (1985) 172 Cal.App.3d 474, 481–482 expressly treats §451 arson as morally turpitudinous for felony impeachment. |
| PC 273a(a) child endangerment | **Fact-dependent** | *People v. Sanders* (1992) 10 Cal.App.4th 1268, 1273–1275 holds the offense is **not necessarily** moral turpitude under its elements because criminal negligence can suffice. Examine whether the **underlying endangerment was intentional abusive conduct**, assess its moral-turpitude character, and require admissible proof under *Wheeler*. Intent alone is not an automatic Yes. |
| PC 273d(a) injurious child corporal punishment | **Yes** | *Sanders* explicitly distinguishes this affirmative injury offense and cites *People v. Brooks* (1992) 3 Cal.App.4th 669; the direct Brooks opinion and precise reporter pinpoint remain unverified, so the application currently cites Sanders only. |
| PC 148.5(a) false police report | Conditional | Obvious dishonesty issue but no direct subsection-specific published impeachment authority independently located. |
| PC 29800(a)(1) felon firearm possession | **Yes** | *People v. Robinson* (2011) 199 Cal.App.4th 707 addresses former §12021(a)(1), predecessor of §29800(a)(1); verify the cited passage and legislative renumbering. |
| PC 30605(a) assault-weapon possession | Conditional | 2022 list cites *People v. Gabriel* (2012) 206 Cal.App.4th 450, 458, on former §12280(b). Exact scope not independently inspected yet. |
| PC 246 shooting into inhabited structure / occupied vehicle | Conditional | No independently verified direct subdivision-specific California impeachment holding yet. |
| PC 207(a) kidnapping | **Yes** | *People v. Zataray* (1985) 173 Cal.App.3d 390, 399–400 expressly holds simple kidnapping involves moral turpitude under Castro. |
| PC 261.5 unlawful intercourse with minor | Conditional | Distinguish age-gap statutory variants, misdemeanors, historical grade. |
| PC 314(1) indecent exposure | Conditional | *People v. Ballard* (1993) 13 Cal.App.4th 687, 695–698 holds **felony** indecent exposure is morally turpitudinous, but do not blanket-label the misdemeanor conviction evidence as admissible. |
| PC 647(b) prostitution / solicitation | Conditional | Historical amendments and current variants demand analysis; older 2022 reference list is not sufficient. |
| VC 2800.2(a) reckless evasion | **Yes** | *People v. Dewey* (1996) 42 Cal.App.4th 216, 221–222 directly holds felony §2800.2 involves moral turpitude. |
| HS 11358 cannabis cultivation | Conditional | Statutory legalization and changed offense grades since older list. |
| WIC 10980 welfare fraud | Conditional | Research lead *People v. Brooks* (2017) 3 Cal.5th 1; must match specific subdivision and verified passage rather than labeling all §10980 fraud. |

## Further checking required prior to merge
- Verify every new citation URL and pinpoint page, especially the *People v. Brooks* (1992) child-punishment record (not yet included as a citation) and *Robinson* (2011) link.
- Independently confirm all 15 entries' relevant statutory versions and any subsequent negative treatment. No complete KeyCite/Shepard's report has been conducted.
- The **Conditional** entries are explicitly research leads and cannot be represented as completed affirmative findings.
- Run the GitHub moral-turpitude browser regression and preview on /testing/ prior to merge.
- Review whether to present the felony-only *Ballard* rule as a conditional category or to add separate felony/misdemeanor entries.

## Primary opinion sources examined in this pass
- *People v. Sanders* (1992) 10 Cal.App.4th 1268: https://law.justia.com/cases/california/court-of-appeal/4th/10/1268.html
- *People v. Miles* (1985) 172 Cal.App.3d 474: https://law.justia.com/cases/california/court-of-appeal/3d/172/474.html
- *People v. Zataray* (1985) 173 Cal.App.3d 390: https://law.justia.com/cases/california/court-of-appeal/3d/173/390.html
- *People v. Ballard* (1993) 13 Cal.App.4th 687: https://law.justia.com/cases/california/court-of-appeal/4th/13/687.html
- *People v. Dewey* (1996) 42 Cal.App.4th 216: https://syfert.com/california/cases/42-cal-app-4th-216/people-v-dewey

No changes made to office-policy tiers or custody-credit logic.

## PC 273a refinement
At the user's request, the lookup now displays **Fact-dependent** for PC §273a(a), directing practitioners to examine whether endangerment was intentional rather than merely criminally negligent. This is a practical underlying-misconduct inquiry and does not overturn *Sanders*' categorical least-elements holding that the offense is **not necessarily** moral turpitude. Evaluate evidence under *Wheeler* and §352.
