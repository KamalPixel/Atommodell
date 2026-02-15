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
  // Period 1
  { atomicNumber: 1, symbol: "H", name: "Hydrogen", atomicWeight: "1.008", category: "nonmetal", group: 1, period: 1, electronConfiguration: "1s¹", state: "Gas", yearDiscovered: "1766" },
  { atomicNumber: 2, symbol: "He", name: "Helium", atomicWeight: "4.0026", category: "noble gas", group: 18, period: 1, electronConfiguration: "1s²", state: "Gas", yearDiscovered: "1868" },

  // Period 2
  { atomicNumber: 3, symbol: "Li", name: "Lithium", atomicWeight: "6.94", category: "alkali metal", group: 1, period: 2, electronConfiguration: "1s² 2s¹", state: "Solid", yearDiscovered: "1817" },
  { atomicNumber: 4, symbol: "Be", name: "Beryllium", atomicWeight: "9.0122", category: "alkaline earth metal", group: 2, period: 2, electronConfiguration: "1s² 2s²", state: "Solid", yearDiscovered: "1798" },
  { atomicNumber: 5, symbol: "B", name: "Boron", atomicWeight: "10.81", category: "metalloid", group: 13, period: 2, electronConfiguration: "1s² 2s² 2p¹", state: "Solid", yearDiscovered: "1808" },
  { atomicNumber: 6, symbol: "C", name: "Carbon", atomicWeight: "12.011", category: "nonmetal", group: 14, period: 2, electronConfiguration: "1s² 2s² 2p²", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicWeight: "14.007", category: "nonmetal", group: 15, period: 2, electronConfiguration: "1s² 2s² 2p³", state: "Gas", yearDiscovered: "1772" },
  { atomicNumber: 8, symbol: "O", name: "Oxygen", atomicWeight: "15.999", category: "nonmetal", group: 16, period: 2, electronConfiguration: "1s² 2s² 2p⁴", state: "Gas", yearDiscovered: "1774" },
  { atomicNumber: 9, symbol: "F", name: "Fluorine", atomicWeight: "18.998", category: "nonmetal", group: 17, period: 2, electronConfiguration: "1s² 2s² 2p⁵", state: "Gas", yearDiscovered: "1886" },
  { atomicNumber: 10, symbol: "Ne", name: "Neon", atomicWeight: "20.180", category: "noble gas", group: 18, period: 2, electronConfiguration: "1s² 2s² 2p⁶", state: "Gas", yearDiscovered: "1898" },

  // Period 3
  { atomicNumber: 11, symbol: "Na", name: "Sodium", atomicWeight: "22.990", category: "alkali metal", group: 1, period: 3, electronConfiguration: "[Ne] 3s¹", state: "Solid", yearDiscovered: "1807" },
  { atomicNumber: 12, symbol: "Mg", name: "Magnesium", atomicWeight: "24.305", category: "alkaline earth metal", group: 2, period: 3, electronConfiguration: "[Ne] 3s²", state: "Solid", yearDiscovered: "1755" },
  { atomicNumber: 13, symbol: "Al", name: "Aluminum", atomicWeight: "26.982", category: "post-transition metal", group: 13, period: 3, electronConfiguration: "[Ne] 3s² 3p¹", state: "Solid", yearDiscovered: "1825" },
  { atomicNumber: 14, symbol: "Si", name: "Silicon", atomicWeight: "28.085", category: "metalloid", group: 14, period: 3, electronConfiguration: "[Ne] 3s² 3p²", state: "Solid", yearDiscovered: "1824" },
  { atomicNumber: 15, symbol: "P", name: "Phosphorus", atomicWeight: "30.974", category: "nonmetal", group: 15, period: 3, electronConfiguration: "[Ne] 3s² 3p³", state: "Solid", yearDiscovered: "1669" },
  { atomicNumber: 16, symbol: "S", name: "Sulfur", atomicWeight: "32.06", category: "nonmetal", group: 16, period: 3, electronConfiguration: "[Ne] 3s² 3p⁴", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 17, symbol: "Cl", name: "Chlorine", atomicWeight: "35.45", category: "nonmetal", group: 17, period: 3, electronConfiguration: "[Ne] 3s² 3p⁵", state: "Gas", yearDiscovered: "1774" },
  { atomicNumber: 18, symbol: "Ar", name: "Argon", atomicWeight: "39.948", category: "noble gas", group: 18, period: 3, electronConfiguration: "[Ne] 3s² 3p⁶", state: "Gas", yearDiscovered: "1894" },

  // Period 4
  { atomicNumber: 19, symbol: "K", name: "Potassium", atomicWeight: "39.098", category: "alkali metal", group: 1, period: 4, electronConfiguration: "[Ar] 4s¹", state: "Solid", yearDiscovered: "1807" },
  { atomicNumber: 20, symbol: "Ca", name: "Calcium", atomicWeight: "40.078", category: "alkaline earth metal", group: 2, period: 4, electronConfiguration: "[Ar] 4s²", state: "Solid", yearDiscovered: "1808" },
  { atomicNumber: 21, symbol: "Sc", name: "Scandium", atomicWeight: "44.956", category: "transition metal", group: 3, period: 4, electronConfiguration: "[Ar] 3d¹ 4s²", state: "Solid", yearDiscovered: "1879" },
  { atomicNumber: 22, symbol: "Ti", name: "Titanium", atomicWeight: "47.867", category: "transition metal", group: 4, period: 4, electronConfiguration: "[Ar] 3d² 4s²", state: "Solid", yearDiscovered: "1791" },
  { atomicNumber: 23, symbol: "V", name: "Vanadium", atomicWeight: "50.942", category: "transition metal", group: 5, period: 4, electronConfiguration: "[Ar] 3d³ 4s²", state: "Solid", yearDiscovered: "1801" },
  { atomicNumber: 24, symbol: "Cr", name: "Chromium", atomicWeight: "51.996", category: "transition metal", group: 6, period: 4, electronConfiguration: "[Ar] 3d⁵ 4s¹", state: "Solid", yearDiscovered: "1797" },
  { atomicNumber: 25, symbol: "Mn", name: "Manganese", atomicWeight: "54.938", category: "transition metal", group: 7, period: 4, electronConfiguration: "[Ar] 3d⁵ 4s²", state: "Solid", yearDiscovered: "1774" },
  { atomicNumber: 26, symbol: "Fe", name: "Iron", atomicWeight: "55.845", category: "transition metal", group: 8, period: 4, electronConfiguration: "[Ar] 3d⁶ 4s²", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 27, symbol: "Co", name: "Cobalt", atomicWeight: "58.933", category: "transition metal", group: 9, period: 4, electronConfiguration: "[Ar] 3d⁷ 4s²", state: "Solid", yearDiscovered: "1735" },
  { atomicNumber: 28, symbol: "Ni", name: "Nickel", atomicWeight: "58.693", category: "transition metal", group: 10, period: 4, electronConfiguration: "[Ar] 3d⁸ 4s²", state: "Solid", yearDiscovered: "1751" },
  { atomicNumber: 29, symbol: "Cu", name: "Copper", atomicWeight: "63.546", category: "transition metal", group: 11, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s¹", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 30, symbol: "Zn", name: "Zinc", atomicWeight: "65.38", category: "transition metal", group: 12, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s²", state: "Solid", yearDiscovered: "1746" },
  { atomicNumber: 31, symbol: "Ga", name: "Gallium", atomicWeight: "69.723", category: "post-transition metal", group: 13, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p¹", state: "Solid", yearDiscovered: "1875" },
  { atomicNumber: 32, symbol: "Ge", name: "Germanium", atomicWeight: "72.630", category: "metalloid", group: 14, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p²", state: "Solid", yearDiscovered: "1886" },
  { atomicNumber: 33, symbol: "As", name: "Arsenic", atomicWeight: "74.922", category: "metalloid", group: 15, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p³", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 34, symbol: "Se", name: "Selenium", atomicWeight: "78.971", category: "nonmetal", group: 16, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p⁴", state: "Solid", yearDiscovered: "1817" },
  { atomicNumber: 35, symbol: "Br", name: "Bromine", atomicWeight: "79.904", category: "nonmetal", group: 17, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p⁵", state: "Liquid", yearDiscovered: "1826" },
  { atomicNumber: 36, symbol: "Kr", name: "Krypton", atomicWeight: "83.798", category: "noble gas", group: 18, period: 4, electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p⁶", state: "Gas", yearDiscovered: "1898" },

  // Period 5
  { atomicNumber: 37, symbol: "Rb", name: "Rubidium", atomicWeight: "85.468", category: "alkali metal", group: 1, period: 5, electronConfiguration: "[Kr] 5s¹", state: "Solid", yearDiscovered: "1861" },
  { atomicNumber: 38, symbol: "Sr", name: "Strontium", atomicWeight: "87.62", category: "alkaline earth metal", group: 2, period: 5, electronConfiguration: "[Kr] 5s²", state: "Solid", yearDiscovered: "1790" },
  { atomicNumber: 39, symbol: "Y", name: "Yttrium", atomicWeight: "88.906", category: "transition metal", group: 3, period: 5, electronConfiguration: "[Kr] 4d¹ 5s²", state: "Solid", yearDiscovered: "1794" },
  { atomicNumber: 40, symbol: "Zr", name: "Zirconium", atomicWeight: "91.224", category: "transition metal", group: 4, period: 5, electronConfiguration: "[Kr] 4d² 5s²", state: "Solid", yearDiscovered: "1789" },
  { atomicNumber: 41, symbol: "Nb", name: "Niobium", atomicWeight: "92.906", category: "transition metal", group: 5, period: 5, electronConfiguration: "[Kr] 4d⁴ 5s¹", state: "Solid", yearDiscovered: "1801" },
  { atomicNumber: 42, symbol: "Mo", name: "Molybdenum", atomicWeight: "95.95", category: "transition metal", group: 6, period: 5, electronConfiguration: "[Kr] 4d⁵ 5s¹", state: "Solid", yearDiscovered: "1781" },
  { atomicNumber: 43, symbol: "Tc", name: "Technetium", atomicWeight: "(98)", category: "transition metal", group: 7, period: 5, electronConfiguration: "[Kr] 4d⁵ 5s²", state: "Solid", yearDiscovered: "1937" },
  { atomicNumber: 44, symbol: "Ru", name: "Ruthenium", atomicWeight: "101.07", category: "transition metal", group: 8, period: 5, electronConfiguration: "[Kr] 4d⁷ 5s¹", state: "Solid", yearDiscovered: "1844" },
  { atomicNumber: 45, symbol: "Rh", name: "Rhodium", atomicWeight: "102.91", category: "transition metal", group: 9, period: 5, electronConfiguration: "[Kr] 4d⁸ 5s¹", state: "Solid", yearDiscovered: "1803" },
  { atomicNumber: 46, symbol: "Pd", name: "Palladium", atomicWeight: "106.42", category: "transition metal", group: 10, period: 5, electronConfiguration: "[Kr] 4d¹⁰", state: "Solid", yearDiscovered: "1803" },
  { atomicNumber: 47, symbol: "Ag", name: "Silver", atomicWeight: "107.87", category: "transition metal", group: 11, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s¹", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 48, symbol: "Cd", name: "Cadmium", atomicWeight: "112.41", category: "transition metal", group: 12, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s²", state: "Solid", yearDiscovered: "1817" },
  { atomicNumber: 49, symbol: "In", name: "Indium", atomicWeight: "114.82", category: "post-transition metal", group: 13, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p¹", state: "Solid", yearDiscovered: "1863" },
  { atomicNumber: 50, symbol: "Sn", name: "Tin", atomicWeight: "118.71", category: "post-transition metal", group: 14, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p²", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 51, symbol: "Sb", name: "Antimony", atomicWeight: "121.76", category: "metalloid", group: 15, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p³", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 52, symbol: "Te", name: "Tellurium", atomicWeight: "127.60", category: "metalloid", group: 16, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p⁴", state: "Solid", yearDiscovered: "1783" },
  { atomicNumber: 53, symbol: "I", name: "Iodine", atomicWeight: "126.90", category: "nonmetal", group: 17, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p⁵", state: "Solid", yearDiscovered: "1811" },
  { atomicNumber: 54, symbol: "Xe", name: "Xenon", atomicWeight: "131.29", category: "noble gas", group: 18, period: 5, electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p⁶", state: "Gas", yearDiscovered: "1898" },

  // Period 6
  { atomicNumber: 55, symbol: "Cs", name: "Cesium", atomicWeight: "132.91", category: "alkali metal", group: 1, period: 6, electronConfiguration: "[Xe] 6s¹", state: "Solid", yearDiscovered: "1860" },
  { atomicNumber: 56, symbol: "Ba", name: "Barium", atomicWeight: "137.33", category: "alkaline earth metal", group: 2, period: 6, electronConfiguration: "[Xe] 6s²", state: "Solid", yearDiscovered: "1808" },
  // Lanthanides (57-71)
  { atomicNumber: 57, symbol: "La", name: "Lanthanum", atomicWeight: "138.91", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 5d¹ 6s²", state: "Solid", yearDiscovered: "1839" },
  { atomicNumber: 58, symbol: "Ce", name: "Cerium", atomicWeight: "140.12", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹ 5d¹ 6s²", state: "Solid", yearDiscovered: "1803" },
  { atomicNumber: 59, symbol: "Pr", name: "Praseodymium", atomicWeight: "140.91", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f³ 6s²", state: "Solid", yearDiscovered: "1885" },
  { atomicNumber: 60, symbol: "Nd", name: "Neodymium", atomicWeight: "144.24", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f⁴ 6s²", state: "Solid", yearDiscovered: "1885" },
  { atomicNumber: 61, symbol: "Pm", name: "Promethium", atomicWeight: "(145)", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f⁵ 6s²", state: "Solid", yearDiscovered: "1945" },
  { atomicNumber: 62, symbol: "Sm", name: "Samarium", atomicWeight: "150.36", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f⁶ 6s²", state: "Solid", yearDiscovered: "1879" },
  { atomicNumber: 63, symbol: "Eu", name: "Europium", atomicWeight: "151.96", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f⁷ 6s²", state: "Solid", yearDiscovered: "1901" },
  { atomicNumber: 64, symbol: "Gd", name: "Gadolinium", atomicWeight: "157.25", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f⁷ 5d¹ 6s²", state: "Solid", yearDiscovered: "1880" },
  { atomicNumber: 65, symbol: "Tb", name: "Terbium", atomicWeight: "158.93", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f⁹ 6s²", state: "Solid", yearDiscovered: "1843" },
  { atomicNumber: 66, symbol: "Dy", name: "Dysprosium", atomicWeight: "162.50", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹⁰ 6s²", state: "Solid", yearDiscovered: "1886" },
  { atomicNumber: 67, symbol: "Ho", name: "Holmium", atomicWeight: "164.93", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹¹ 6s²", state: "Solid", yearDiscovered: "1878" },
  { atomicNumber: 68, symbol: "Er", name: "Erbium", atomicWeight: "167.26", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹² 6s²", state: "Solid", yearDiscovered: "1843" },
  { atomicNumber: 69, symbol: "Tm", name: "Thulium", atomicWeight: "168.93", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹³ 6s²", state: "Solid", yearDiscovered: "1879" },
  { atomicNumber: 70, symbol: "Yb", name: "Ytterbium", atomicWeight: "173.05", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 6s²", state: "Solid", yearDiscovered: "1878" },
  { atomicNumber: 71, symbol: "Lu", name: "Lutetium", atomicWeight: "174.97", category: "lanthanide", group: 3, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹ 6s²", state: "Solid", yearDiscovered: "1907" },
  // Continue Period 6
  { atomicNumber: 72, symbol: "Hf", name: "Hafnium", atomicWeight: "178.49", category: "transition metal", group: 4, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d² 6s²", state: "Solid", yearDiscovered: "1923" },
  { atomicNumber: 73, symbol: "Ta", name: "Tantalum", atomicWeight: "180.95", category: "transition metal", group: 5, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d³ 6s²", state: "Solid", yearDiscovered: "1802" },
  { atomicNumber: 74, symbol: "W", name: "Tungsten", atomicWeight: "183.84", category: "transition metal", group: 6, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d⁴ 6s²", state: "Solid", yearDiscovered: "1783" },
  { atomicNumber: 75, symbol: "Re", name: "Rhenium", atomicWeight: "186.21", category: "transition metal", group: 7, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d⁵ 6s²", state: "Solid", yearDiscovered: "1925" },
  { atomicNumber: 76, symbol: "Os", name: "Osmium", atomicWeight: "190.23", category: "transition metal", group: 8, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d⁶ 6s²", state: "Solid", yearDiscovered: "1803" },
  { atomicNumber: 77, symbol: "Ir", name: "Iridium", atomicWeight: "192.22", category: "transition metal", group: 9, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d⁷ 6s²", state: "Solid", yearDiscovered: "1803" },
  { atomicNumber: 78, symbol: "Pt", name: "Platinum", atomicWeight: "195.08", category: "transition metal", group: 10, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d⁹ 6s¹", state: "Solid", yearDiscovered: "1735" },
  { atomicNumber: 79, symbol: "Au", name: "Gold", atomicWeight: "196.97", category: "transition metal", group: 11, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 80, symbol: "Hg", name: "Mercury", atomicWeight: "200.59", category: "transition metal", group: 12, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", state: "Liquid", yearDiscovered: "Ancient" },
  { atomicNumber: 81, symbol: "Tl", name: "Thallium", atomicWeight: "204.38", category: "post-transition metal", group: 13, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", state: "Solid", yearDiscovered: "1861" },
  { atomicNumber: 82, symbol: "Pb", name: "Lead", atomicWeight: "207.2", category: "post-transition metal", group: 14, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", state: "Solid", yearDiscovered: "Ancient" },
  { atomicNumber: 83, symbol: "Bi", name: "Bismuth", atomicWeight: "208.98", category: "post-transition metal", group: 15, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", state: "Solid", yearDiscovered: "1753" },
  { atomicNumber: 84, symbol: "Po", name: "Polonium", atomicWeight: "(209)", category: "metalloid", group: 16, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", state: "Solid", yearDiscovered: "1898" },
  { atomicNumber: 85, symbol: "At", name: "Astatine", atomicWeight: "(210)", category: "nonmetal", group: 17, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", state: "Solid", yearDiscovered: "1940" },
  { atomicNumber: 86, symbol: "Rn", name: "Radon", atomicWeight: "(222)", category: "noble gas", group: 18, period: 6, electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", state: "Gas", yearDiscovered: "1900" },

  // Period 7
  { atomicNumber: 87, symbol: "Fr", name: "Francium", atomicWeight: "(223)", category: "alkali metal", group: 1, period: 7, electronConfiguration: "[Rn] 7s¹", state: "Solid", yearDiscovered: "1939" },
  { atomicNumber: 88, symbol: "Ra", name: "Radium", atomicWeight: "(226)", category: "alkaline earth metal", group: 2, period: 7, electronConfiguration: "[Rn] 7s²", state: "Solid", yearDiscovered: "1898" },
  // Actinides (89-103)
  { atomicNumber: 89, symbol: "Ac", name: "Actinium", atomicWeight: "(227)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 6d¹ 7s²", state: "Solid", yearDiscovered: "1899" },
  { atomicNumber: 90, symbol: "Th", name: "Thorium", atomicWeight: "232.04", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 6d² 7s²", state: "Solid", yearDiscovered: "1829" },
  { atomicNumber: 91, symbol: "Pa", name: "Protactinium", atomicWeight: "231.04", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f² 6d¹ 7s²", state: "Solid", yearDiscovered: "1913" },
  { atomicNumber: 92, symbol: "U", name: "Uranium", atomicWeight: "238.03", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f³ 6d¹ 7s²", state: "Solid", yearDiscovered: "1789" },
  { atomicNumber: 93, symbol: "Np", name: "Neptunium", atomicWeight: "(237)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f⁴ 6d¹ 7s²", state: "Solid", yearDiscovered: "1940" },
  { atomicNumber: 94, symbol: "Pu", name: "Plutonium", atomicWeight: "(244)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f⁶ 7s²", state: "Solid", yearDiscovered: "1940" },
  { atomicNumber: 95, symbol: "Am", name: "Americium", atomicWeight: "(243)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f⁷ 7s²", state: "Solid", yearDiscovered: "1944" },
  { atomicNumber: 96, symbol: "Cm", name: "Curium", atomicWeight: "(247)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f⁷ 6d¹ 7s²", state: "Solid", yearDiscovered: "1944" },
  { atomicNumber: 97, symbol: "Bk", name: "Berkelium", atomicWeight: "(247)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f⁹ 7s²", state: "Solid", yearDiscovered: "1949" },
  { atomicNumber: 98, symbol: "Cf", name: "Californium", atomicWeight: "(251)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f¹⁰ 7s²", state: "Solid", yearDiscovered: "1950" },
  { atomicNumber: 99, symbol: "Es", name: "Einsteinium", atomicWeight: "(252)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f¹¹ 7s²", state: "Solid", yearDiscovered: "1952" },
  { atomicNumber: 100, symbol: "Fm", name: "Fermium", atomicWeight: "(257)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f¹² 7s²", state: "Solid", yearDiscovered: "1952" },
  { atomicNumber: 101, symbol: "Md", name: "Mendelevium", atomicWeight: "(258)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f¹³ 7s²", state: "Solid", yearDiscovered: "1955" },
  { atomicNumber: 102, symbol: "No", name: "Nobelium", atomicWeight: "(259)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 7s²", state: "Solid", yearDiscovered: "1958" },
  { atomicNumber: 103, symbol: "Lr", name: "Lawrencium", atomicWeight: "(266)", category: "actinide", group: 3, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 7s² 7p¹", state: "Solid", yearDiscovered: "1961" },
  // Continue Period 7
  { atomicNumber: 104, symbol: "Rf", name: "Rutherfordium", atomicWeight: "(267)", category: "transition metal", group: 4, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d² 7s²", state: "Solid", yearDiscovered: "1969" },
  { atomicNumber: 105, symbol: "Db", name: "Dubnium", atomicWeight: "(268)", category: "transition metal", group: 5, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d³ 7s²", state: "Solid", yearDiscovered: "1970" },
  { atomicNumber: 106, symbol: "Sg", name: "Seaborgium", atomicWeight: "(269)", category: "transition metal", group: 6, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d⁴ 7s²", state: "Solid", yearDiscovered: "1974" },
  { atomicNumber: 107, symbol: "Bh", name: "Bohrium", atomicWeight: "(270)", category: "transition metal", group: 7, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d⁵ 7s²", state: "Solid", yearDiscovered: "1981" },
  { atomicNumber: 108, symbol: "Hs", name: "Hassium", atomicWeight: "(277)", category: "transition metal", group: 8, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d⁶ 7s²", state: "Solid", yearDiscovered: "1984" },
  { atomicNumber: 109, symbol: "Mt", name: "Meitnerium", atomicWeight: "(278)", category: "unknown", group: 9, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d⁷ 7s²", state: "Solid", yearDiscovered: "1982" },
  { atomicNumber: 110, symbol: "Ds", name: "Darmstadtium", atomicWeight: "(281)", category: "unknown", group: 10, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d⁸ 7s²", state: "Solid", yearDiscovered: "1994" },
  { atomicNumber: 111, symbol: "Rg", name: "Roentgenium", atomicWeight: "(282)", category: "unknown", group: 11, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d⁹ 7s²", state: "Solid", yearDiscovered: "1994" },
  { atomicNumber: 112, symbol: "Cn", name: "Copernicium", atomicWeight: "(285)", category: "transition metal", group: 12, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", state: "Liquid", yearDiscovered: "1996" },
  { atomicNumber: 113, symbol: "Nh", name: "Nihonium", atomicWeight: "(286)", category: "unknown", group: 13, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", state: "Solid", yearDiscovered: "2004" },
  { atomicNumber: 114, symbol: "Fl", name: "Flerovium", atomicWeight: "(289)", category: "unknown", group: 14, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", state: "Solid", yearDiscovered: "1998" },
  { atomicNumber: 115, symbol: "Mc", name: "Moscovium", atomicWeight: "(290)", category: "unknown", group: 15, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", state: "Solid", yearDiscovered: "2003" },
  { atomicNumber: 116, symbol: "Lv", name: "Livermorium", atomicWeight: "(293)", category: "unknown", group: 16, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", state: "Solid", yearDiscovered: "2000" },
  { atomicNumber: 117, symbol: "Ts", name: "Tennessine", atomicWeight: "(294)", category: "unknown", group: 17, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", state: "Solid", yearDiscovered: "2010" },
  { atomicNumber: 118, symbol: "Og", name: "Oganesson", atomicWeight: "(294)", category: "noble gas", group: 18, period: 7, electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", state: "Gas", yearDiscovered: "2006" },
];
