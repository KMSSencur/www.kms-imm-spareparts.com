/*
  Shared site behaviour: mobile menu, card rendering, listings, search,
  filters, and detail-page population. Reads PRODUCTS/MACHINES from
  js/data.js. One script, loaded by every EN and every SL page — dynamic
  text (labels not baked into the page's own HTML) is looked up in LABELS
  by document.documentElement.lang so the same script serves both trees.
*/

const PHONE = "+386 51 251 441";
const EMAIL = "info@kms.si";

// Every enquiry/quote form's action= attribute posts straight to
// FormSubmit.co (marko.lamovsek@kms.si), which relays it as a real email —
// no backend needed for a static site. Submission is a native browser POST,
// not fetch()/AJAX: an early version used fetch to the AJAX endpoint for a
// smooth inline "thanks" without a page reload, but that reads the
// cross-origin response, which the live domain's browser blocked via CORS —
// the email still sent (the POST itself isn't CORS-gated), but the page
// wrongly reported failure. A native form POST is a plain navigation, never
// subject to CORS, so it can't have that failure mode. The tradeoff is a
// page reload; FormSubmit's _next field redirects back here with ?sent=1
// so the same inline confirmation still shows once the page reloads.
// (Note: the FIRST submission FormSubmit ever receives for an address
// triggers a one-time confirmation email that must be clicked before any
// further submissions actually get delivered.)

const LABELS = {
  en: {
    priceOnRequest: "Price on request",
    sample: "Sample",
    details: "Details",
    enquire: "Enquire",
    compareSelected: "Compare selected",
    loadMore: "Load more",
    showing: (n, total) => `Showing ${n} of ${total}`,
    results: (n) => `${n} results`,
    clearFilters: "Clear all filters",
    requestPrice: "Request a price",
    orCall: (phone) => `OR CALL ${phone}`,
    oftenTogether: "OFTEN ORDERED TOGETHER",
    checkAvailability: "Check availability",
    noResults: "No items found. Try a different search term or browse a category above.",
    inStock: (loc) => `In stock, ${loc}`,
    originalPart: "Original part",
    fits: "Fits",
    condition: "Condition",
    leadTime: "Lead time",
    price: "Price",
    partNoLabel: "PART NO.",
    enquirySent: "Thanks — your enquiry has been sent. We answer within two working days, or call " + PHONE + ".",
    enquiryFailed: "Something went wrong sending that — please call us instead at " + PHONE + ".",
    fillMissingFields: "Please fill in the missing information — it's marked below.",
    chooseFile: "Choose a file",
    machinePhoto: "machine photo",
    partPhoto: "part photograph",
    otherMake: "Other",
    noOtherEquipment: "We don't have any other plastic equipment listed online yet — call us or send an enquiry and we'll check current stock for you."
  },
  sl: {
    priceOnRequest: "Cena na zahtevo",
    sample: "Vzorec",
    details: "Podrobnosti",
    enquire: "Povpraševanje",
    compareSelected: "Primerjaj izbrano",
    loadMore: "Naloži več",
    showing: (n, total) => `Prikazanih ${n} od ${total}`,
    results: (n) => `${n} rezultatov`,
    clearFilters: "Počisti vse filtre",
    requestPrice: "Povprašaj za ceno",
    orCall: (phone) => `ALI POKLIČITE ${phone}`,
    oftenTogether: "POGOSTO NAROČENO SKUPAJ",
    checkAvailability: "Preveri razpoložljivost",
    noResults: "Ni najdenih izdelkov. Poskusite drug iskalni niz ali izberite kategorijo zgoraj.",
    inStock: (loc) => `Na zalogi, ${loc}`,
    originalPart: "Originalni del",
    fits: "Ustreza",
    condition: "Stanje",
    leadTime: "Dobavni čas",
    price: "Cena",
    partNoLabel: "ŠT. DELA",
    enquirySent: "Hvala — vaše povpraševanje je bilo posredovano. Odgovorimo v dveh delovnih dneh, ali pokličite " + PHONE + ".",
    enquiryFailed: "Prišlo je do napake pri pošiljanju — prosimo, pokličite nas na " + PHONE + ".",
    fillMissingFields: "Prosimo, izpolnite manjkajoče podatke — označeni so spodaj.",
    chooseFile: "Izberite datoteko",
    machinePhoto: "fotografija stroja",
    partPhoto: "fotografija dela",
    otherMake: "Drugo",
    noOtherEquipment: "Trenutno na spletu še nimamo objavljene druge plastične opreme — pokličite nas ali pošljite povpraševanje in preverimo trenutno zalogo."
  }
};

function lang() { return document.documentElement.lang === "sl" ? "sl" : "en"; }
function L() { return LABELS[lang()]; }
function fmtInt(n) {
  if (typeof n !== "number") return n;
  // SL uses a space as the thousands separator (per the design brief);
  // browsers' sl-SI ICU data is inconsistent, so this is done by hand.
  if (lang() === "sl") return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return n.toLocaleString("en-US");
}
// Clamping force is stored in kN but always shown to customers in tons
// (KMS convention: 1300 kN = 130 t, i.e. divide by 10).
function fmtForceTons(kN) {
  return fmtInt(Math.round(kN / 10)) + " t";
}

// ---------------------------------------------------------------- mobile menu
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const panel = document.querySelector(".mobile-panel");
  if (!burger || !panel) return;
  burger.addEventListener("click", () => panel.classList.toggle("open"));
}

// ---------------------------------------------------------------- required-field validation
// Blocks submission (returns false) and marks each empty required field
// with .invalid if any of `names` is blank; clears marks and returns true
// otherwise. The mark clears itself as soon as the visitor types.
function validateRequired(form, names, confirmEl) {
  let allFilled = true;
  names.forEach(name => {
    const el = form.elements[name];
    if (!el) return;
    const empty = !el.value.trim();
    el.classList.toggle("invalid", empty);
    if (empty) {
      allFilled = false;
      el.addEventListener("input", function clearInvalid() {
        el.classList.remove("invalid");
        el.removeEventListener("input", clearInvalid);
      });
    }
  });
  if (!allFilled && confirmEl) {
    confirmEl.textContent = L().fillMissingFields;
    confirmEl.classList.add("show", "error");
  }
  return allFilled;
}

// ---------------------------------------------------------------- enquiry submission
// Called just before letting a valid form submit natively (do NOT
// preventDefault after calling this). Fills in the hidden _subject/context/
// _next fields FormSubmit reads, pointing _next back at the current page
// with ?sent=1 so checkEnquirySentRedirect() can show the confirmation
// once FormSubmit redirects back here.
function prepareEnquirySubmit(form, subject, context) {
  const setHidden = (name, value) => {
    const el = form.querySelector(`input[name='${name}']`);
    if (el) el.value = value;
  };
  setHidden("_subject", subject);
  setHidden("context", context || "");
  const url = new URL(window.location.href);
  url.searchParams.set("sent", "1");
  setHidden("_next", url.toString());
}

// Call on every page load that has an enquiry form. If the URL carries
// ?sent=1 (FormSubmit's _next redirect landing back here after a real,
// successful delivery), show the confirmation and strip the marker so a
// refresh doesn't repeat it.
function checkEnquirySentRedirect(formId) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("sent") !== "1") return;
  const form = document.getElementById(formId);
  const confirmEl = (form && form.querySelector(".enquiry-confirm")) || document.getElementById("enquiry-confirm");
  if (confirmEl) {
    confirmEl.classList.remove("error");
    confirmEl.textContent = L().enquirySent;
    confirmEl.classList.add("show");
  }
  params.delete("sent");
  const query = params.toString();
  history.replaceState(null, "", window.location.pathname + (query ? "?" + query : "") + window.location.hash);
}

// ---------------------------------------------------------------- photo lightbox
// images: array of photo URLs; startIndex: which one to open on.
// One photo -> just the image, no nav chrome. Multiple -> prev/next arrows
// plus left/right arrow keys, wrapping around at each end.
function openLightbox(images, startIndex, alt) {
  let index = startIndex || 0;
  const backdrop = document.createElement("div");
  backdrop.className = "dialog-backdrop lightbox-backdrop";

  const img = document.createElement("img");
  img.className = "lightbox-img";
  img.alt = alt || "";
  backdrop.appendChild(img);

  function render() { img.src = images[index]; }
  render();

  const closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", (e) => { e.stopPropagation(); close(); });
  backdrop.appendChild(closeBtn);

  if (images.length > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.className = "lightbox-nav lightbox-prev";
    prevBtn.setAttribute("aria-label", "Previous photo");
    prevBtn.textContent = "‹";
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); index = (index - 1 + images.length) % images.length; render(); });

    const nextBtn = document.createElement("button");
    nextBtn.className = "lightbox-nav lightbox-next";
    nextBtn.setAttribute("aria-label", "Next photo");
    nextBtn.textContent = "›";
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); index = (index + 1) % images.length; render(); });

    backdrop.appendChild(prevBtn);
    backdrop.appendChild(nextBtn);
  }

  function close() {
    backdrop.remove();
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft" && images.length > 1) { index = (index - 1 + images.length) % images.length; render(); }
    else if (e.key === "ArrowRight" && images.length > 1) { index = (index + 1) % images.length; render(); }
  }

  // Only the backdrop itself (not the image or the buttons) closes on click.
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
  document.addEventListener("keydown", onKey);
  document.body.appendChild(backdrop);
}

// ---------------------------------------------------------------- corner marks
function corners() {
  const frag = document.createDocumentFragment();
  ["tl", "tr", "bl", "br"].forEach(pos => {
    const i = document.createElement("i");
    i.className = "corner " + pos;
    frag.appendChild(i);
  });
  return frag;
}

// ---------------------------------------------------------------- machine card
function machineCard(m) {
  const a = document.createElement("a");
  a.className = "item-card blueprint wide";
  a.href = "machine-detail.html?id=" + encodeURIComponent(m.id);
  a.appendChild(corners());

  const ph = document.createElement("div");
  // Real photos show at their original resolution and colour (no duotone
  // tint) so buyers see the actual machine; only placeholders get the tint.
  ph.className = m.image ? "ph has-photo" : "ph duotone";
  if (m.image) {
    const img = document.createElement("img");
    img.src = m.image; img.alt = m.name; img.loading = "lazy";
    ph.appendChild(img);
  } else {
    ph.textContent = L().machinePhoto;
  }
  a.appendChild(ph);

  const kicker = document.createElement("div");
  kicker.className = "card-kicker";
  kicker.textContent = machineCategoryLabel(m, lang());
  a.appendChild(kicker);

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = m.name;
  a.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "meta-mono";
  const bits = [m.year, m.clampingForceKN ? fmtForceTons(m.clampingForceKN) : null, m.location].filter(Boolean);
  meta.textContent = bits.join(" · ");
  a.appendChild(meta);

  const foot = document.createElement("div");
  foot.className = "card-foot";
  const tag = document.createElement("span");
  tag.className = "tag tag-accent";
  tag.textContent = m.placeholder ? L().sample + " · " + L().priceOnRequest : L().priceOnRequest;
  foot.appendChild(tag);
  const det = document.createElement("span");
  det.className = "details-link";
  det.textContent = L().details;
  foot.appendChild(det);
  a.appendChild(foot);

  return a;
}

// ---------------------------------------------------------------- part card
function partCard(p) {
  const a = document.createElement("a");
  a.className = "item-card blueprint";
  a.href = "part-detail.html?id=" + encodeURIComponent(p.id);
  a.appendChild(corners());

  const ph = document.createElement("div");
  ph.className = "ph duotone";
  ph.textContent = L().partPhoto;
  a.appendChild(ph);

  const kicker = document.createElement("div");
  kicker.className = "card-kicker";
  const subLabel = partSubcategoryLabel(p.category, p.subcategory, lang()) || p.subcategory;
  kicker.textContent = partCategoryLabel(p.category, lang()) + (subLabel ? " · " + subLabel : "");
  a.appendChild(kicker);

  if (p.placeholder) {
    const flag = document.createElement("div");
    flag.className = "sample-flag";
    flag.textContent = L().sample;
    a.appendChild(flag);
  }

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = p.name;
  a.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "meta-mono";
  meta.textContent = [p.manufacturer, p.model, p.condition].filter(Boolean).join(" · ");
  a.appendChild(meta);

  const foot = document.createElement("div");
  foot.className = "card-foot";
  const tag = document.createElement("span");
  tag.className = "tag tag-accent";
  tag.textContent = L().priceOnRequest;
  foot.appendChild(tag);
  const det = document.createElement("span");
  det.className = "details-link";
  det.textContent = L().details;
  foot.appendChild(det);
  a.appendChild(foot);

  return a;
}

// ---------------------------------------------------------------- home: latest arrivals
function initLatestArrivals(containerId, count) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  MACHINES.slice(0, count || 4).forEach(m => el.appendChild(machineCard(m)));
}

// ---------------------------------------------------------------- machines listing (cards)
// Known make categories the business deals in — always shown in the filter
// rail (even at a live count of 0) rather than only whichever ones happen to
// be in stock right now, so e.g. "Other" doesn't disappear the moment the
// last non-KraussMaffei machine sells.
const MAKE_OPTIONS = ["KraussMaffei", "Other"];

// "New" machines have no production year yet — treat them as one year newer
// than the newest dated machine so the Year sort orders them first.
function machineYearValue(m, maxDatedYear) {
  return typeof m.year === "number" ? m.year : maxDatedYear + 1;
}

function initMachinesListing() {
  const grid = document.getElementById("machines-grid");
  if (!grid) return;
  const heading = document.getElementById("machines-count");

  // ---- free-text search, pre-filled from ?q= (the home hero search lands
  // here when the query matches a machine) ----
  const qParam = new URLSearchParams(window.location.search).get("q") || "";
  const searchEl = document.getElementById("machines-search");
  if (searchEl) {
    searchEl.value = qParam;
    searchEl.addEventListener("input", render);
  }

  const datedYears = MACHINES.map(m => m.year).filter(y => typeof y === "number");
  const maxDatedYear = datedYears.length ? Math.max(...datedYears) : new Date().getFullYear();
  // Distinct clamping-force values in stock (tons), ascending — e.g. [50, 80,
  // 100, 120, 130, 150, 250, 280, 300]. The slider below steps through these
  // catalog values by index (like the KraussMaffei marketplace filter) rather
  // than a plain linear tonnage scale, so the tick labels land exactly on
  // values that exist in stock instead of an arbitrary even spacing.
  const FORCE_VALUES = Array.from(new Set(
    MACHINES.filter(m => m.clampingForceKN).map(m => Math.round(m.clampingForceKN / 10))
  )).sort((a, b) => a - b);
  const lastIdx = Math.max(FORCE_VALUES.length - 1, 0);

  // ---- MAKE (radio + live count) ----
  const makeOptionsEl = document.getElementById("make-options");
  if (makeOptionsEl) {
    makeOptionsEl.innerHTML = "";
    MAKE_OPTIONS.forEach(make => {
      const count = MACHINES.filter(m => m.make === make).length;
      const label = document.createElement("label");
      label.className = "radio";
      const name = make === "Other" ? L().otherMake : make;
      label.innerHTML = `<input type="radio" name="mk" value="${make}"><span class="dot"></span>${name} <span class="count">(${count})</span>`;
      makeOptionsEl.appendChild(label);
    });
  }

  // ---- CLAMPING FORCE dual-handle slider (index into FORCE_VALUES) ----
  const forceMinEl = document.getElementById("force-min");
  const forceMaxEl = document.getElementById("force-max");
  const forceRangeEl = document.getElementById("force-slider-range");
  const forceHint = document.getElementById("force-hint");
  const forceTicksEl = document.getElementById("force-ticks");

  if (forceTicksEl) {
    forceTicksEl.innerHTML = "";
    FORCE_VALUES.forEach(v => {
      const span = document.createElement("span");
      span.textContent = v;
      forceTicksEl.appendChild(span);
    });
  }

  function updateForceVisual() {
    if (!forceMinEl || !forceMaxEl) return;
    const minPct = lastIdx ? (Number(forceMinEl.value) / lastIdx) * 100 : 0;
    const maxPct = lastIdx ? (Number(forceMaxEl.value) / lastIdx) * 100 : 100;
    if (forceRangeEl) { forceRangeEl.style.left = minPct + "%"; forceRangeEl.style.right = (100 - maxPct) + "%"; }
    if (forceHint) forceHint.textContent = `range ${FORCE_VALUES[Number(forceMinEl.value)]} – ${FORCE_VALUES[Number(forceMaxEl.value)]} t`;
  }

  if (forceMinEl && forceMaxEl) {
    forceMinEl.min = forceMaxEl.min = 0;
    forceMinEl.max = forceMaxEl.max = lastIdx;
    forceMinEl.value = 0; forceMaxEl.value = lastIdx;
    forceMinEl.addEventListener("input", () => {
      if (Number(forceMinEl.value) > Number(forceMaxEl.value)) forceMinEl.value = forceMaxEl.value;
      updateForceVisual(); render();
    });
    forceMaxEl.addEventListener("input", () => {
      if (Number(forceMaxEl.value) < Number(forceMinEl.value)) forceMaxEl.value = forceMinEl.value;
      updateForceVisual(); render();
    });
    updateForceVisual();
  }

  function render() {
    const makeChecked = document.querySelector('input[name="mk"]:checked');
    const make = makeChecked ? makeChecked.value : "all";
    const sortChecked = document.querySelector('input[name="srt"]:checked');
    const sort = sortChecked ? sortChecked.value : "force";
    const forceMin = forceMinEl ? FORCE_VALUES[Number(forceMinEl.value)] : FORCE_VALUES[0];
    const forceMax = forceMaxEl ? FORCE_VALUES[Number(forceMaxEl.value)] : FORCE_VALUES[lastIdx];
    const q = searchEl ? searchEl.value.trim() : qParam;

    let list = MACHINES.filter(m => {
      if (make !== "all" && m.make !== make) return false;
      if (m.clampingForceKN) {
        const t = Math.round(m.clampingForceKN / 10);
        if (t < forceMin || t > forceMax) return false;
      }
      if (q && !matchesMachineSearch(m, q)) return false;
      return true;
    });
    if (sort === "year") list = list.slice().sort((a, b) => machineYearValue(b, maxDatedYear) - machineYearValue(a, maxDatedYear));
    else if (sort === "force") list = list.slice().sort((a, b) => (a.clampingForceKN || 0) - (b.clampingForceKN || 0));

    grid.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-muted";
      empty.textContent = L().noResults;
      grid.appendChild(empty);
    } else {
      list.forEach(m => grid.appendChild(machineCard(m)));
    }
    if (heading) {
      heading.textContent = q
        ? `${lang() === "sl" ? "Rezultati iskanja za" : "Search results for"} "${q}" (${list.length})`
        : L().results(list.length);
    }
  }

  document.querySelectorAll('input[name="mk"], input[name="srt"]').forEach(input => {
    input.addEventListener("change", render);
  });
  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) clearBtn.addEventListener("click", () => {
    const all = document.querySelector('input[name="mk"][value="all"]');
    if (all) all.checked = true;
    if (forceMinEl && forceMaxEl) { forceMinEl.value = 0; forceMaxEl.value = lastIdx; updateForceVisual(); }
    if (searchEl) searchEl.value = "";
    render();
  });

  render();
}

// ---------------------------------------------------------------- machines listing (table)
function initMachinesTable() {
  const tbody = document.getElementById("machines-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const statusTagClass = { Inspected: "tag-accent", Rebuilt: "tag-accent-2", "As seen": "tag-neutral" };
  MACHINES.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="thumb-cell"><div class="ph ${m.image ? "has-photo" : "duotone"}" style="width:100%;height:100%">${m.image ? `<img src="${m.image}" alt="${m.name}" loading="lazy">` : "photo"}</div></td>
      <td><strong>${m.name}</strong><div class="meta-mono">${machineCategoryLabel(m, lang())}</div></td>
      <td>${m.year}</td>
      <td>${m.clampingForceKN ? fmtForceTons(m.clampingForceKN) : "—"}</td>
      <td>${m.location}</td>
      <td><span class="tag ${statusTagClass[m.status] || "tag-neutral"}">${m.status}</span></td>
      <td><a class="btn btn-ghost" href="machine-detail.html?id=${encodeURIComponent(m.id)}">${L().enquire}</a></td>
    `;
    tbody.appendChild(tr);
  });
  const showing = document.getElementById("table-showing");
  if (showing) showing.textContent = L().showing(MACHINES.length, MACHINES.length);
}

// ---------------------------------------------------------------- other plastic equipment listing (cards)
// Same layout/behavior as initMachinesListing (search box, sort, card grid,
// clear-all), but the sidebar filters by OTHER_EQUIPMENT_CATEGORIES'
// subcategory instead of make, and there's no clamping-force slider —
// tonnage isn't a meaningful axis for robots/dryers/granulators/etc.
function initOtherEquipmentListing() {
  const grid = document.getElementById("other-equipment-grid");
  if (!grid) return;
  const heading = document.getElementById("other-equipment-count");

  const qParam = new URLSearchParams(window.location.search).get("q") || "";
  const searchEl = document.getElementById("other-equipment-search");
  if (searchEl) {
    searchEl.value = qParam;
    searchEl.addEventListener("input", render);
  }

  const datedYears = MACHINES.filter(m => m.category === "Other equipment").map(m => m.year).filter(y => typeof y === "number");
  const maxDatedYear = datedYears.length ? Math.max(...datedYears) : new Date().getFullYear();

  // ---- CATEGORY (radio + live count) ----
  const catOptionsEl = document.getElementById("other-equipment-cat-options");
  if (catOptionsEl) {
    catOptionsEl.innerHTML = "";
    OTHER_EQUIPMENT_CATEGORIES.forEach(cat => {
      const count = MACHINES.filter(m => m.category === "Other equipment" && m.subcategory === cat.key).length;
      const label = document.createElement("label");
      label.className = "radio";
      const name = lang() === "sl" ? cat.labelSl : cat.label;
      label.innerHTML = `<input type="radio" name="oecat" value="${cat.key}"><span class="dot"></span>${name} <span class="count">(${count})</span>`;
      catOptionsEl.appendChild(label);
    });
  }

  function render() {
    const catChecked = document.querySelector('input[name="oecat"]:checked');
    const cat = catChecked ? catChecked.value : "all";
    const sortChecked = document.querySelector('input[name="oesrt"]:checked');
    const sort = sortChecked ? sortChecked.value : "newest";
    const q = searchEl ? searchEl.value.trim() : qParam;

    let list = MACHINES.filter(m => {
      if (m.category !== "Other equipment") return false;
      if (cat !== "all" && m.subcategory !== cat) return false;
      if (q && !matchesMachineSearch(m, q)) return false;
      return true;
    });
    if (sort === "year") list = list.slice().sort((a, b) => machineYearValue(b, maxDatedYear) - machineYearValue(a, maxDatedYear));

    grid.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-muted";
      empty.textContent = q || cat !== "all" ? L().noResults : L().noOtherEquipment;
      grid.appendChild(empty);
    } else {
      list.forEach(m => grid.appendChild(machineCard(m)));
    }
    if (heading) {
      heading.textContent = q
        ? `${lang() === "sl" ? "Rezultati iskanja za" : "Search results for"} "${q}" (${list.length})`
        : L().results(list.length);
    }
  }

  document.querySelectorAll('input[name="oecat"], input[name="oesrt"]').forEach(input => {
    input.addEventListener("change", render);
  });
  const clearBtn = document.getElementById("other-equipment-clear-filters");
  if (clearBtn) clearBtn.addEventListener("click", () => {
    const all = document.querySelector('input[name="oecat"][value="all"]');
    if (all) all.checked = true;
    if (searchEl) searchEl.value = "";
    render();
  });

  render();
}

// ---------------------------------------------------------------- spare parts: category browser
function initCategoryBrowser(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  PART_CATEGORIES.forEach(cat => {
    const count = PARTS.filter(p => p.category === cat.key).length;
    const row = document.createElement("a");
    row.className = "series-row";
    row.href = "category.html?cat=" + encodeURIComponent(cat.key);
    row.innerHTML = `<span class="nl series-name">${lang() === "sl" ? cat.labelSl : cat.label}</span><span class="series-count">${count} · ›</span>`;
    el.appendChild(row);
    if (cat.submenus) {
      cat.submenus.forEach(sub => {
        const subCount = PARTS.filter(p => p.category === cat.key && p.subcategory === sub.key).length;
        const subRow = document.createElement("a");
        subRow.className = "series-row";
        subRow.style.paddingLeft = "16px";
        subRow.href = "category.html?cat=" + encodeURIComponent(cat.key) + "&sub=" + encodeURIComponent(sub.key);
        subRow.innerHTML = `<span class="nl series-name text-muted">${lang() === "sl" ? sub.labelSl : sub.label}</span><span class="series-count">${subCount} · ›</span>`;
        el.appendChild(subRow);
      });
    }
  });
}

// ---------------------------------------------------------------- spare parts: part-number search box
function initPartSearchRedirect(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim();
    window.location.href = "category.html" + (q ? "?q=" + encodeURIComponent(q) : "");
  });
}

// ---------------------------------------------------------------- home hero search
// The hero box's own placeholder promises both ("Machine type, model or part
// number") — so route to whichever catalog actually has a match, machines
// first, falling back to the spare-parts catalog (which also handles the
// "matches nothing" case with its existing empty state).
function initHeroSearch(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim();
    if (!q) { window.location.href = "category.html"; return; }
    const target = MACHINES.some(m => matchesMachineSearch(m, q)) ? "machines.html" : "category.html";
    window.location.href = target + "?q=" + encodeURIComponent(q);
  });
}

// ---------------------------------------------------------------- category listing page
// Strips spaces/dashes before comparing, so "KM280" matches "KM 280 - 1400 C3"
// and "D3330" matches "D3-330" — customers rarely type a model's exact
// punctuation, and stripping it never turns a real match into a miss.
function normalizeSearch(s) {
  return (s || "").toLowerCase().replace(/[\s-]+/g, "");
}

function matchesPartSearch(part, term) {
  const t = normalizeSearch(term);
  if (!t) return true;
  const haystack = normalizeSearch([part.name, part.manufacturer, part.model, part.serialNo, part.partNo, part.description, part.subcategory].join(" "));
  return haystack.includes(t);
}

function matchesMachineSearch(machine, term) {
  const t = normalizeSearch(term);
  if (!t) return true;
  const haystack = normalizeSearch([machine.name, machine.make, machine.category, machine.location, machine.description].join(" "));
  return haystack.includes(t);
}

function initCategoryPage() {
  const grid = document.getElementById("results-grid");
  if (!grid) return;
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("cat");
  const subParam = params.get("sub");
  const qParam = params.get("q") || "";

  const searchInput = document.getElementById("category-search");
  if (searchInput) searchInput.value = qParam;

  const heading = document.getElementById("results-heading");

  function render() {
    const q = searchInput ? searchInput.value : qParam;
    let list = PARTS;
    if (q) {
      list = list.filter(p => matchesPartSearch(p, q));
    } else {
      if (catParam) list = list.filter(p => p.category === catParam);
      if (subParam) list = list.filter(p => p.subcategory === subParam);
    }

    grid.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-muted";
      empty.textContent = L().noResults;
      grid.appendChild(empty);
    } else {
      list.forEach(p => grid.appendChild(partCard(p)));
    }

    if (heading) {
      if (q) heading.textContent = `${lang() === "sl" ? "Rezultati iskanja za" : "Search results for"} "${q}" (${list.length})`;
      else if (catParam && subParam) heading.textContent = `${partCategoryLabel(catParam, lang())} · ${partSubcategoryLabel(catParam, subParam, lang())} (${list.length})`;
      else if (catParam) heading.textContent = `${partCategoryLabel(catParam, lang())} (${list.length})`;
      else heading.textContent = `${lang() === "sl" ? "Vsi rezervni deli" : "All spare parts"} (${list.length})`;
    }
  }

  if (searchInput) searchInput.addEventListener("input", render);
  render();
}

// ---------------------------------------------------------------- part detail page
function initPartDetail() {
  const root = document.getElementById("part-detail-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const part = findPartById(params.get("id")) || PARTS[0];

  document.title = part.name + " — KMS";
  const setText = (sel, text) => { const n = root.querySelector(sel); if (n) n.textContent = text; };

  setText("[data-field='kicker']", partCategoryLabel(part.category, lang()) + " · " + (partSubcategoryLabel(part.category, part.subcategory, lang()) || part.subcategory));
  setText("[data-field='title']", part.name);
  setText("[data-field='partno']", `${L().partNoLabel} ${part.partNo || "—"}`);
  setText("[data-field='fits-value']", part.fits);
  setText("[data-field='condition-value']", part.condition);
  setText("[data-field='leadtime-value']", part.leadTime);
  setText("[data-field='price-value']", part.price);
  setText("[data-field='fits-label']", L().fits);
  setText("[data-field='condition-label']", L().condition);
  setText("[data-field='leadtime-label']", L().leadTime);
  setText("[data-field='price-label']", L().price);
  setText("[data-field='or-call']", L().orCall(PHONE));
  setText("[data-field='often-together-title']", L().oftenTogether);
  setText("[data-field='request-price-btn']", L().requestPrice);

  const stockTag = root.querySelector("[data-field='stock-tag']");
  if (stockTag) stockTag.textContent = part.placeholder ? L().sample : L().inStock("Šenčur");
  const origTag = root.querySelector("[data-field='original-tag']");
  if (origTag) origTag.textContent = L().originalPart;

  const together = document.getElementById("often-together-grid");
  if (together) {
    together.innerHTML = "";
    const sameSub = PARTS.filter(p => p.category === part.category && p.subcategory === part.subcategory && p.id !== part.id);
    const sameCat = PARTS.filter(p => p.category === part.category && p.id !== part.id);
    const relatedList = (sameSub.length >= 3 ? sameSub : sameCat).slice(0, 3);
    relatedList.forEach(p => {
      const a = document.createElement("a");
      a.className = "ph";
      a.href = "part-detail.html?id=" + encodeURIComponent(p.id);
      a.textContent = p.name;
      together.appendChild(a);
    });
  }

  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      // No required fields on this form (quantity/serial are both
      // optional) — just attach context and let it submit natively.
      prepareEnquirySubmit(form, "Price request: " + part.name, "Part: " + part.name + " (" + (part.partNo || part.id) + ") — " + window.location.href);
    });
  }
  checkEnquirySentRedirect("enquiry-form");
}

// ---------------------------------------------------------------- machine detail page
function initMachineDetail() {
  const root = document.getElementById("machine-detail-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const m = findMachineById(params.get("id")) || MACHINES[0];

  document.title = m.name + " — KMS";
  const setText = (sel, text) => { const n = root.querySelector(sel); if (n) n.textContent = text; };

  // All of this machine's photos, main photo first — the lightbox opened
  // from any of them (or a thumbnail) can page through the full set.
  const allPhotos = [m.image, ...(m.gallery || [])].filter(Boolean);

  const photoText = root.querySelector("[data-field='photo-text']");
  if (m.image && photoText) {
    const img = document.createElement("img");
    img.src = m.image; img.alt = m.name;
    photoText.replaceWith(img);
    const photoWrap = root.querySelector(".main-photo");
    if (photoWrap) {
      photoWrap.classList.remove("duotone");
      photoWrap.classList.add("has-photo");
      photoWrap.addEventListener("click", () => openLightbox(allPhotos, 0, m.name));
    }
  } else if (photoText) {
    photoText.textContent = L().machinePhoto;
  }

  // Thumb row only ever shows real photos — no placeholder slots for
  // photos that don't exist yet.
  const thumbRow = root.querySelector(".thumb-row");
  if (thumbRow) {
    thumbRow.innerHTML = "";
    (m.gallery || []).forEach((src, i) => {
      const thumb = document.createElement("div");
      thumb.className = "ph has-photo";
      const img = document.createElement("img");
      img.src = src; img.alt = m.name + " " + (i + 2);
      thumb.appendChild(img);
      thumb.addEventListener("click", () => openLightbox(allPhotos, i + 1, m.name));
      thumbRow.appendChild(thumb);
    });
  }

  setText("[data-field='kicker']", machineCategoryLabel(m, lang()));
  setText("[data-field='title']", m.name);
  setText("[data-field='meta']", [m.make, m.year].filter(Boolean).join(" · "));
  setText("[data-field='year-label']", lang() === "sl" ? "Proizvodno leto" : "Production year");
  setText("[data-field='year-value']", m.year);
  setText("[data-field='force-label']", lang() === "sl" ? "Sila zapiranja" : "Clamping force");
  setText("[data-field='force-value']", m.clampingForceKN ? fmtForceTons(m.clampingForceKN) : "—");
  setText("[data-field='location-label']", lang() === "sl" ? "Lokacija" : "Location");
  setText("[data-field='location-value']", m.location);
  setText("[data-field='condition-label']", L().condition);
  setText("[data-field='condition-value']", m.status);
  setText("[data-field='price-label']", L().price);
  setText("[data-field='price-value']", m.price);
  setText("[data-field='description-label']", lang() === "sl" ? "OPIS OPREME" : "EQUIPMENT DESCRIPTION");
  setText("[data-field='description-value']", m.description || "—");
  setText("[data-field='or-call']", L().orCall(PHONE));
  setText("[data-field='request-price-btn']", L().requestPrice);

  const statusTag = root.querySelector("[data-field='status-tag']");
  if (statusTag) statusTag.textContent = m.placeholder ? L().sample : m.status;

  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const confirmEl = document.getElementById("enquiry-confirm");
      if (!validateRequired(form, ["name", "phone", "email"], confirmEl)) {
        e.preventDefault();
        return;
      }
      prepareEnquirySubmit(form, "Price request: " + m.name, "Machine: " + m.name + " (" + m.id + ") — " + window.location.href);
      // Valid — no preventDefault, let it submit natively.
    });
  }
  checkEnquirySentRedirect("enquiry-form");
}

// ---------------------------------------------------------------- generic enquiry forms (spare-parts drop zone, about page, contact band)
// requiredFields is optional: when given, uses the same custom
// validateRequired() marking/message as the machine-detail form instead of
// relying on plain HTML5 `required` (which about's form still uses, since
// the browser's own validation already blocks an invalid submit event).
function initGenericEnquiryForm(formId, subject, requiredFields) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    if (requiredFields) {
      const confirmEl = form.querySelector(".enquiry-confirm");
      if (!validateRequired(form, requiredFields, confirmEl)) {
        e.preventDefault();
        return;
      }
    }
    prepareEnquirySubmit(form, subject || "New enquiry — kms-imm-spareparts.com", window.location.href);
  });
  checkEnquirySentRedirect(formId);

  // Photo/list drop zone: show the chosen filename in place of the prompt.
  const fileInput = form.querySelector("input[type='file']");
  const dzText = form.querySelector("[data-field='dropzone-text']");
  if (fileInput && dzText) {
    dzText.dataset.default = dzText.textContent;
    fileInput.addEventListener("change", () => {
      dzText.textContent = fileInput.files[0] ? fileInput.files[0].name : dzText.dataset.default;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
});
