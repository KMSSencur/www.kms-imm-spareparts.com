/*
  Shared site behaviour: mobile menu, card rendering, listings, search,
  filters, and detail-page population. Reads PRODUCTS/MACHINES from
  js/data.js. One script, loaded by every EN and every SL page — dynamic
  text (labels not baked into the page's own HTML) is looked up in LABELS
  by document.documentElement.lang so the same script serves both trees.
*/

const PHONE = "+386 4 25 16 150";
const EMAIL = "info@kms.si";

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
    machinePhoto: "machine photo",
    partPhoto: "part photograph"
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
    machinePhoto: "fotografija stroja",
    partPhoto: "fotografija dela"
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

// ---------------------------------------------------------------- mobile menu
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const panel = document.querySelector(".mobile-panel");
  if (!burger || !panel) return;
  burger.addEventListener("click", () => panel.classList.toggle("open"));
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
  ph.className = "ph duotone";
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
  const bits = [m.year, m.clampingForceKN ? fmtInt(m.clampingForceKN) + " kN" : null, m.location].filter(Boolean);
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
function initMachinesListing() {
  const grid = document.getElementById("machines-grid");
  if (!grid) return;
  const heading = document.getElementById("machines-count");

  function render() {
    const makeChecked = document.querySelector('input[name="mk"]:checked');
    const make = makeChecked ? makeChecked.value : "all";
    const sortChecked = document.querySelector('input[name="srt"]:checked');
    const sort = sortChecked ? sortChecked.value : "newest";

    let list = MACHINES.filter(m => make === "all" || m.make === make);
    if (sort === "year") list = list.slice().sort((a, b) => b.year - a.year);
    else if (sort === "force") list = list.slice().sort((a, b) => (b.clampingForceKN || 0) - (a.clampingForceKN || 0));

    grid.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "text-muted";
      empty.textContent = L().noResults;
      grid.appendChild(empty);
    } else {
      list.forEach(m => grid.appendChild(machineCard(m)));
    }
    if (heading) heading.textContent = L().results(list.length);
  }

  document.querySelectorAll('input[name="mk"], input[name="srt"]').forEach(input => {
    input.addEventListener("change", render);
  });
  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) clearBtn.addEventListener("click", () => {
    const all = document.querySelector('input[name="mk"][value="all"]');
    if (all) all.checked = true;
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
      <td class="thumb-cell"><div class="ph duotone" style="width:100%;height:100%">${m.image ? `<img src="${m.image}" alt="${m.name}" loading="lazy">` : "photo"}</div></td>
      <td><strong>${m.name}</strong><div class="meta-mono">${machineCategoryLabel(m, lang())}</div></td>
      <td>${m.year}</td>
      <td>${m.clampingForceKN ? fmtInt(m.clampingForceKN) + " kN" : "—"}</td>
      <td>${m.location}</td>
      <td><span class="tag ${statusTagClass[m.status] || "tag-neutral"}">${m.status}</span></td>
      <td><a class="btn btn-ghost" href="machine-detail.html?id=${encodeURIComponent(m.id)}">${L().enquire}</a></td>
    `;
    tbody.appendChild(tr);
  });
  const showing = document.getElementById("table-showing");
  if (showing) showing.textContent = L().showing(MACHINES.length, MACHINES.length);
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
function initHeroSearch(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim();
    window.location.href = "category.html" + (q ? "?q=" + encodeURIComponent(q) : "");
  });
}

// ---------------------------------------------------------------- category listing page
function matchesPartSearch(part, term) {
  const t = term.trim().toLowerCase();
  if (!t) return true;
  const haystack = [part.name, part.manufacturer, part.model, part.serialNo, part.partNo, part.description, part.subcategory]
    .join(" ").toLowerCase();
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
      e.preventDefault();
      const confirmEl = document.getElementById("enquiry-confirm");
      if (confirmEl) { confirmEl.textContent = L().enquirySent; confirmEl.classList.add("show"); }
      form.reset();
    });
  }
}

// ---------------------------------------------------------------- machine detail page
function initMachineDetail() {
  const root = document.getElementById("machine-detail-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const m = findMachineById(params.get("id")) || MACHINES[0];

  document.title = m.name + " — KMS";
  const setText = (sel, text) => { const n = root.querySelector(sel); if (n) n.textContent = text; };

  const photoText = root.querySelector("[data-field='photo-text']");
  if (m.image && photoText) {
    const img = document.createElement("img");
    img.src = m.image; img.alt = m.name;
    photoText.replaceWith(img);
  } else if (photoText) {
    photoText.textContent = L().machinePhoto;
  }

  setText("[data-field='kicker']", machineCategoryLabel(m, lang()));
  setText("[data-field='title']", m.name);
  setText("[data-field='meta']", [m.make, m.year].filter(Boolean).join(" · "));
  setText("[data-field='year-label']", lang() === "sl" ? "Leto" : "Year");
  setText("[data-field='year-value']", m.year);
  setText("[data-field='force-label']", lang() === "sl" ? "Sila zapiranja" : "Clamping force");
  setText("[data-field='force-value']", m.clampingForceKN ? fmtInt(m.clampingForceKN) + " kN" : "—");
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
      e.preventDefault();
      const confirmEl = document.getElementById("enquiry-confirm");
      if (confirmEl) { confirmEl.textContent = L().enquirySent; confirmEl.classList.add("show"); }
      form.reset();
    });
  }
}

// ---------------------------------------------------------------- generic enquiry forms (spare-parts drop zone, about page, contact band)
function initGenericEnquiryForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const confirmEl = form.querySelector(".enquiry-confirm");
    if (confirmEl) { confirmEl.textContent = L().enquirySent; confirmEl.classList.add("show"); }
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
});
