import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { elementData } from '../data/elementData';
import { Card, CardContent } from './ui/card';
import BohrModel from './BohrModel';

interface SelectedElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicWeight: string;
  category: string;
  electronConfiguration: string;
  state: string;
  yearDiscovered: string;
}

const PeriodicTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setDimensions({
          width: width,
          height: Math.min(600, width * 0.55),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0) return;

    if (sketchRef.current) {
      sketchRef.current.remove();
    }

    const sketch = new p5((p: p5) => {
      // Responsive configuration
      const tableWidth = dimensions.width - 20;
      const cellSize = Math.max(16, Math.min(35, tableWidth / 20));
      const padding = Math.max(1, cellSize * 0.06);
      const tablePadding = Math.max(5, cellSize * 0.5);
      const fontSize = Math.max(6, cellSize * 0.3);
      let hoveredElement: typeof elementData[0] | null = null;

      const canvasWidth = dimensions.width;
      const canvasHeight = dimensions.height;

      const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
          'alkali metal': '#FF5A8C',
          'alkaline earth metal': '#FFC300',
          'transition metal': '#00EAFF',
          'post-transition metal': '#9B87F5',
          'metalloid': '#7E69AB',
          'nonmetal': '#6E59A5',
          'noble gas': '#1EAEDB',
          'lanthanide': '#8B5CF6',
          'actinide': '#0EA5E9',
          'unknown': '#403E43',
        };
        return colors[category] || '#403E43';
      };

      const getElementPosition = (element: typeof elementData[0]) => {
        let x: number;
        let y: number;

        if (element.category === 'lanthanide') {
          const lanthanideIndex = element.atomicNumber - 57;
          x = (lanthanideIndex + 3) * (cellSize + padding) + tablePadding;
          y = 8.5 * (cellSize + padding) + tablePadding;
        } else if (element.category === 'actinide') {
          const actinideIndex = element.atomicNumber - 89;
          x = (actinideIndex + 3) * (cellSize + padding) + tablePadding;
          y = 9.5 * (cellSize + padding) + tablePadding;
        } else {
          x = element.group * (cellSize + padding) + tablePadding;
          y = element.period * (cellSize + padding) + tablePadding;
        }

        return { x, y };
      };

      p.setup = () => {
        const canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent(containerRef.current!);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Inter, system-ui, sans-serif');
        p.pixelDensity(window.devicePixelRatio || 1);
      };

      p.draw = () => {
        p.background('#0a0a0f');

        // Draw subtle animated grid
        p.stroke(30, 35, 50, 40);
        p.strokeWeight(0.5);
        const gridSize = cellSize;
        for (let x = 0; x < canvasWidth; x += gridSize) {
          p.line(x, 0, x, canvasHeight);
        }
        for (let y = 0; y < canvasHeight; y += gridSize) {
          p.line(0, y, canvasWidth, y);
        }

        // Draw all elements
        elementData.forEach((element) => {
          const { x, y } = getElementPosition(element);
          const isHovered = hoveredElement?.atomicNumber === element.atomicNumber;

          const cellColor = p.color(getCategoryColor(element.category));

          if (isHovered) {
            // Hovered state - bright with glow
            p.drawingContext.shadowBlur = 20;
            p.drawingContext.shadowColor = getCategoryColor(element.category);

            p.fill(p.red(cellColor), p.green(cellColor), p.blue(cellColor), 255);
            p.stroke('#00FFFF');
            p.strokeWeight(2);

            // Scale effect - draw slightly larger
            const scale = 1.1;
            const scaledSize = cellSize * scale;
            const offset = (scaledSize - cellSize) / 2;
            p.rect(x - offset, y - offset, scaledSize, scaledSize, 4);

            p.drawingContext.shadowBlur = 0;
          } else {
            p.fill(p.red(cellColor), p.green(cellColor), p.blue(cellColor), 160);
            p.stroke(255, 30);
            p.strokeWeight(0.5);
            p.rect(x, y, cellSize, cellSize, 3);
          }

          // Element content
          p.noStroke();
          p.fill(255);

          // Atomic number (top left)
          p.textSize(Math.max(5, fontSize * 0.6));
          p.textAlign(p.LEFT, p.TOP);
          p.text(element.atomicNumber.toString(), x + 2, y + 1);

          // Symbol (center)
          p.textSize(fontSize * 1.2);
          p.textStyle(p.BOLD);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(element.symbol, x + cellSize / 2, y + cellSize / 2);

          // Name (bottom) - only show if cell is big enough
          if (cellSize > 24) {
            p.textStyle(p.NORMAL);
            p.textSize(Math.max(4, fontSize * 0.5));
            const displayName = element.name.length > 7
              ? element.name.substring(0, 6) + '.'
              : element.name;
            p.text(displayName, x + cellSize / 2, y + cellSize - 4);
          }

          p.textStyle(p.NORMAL);
          p.textAlign(p.CENTER, p.CENTER);
        });

        // Draw lanthanide/actinide labels
        if (cellSize > 20) {
          p.fill(150);
          p.textSize(fontSize * 0.8);
          p.textAlign(p.RIGHT, p.CENTER);
          p.text('La-Lu', 2.8 * (cellSize + padding) + tablePadding, 8.5 * (cellSize + padding) + tablePadding + cellSize / 2);
          p.text('Ac-Lr', 2.8 * (cellSize + padding) + tablePadding, 9.5 * (cellSize + padding) + tablePadding + cellSize / 2);
        }
      };

      p.mouseMoved = () => {
        hoveredElement = null;

        for (const element of elementData) {
          const { x, y } = getElementPosition(element);

          if (
            p.mouseX > x &&
            p.mouseX < x + cellSize &&
            p.mouseY > y &&
            p.mouseY < y + cellSize
          ) {
            hoveredElement = element;
            setSelectedElement({
              atomicNumber: element.atomicNumber,
              symbol: element.symbol,
              name: element.name,
              atomicWeight: element.atomicWeight,
              category: element.category,
              electronConfiguration: element.electronConfiguration,
              state: element.state,
              yearDiscovered: element.yearDiscovered,
            });
            break;
          }
        }

        if (!hoveredElement) {
          setSelectedElement(null);
        }
      };

      p.mousePressed = () => {
        // On mobile, tap to select
        for (const element of elementData) {
          const { x, y } = getElementPosition(element);

          if (
            p.mouseX > x &&
            p.mouseX < x + cellSize &&
            p.mouseY > y &&
            p.mouseY < y + cellSize
          ) {
            setSelectedElement({
              atomicNumber: element.atomicNumber,
              symbol: element.symbol,
              name: element.name,
              atomicWeight: element.atomicWeight,
              category: element.category,
              electronConfiguration: element.electronConfiguration,
              state: element.state,
              yearDiscovered: element.yearDiscovered,
            });
            break;
          }
        }
      };
    });

    sketchRef.current = sketch;

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [dimensions]);

  const translateCategory = (category: string): string => {
    const translations: Record<string, string> = {
      'alkali metal': 'Alkalimetall',
      'alkaline earth metal': 'Jordalkalimetall',
      'transition metal': 'Overgangsmetall',
      'post-transition metal': 'Post-overgangsmetall',
      'metalloid': 'Halvmetall',
      'nonmetal': 'Ikke-metall',
      'noble gas': 'Edelgass',
      'lanthanide': 'Lantanid',
      'actinide': 'Aktinid',
      'unknown': 'Ukjent',
    };
    return translations[category] || category;
  };

  const translateState = (state: string): string => {
    const translations: Record<string, string> = {
      Solid: 'Fast',
      Liquid: 'Flytende',
      Gas: 'Gass',
    };
    return translations[state] || state;
  };

  const getCategoryColorClass = (category: string): string => {
    const colors: Record<string, string> = {
      'alkali metal': 'bg-pink-500',
      'alkaline earth metal': 'bg-yellow-500',
      'transition metal': 'bg-cyan-500',
      'post-transition metal': 'bg-purple-500',
      'metalloid': 'bg-violet-500',
      'nonmetal': 'bg-indigo-500',
      'noble gas': 'bg-blue-500',
      'lanthanide': 'bg-fuchsia-500',
      'actinide': 'bg-sky-500',
      'unknown': 'bg-gray-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main layout: Table + Bohr Model */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Periodic Table Canvas */}
        <div className="flex-1 min-w-0">
          <div
            ref={containerRef}
            className="w-full border border-cyan-400/20 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10 backdrop-blur-sm bg-gray-900/50 transition-shadow duration-300 hover:shadow-cyan-500/20"
            style={{ minHeight: '300px' }}
          />
        </div>

        {/* Bohr Model - Sticky on desktop */}
        <div className="lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-4 h-fit">
            <Card className="bg-gray-900/80 border-cyan-400/20 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3 text-center">
                  Atommodell
                </h3>
                <div className="aspect-square w-full max-w-[280px] mx-auto">
                  <BohrModel
                    element={
                      selectedElement
                        ? {
                            atomicNumber: selectedElement.atomicNumber,
                            symbol: selectedElement.symbol,
                            name: selectedElement.name,
                            category: selectedElement.category,
                          }
                        : null
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Element Details Card */}
      {selectedElement ? (
        <Card className="bg-gray-800/80 border-cyan-400/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Element Symbol and Name */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 ${getCategoryColorClass(
                    selectedElement.category
                  )}`}
                >
                  <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                    {selectedElement.symbol}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {selectedElement.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Atomnummer {selectedElement.atomicNumber}
                  </p>
                  <p className="text-xs text-cyan-400 font-medium">
                    {translateCategory(selectedElement.category)}
                  </p>
                </div>
              </div>

              {/* Element Properties Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 flex-1">
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/50 transition-colors hover:border-cyan-400/30">
                  <p className="text-xs text-gray-500 mb-1">Atomvekt</p>
                  <p className="text-sm md:text-base text-white font-medium">
                    {selectedElement.atomicWeight}
                  </p>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/50 transition-colors hover:border-cyan-400/30">
                  <p className="text-xs text-gray-500 mb-1">Tilstand</p>
                  <p className="text-sm md:text-base text-white font-medium">
                    {translateState(selectedElement.state)}
                  </p>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/50 transition-colors hover:border-cyan-400/30">
                  <p className="text-xs text-gray-500 mb-1">Oppdaget</p>
                  <p className="text-sm md:text-base text-white font-medium">
                    {selectedElement.yearDiscovered}
                  </p>
                </div>
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/50 col-span-2 md:col-span-1 transition-colors hover:border-cyan-400/30">
                  <p className="text-xs text-gray-500 mb-1">Elektronkonfigurasjon</p>
                  <p className="text-sm md:text-base text-cyan-400 font-mono truncate">
                    {selectedElement.electronConfiguration}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-800/50 border-cyan-400/20 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-gray-400 text-sm">
              Hold musepekeren over eller trykk på et grunnstoff for å se detaljer
            </p>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800/50">
        {[
          { name: 'Alkalimetall', color: 'bg-pink-500' },
          { name: 'Jordalkalimetall', color: 'bg-yellow-500' },
          { name: 'Overgangsmetall', color: 'bg-cyan-500' },
          { name: 'Post-overg.', color: 'bg-purple-500' },
          { name: 'Halvmetall', color: 'bg-violet-500' },
          { name: 'Ikke-metall', color: 'bg-indigo-500' },
          { name: 'Edelgass', color: 'bg-blue-500' },
          { name: 'Lantanid', color: 'bg-fuchsia-500' },
          { name: 'Aktinid', color: 'bg-sky-500' },
        ].map((cat) => (
          <div key={cat.name} className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-800/50 transition-colors cursor-default">
            <div className={`w-3 h-3 rounded-sm ${cat.color} shadow-sm`} />
            <span className="text-xs text-gray-400">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
