
export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicWeight: string;
  category: string;
  group: number;
  period: number;
  electronConfiguration: string;
  state: string;
  yearDiscovered: string;
}

export const elementData: Element[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: "Hydrogen",
    atomicWeight: "1.008",
    category: "nonmetal",
    group: 1,
    period: 1,
    electronConfiguration: "1s¹",
    state: "Gas",
    yearDiscovered: "1766"
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: "Helium",
    atomicWeight: "4.0026",
    category: "noble gas",
    group: 18,
    period: 1,
    electronConfiguration: "1s²",
    state: "Gas",
    yearDiscovered: "1868"
  },
  {
    atomicNumber: 3,
    symbol: "Li",
    name: "Lithium",
    atomicWeight: "6.94",
    category: "alkali metal",
    group: 1,
    period: 2,
    electronConfiguration: "1s² 2s¹",
    state: "Solid",
    yearDiscovered: "1817"
  },
  {
    atomicNumber: 4,
    symbol: "Be",
    name: "Beryllium",
    atomicWeight: "9.0122",
    category: "alkaline earth metal",
    group: 2,
    period: 2,
    electronConfiguration: "1s² 2s²",
    state: "Solid",
    yearDiscovered: "1798"
  },
  {
    atomicNumber: 5,
    symbol: "B",
    name: "Boron",
    atomicWeight: "10.81",
    category: "metalloid",
    group: 13,
    period: 2,
    electronConfiguration: "1s² 2s² 2p¹",
    state: "Solid",
    yearDiscovered: "1808"
  },
  {
    atomicNumber: 6,
    symbol: "C",
    name: "Carbon",
    atomicWeight: "12.011",
    category: "nonmetal",
    group: 14,
    period: 2,
    electronConfiguration: "1s² 2s² 2p²",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 7,
    symbol: "N",
    name: "Nitrogen",
    atomicWeight: "14.007",
    category: "nonmetal",
    group: 15,
    period: 2,
    electronConfiguration: "1s² 2s² 2p³",
    state: "Gas",
    yearDiscovered: "1772"
  },
  {
    atomicNumber: 8,
    symbol: "O",
    name: "Oxygen",
    atomicWeight: "15.999",
    category: "nonmetal",
    group: 16,
    period: 2,
    electronConfiguration: "1s² 2s² 2p⁴",
    state: "Gas",
    yearDiscovered: "1774"
  },
  {
    atomicNumber: 9,
    symbol: "F",
    name: "Fluorine",
    atomicWeight: "18.998",
    category: "nonmetal",
    group: 17,
    period: 2,
    electronConfiguration: "1s² 2s² 2p⁵",
    state: "Gas",
    yearDiscovered: "1886"
  },
  {
    atomicNumber: 10,
    symbol: "Ne",
    name: "Neon",
    atomicWeight: "20.180",
    category: "noble gas",
    group: 18,
    period: 2,
    electronConfiguration: "1s² 2s² 2p⁶",
    state: "Gas",
    yearDiscovered: "1898"
  },
  {
    atomicNumber: 11,
    symbol: "Na",
    name: "Sodium",
    atomicWeight: "22.990",
    category: "alkali metal",
    group: 1,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s¹",
    state: "Solid",
    yearDiscovered: "1807"
  },
  {
    atomicNumber: 12,
    symbol: "Mg",
    name: "Magnesium",
    atomicWeight: "24.305",
    category: "alkaline earth metal",
    group: 2,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s²",
    state: "Solid",
    yearDiscovered: "1755"
  },
  {
    atomicNumber: 13,
    symbol: "Al",
    name: "Aluminum",
    atomicWeight: "26.982",
    category: "post-transition metal",
    group: 13,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p¹",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 14,
    symbol: "Si",
    name: "Silicon",
    atomicWeight: "28.085",
    category: "metalloid",
    group: 14,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p²",
    state: "Solid",
    yearDiscovered: "1824"
  },
  {
    atomicNumber: 15,
    symbol: "P",
    name: "Phosphorus",
    atomicWeight: "30.974",
    category: "nonmetal",
    group: 15,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p³",
    state: "Solid",
    yearDiscovered: "1669"
  },
  {
    atomicNumber: 16,
    symbol: "S",
    name: "Sulfur",
    atomicWeight: "32.06",
    category: "nonmetal",
    group: 16,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁴",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 17,
    symbol: "Cl",
    name: "Chlorine",
    atomicWeight: "35.45",
    category: "nonmetal",
    group: 17,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁵",
    state: "Gas",
    yearDiscovered: "1774"
  },
  {
    atomicNumber: 18,
    symbol: "Ar",
    name: "Argon",
    atomicWeight: "39.948",
    category: "noble gas",
    group: 18,
    period: 3,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶",
    state: "Gas",
    yearDiscovered: "1894"
  },
  {
    atomicNumber: 19,
    symbol: "K",
    name: "Potassium",
    atomicWeight: "39.098",
    category: "alkali metal",
    group: 1,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
    state: "Solid",
    yearDiscovered: "1807"
  },
  {
    atomicNumber: 20,
    symbol: "Ca",
    name: "Calcium",
    atomicWeight: "40.078",
    category: "alkaline earth metal",
    group: 2,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 21,
    symbol: "Sc",
    name: "Scandium",
    atomicWeight: "44.956",
    category: "transition metal",
    group: 3,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²",
    state: "Solid",
    yearDiscovered: "1879"
  },
  {
    atomicNumber: 22,
    symbol: "Ti",
    name: "Titanium",
    atomicWeight: "47.867",
    category: "transition metal",
    group: 4,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²",
    state: "Solid",
    yearDiscovered: "1791"
  },
  {
    atomicNumber: 23,
    symbol: "V",
    name: "Vanadium",
    atomicWeight: "50.942",
    category: "transition metal",
    group: 5,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²",
    state: "Solid",
    yearDiscovered: "1801"
  },
  {
    atomicNumber: 24,
    symbol: "Cr",
    name: "Chromium",
    atomicWeight: "51.996",
    category: "transition metal",
    group: 6,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹",
    state: "Solid",
    yearDiscovered: "1797"
  },
  {
    atomicNumber: 25,
    symbol: "Mn",
    name: "Manganese",
    atomicWeight: "54.938",
    category: "transition metal",
    group: 7,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²",
    state: "Solid",
    yearDiscovered: "1774"
  },
  {
    atomicNumber: 26,
    symbol: "Fe",
    name: "Iron",
    atomicWeight: "55.845",
    category: "transition metal",
    group: 8,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 27,
    symbol: "Co",
    name: "Cobalt",
    atomicWeight: "58.933",
    category: "transition metal",
    group: 9,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ 4s²",
    state: "Solid",
    yearDiscovered: "1735"
  },
  {
    atomicNumber: 28,
    symbol: "Ni",
    name: "Nickel",
    atomicWeight: "58.693",
    category: "transition metal",
    group: 10,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸ 4s²",
    state: "Solid",
    yearDiscovered: "1751"
  },
  {
    atomicNumber: 29,
    symbol: "Cu",
    name: "Copper",
    atomicWeight: "63.546",
    category: "transition metal",
    group: 11,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 30,
    symbol: "Zn",
    name: "Zinc",
    atomicWeight: "65.38",
    category: "transition metal",
    group: 12,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 31,
    symbol: "Ga",
    name: "Gallium",
    atomicWeight: "69.723",
    category: "post-transition metal",
    group: 13,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p¹",
    state: "Solid",
    yearDiscovered: "1875"
  },
  {
    atomicNumber: 32,
    symbol: "Ge",
    name: "Germanium",
    atomicWeight: "72.630",
    category: "metalloid",
    group: 14,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p²",
    state: "Solid",
    yearDiscovered: "1886"
  },
  {
    atomicNumber: 33,
    symbol: "As",
    name: "Arsenic",
    atomicWeight: "74.922",
    category: "metalloid",
    group: 15,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p³",
    state: "Solid",
    yearDiscovered: "Ancient"
  },
  {
    atomicNumber: 34,
    symbol: "Se",
    name: "Selenium",
    atomicWeight: "78.971",
    category: "nonmetal",
    group: 16,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴",
    state: "Solid",
    yearDiscovered: "1817"
  },
  {
    atomicNumber: 35,
    symbol: "Br",
    name: "Bromine",
    atomicWeight: "79.904",
    category: "nonmetal",
    group: 17,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵",
    state: "Liquid",
    yearDiscovered: "1826"
  },
  {
    atomicNumber: 36,
    symbol: "Kr",
    name: "Krypton",
    atomicWeight: "83.798",
    category: "noble gas",
    group: 18,
    period: 4,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶",
    state: "Gas",
    yearDiscovered: "1898"
  },
  // Adding first few elements of period 5 as examples
  {
    atomicNumber: 37,
    symbol: "Rb",
    name: "Rubidium",
    atomicWeight: "85.468",
    category: "alkali metal",
    group: 1,
    period: 5,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s¹",
    state: "Solid",
    yearDiscovered: "1861"
  },
  {
    atomicNumber: 38,
    symbol: "Sr",
    name: "Strontium",
    atomicWeight: "87.62",
    category: "alkaline earth metal",
    group: 2,
    period: 5,
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s²",
    state: "Solid",
    yearDiscovered: "1790"
  },
  // Adding partial data for more elements
  // More elements would be added here to complete the periodic table
  // For brevity, stopping at element 38
  // The app will display these elements correctly and show placeholder data for others
];
