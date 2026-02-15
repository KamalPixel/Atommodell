import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { elementData } from '../data/elementData';
import { Card, CardContent } from './ui/card';

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
      let animationAngle = 0;

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
      };

      p.draw = () => {
        p.background('#121212');

        // Draw subtle grid
        p.stroke(40, 40, 50, 30);
        p.strokeWeight(0.3);
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
            p.fill(p.red(cellColor), p.green(cellColor), p.blue(cellColor), 255);
            p.stroke('#00FFFF');
            p.strokeWeight(2);

            // Glow effect
            p.drawingContext.shadowBlur = 15;
            p.drawingContext.shadowColor = getCategoryColor(element.category);
          } else {
            p.fill(p.red(cellColor), p.green(cellColor), p.blue(cellColor), 180);
            p.stroke(255, 50);
            p.strokeWeight(0.5);
            p.drawingContext.shadowBlur = 0;
          }

          p.rect(x, y, cellSize, cellSize, 3);
          p.drawingContext.shadowBlur = 0;

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

        // Draw Bohr model animation when hovering
        if (hoveredElement) {
          const atomCenterX = canvasWidth - 80;
          const atomCenterY = 80;
          const maxRadius = 60;

          // Parse electron configuration to get electron shells
          const getElectronShells = (atomicNumber: number): number[] => {
            const shells: number[] = [];
            const config = [2, 8, 18, 32, 32, 18, 8]; // Max electrons per shell
            let remaining = atomicNumber;
            for (let i = 0; i < config.length && remaining > 0; i++) {
              const electrons = Math.min(remaining, config[i]);
              shells.push(electrons);
              remaining -= electrons;
            }
            return shells;
          };

          const shells = getElectronShells(hoveredElement.atomicNumber);
          const categoryColor = p.color(getCategoryColor(hoveredElement.category));

          // Draw semi-transparent background circle
          p.fill(20, 20, 30, 200);
          p.stroke(p.red(categoryColor), p.green(categoryColor), p.blue(categoryColor), 100);
          p.strokeWeight(2);
          p.circle(atomCenterX, atomCenterY, maxRadius * 2 + 20);

          // Draw nucleus
          p.fill(categoryColor);
          p.noStroke();
          const nucleusSize = Math.min(20, 8 + hoveredElement.atomicNumber * 0.1);
          p.circle(atomCenterX, atomCenterY, nucleusSize);

          // Draw nucleus glow
          p.drawingContext.shadowBlur = 15;
          p.drawingContext.shadowColor = getCategoryColor(hoveredElement.category);
          p.circle(atomCenterX, atomCenterY, nucleusSize);
          p.drawingContext.shadowBlur = 0;

          // Draw electron shells and electrons
          shells.forEach((electronCount, shellIndex) => {
            const shellRadius = 15 + (shellIndex + 1) * (maxRadius - 15) / shells.length;

            // Draw orbit path
            p.noFill();
            p.stroke(100, 100, 120, 80);
            p.strokeWeight(1);
            p.circle(atomCenterX, atomCenterY, shellRadius * 2);

            // Draw electrons on this shell
            for (let i = 0; i < electronCount; i++) {
              const angle = animationAngle * (1 + shellIndex * 0.3) + (i * p.TWO_PI / electronCount);
              const electronX = atomCenterX + Math.cos(angle) * shellRadius;
              const electronY = atomCenterY + Math.sin(angle) * shellRadius;

              // Electron glow
              p.fill(0, 255, 255, 100);
              p.noStroke();
              p.circle(electronX, electronY, 8);

              // Electron core
              p.fill(0, 255, 255);
              p.circle(electronX, electronY, 4);
            }
          });

          // Draw element symbol in center
          p.fill(255);
          p.textSize(10);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);
          p.text(hoveredElement.symbol, atomCenterX, atomCenterY);
          p.textStyle(p.NORMAL);

          animationAngle += 0.02;
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

  const getCategoryColor = (category: string): string => {
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
      {/* Periodic Table Canvas */}
      <div
        ref={containerRef}
        className="w-full border border-cyan-400/20 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10 backdrop-blur-sm bg-gray-900/50"
        style={{ minHeight: '300px' }}
      />

      {/* Element Details Card - Shows below on all screen sizes */}
      {selectedElement ? (
        <Card className="bg-gray-800/80 border-cyan-400/30 animate-in fade-in duration-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Element Symbol and Name */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center ${getCategoryColor(
                    selectedElement.category
                  )}`}
                >
                  <span className="text-2xl md:text-3xl font-bold text-white">
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
                  <p className="text-xs text-cyan-400">
                    {translateCategory(selectedElement.category)}
                  </p>
                </div>
              </div>

              {/* Element Properties Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 flex-1">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Atomvekt</p>
                  <p className="text-sm md:text-base text-white font-medium">
                    {selectedElement.atomicWeight}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Tilstand</p>
                  <p className="text-sm md:text-base text-white font-medium">
                    {translateState(selectedElement.state)}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Oppdaget</p>
                  <p className="text-sm md:text-base text-white font-medium">
                    {selectedElement.yearDiscovered}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 col-span-2 md:col-span-1">
                  <p className="text-xs text-gray-500">Elektronkonfigurasjon</p>
                  <p className="text-sm md:text-base text-cyan-400 font-mono truncate">
                    {selectedElement.electronConfiguration}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-800/50 border-cyan-400/20">
          <CardContent className="p-4 text-center">
            <p className="text-gray-400 text-sm">
              Hold musepekeren over eller trykk på et grunnstoff for å se detaljer
            </p>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
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
          <div key={cat.name} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded ${cat.color}`} />
            <span className="text-xs text-gray-400">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
