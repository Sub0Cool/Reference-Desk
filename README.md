# Reference Desk

A small, dependency-free browser toolkit for California criminal-law workflow.
It includes inclusive date counting, Penal Code § 4019 custody credits, a unified
charge lookup for misdemeanor exposure, probation information, and Penal Code
§ 29805 firearm-prohibition checks, plus blood alcohol estimation tools.

## Use it locally

Download or clone the project, then open `index.html` in any modern web browser.
No install or build step is required.

## Publish with GitHub Pages

1. Create a GitHub repository and add these files to its default branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the default branch (usually `main`), choose the `/ (root)` folder, and
   click **Save**.
5. GitHub will show the public site link after deployment finishes.

## How date counting works

- Start and end dates both count. September 28–30, 2026 is **3 days**.
- Each row displays its own inclusive day count.
- The large total counts each calendar day only once, even when ranges overlap.
- Date math uses calendar dates in UTC, avoiding daylight-saving time errors.

## California Penal Code § 4019 calculator

The custody-credit section uses the unique inclusive-day total as the number of
actual custody days. When the four-day commitment requirement is marked as
satisfied, it applies the standard current § 4019 formula: two conduct-credit
days for each complete two-day block of actual custody.

Examples:

- 4 actual days → 4 conduct days → 8 total credit days.
- 5 actual days → 4 conduct days → 9 total credit days.
- 6 actual days → 6 conduct days → 12 total credit days.

The calculator does **not** determine whether § 4019 applies in a particular
case. Other statutes can limit or eliminate conduct credits, and custody must
otherwise qualify for presentence credit. The result should be independently
verified before use in a case.


## Unified charge lookup

Reference Desk combines the former Maximum Exposure, Probation Eligibility &
Terms, and Penal Code § 29805 tools into one charge-centered lookup. Enter a code
section or supported common offense name once and the app returns all currently
loaded information for that charge.

The unified result preserves the existing behavior of each source tool:

- **Maximum Exposure** reports the misdemeanor county-jail exposure and the
  statutory provision supplying the punishment, with a direct link to the
  governing statute.
- **Probation Eligibility & Terms** reports general eligibility, offense-specific
  mandatory or notable terms, maximum penal-fine information when loaded, and
  links to the governing authorities.
- **Penal Code § 29805** remains subdivision-aware and reports whether the offense
  is listed, conditional, or requires more subdivision information, with a direct
  link to § 29805.

Where exposure or probation consequences depend on a subdivision, prior
conviction, injury, victim relationship, value threshold, or other fact, the tool
continues to use cautious results such as **Varies**, **Generally eligible**, or
**More information needed** rather than inventing a definitive answer.

The consolidation does not add new substantive legal rules to the underlying
offense or § 29805 datasets.

### Office-policy tiers

The charge lookup also supports an office-policy tier overlay imported from the
Reference Desk master matrix. Tier classifications are explicitly labeled as
**office policy — not statutory law**.

The tier dataset preserves each spreadsheet row separately. If the same code
section has more than one tier because the charged form or circumstances differ,
the result displays every applicable tier and exposes the spreadsheet offense
descriptions as the reason for the variants.

The tier import does **not** broadly overwrite the existing legal datasets.
Conflicts identified during the spreadsheet comparison are resolved only when
specifically reviewed. The October 2026 conflict-resolution pass preserves the
existing Reference Desk values where directed, updates HSC § 11550(a) to reflect
no statutory minimum for the ordinary offense, and uses a cautious "Most likely
applies" § 29805 warning for specified firearm-charge rows that require checking
both the charge statute and § 29805. New matrix charges may therefore have an
office tier while their legal exposure or probation information remains marked as
not yet loaded.
