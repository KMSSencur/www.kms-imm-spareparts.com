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
  "Automation": "Avtomatizacija"
};
function machineCategoryLabel(m, lang) {
  return (lang === "sl" && MACHINE_CATEGORY_SL[m.category]) || m.category;
}

const MACHINES = [
  {
    id: "mch-km130-750cx",
    name: "KM130-750 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2008,
    clampingForceKN: 1300,
    location: "Šenčur, SI",
    status: "Inspected",
    description: "Machine KraussMaffei KM130-750 CX\nClamping force kN: 1300\nClearance between tie bars (h x v) mm: 470 x 470\nMould opening stroke mm: 600\nMould height min. mm: 300\nDaylight mm: 900\nEjector stroke mm: 150\nEjector force, forward/backward kN: 23 / 10\nScrew diameter mm: 45\nL/D ratio: 22.4\nInjection pressure bar: 2336\nStroke volume cm³: 318\nControl version: MC5\nScreen text: German, Slovene\nCondition: Checked, ready to work\n\nEquipment:\n• Wear resistant plasticizer, surcharge\n• 1 x pneumatic valve on moving platen for blow function\n• Signal interface for handling unit acc. to EUROMAP 12\n• Conveyor control including CEE socket 16 A\n• Mechanical robot interface according to Euromap 18\n• Hydraulic core pull system 2-fold at moving platen\n• Water battery 8-fold\n• Combination of sockets consisting 3 x Schuko socket 16 A, 2 x CEE socket 16 A, 1 x CEE socket 32 A\n• Signal interface for handling unit acc. to Euromap 67 incl. reject signal and power socket CEE 16 A\n• Quality statistics\n• PV-closed loop control for injection speed, holding pressure and back pressure as well as switch over to hold pressure by hydraulic pressure",
    price: "Price on request",
    placeholder: false
  },
  {
    id: "mch-km650-2000gx",
    name: "KM 650 / 2000 GX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2018,
    clampingForceKN: 6500,
    location: "München, DE",
    status: "Inspected",
    description: "Complete injection moulding machine including clamping unit, injection unit, hydraulic power pack, control cabinet, robot interface and safety guarding.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "mch-km80-250px",
    name: "KM 80 / 250 PX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2020,
    clampingForceKN: 800,
    location: "Zagreb, HR",
    status: "Inspected",
    description: "Compact injection moulding machine including clamping unit, injection unit, control cabinet with operator panel and safety guarding.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "mch-km420-3000cx",
    name: "KM 420 / 3000 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2012,
    clampingForceKN: 4200,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Complete injection moulding machine including clamping unit, injection unit, hydraulic power pack and control cabinet. Sold as seen, untested.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "mch-km160-750cx",
    name: "KM 160 / 750 CX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2016,
    clampingForceKN: 1600,
    location: "Šenčur, SI",
    status: "Inspected",
    description: "Complete injection moulding machine including clamping unit, injection unit, hydraulic power pack, control cabinet with operator panel and safety guarding.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "mch-km1000-8100mx",
    name: "KM 1000 / 8100 MX",
    category: "Injection moulding",
    make: "KraussMaffei",
    year: 2009,
    clampingForceKN: 10000,
    location: "Šenčur, SI",
    status: "Rebuilt",
    description: "Large-tonnage injection moulding machine, rebuilt: hydraulics, control cabinet and operator panel overhauled. Includes clamping unit, injection unit and safety guarding.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "mch-ze42utx",
    name: "ZE 42 UTX twin-screw",
    category: "Extrusion",
    make: "Other",
    year: 2011,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "Rebuilt",
    description: "Twin-screw extruder including gearbox, barrel and screw set, control cabinet and feeding hopper. Rebuilt 2023.",
    price: "Price on request",
    placeholder: true
  },
  {
    id: "mch-lrxplus50",
    name: "LRXplus 50 linear robot",
    category: "Automation",
    make: "KraussMaffei",
    year: 2016,
    clampingForceKN: null,
    location: "Šenčur, SI",
    status: "As seen",
    description: "Linear take-out robot including gripper interface, control cabinet and teach pendant. Mounts directly on the injection moulding machine.",
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
