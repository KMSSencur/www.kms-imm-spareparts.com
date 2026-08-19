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
  { key: "electronics", label: "Electronics", labelSl: "Elektronika", submenus: [
      { key: "drives", label: "Drives", labelSl: "Pogoni" },
      { key: "ipc", label: "IPC", labelSl: "IPC" },
      { key: "hmi", label: "HMI", labelSl: "HMI" },
      { key: "motor", label: "Motor", labelSl: "Motorji" },
      { key: "plc", label: "PLC", labelSl: "PLC" },
      { key: "powersupply", label: "Power supply", labelSl: "Napajalniki" }
  ]},
  { key: "plasticizing", label: "Plasticizing units & screws", labelSl: "Plastifikacijske enote in vijaki" },
  { key: "hydraulic", label: "Hydraulic valves", labelSl: "Hidravlični ventili" },
  { key: "other", label: "Other", labelSl: "Drugo" }
];

function partCategoryLabel(catKey, lang) {
  const cat = PART_CATEGORIES.find(c => c.key === catKey);
  if (!cat) return catKey;
  return lang === "sl" ? cat.labelSl : cat.label;
}
function partSubcategoryLabel(catKey, subKey, lang) {
  const cat = PART_CATEGORIES.find(c => c.key === catKey);
  if (cat && cat.submenus) {
    const sub = cat.submenus.find(s => s.key === subKey);
    if (sub) return lang === "sl" ? sub.labelSl : sub.label;
  }
  return subKey || "";
}

// "Browse by category" taxonomy for the Other plastic equipment page — mirrors
// PART_CATEGORIES' shape. Machines in this category (category: "Other
// equipment") carry a matching `subcategory` value (e.g. "robots").
const OTHER_EQUIPMENT_CATEGORIES = [
  { key: "robots", label: "Robots", labelSl: "Roboti" },
  { key: "tempering", label: "Tempering control units", labelSl: "Temperirne enote" },
  { key: "dryers", label: "Dryers", labelSl: "Sušilniki" },
  { key: "granulators", label: "Granulators", labelSl: "Mlini" },
  { key: "other", label: "Other", labelSl: "Drugo" }
];
function otherEquipmentCategoryLabel(key, lang) {
  const cat = OTHER_EQUIPMENT_CATEGORIES.find(c => c.key === key);
  if (!cat) return key;
  return lang === "sl" ? cat.labelSl : cat.label;
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
function machineCategoryLabel(m, lang) {
  return (lang === "sl" && MACHINE_CATEGORY_SL[m.category]) || m.category;
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

  // ---- other plastic equipment (sample listings, one per category) ----
  {
    id: "oeq-robots-01",
    name: "Sample robot",
    category: "Other equipment",
    subcategory: "robots",
    make: "Other",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Placeholder listing — replace with a real item from your own inventory.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "oeq-tempering-01",
    name: "Sample tempering control unit",
    category: "Other equipment",
    subcategory: "tempering",
    make: "Other",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Placeholder listing — replace with a real item from your own inventory.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "oeq-dryers-01",
    name: "Sample dryer",
    category: "Other equipment",
    subcategory: "dryers",
    make: "Other",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Placeholder listing — replace with a real item from your own inventory.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "oeq-granulators-01",
    name: "Sample granulator",
    category: "Other equipment",
    subcategory: "granulators",
    make: "Other",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Placeholder listing — replace with a real item from your own inventory.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "oeq-other-01",
    name: "Sample equipment",
    category: "Other equipment",
    subcategory: "other",
    make: "Other",
    year: null,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Placeholder listing — replace with a real item from your own inventory.",
    price: "Price on request",
    placeholder: true
  }
];

// ---- spare parts ------------------------------------------------------------
// Only the first item in each Electronics submenu keeps the real
// manufacturer/model researched from abcparts.be (a genuine reference
// listing); every other entry is a generic sample. See README.md.
const PARTS = [

  // Electronics > Drives
  { id: "prt-drv-001", name: "Drive-Electronic 4-20/4QT", partNo: "4-20/4QT", manufacturer: "Drive-Electronic", model: "4-20/4QT", serialNo: "SN-DE42041",
    category: "electronics", subcategory: "drives", condition: "Refurbished", fits: "General-purpose servo drive replacement — confirm cabinet fit with our team.",
    leadTime: "From stock", description: "Servo drive unit, tested and refurbished. Suitable as a like-for-like replacement on legacy motion-control installations.",
    price: "Price on request", placeholder: false },
  { id: "prt-drv-002", name: "Sample Drive Unit 2", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000006",
    category: "electronics", subcategory: "drives", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-drv-003", name: "Sample Drive Unit 3", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000007",
    category: "electronics", subcategory: "drives", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-drv-004", name: "Sample Drive Unit 4", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000008",
    category: "electronics", subcategory: "drives", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },

  // Electronics > IPC
  { id: "prt-ipc-001", name: "B&R Panel PC APC910", partNo: "APC910", manufacturer: "B&R", model: "APC910", serialNo: "SN-BRN117001",
    category: "electronics", subcategory: "ipc", condition: "Used", fits: "Panel-mount industrial PC — confirm cutout size before ordering.",
    leadTime: "From stock", description: "Industrial panel PC pulled from service, screen and mainboard tested and working.", price: "Price on request", placeholder: false },
  { id: "prt-ipc-002", name: "Sample IPC Unit 2", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000009",
    category: "electronics", subcategory: "ipc", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-ipc-003", name: "Sample IPC Unit 3", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000010",
    category: "electronics", subcategory: "ipc", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-ipc-004", name: "Sample IPC Unit 4", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000011",
    category: "electronics", subcategory: "ipc", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },

  // Electronics > HMI
  { id: "prt-hmi-001", name: "Schneider Electric Magelis HMIDT651", partNo: "HMIDT651", manufacturer: "Schneider Electric", model: "HMIDT651", serialNo: "SN-SEHMIDT651",
    category: "electronics", subcategory: "hmi", condition: "Refurbished", fits: "Magelis GTU-series control cabinets.",
    leadTime: "From stock", description: "Magelis GTU advanced touchscreen, 12.1\" WXGA (1280x800) colour touch display.", price: "Price on request", placeholder: false },
  { id: "prt-hmi-002", name: "Sample HMI Panel 2", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000012",
    category: "electronics", subcategory: "hmi", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-hmi-003", name: "Sample HMI Panel 3", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000013",
    category: "electronics", subcategory: "hmi", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-hmi-004", name: "Sample HMI Panel 4", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000014",
    category: "electronics", subcategory: "hmi", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },

  // Electronics > Motor
  { id: "prt-mot-001", name: "Allen-Bradley Servo Motor", partNo: "SERVOMOTOR", manufacturer: "Allen-Bradley", model: "SERVOMOTOR", serialNo: "SN-AB-SM01",
    category: "electronics", subcategory: "motor", condition: "Used", fits: "Standard servo motion axis — confirm shaft/flange before ordering.",
    leadTime: "From stock", description: "Servo motor, tested and ready for installation, sourced from surplus stock.", price: "Price on request", placeholder: false },
  { id: "prt-mot-002", name: "Sample Motor 2", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000015",
    category: "electronics", subcategory: "motor", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },

  // Electronics > PLC
  { id: "prt-plc-001", name: "PLC Direct D3-330 CPU", partNo: "D3-330", manufacturer: "PLC Direct", model: "D3-330", serialNo: "SN-PD3330",
    category: "electronics", subcategory: "plc", condition: "Refurbished", fits: "Automation Direct DL305-series PLC rack.",
    leadTime: "From stock", description: "DL330 CPU module for the Automation Direct DL305-series PLC rack. 1 year warranty.", price: "Price on request", placeholder: false },
  { id: "prt-plc-002", name: "Sample PLC Module 2", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000016",
    category: "electronics", subcategory: "plc", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-plc-003", name: "Sample PLC Module 3", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000017",
    category: "electronics", subcategory: "plc", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-plc-004", name: "Sample PLC Module 4", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000018",
    category: "electronics", subcategory: "plc", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true },

  // Electronics > Power supply
  { id: "prt-psu-001", name: "Industrial Power Supply AA1", partNo: "POWERSUPPLYAA1", manufacturer: "Unknown", model: "POWERSUPPLYAA1", serialNo: "SN-PSAA1",
    category: "electronics", subcategory: "powersupply", condition: "Used", fits: "General-purpose control-cabinet installation.",
    leadTime: "From stock", description: "General-purpose industrial power supply unit for control-cabinet installation.", price: "Price on request", placeholder: false },

  // Plasticizing units & screws
  { id: "prt-psc-001", name: "Sample Plasticizing Unit", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000002",
    category: "plasticizing", subcategory: "Plasticizing units", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real plasticizing unit from your own inventory.", price: "Price on request", placeholder: true },
  { id: "prt-psc-002", name: "Sample Barrel Screw", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000003",
    category: "plasticizing", subcategory: "Screws", condition: "New", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real screw from your own inventory.", price: "Price on request", placeholder: true },

  // Hydraulic valves
  { id: "prt-hyd-001", name: "Sample Hydraulic Directional Valve", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000004",
    category: "hydraulic", subcategory: "Directional valve", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real hydraulic valve from your own inventory.", price: "Price on request", placeholder: true },

  // Other
  { id: "prt-oth-001", name: "Sample Other Item", partNo: "—", manufacturer: "Manufacturer name", model: "Model number", serialNo: "SN-000005",
    category: "other", subcategory: "Miscellaneous", condition: "Used", fits: "Fitment to be confirmed — replace with a real catalog item.",
    leadTime: "On request", description: "Placeholder listing — replace with a real item from your own inventory.", price: "Price on request", placeholder: true }
];

function findPartById(id) { return PARTS.find(p => p.id === id) || null; }
function findMachineById(id) { return MACHINES.find(m => m.id === id) || null; }
