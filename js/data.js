/*
  KMS catalog data.
  Two arrays: MACHINES (used machines for sale) and PARTS (spare parts).
  Everything the site renders dynamically (home "latest arrivals", the
  machines listing + table, the spare-parts category browser, part/machine
  detail pages) reads from here — add an item, it appears everywhere.

  `placeholder: true` marks illustrative/sample entries carried over from
  the design handoff or seeded from research, not real KMS stock — see
  README.md for exactly which items are real vs. sample.
*/

// ---- category taxonomy (used for the spare-parts "browse by category" cards
//      and the filter rail) --------------------------------------------------
const PART_CATEGORIES = [
  { key: "electronics", label: "Electronics", labelSl: "Elektronika", labelHr: "Elektronika", submenus: [
      { key: "drives", label: "Drives", labelSl: "Pogoni", labelHr: "Pogoni" },
      { key: "ipc-hmi", label: "IPC & HMI", labelSl: "IPC & HMI", labelHr: "IPC & HMI" },
      { key: "motor", label: "Motor", labelSl: "Motorji", labelHr: "Motori" },
      { key: "powersupply", label: "Power supply", labelSl: "Napajalniki", labelHr: "Napajanja" }
  ]},
  { key: "plasticizing", label: "Plasticizing units & screws", labelSl: "Plastifikacijske enote in vijaki", labelHr: "Plastifikacijske jedinice i vijci" },
  { key: "hydraulic", label: "Hydraulic valves", labelSl: "Hidravlični ventili", labelHr: "Hidraulički ventili" },
  { key: "other", label: "Other", labelSl: "Drugo", labelHr: "Ostalo" }
];

function categoryLabelFor(entry, lang) {
  if (lang === "sl") return entry.labelSl;
  if (lang === "hr") return entry.labelHr;
  return entry.label;
}
function partCategoryLabel(catKey, lang) {
  const cat = PART_CATEGORIES.find(c => c.key === catKey);
  if (!cat) return catKey;
  return categoryLabelFor(cat, lang);
}
function partSubcategoryLabel(catKey, subKey, lang) {
  const cat = PART_CATEGORIES.find(c => c.key === catKey);
  if (cat && cat.submenus) {
    const sub = cat.submenus.find(s => s.key === subKey);
    if (sub) return categoryLabelFor(sub, lang);
  }
  return subKey || "";
}

// "Browse by category" taxonomy for the Other plastic equipment page — mirrors
// PART_CATEGORIES' shape. Machines in this category (category: "Other
// equipment") carry a matching `subcategory` value (e.g. "robots").
const OTHER_EQUIPMENT_CATEGORIES = [
  { key: "robots", label: "Robots", labelSl: "Roboti", labelHr: "Roboti" },
  { key: "tempering", label: "Tempering control units", labelSl: "Temperirne enote", labelHr: "Temperirne jedinice" },
  { key: "dryers", label: "Dryers", labelSl: "Sušilniki", labelHr: "Sušilice" },
  { key: "granulators", label: "Granulators", labelSl: "Mlini", labelHr: "Mlinovi" },
  { key: "other", label: "Other", labelSl: "Drugo", labelHr: "Ostalo" }
];
function otherEquipmentCategoryLabel(key, lang) {
  const cat = OTHER_EQUIPMENT_CATEGORIES.find(c => c.key === key);
  if (!cat) return key;
  return categoryLabelFor(cat, lang);
}

// ---- machines --------------------------------------------------------------
// Sample listings — models and specs are the illustrative examples from the
// design handoff (KraussMaffei-derived, for layout purposes). Replace with
// real stock before launch.
// Individual machine "make" values (e.g. "KraussMaffei") are real per-item
// manufacturer attribution, not a site-wide brand claim — the business
// sells used IMM (injection moulding machine) equipment across makes.
const MACHINE_CATEGORY_SL = {
  "Injection moulding": "Brizganje plastike",
  "Extrusion": "Ekstruzija",
  "Automation": "Avtomatizacija",
  "Other equipment": "Druga oprema"
};
const MACHINE_CATEGORY_HR = {
  "Injection moulding": "Brizganje plastike",
  "Extrusion": "Ekstruzija",
  "Automation": "Automatizacija",
  "Other equipment": "Ostala oprema"
};
function machineCategoryLabel(m, lang) {
  const table = lang === "sl" ? MACHINE_CATEGORY_SL : lang === "hr" ? MACHINE_CATEGORY_HR : null;
  return (table && table[m.category]) || m.category;
}

const MACHINES = [
  {
    id: "mch-km130-750cx",
    name: "KM 130 - 750 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2006,
    clampingForceKN: 1300,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km130-750cx-wide.jpg",
    gallery: ["/images/mch-km130-750cx-panel.jpg", "/images/mch-km130-750cx-rear.jpg"],
    description: "Machine KraussMaffei KM 130 - 750 CX\nClamping force kN: 1300\nClearance between tie bars (h x v) mm: 470 x 470\nMould opening stroke mm: 600\nMould height min. mm: 300\nDaylight mm: 900\nEjector stroke mm: 150\nEjector force, forward/backward kN: 23 / 10\nScrew diameter mm: 45\nL/D ratio: 22.4\nInjection pressure bar: 2336\nStroke volume cm³: 318\nControl version: MC5\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• Conveyor control including Harting socket HAN 6 E\n• 2 x hydraulic core pull system on moving platen\n• Socket combination: 2x 16 A, 1x 32 A, 3x single phase\n• Signal interface for handling unit acc. to EUROMAP 67\n• Quality statistics\n• PV-closed loop control, inj. speed, holding and back pressure",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km50-55cx",
    name: "KM 50 - 55 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2008,
    clampingForceKN: 500,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km50-55cx-rear.jpg",
    gallery: ["/images/mch-km50-55cx-wide.jpg", "/images/mch-km50-55cx-front.jpg", "/images/mch-km50-55cx-panel.jpg"],
    description: "Machine KraussMaffei KM 50 - 55 CX\nClamping force kN: 500\nClearance between tie bars (h x v) mm: 370 x 370\nMould opening stroke mm: 400\nMould height min. mm: 200\nDaylight mm: 600\nEjector stroke mm: 100\nEjector force, forward/backward kN: 23 / 10\nScrew diameter mm: 15\nL/D ratio: 20.0\nInjection pressure bar: 2600\nStroke volume cm³: 14\nControl version: MC5\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 6 x hotrunner control circuits\n• Signal interface for handling unit acc. to EUROMAP 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km50-160c1",
    name: "KM 50 - 160 C1",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2002,
    clampingForceKN: 500,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km50-160c1-wide.jpg",
    gallery: ["/images/mch-km50-160c1-side.jpg", "/images/mch-km50-160c1-panel.jpg"],
    description: "Machine KraussMaffei KM 50 - 160 C1\nClamping force kN: 500\nClearance between tie bars (h x v) mm: 321 x 321\nMould opening stroke mm: 350\nMould height min. mm: 200\nDaylight mm: 550\nEjector stroke mm: 100\nEjector force, forward/backward kN: 22 / 10\nScrew diameter mm: 30\nL/D ratio: 23.0\nInjection pressure bar: 2025\nStroke volume cm³: 74\nControl version: MC4\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• Conveyor control including Harting socket HAN 6 E\n• 1 x hydraulic core pull system on moving platen\n• Signal interface for handling unit acc. to EUROMAP 12",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km80-380pa",
    name: "KM 80 - 380 PA",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: "New",
    clampingForceKN: 800,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/mch-km250-1400pa-render.jpg",
    gallery: ["/images/mch-km80-380pa-wide.jpg"],
    description: "Machine KraussMaffei KM 80 - 380 PA (100% electric)\nClamping force kN: 800\nClearance between tie bars (h x v) mm: 470 x 420\nMould opening stroke mm: 350\nMould height min.-max. mm: 150 - 400\nDaylight mm: 750\nEjector stroke mm: 100\nEjector force, forward/backward kN: 22 / 22\nScrew diameter mm: 40\nL/D ratio: 20.0\nInjection pressure bar: 1860\nStroke volume cm³: 201\nControl version: MC Agile\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• 1 x pneumatic valve on fixed platen for blow function\n• Signal interface for handling unit acc. to EUROMAP 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km80-390c1-2005",
    name: "KM 80 - 390 C1",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2005,
    clampingForceKN: 800,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km80-390c1-2005-wide.jpg",
    description: "Machine KraussMaffei KM 80 - 390 C1\nClamping force kN: 800\nClearance between tie bars (h x v) mm: 405 x 405\nMould opening stroke mm: 500\nMould height min. mm: 250\nDaylight mm: 750\nEjector stroke mm: 150\nEjector force, forward/backward kN: 22 / 10\nScrew diameter mm: 30\nL/D ratio: 23.0\nInjection pressure bar: 2500\nStroke volume cm³: 85\nControl version: MC4\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• Conveyor control including Harting socket HAN 6 E\n• 1 x hydraulic core pull system on moving platen\n• 4 x hotrunner control circuits\n• Signal interface for handling unit acc. to EUROMAP 12",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km80-390c1-2002",
    name: "KM 80 - 390 C1",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2002,
    clampingForceKN: 800,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km80-390c1-2002-front.jpg",
    gallery: ["/images/mch-km80-390c1-2002-rear.jpg", "/images/mch-km80-390c1-2002-panel.jpg"],
    description: "Machine KraussMaffei KM 80 - 390 C1\nClamping force kN: 800\nClearance between tie bars (h x v) mm: 405 x 405\nMould opening stroke mm: 500\nMould height min. mm: 250\nDaylight mm: 750\nEjector stroke mm: 150\nEjector force, forward/backward kN: 22 / 10\nScrew diameter mm: 35\nL/D ratio: 23.0\nInjection pressure bar: 2429\nStroke volume cm³: 156\nControl version: MC4\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• 1 x hydraulic core pull system on moving platen\n• 6 x hotrunner control circuits\n• Signal interface for handling unit acc. to EUROMAP 12",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km100-180cx",
    name: "KM 100 - 180 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2014,
    clampingForceKN: 1000,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km100-180cx-wide.jpg",
    gallery: ["/images/mch-km100-180cx-panel.jpg", "/images/mch-km100-180cx-rear.jpg", "/images/mch-km100-180cx-front.jpg"],
    description: "Machine KraussMaffei KM 100 - 180 CX\nClamping force kN: 1000\nClearance between tie bars (h x v) mm: 530 x 470\nMould opening stroke mm: 600\nMould height min. mm: 500\nDaylight mm: 1100\nEjector stroke mm: 150\nEjector force, forward/backward kN: 22.6 / 9.9\nScrew diameter mm: 25\nL/D ratio: 26.0\nInjection pressure bar: 2500\nStroke volume cm³: 59\nControl version: MC5\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• Pneumatic control for one hotrunner\n• Conveyor control including Harting socket HAN 6 E\n• Electric interface and software for connection of separating drop-out chute\n• Extended daylight\n• Wider mold fixing platens and extended horizontal distance between tie bars\n• Pressure accumulator for increased injection capacity\n• 1 x hydraulic core pull system on moving platen\n• 1 x hydraulic core pull system on fixed platen\n• 24 x hotrunner control circuits\n• Potential-free contact for signal \"plasticizing\" on socket HAN 3 A\n• PV-closed loop control, inj.speed, holding and back pressure\n• Interface 20 mA for the data transfer between machine control and external water temperature controllers (TCU)\n• Signal interface for handling unit acc. to EUROMAP 67\n\nOption: Machine can be used as 2K machine (variant L) with rotary table:\n• Independent MC5 injection unit SP55 with screw diameter 15 mm, stroke volume 14 cm³, injection pressure 2500 bar\n• Rotary table TT610EU/3+2+1, 4 x circuits water, 1 x air",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km120-380pacn",
    name: "KM 120 - 380 PA CN",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2021,
    clampingForceKN: 1200,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km250-1400pa-render.jpg",
    description: "Machine KraussMaffei KM 120 - 380 PA CN (100% electric)\nClamping force kN: 1200\nClearance between tie bars (h x v) mm: 520 x 470\nMould opening stroke mm: 400\nMould height min.-max. mm: 180 - 450\nDaylight mm: 850\nEjector stroke mm: 120\nEjector force, forward/backward kN: 27 / 27\nScrew diameter mm: 35\nL/D ratio: 22.9\nInjection pressure bar: 2429\nStroke volume cm³: 154\nControl version: MC Agile\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• BluePower - Complete insulation of plasticizing cylinder for lower energy consumption\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• 1 x pneumatic valve on fixed platen for blow function\n• 4 x pneumatic cascade control\n• 4 x Hydraulic cascade for hotrunner control\n• Electrical interface for external hydraulic power pack\n• External hydraulic power pack 20 l/min\n• 2 x hydraulic core pull system on external hydraulic power pack\n• 2 x pneumatic core pull on moving platen\n• Twin check valves to maintain pressure\n• Pressure relief for hydraulic cascade needle valves\n• Pressure relief for hydraulic core pulls\n• 6 x hotrunner control circuits\n• Socket combination: 2x 16 A, 1x 32 A, 3x single phase\n• Potential-free contact for signal \"plasticizing\" on socket HAN 3 A\n• Kistler Type 5039A222Y42\n• APC plus\n• Signal interface for handling unit acc. to EUROMAP 67\n• Monitoring of energy and power\n• Trend graphics for 12 freely selectable\n• 4 free programmable in- and outputs in the control cabinet",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km130-380cx",
    name: "KM 130 - 380 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2008,
    clampingForceKN: 1300,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km130-380cx-front.jpg",
    gallery: ["/images/mch-km130-380cx-rear.jpg"],
    description: "Machine KraussMaffei KM 130 - 380 CX\nClamping force kN: 1300\nClearance between tie bars (h x v) mm: 470 x 470\nMould opening stroke mm: 600\nMould height min. mm: 300\nDaylight mm: 900\nEjector stroke mm: 150\nEjector force, forward/backward kN: 23 / 10\nScrew diameter mm: 40\nL/D ratio: 20.0\nInjection pressure bar: 1860\nStroke volume cm³: 201\nControl version: MC5\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• Signal interface for handling unit acc. to EUROMAP 67\n• Pressure accumulator for increased injection capacity\n• 1 x hydraulic core pull system on moving platen\n• Potential-free contact for signal \"plasticizing\" on socket HAN 3 A\n• 1 x additional temperature control zone for nozzle heaters\n• PV-closed loop control, inj.speed, holding and back pressure",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km150-700-160cz",
    name: "KM 150 - 700 - 160 CZ",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2005,
    clampingForceKN: 1500,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km150-700-160cz-wide.jpg",
    description: "Machine KraussMaffei KM 150 - 700 - 160 CZ\nClamping force kN: 1500\nClearance between tie bars (h x v) mm: 500 x 500\nMould opening stroke mm: 600\nMould height min. mm: 300\nDaylight mm: 900\nEjector stroke mm: 150\nEjector force, forward/backward kN: 22 / 10\n\nInjection unit 1:\nScrew diameter mm: 50\nL/D ratio: 20.0\nInjection pressure bar: 1892\nStroke volume cm³: 377\n\nInjection unit 2:\nScrew diameter mm: 30\nL/D ratio: 23.0\nInjection pressure bar: 2025\nStroke volume cm³: 74\n\nControl version: MC5\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• 1 x pneumatic valve on fixed platen for blow function\n• 1 x hydraulic core pull system on moving platen\n• Signal interface for handling unit acc. to EUROMAP 12\n• PV-closed loop control, inj. speed, holding and back pressure",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km250-1400pa",
    name: "KM 250 - 1400 PA",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: "New",
    clampingForceKN: 2500,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/mch-km250-1400pa-render.jpg",
    gallery: ["/images/mch-km250-1400pa-wrapped.jpg"],
    description: "Machine KraussMaffei KM 250 - 1400 PA (100% electric)\nClamping force kN: 2500\nClearance between tie bars (h x v) mm: 720 x 670\nMould opening stroke mm: 550\nMould height min.-max. mm: 250 - 600\nDaylight mm: 1150\nEjector stroke mm: 200\nEjector force, forward/backward kN: 47 / 47\nScrew diameter mm: 60\nL/D ratio: 20.0\nInjection pressure bar: 2006\nStroke volume cm³: 679\nControl version: MC Agile\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• BluePower - Complete insulation of plasticizing cylinder for lower energy consumption\n• 1 x pneumatic valve on moving platen for blow function\n• Pneumatic control for one hotrunner\n• Electrical interface for external hydraulic power pack\n• Water battery 4-fold without electromagnetic shut-off valve, with thermometers, incl. hose connections\n• Potential-free contact for signal \"plasticizing\" on socket HAN 3 A\n• APC plus\n• Signal interface for handling unit acc. to EUROMAP 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km280-1400c3",
    name: "KM 280 - 1400 C3",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2003,
    clampingForceKN: 2800,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km280-1400c3-front.jpg",
    gallery: ["/images/mch-km280-1400c3-panel.jpg", "/images/mch-km280-1400c3-rear.jpg"],
    description: "Machine KraussMaffei KM 280 - 1400 C3\nClamping force kN: 2800\nClearance between tie bars (h x v) mm: 630 x 630\nMould opening stroke mm: 820\nMould height min. mm: 330\nDaylight mm: 1150\nEjector stroke mm: 200\nEjector force, forward/backward kN: 58 / 28\nScrew diameter mm: 55\nL/D ratio: 25.8\nInjection pressure bar: 2380\nStroke volume cm³: 570\nInjection rate: 1425 cm³/s\nControl version: MC4\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• HPS-UN mixing screw\n• 3 x pneumatic valve on moving platen for blow function\n• Pressure accumulator for increased injection capacity\n• 2 x hydraulic core pull system on moving platen\n• 1 x pneumatic core pull on moving platen\n• Potential-free contact for signal \"plasticizing\" on socket HAN 3 A\n• Signal interface for handling unit acc. to EUROMAP 12\n• PV-closed loop control, inj. speed, holding and back pressure",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km300-1400c2",
    name: "KM 300 - 1400 C2",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2001,
    clampingForceKN: 3000,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/mch-km300-1400c2-front.jpg",
    description: "Machine KraussMaffei KM 300 - 1400 C2\nClamping force kN: 3000\nClearance between tie bars (h x v) mm: 630 x 630\nMould opening stroke mm: 820\nMould height min. mm: 330\nDaylight mm: 1150\nEjector stroke mm: 200\nEjector force, forward/backward kN: 58 / 28\nScrew diameter mm: 55\nL/D ratio: 23.0\nInjection pressure bar: 2380\nStroke volume cm³: 570\nControl version: MC4\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 2 x pneumatic valve on moving platen for blow function\n• Pressure accumulator for increased injection capacity\n• 1 x hydraulic core pull system on moving platen\n• Socket combination: 1 x 16 A, 2 x single phase\n• Potential-free contact for signal \"plasticizing\" on socket HAN 3 A\n• PV-closed loop control, inj. speed, holding and back pressure",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km300-1000cx",
    name: "KM 300 - 1000 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2018,
    clampingForceKN: 3000,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/IMG-20250922-WA0004.jpg",
    gallery: ["/images/IMG-20250922-WA0001.jpg", "/images/IMG-20250922-WA0002.jpg", "/images/IMG-20250922-WA0003.jpg", "/images/IMG-20250922-WA0005.jpg"],
    description: "Machine KraussMaffei KM300-1000 CX\nClamping force kN: 3000\nDistance between tie bars (h x v) mm: 630 x 630\nMould opening stroke mm: 820\nMould height min. mm: 330\nEjector stroke mm: 200\nScrew diameter mm: 55 (mixing HPS-M)\nL/D ratio: 20\nInjection pressure bar: 1904\nStroke volume cm³: 523\nControl version: MC6\nScreen text: Germany\nCondition: Checked, ready to work\n\nEquipment:\n• Anti-vibration levelling pads\n• Wear resistant plasticizer, surcharge\n• BluePower - Complete insulation of plasticizing cylinder for lower energy consumption\n• 3 x pneumatic valve on moving platen for blow function\n• 2 x pneumatic valve on fixed platen for blow function\n• Pneumatic control for one hotrunner\n• Mechanical robot interface according to EUROMAP 18\n• Pressure accumulator for increased injection capacity\n• Hydraulic core pull system 2-fold on moving platen\n• Twin check valves to maintain pressure on hydraulic core pulls\n• Pressure relief for hydraulic core pulls\n• 8 hotrunner control circuits\n• Combination of sockets (3 Sockets, single phase, 3 CEE sockets 16 A)\n• APC - Adaptive Process Control\n• BluePower - Monitoring of energy and power\n• Graph display and analysis package with 10 graphs\n• PV-closed loop control\n• Interface 20 mA for the data transfer between machine control and external water temperature controllers (TCU)\n• Interface for production data consisting of 5 potential free contacts inside the control cabinet\n\nKraussMaffei Linear Robot LRX 100:\n• Fully integrated control\n• X (horizontal stroke): 3000 mm\n• Y (demold stroke): 550 mm\n• Z (vertical stroke): 1200 mm telescopic\n• Maximum load: 10 kg\n• C (pneumatic): 0 - 90 degree\n• Safety package for guarding fence\n• Vacuum 4 x\n• Pressure circuit 4 x\n• Control cabinet preparation for connection of conveyor belt",
    price: "Price on request",
    placeholder: false
  },

  // ---- other plastic equipment (sample listings, one per category) ----
  {
    id: "oeq-robots-01",
    name: "Linear robot KraussMaffei LRX100 S",
    category: "Other equipment",
    subcategory: "robots",
    make: "KraussMaffei",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/oeq-robots-01-wide.jpg",
    gallery: ["/images/oeq-robots-01-cabinet.jpg", "/images/oeq-robots-01-axis.jpg", "/images/oeq-robots-01-connector.jpg"],
    description: "Robot equipment:\n• Software EasyControl\n• Horizontal stroke: 2500 mm\n• Vertical stroke: 1200 mm\n• Demolding stroke: 550 mm\n• Maximum payload: 10 kg\n• Vacuum circuit 2 x\n• Pressure circuit 2 x\n• Rotation pneumatic R1 (0 - 90°) and pneumatic R2 (0 - 90° - 180°)\n• 16 x digital inputs in cabinet\n• 8 x digital outputs in cabinet\n• Early start function\n• Indexing control of conveyor\n• Safety Pack; soft function\n• Reiser\n• Interface EUROMAP 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-robots-02",
    name: "SEPRO PICKER SR 55",
    category: "Other equipment",
    subcategory: "robots",
    make: "Sepro",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/oeq-robots-02-wide.jpg",
    description: "Robot equipment:\n• Strip stroke: 0 - 75 mm\n• Vertical stroke: 0 - 550 mm\n• Swing angle: 50° - 90°\n• Maximum load: 1 kg\n• Vacuum circuit 1 x\n• Wrist rotation 90° - rotation axis parallel to main arm axis\n• 4 x digital inputs\n• 4 x digital outputs\n• Software MPA 2P\n• Euromap 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-robots-03",
    name: "Linear robot KraussMaffei LRX150",
    category: "Other equipment",
    subcategory: "robots",
    make: "KraussMaffei",
    year: 2014,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/robot LRX 150 1.jpg",
    gallery: ["/images/robot LRX 150 2.jpg", "/images/robot LRX 150 3.jpg"],
    description: "Robot equipment:\n• Horizontal stroke: 3.500 mm\n• Vertical stroke (telescopic): 1400 mm\n• Demolding stroke: 900 mm\n• Maximum payload: 15 kg\n• Vacuum circuit 4 x\n• Pressure circuit 2 x\n• Rotation pneumatic C (0 - 90°) and servo B (0 - 270°)\n• 8 x digital inputs in cabinet\n• 8 x digital outputs in cabinet\n• Early start function\n• Indexing control of conveyor\n• Safety Pack; soft function\n• Reiser",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-robots-04",
    name: "Linear robot SEPRO SR4030 S3",
    category: "Other equipment",
    subcategory: "robots",
    make: "Sepro",
    year: 2006,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/sepro 4030 S3 1.jpg",
    gallery: ["/images/sepro 4030 S3 2.jpg"],
    description: "Robot equipment:\n• Software VISUAL\n• Horizontal stroke: 3.000 mm\n• Vertical stroke (telescopic): 1750 mm\n• Demolding stroke: 800 mm\n• Maximum payload: 12 kg\n• Vacuum and pressure circuit 4 x\n• Rotation pneumatic R1 (0 - 90°) and pneumatic R2 (0 - 90° - 180°)\n• 16 x digital inputs in cabinet\n• 16 x digital outputs in cabinet\n• Reiser\n• Interface EUROMAP 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-robots-05",
    name: "Linear robot SEPRO SR4030 A3",
    category: "Other equipment",
    subcategory: "robots",
    make: "Sepro",
    year: 2006,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "Inspected",
    image: "/images/sepro SR4030 A3 1.jpg",
    gallery: ["/images/sepro SR4030 A3 2.jpg"],
    description: "Robot equipment:\n• Software VISUAL\n• Horizontal stroke: 2.500 mm\n• Vertical stroke: 1400 mm\n• Demolding stroke: 800 mm\n• Maximum payload: 12 kg\n• Vacuum and pressure circuit 2 x\n• Rotation pneumatic R1 (0 - 90°) and pneumatic R2 (0 - 90° - 180°)\n• 16 x digital inputs in cabinet\n• 16 x digital outputs in cabinet\n• Reiser\n• Interface EUROMAP 67",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-tempering-01",
    name: "SINGLE TCU WP4-200-18-120",
    category: "Other equipment",
    subcategory: "tempering",
    make: "Single",
    year: 2024,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/oeq-tempering-01-wide.jpg",
    gallery: ["/images/oeq-tempering-01-connectors.jpg"],
    description: "Medium: water\nMax. temperature: 200 °C\nHeating capacity: 18 kW\nCooling capacity: 120 kW\nMax. flow rate: 73 l/min\nMax. pressure: 3.7 bar\nInterface for 20 mA\nInterface Euromap 82.1 (OPC UA)",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-dryers-01",
    name: "Luxor SG 50/150 - ECOprotect Motan mobile drying system with dry air",
    category: "Other equipment",
    subcategory: "dryers",
    make: "Motan",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "Testing equipment",
    image: "/images/Luxor SG50.jpg",
    description: "Dry air capacity: 50 m³/h\nVolume of drying silo: 1 x 150 l\n\n• 2 drying cells for continuous flow of dry air\n• Automatic regeneration\n• Heating of dry air directly on the drying silo\n• Central control with touch control panel, material database, trend diagram and weekly timer\n\nDrying temperature: max. 140 °C",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-dryers-02",
    name: "sCOMPACT250 - Motan mobile drying system with dry air and integrated conveying",
    category: "Other equipment",
    subcategory: "dryers",
    make: "Motan",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "Testing equipment",
    image: "/images/sCOMPACT250.jpg",
    description: "Dry air capacity: 85 m³/h\nVolume of drying silo: 1 x 250 l\n\n• 2 drying cells for continuous flow of dry air\n• Integrated conveying sCONVEY CHS loader\n• Automatic regeneration\n• Heating of dry air directly on the drying silo\n• Central control with touch control panel, material database, trend diagram and weekly timer\n• TPA - dew point measurement and display\n\nDrying temperature: max. 140 °C",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-dryers-03",
    name: "sDRY80-250l - Motan drying system with dry air",
    category: "Other equipment",
    subcategory: "dryers",
    make: "Motan",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/sDRY80.jpg",
    description: "Dry air capacity: 80 m³/h\nVolume of drying silo: 1 x 250 l\n\n• 2 drying cells for continuous flow of dry air\n• Automatic regeneration\n• Heating of dry air directly on the drying silo\n• Central control with touch control panel, material database, trend diagram and weekly timer\n• TPA - dew point measurement and display",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-granulators-02",
    name: "High-speed granulator MATSUI SMG-030",
    category: "Other equipment",
    subcategory: "granulators",
    make: "Matsui",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/oeq-granulators-02-wide.jpg",
    description: "Motor power: 2.2 kW\nNumber of rotating blades: 3\nNumber of fixed blades: 2\nSieve with 8 mm diameter holes\nMaximum capacity: 30 kg/hour\nGrinding chamber size: 10 L\nRotational speed: 480 revolutions per minute\nInput chamber dimensions:\n• Length = 240 mm\n• Width = 245 mm\nHeight of the feed chamber: 1500 mm\nDimensions of the grinding chamber:\n• Length = 240 mm\n• Rotor width = 170 mm\nWeight of the granulator: 254 kg",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-granulators-03",
    name: "Low-speed granulator MATSUI SMGL3 2/3",
    category: "Other equipment",
    subcategory: "granulators",
    make: "Matsui",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/1_smgl3.jpg",
    gallery: ["/images/2_smgl3.jpg", "/images/3_smgl3.jpg"],
    description: "Number of sections of larger blades: 2\nNumber of sections of smaller blades: 3\nRotational speed: 25 rpm\nMotor power: 0.75 kW\nFeed chamber dimensions:\n• Length = 230 mm\n• Width = 260 mm\nHeight of the feed chamber: 1,605 mm\nGrinding chamber dimensions:\n• Length = 261 mm\n• Rotor width = 262 mm\nMaximum capacity: 10 kg/hour\nMaximum feed piece dimensions: 250 x 240 x 120 mm\nMaximum feed piece diameter: 7 mm\n\nOperating description:\n• Rotor rotation stops and reverses in the event of detected overload, followed by rotor restart (enables more efficient grinding)\n• Automatic adjustment to optimal speed (if no grinding force is detected, the machine automatically switches to ECO mode with slow rotation)\n• Setting of time intervals",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-granulators-04",
    name: "Low-speed granulator MATSUI SMGL3 3/4",
    category: "Other equipment",
    subcategory: "granulators",
    make: "Matsui",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/1_smgl3.jpg",
    gallery: ["/images/2_smgl3.jpg", "/images/3_smgl3.jpg"],
    description: "Number of sections for larger blades: 3\nNumber of sections for smaller blades: 4\nRotational speed: 25 rpm\nMotor power: 1.5 kW\nDimensions of the feed chamber:\n• Length = 325 mm\n• Width = 260 mm\nHeight of the feed chamber: 1,605 mm\nGrinding chamber dimensions:\n• Length = 355 mm\n• Rotor width = 262 mm\nMaximum capacity: 15 kg/hour\nMaximum feed piece dimensions: 345 x 240 x 120 mm\nMaximum feed piece diameter: 7 mm\n\nOperating description:\n• Rotor rotation stops and reverses if excessive power is detected, followed by a restart of the rotor (enables more efficient grinding)\n• Automatic adjustment to optimal speed (if no grinding power is detected, the machine automatically switches to ECOmode with slow rotation)\n• Setting time intervals",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "oeq-granulators-05",
    name: "Low-speed granulator MATSUI SMGL3 4/5",
    category: "Other equipment",
    subcategory: "granulators",
    make: "Matsui",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "New",
    image: "/images/1_smgl3.jpg",
    gallery: ["/images/2_smgl3.jpg", "/images/3_smgl3.jpg"],
    description: "Number of sections of larger blades: 4\nNumber of sections of smaller blades: 5\nRotational speed: 25 rpm\nMotor power: 2 kW\nDimensions of the feed chamber:\n• Length = 420 mm\n• Width = 260 mm\nHeight of the feed chamber: 1,605 mm\nGrinding chamber dimensions:\n• Length = 449 mm\n• Rotor width = 262 mm\nMaximum capacity: 20 kg/hour\nMaximum feed piece dimensions: 435 x 240 x 120 mm\nMaximum feed piece diameter: 9 mm\n\nOperating description:\n• Rotor rotation stops and reverses in the event of detected overload, followed by rotor restart (enables more efficient grinding)\n• Automatic adjustment to optimal speed (if no grinding force is detected, the machine automatically switches to ECOmode with slow rotation)\n• Setting time intervals",
    price: "Price on request",
    placeholder: false
  }
];

// ---- spare parts ------------------------------------------------------------
// Only the first item in each Electronics submenu keeps the real
// manufacturer/model researched from abcparts.be (a genuine reference
// listing); every other entry is a generic sample. See README.md.
const PARTS = [

  // Electronics > Drives
  { id: "prt-drv-002", name: "SIEMENS SIMODRIVE LT-MODUL 400A WAC", partNo: "6SN1125-1AA00-0KA0", manufacturer: "Siemens", model: "SIMODRIVE LT-MODUL 400A WAC", serialNo: "SN-T-P82023853",
    category: "electronics", subcategory: "drives", condition: "Used", fits: "SIMODRIVE power module — confirm cabinet fit before ordering.",
    leadTime: "From stock", description: "",
    image: "/images/drive 1_2.jpg", gallery: ["/images/drive 1_1.jpg"], price: "Price on request", placeholder: false },

  // Electronics > IPC & HMI
  { id: "prt-ipc-001", name: "MC4 IPC with screen and keyboard", partNo: "5080338 / 5080343", manufacturer: "KraussMaffei", model: "MC4 IPC + FA560", serialNo: "—",
    category: "electronics", subcategory: "ipc-hmi", condition: "Used", fits: "KraussMaffei MC4 control system — confirm compatibility with our team.",
    leadTime: "From stock", description: "MC4 IPC (Pentium 300 CF) with screen (FA560) and keyboard.\nNo. 5080338 and 5080343",
    image: "/images/20260820_110731.jpg", gallery: ["/images/20260820_110827.jpg", "/images/20260820_110839.jpg", "/images/20260820_111248.jpg"], price: "Price on request", placeholder: false },

  // Electronics > Motor
  { id: "prt-mot-001", name: "Servomotor SIEMENS 1FT6108-8AC71-4DH0", partNo: "1FT6108-8AC71-4DH0", manufacturer: "Siemens", model: "1FT6108-8AC71-4DH0", serialNo: "SN-H6626943601001",
    category: "electronics", subcategory: "motor", condition: "Used", fits: "3~ servo motor — confirm shaft/flange and encoder before ordering.",
    leadTime: "From stock", description: "",
    image: "/images/servo 1_2.jpg", gallery: ["/images/servo 1_1.jpg"], price: "Price on request", placeholder: false },
  { id: "prt-mot-002", name: "Servomotor SIEMENS 1FT6108-8WC71-6AG0", partNo: "1FT6108-8WC71-6AG0", manufacturer: "Siemens", model: "1FT6108-8WC71-6AG0", serialNo: "SN-S629015701001",
    category: "electronics", subcategory: "motor", condition: "Used", fits: "3~ brushless servo motor — confirm shaft/flange and encoder before ordering.",
    leadTime: "From stock", description: "",
    image: "/images/servo 1_4.jpg", gallery: ["/images/servo 1_3.jpg"], price: "Price on request", placeholder: false },
  { id: "prt-mot-003", name: "Servomotor KraussMaffei GNA 180 SN-271P (No. 11705682)", partNo: "GNA 180 SN-271P", manufacturer: "KraussMaffei", model: "GNA 180 SN-271P", serialNo: "SN-11705682",
    category: "electronics", subcategory: "motor", condition: "Used", fits: "Berstorff G-Motor — confirm shaft/flange before ordering.",
    leadTime: "From stock", description: "",
    image: "/images/servo 1_6.jpg", gallery: ["/images/servo 1_5.jpg"], price: "Price on request", placeholder: false },

  // Electronics > Power supply
  { id: "prt-pow-001", name: "Power supply NT500 (MC4), HDB-60B-30, Schroff", partNo: "HDB-60B-30", manufacturer: "Schroff", model: "HDB-60B-30", serialNo: "5004600",
    category: "electronics", subcategory: "powersupply", condition: "Used", fits: "KraussMaffei MC4 control system — confirm compatibility with our team.",
    leadTime: "From stock", description: "No. 5004600",
    image: "/images/20260820_110601.jpg", gallery: ["/images/20260820_110608.jpg"], price: "Price on request", placeholder: false },

  // Plasticizing units & screws
  { id: "prt-psc-001", name: "Plasticizing unit KraussMaffei SP750 Ø50 mm", partNo: "SP750 Ø50", manufacturer: "KraussMaffei", model: "SP750 Ø50", serialNo: "—",
    category: "plasticizing", subcategory: "Plasticizing units", condition: "Checked", fits: "KraussMaffei SP750 injection unit — confirm cylinder/screw diameter before ordering.",
    leadTime: "From stock", description: "Wear resistant plasticizer (bimetallic) consisting of:\n• Cylinder\n• Screw\n• RSP\n• Complete heating system with heating connection\n• BluePower - Complete insulation of plasticizing cylinder for lower energy consumption",
    image: "/images/SP750 fi 50.jpg", price: "Price on request", placeholder: false },
  { id: "prt-psc-002", name: "Plasticizing unit KraussMaffei SP750 Ø40 mm", partNo: "SP750 Ø40", manufacturer: "KraussMaffei", model: "SP750 Ø40", serialNo: "—",
    category: "plasticizing", subcategory: "Plasticizing units", condition: "Checked", fits: "KraussMaffei SP750 injection unit — confirm cylinder/screw diameter before ordering.",
    leadTime: "From stock", description: "Wear resistant plasticizer (bimetallic) consisting of:\n• Cylinder\n• Screw\n• RSP\n• Complete heating system with heating connection\n• BluePower - Complete insulation of plasticizing cylinder for lower energy consumption",
    image: "/images/SP750 fi40.jpg", price: "Price on request", placeholder: false },
  { id: "prt-psc-003", name: "Plasticizing unit KraussMaffei SP250 Ø30 mm", partNo: "SP250 Ø30", manufacturer: "KraussMaffei", model: "SP250 Ø30", serialNo: "—",
    category: "plasticizing", subcategory: "Plasticizing units", condition: "Checked", fits: "KraussMaffei SP250 injection unit — confirm cylinder/screw diameter before ordering.",
    leadTime: "From stock", description: "Wear resistant plasticizer (bimetallic) consisting of:\n• Cylinder\n• Screw\n• RSP\n• Complete heating system with heating connection",
    image: "/images/SP250 fi30.jpg", price: "Price on request", placeholder: false },

  // Hydraulic valves
  { id: "prt-hyd-001", name: "Proportional valve for closing and opening mold KM 200-1400 C2", partNo: "6438716", manufacturer: "KraussMaffei", model: "6438716", serialNo: "—",
    category: "hydraulic", subcategory: "Proportional valve", condition: "Used", fits: "KraussMaffei KM 200-1400 C2 mould clamping unit — confirm fitment with our team.",
    leadTime: "From stock", description: "Proportional directional valve for mould closing and opening, KraussMaffei KM 200-1400 C2. Part no. 6438716.",
    image: "/images/Proporcionalni ventil.jpg", price: "Price on request", placeholder: false },

  // Other
  { id: "prt-oth-001", name: "Filter 51 525 75 784", partNo: "51 525 75 784", manufacturer: "Mann+Hummel", model: "51 525 75 784", serialNo: "SN-40/01",
    category: "other", subcategory: "Other", condition: "New", fits: "Hydraulic filter housing — max. pressure 40 bar, max. temperature 120 °C, volume 2 l — confirm fitment with our team.",
    leadTime: "From stock", description: "Mann+Hummel hydraulic filter housing, type 51 525 75 784. Max. pressure: 40 bar. Max. temperature: 120 °C. Volume: 2 l. Filter insert: 51 525 55 274.",
    image: "/images/1_filter 1.jpg", gallery: ["/images/1_filter 2.jpg"], price: "Price on request", placeholder: false },
  { id: "prt-oth-002", name: "Filter G 07 XPA", partNo: "G 07 XPA", manufacturer: "Zander", model: "G 07 XPA", serialNo: "—",
    category: "other", subcategory: "Other", condition: "New", fits: "Compressed-air filter unit — max. pressure 16 bar, max. temperature 1–40 °C, volume 0.65 l — confirm fitment with our team.",
    leadTime: "From stock", description: "Zander compressed-air filter unit, model G 07 XPA. Filter element: 1140 XP. Max. pressure: 16 bar. Max. temperature: 1–40 °C. Volume: 0.65 l.",
    image: "/images/2_filter 1.jpg", gallery: ["/images/2_filter 2.jpg"], price: "Price on request", placeholder: false },
  { id: "prt-oth-003", name: "TE 500 heating zone control card with relay board (6 x hotrunner control circuits)", partNo: "TE500/1", manufacturer: "Unknown", model: "TE500/1", serialNo: "—",
    category: "other", subcategory: "Other", condition: "Used", fits: "Hotrunner temperature control system — confirm compatibility with our team.",
    leadTime: "From stock", description: "TE 500 heating zone control card with relay board. Relay board with 6 x hotrunner control circuits.",
    image: "/images/20260820_111351.jpg", price: "Price on request", placeholder: false }
];

function findPartById(id) { return PARTS.find(p => p.id === id) || null; }
function findMachineById(id) { return MACHINES.find(m => m.id === id) || null; }
