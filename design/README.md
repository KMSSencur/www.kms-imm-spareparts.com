# Handoff: KMS used machines & spare parts website

## Overview

A new public website for **KMS, d.o.o.** (Šenčur, Slovenia) selling **used industrial machines and spare parts**, mainly from and for KraussMaffei machines. Content is **English by default**, with a **Slovenian (SL) language toggle**.

Primary visitor: a small workshop owner. They want to browse simply, see whether the machine or part exists, and get a human on the phone. There is **no checkout** — every commercial action ends in an enquiry ("price on request") or a phone call.

Scope of this bundle: home page, machine listing (two patterns), spare-parts search, part detail, about/contact, and the language-toggle states.

## About the design files

The files in `wireframes/` are **design references created in HTML** — prototypes showing intended structure, hierarchy and behaviour. They are **not production code**. Recreate them in the target codebase's environment (React/Next, Vue, Astro, a CMS theme — whatever the project uses) with that codebase's established patterns. If no environment exists yet, pick an appropriate stack; a content-managed site with a searchable machine/parts inventory is the shape of the problem.

The one thing to carry over literally is the **theme stylesheet** (`theme/kms-theme.css`): its CSS custom properties are the design tokens.

## Fidelity

**Low-to-mid fidelity.** Layout, hierarchy, copy and component choice are decided and should be followed. Photography is placeholder (`.ph` striped blocks). Iconography is not drawn — use [Lucide](https://lucide.dev) at stroke-width 1.5. Exact pixel spacing inside a card is indicative; the token scale below is authoritative.

## Design system

The visual language is the **Industry** design system, included in `design-system/`, re-themed to KraussMaffei-derived colours in `theme/kms-theme.css`.

Its character: a technical wireframe. Light ground, hairline borders, **square corners**, blueprint "registration marks" at the corners of framed objects, condensed headings. Rules that matter:

- Cards, figures and the primary button are **blueprint objects**: `.blueprint` + four `<i class="corner tl|tr|bl|br"></i>` children. Never drop the corner marks from a framed element.
- Cards and figures are **line drawings** — transparent, hairline-bordered. The solid navy primary button is the single deliberate exception.
- **No rounded corners** beyond the 2–4px token radius.
- Photographs go through the `.duotone` wrapper (desaturated, washed in the accent). In the wireframes this is faked by `.ph.duotone` placeholders.
- Headings **Barlow Condensed 600**, body **Barlow**. Part numbers, technical values and micro-labels use **IBM Plex Mono** (added on top of the system for this project — machine and part identifiers read better monospaced).

Read `design-system/readme.md` for the full guide, and open the pages in `design-system/components/` and `design-system/foundations/` in a browser to see every component in every state.

## Design tokens

All tokens live in `theme/kms-theme.css` as `:root` custom properties. Use the variables, not the hexes.

### Colour

Derived from kraussmaffei.com (navy `#00325A`) on the Industry ground.

| Token | Value | Use |
| --- | --- | --- |
| `--color-accent` | `#00325a` | Navy. Structure: top bar, footer band, primary button, logo mark |
| `--color-accent-2` | `#0079c1` | Bright blue. **Never fills an area** — links, kickers, "in stock", forward arrows |
| `--color-bg` | `#f4f5f6` | Page ground |
| `--color-surface` | `#eceef0` | Search panels, enquiry boxes |
| `--color-text` | `#1d1f20` | All body copy |
| `--color-divider` | `#1d1f20` @ 16% | Every hairline border |

Both accents carry a 100–900 OKLCH ramp (`--color-accent-100` … `-900`, same for `--color-accent-2-*`). Use 100–300 for tinted fills and hovers, 500/base for the role, 700–900 for text on tinted fills and pressed states. `--color-accent-900` (`#001b30`) is the reversed field used by the top bar and the footer CTA band.

Contrast note: the accent-to-ground pair is tuned to ~3:1 — fine for chrome and large text, **not** for paragraph copy. Body text in blue uses `--color-accent-700`.

### Type

| Role | Family | Notes |
| --- | --- | --- |
| Headings | `--font-heading` — Barlow Condensed 600 | line-height 1.05, letter-spacing 0.02em on wordmarks |
| Body | `--font-body` — Barlow 300/400/500/600 | 13–14px in UI, 15–16px for page copy |
| Technical | IBM Plex Mono 400/500 | part numbers, hours, kN, kicker labels; 9–11px, letter-spacing 0.12–0.14em when uppercase |

Sizes used: page H1 40–44px, section H2 20–24px, card title 17–19px, body 13–14px, meta/mono 10–11px.

### Spacing, radius, elevation

`--space-1: 3.4px`, `-2: 6.8`, `-3: 10.2`, `-4: 13.6`, `-6: 20.4`, `-8: 27.2` (a 0.85× density scale). Radius `--radius-sm: 2px`, `--radius-md: 4px`, `--radius-lg: 7px`. Shadows `--shadow-sm/md/lg` — used sparingly; this system prefers borders to elevation.

Page grid: content is full-width to the viewport with 22px side padding at the wireframe's 940px reference width; use a max content width of ~1280px in implementation. Card grids are 3 or 4 equal columns, gap 14px. The listing filter rail is 220px fixed beside a fluid results column.

## Screens

### 1. Home — `wireframes/home.html`

**Purpose:** convince a first-time visitor that stock exists and get them into search or onto the phone within one screen.

**Layout, top to bottom:**

1. **Utility bar** — navy `--color-accent-900`, white text, 8px/22px padding. Left: "CERTIFIED KRAUSSMAFFEI SERVICE PARTNER · SLOVENIA" in mono, letter-spacing .08em. Right: phone number, then `EN | SL`.
2. **Header** — white, 16px/22px, bottom hairline. Left: 34px navy square with "KMS", then wordmark "USED MACHINES" (Barlow Condensed 16px) over "KMS d.o.o. · Šenčur" (mono 9px, 55% opacity). Centre: nav — Machines, Spare parts, Service, About, Contact. Right: primary button "Request a quote" (navy fill, corner marks).
3. **Hero** — centred, 44px top padding. Kicker "129 machines in stock · updated weekly" (bright blue mono). H1 44px "Used KraussMaffei machines and spare parts". Sub-paragraph max-width 520px at 70% opacity. Then the **search panel**: `.blueprint` box on `--color-surface`, 660px max-width, containing a full-width input ("Machine type, model or part number — e.g. KM 200 / 1000 CX") + navy "Search stock" button, and below it a centred row of neutral tags: Injection moulding, Extrusion, Robots, Dryers & dosing, Spare parts. Each tag is a pre-filtered listing link.
4. **Three-figure strip** — equal thirds separated by 1px dividers: 129 machines in stock / 48 h average quote turnaround / 30 yrs servicing KM machines. Numbers Barlow Condensed 26px in navy.
5. **Latest arrivals** — H2 "Latest arrivals" with "All machines →" on the right. Four blueprint cards, each: 86px duotone photo, category kicker, model title, mono meta line (`2014 · 2 000 kg · SI`), then a `Price on request` tag and a "Details" link.
6. **Contact band** — navy field, white type. Left: "Not sure which machine fits?" + one line of reassurance. Right: the phone number at 22px beside a white "Send an enquiry" button.
7. **Footer** — machines · parts · service · company · legal · newsletter · EN/SL.

**Behaviour:** search submits to the machines listing with `?q=`. Tags link to pre-filtered listings. Card and figure hovers get an `--color-accent-100` tint; the whole card is one link target.

### 2. Machines listing — `wireframes/machines.html` (primary pattern)

**Purpose:** narrow 129 machines down to a shortlist.

Breadcrumb bar on top (`Home / Machines / Injection moulding`), then a two-column grid: **220px filter rail** (right hairline) beside the results column.

Filter rail, top to bottom, each group titled in 10px mono uppercase at 50% opacity: **Make** (radios with counts — KraussMaffei 84, Netstal 12, Other 33), **Clamping force** (range slider 500–14 500 kN), **Year** (range 1998–2024), **Condition** (tags: Inspected / As seen / Rebuilt, selectable), **Location** (select). A "Clear all filters" secondary button fills the rail width.

Results column: H1 "Injection moulding machines" with a Newest/Year/Force segmented sort on the right; a result count line with removable filter chips (`KraussMaffei ×`); a 3-column card grid (92px photo, title, mono spec line, price-on-request tag); numbered pagination centred below.

Filters apply immediately and write to the URL so a shortlist can be sent by email.

### 3. Machines listing, dense — `wireframes/machines-table.html` (alternative)

Same data as a table for buyers who compare by number. A blueprint filter bar spans the top: five selects (Category, Make, Year from, Clamping force, Location) plus a navy "Filter" button, laid out `repeat(5, 1fr) auto`, aligned to the baseline.

The `.table` below carries: thumbnail (54×34), machine name in bold with category beneath in mono, Year, Clamping force, Hours, Location, Status tag, and a ghost "Enquire" action. Footer row: "Showing 5 of 129" left, "Compare selected" + "Load more" right.

Build one listing route that can render either presentation; the card grid is the default.

### 4. Spare parts — `wireframes/spare-parts.html`

**Purpose:** three ways in, because most callers do not know the part number.

H1 "Spare parts for KraussMaffei machines" + one line of reassurance. Then:

- **Route 1 (primary):** a surface-filled blueprint panel with a wide input ("Part number — e.g. 1234567 or KM-HPP-A2VK12") and a navy "Check availability" button, with a mono tip line under it explaining where to find the number.
- **Route 2:** blueprint card "Browse by machine" — a hairline-ruled list of series (CX, GX, PX, MX/older hydraulic, Berstorff extrusion) each with a part count and a `›`.
- **Route 3:** blueprint card "Send a photo or a list" — a drop zone accepting a photo of the part, a scan of a parts list or a spreadsheet, plus a "your machine" input and a Send button. Mono line: "WE ANSWER WITHIN TWO WORKING DAYS".

Routes 2 and 3 sit side by side in a 1fr 1fr grid. A navy band closes the page: "Machine down right now?" + the service hotline.

Uploads need file-type and size validation, and the enquiry should capture machine model and contact details.

### 5. Part detail — `wireframes/part-detail.html`

Two columns, 230px media beside the content. Media: a 170px duotone blueprint figure plus three 52×40 thumbnails. Content: category kicker, H1 part name, mono line "PART NO. 1234567 · replaces 998231", availability tags (`2 in stock, Šenčur`, `Original KM`), then a four-row spec table (Fits / Condition / Lead time / Price — "On request").

The enquiry block is a surface blueprint panel: quantity input (max 90px) + optional machine serial, a full-width navy "Request a price" button, and a centred mono "OR CALL +386 4 25 16 150".

Below: "OFTEN ORDERED TOGETHER" — three placeholder part cards.

Fitment is the critical field: show the model range and years the part fits, and warn when the visitor's stated machine falls outside it.

### 6. About & contact — `wireframes/about-contact.html`

One page, people first. Wide duotone workshop photograph (130px) under the breadcrumb, then H1 "Thirty years around these machines" and a short paragraph placing the used-machine business inside the service department.

Two blueprint contact cards side by side (Sales — used machines; Spare parts & service), each with a 44px portrait placeholder, name, direct phone, e-mail. Below, a 1fr 1fr row: the postal address block (KMS, d.o.o., Poslovna cona A 34, 4208 Šenčur, Slovenia) with T/E in mono, beside a map placeholder.

Names, portraits and direct numbers are placeholders — KMS supplies the real ones.

### 7. Language & colour reference — `wireframes/language-colour.html`

Not a page of the site; a specification sheet.

**Language toggle, three states:** desktop segmented control with EN active; the same with SL active (URL `/sl/`, identical layout); mobile collapsed into the burger menu as `EN ▾`.

**Same header in both languages**, showing the SL copy for the nav and the primary action: Stroji / Rezervni deli / Servis / O nas / Kontakt, "Rabljeni stroji KraussMaffei", "Povpraševanje".

**Colour application** swatches with the rule written under them: navy carries the structure, the brighter blue only marks what is live, everything else is paper and ink.

## Interactions & behaviour

- **Navigation:** header nav → section landing pages. Cards and table rows are whole-area links to the detail page.
- **Enquiry:** every price is "on request". The enquiry form captures machine/part reference, quantity where relevant, contact details and a free-text field, and confirms the two-working-day promise on submit. Phone number is present on every screen.
- **Filters:** apply on change, reflect in the URL, and render as removable chips above the results. "Clear all filters" resets to the unfiltered listing.
- **States to build:** empty result set (offer the enquiry form instead), loading skeletons for the listing grid, upload progress and error on the parts drop zone, form validation inline under each field.
- **Hover/active/focus:** already defined by the design system — do not restyle. Hovers tint from the accent ramp; pressed states step one further (`--color-accent-600`); focus is `2px solid var(--color-accent)` with 2px offset. Never leave a browser-default focus ring.
- **Responsive:** the wireframes are drawn at a 940px reference width. Below ~900px the filter rail becomes a "Filters" sheet, card grids drop to 2 then 1 column, the dense table becomes stacked rows, and the language toggle collapses into the burger menu. Tap targets ≥44px.

## Internationalisation

- English is the default; Slovenian is a full translation, not a subset. Route as `/` (EN) and `/sl/` (SL), or `/en/` + `/sl/` if the CMS prefers symmetry.
- The toggle preserves the current page and its query string.
- Layout must survive longer Slovenian strings — nav items and buttons grow 15–25%. Do not fix nav item widths.
- Machine models, part numbers and units stay untranslated. Dates and thousands separators follow the locale (SL uses a space as thousands separator and `d. m. yyyy`).
- Croatian was mentioned as a possible third locale on the existing kms.si — build the language switch as a list, not a two-way toggle.

## State

Per screen: filter state (make, force range, year range, condition, location, sort, page) mirrored in the URL; search query; enquiry form state and submission status; upload state for the parts drop zone; current locale.

Data the site needs: a machine inventory (model, category, make, year, clamping force, hours, location, condition, gallery, service history, status) and a parts catalogue (number, superseded numbers, name, category, fitment range, condition, stock quantity and location, lead time, related parts).

## Assets

- **Photography:** none supplied. Every `.ph` block marks a photograph that KMS must provide — machine shots on the workshop floor, part close-ups, two staff portraits, a wide workshop shot for About. All content photographs render through `.duotone`.
- **Icons:** Lucide, stroke-width 1.5.
- **Fonts:** Barlow Condensed, Barlow, IBM Plex Mono — all Google Fonts, currently loaded from the Google CDN; self-host them for production.
- **Logo:** the "KMS" square is a typographic stand-in. Use the real KMS mark.
- **KraussMaffei branding:** KM is referenced as the make of the machines and as the partner relationship only. Do not reproduce KraussMaffei's logo, page templates or brand assets — the navy is the only thing taken from them, and it is applied through this project's own system.

## Files

```
design_handoff_kms_used_machines/
├── README.md                     ← this file
├── theme/
│   └── kms-theme.css             ← the design tokens. Ship this.
├── wireframes/
│   ├── home.html                 ← home (option 1a)
│   ├── machines.html             ← listing, filter rail + cards
│   ├── machines-table.html       ← listing, dense table
│   ├── spare-parts.html
│   ├── part-detail.html
│   ├── about-contact.html
│   ├── language-colour.html      ← language states + colour spec
│   └── wireframe.css             ← page chrome + placeholder utilities (not product CSS)
└── design-system/
    ├── readme.md                 ← Industry design system guide
    ├── styles.css                ← the untouched system stylesheet (kms-theme.css is this, re-themed)
    ├── components/               ← buttons, cards, forms, table, navigation, dialog — every state
    └── foundations/              ← type, colour, layout, imagery
```

Open any `wireframes/*.html` directly in a browser; they need no build step.
