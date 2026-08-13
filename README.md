# KMS — Used Machines & Spare Parts

A static website (no build step, no framework) for **KMS, d.o.o.** (Šenčur,
Slovenia) — used KraussMaffei machines and industrial spare parts. Built from
the design handoff in [`design/`](design/) (the "Industry" design system,
re-themed navy/blue) and populated with the KMS spare-parts catalog.

Deploys to **Vercel** with zero configuration — it's plain HTML/CSS/JS, so
Vercel serves it as-is. Lives in **GitHub** as a normal static repo.

## Preview locally

```bash
powershell -File serve.ps1
```

Then open `http://localhost:8090`. (Plain double-clicking `index.html` also
works in most browsers, since nothing here needs a server — `serve.ps1` is
only there to mirror how Vercel serves it, with root-absolute asset paths.)

## Structure

```
index.html              Home
machines.html            Machines — card grid + filter rail
machines-table.html      Machines — dense table view (alternate pattern)
spare-parts.html         Spare parts — search / browse-by-category / send-a-photo
category.html            Spare parts catalog — full listing + search, target of
                          category/search links from spare-parts.html and the header
part-detail.html          Part detail template (?id=... from js/data.js)
machine-detail.html       Machine detail template (?id=... from js/data.js)
about.html                About & contact (also the #contact anchor target)
service.html               Repair / on-site service

sl/                        Slovenian mirror of every page above (same filenames)

theme/kms-theme.css        Design tokens + component classes — copied verbatim
                          from the design handoff. Don't hand-edit colors/spacing
                          here; they come from theme.json in design/.
css/site.css               Page chrome built on top of the tokens: header, footer,
                          hero, listings, filters, detail layouts, etc.
js/data.js                 The entire catalog — MACHINES and PARTS arrays.
js/site.js                  Rendering + search + filters + i18n label lookup.

design/                    The original design handoff, unmodified, for reference
                          (wireframes, design-system, theme, and the original .zip).
```

## Adding machines or parts

Everything renders from [`js/data.js`](js/data.js). Copy an existing object in
`MACHINES` or `PARTS`, paste it as a new entry, edit the fields — it appears
on the home page, listings, category browser and search automatically, in
both languages. No other file needs to change. There's no cap on how many
items you add.

## What's real vs. sample data

- **Electronics** (Drives, IPC, HMI, Motor, PLC, Power supply): the **first
  item in each submenu** carries a real manufacturer/model researched from
  abcparts.be. Every other item in those submenus, plus everything under
  Machines, Plasticizing units & screws, Hydraulic valves, and Other, is a
  clearly-badged **"Sample"** placeholder — abcparts.be doesn't sell machines,
  plasticizing units, screws or hydraulic valves, so there was nothing real
  to source for those.
- Machine models/specs (KM 200/1000 CX, KM 650/2000 GX, etc.) are the
  illustrative examples from the design handoff itself, not real KMS stock.
- Serial numbers are placeholders everywhere (`SN-...`) — replace with real
  stock data.
- Phone (+386 4 25 16 150), email (info@kms.si) and the Šenčur address come
  from the design brief as placeholder KMS contact details — confirm the
  real ones before launch.
- Photography: none supplied (per the design brief). Every card/detail page
  shows a striped `.ph` placeholder block instead of a photo. Swap in a real
  `<img>` by setting an item's `image` field and updating the relevant markup
  once real photography exists.

## Language (EN / SL)

English lives at the root, Slovenian is mirrored under `/sl/` — same
filenames, so the language switch in the header just swaps `/` for `/sl/`
(or back). This matches the design brief's routing spec.

**What's translated:** all page chrome — nav, headings, labels, form copy,
footer — plus everything `js/site.js` renders dynamically (category names,
"Sample" badge, "Price on request", table headers, etc.), including number
formatting (SL uses a space as the thousands separator, per the brief).

**What's not translated (yet):** the actual catalog *content* in
`js/data.js` — product names, conditions, fitment notes, descriptions — is
English-only on both language trees, since it's placeholder/sample data to
begin with. When real inventory replaces the samples, either keep catalog
text in one language for both trees, or add `nameSl`/`descriptionSl`-style
fields and branch on `lang()` in `js/site.js` the same way `PART_CATEGORIES`
already does.

## Search

The search boxes (home hero, spare-parts, category page) match on **name,
part number, serial number, model, manufacturer, and description**, live as
you type, across the whole `PARTS` catalog — regardless of which category is
currently selected.

## Deploying

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset:
   **Other** (no build command, no output directory needed — it's static).
3. Deploy. Every push to the connected branch redeploys automatically.

No environment variables, no build step, no `package.json` required.

## Design credit & constraints

Visual system, page structure and copy direction come from the design
handoff in `design/README.md` — read that file for the full rationale
(color roles, type scale, the "blueprint" card/button treatment, spacing
tokens). Two things from that brief are still open:

- **Self-host the fonts.** Barlow, Barlow Condensed and IBM Plex Mono are
  currently loaded from the Google Fonts CDN (as the wireframes themselves
  do) — the brief asks for these to be self-hosted for production.
- **Real photography and staff details.** Every `.ph` block on machine/part
  cards and the About page portraits/names need real KMS photos and contact
  info before launch.
