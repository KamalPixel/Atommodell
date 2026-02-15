import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface BohrModelProps {
  element: {
    atomicNumber: number;
    symbol: string;
    name: string;
    category: string;
  } | null;
}

const BohrModel: React.FC<BohrModelProps> = ({ element }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
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

  useEffect(() => {
    if (!containerRef.current) return;

    // Remove existing sketch
    if (sketchRef.current) {
      sketchRef.current.remove();
    }

    const sketch = new p5((p: p5) => {
      let animationAngle = 0;
      let canvasSize = 0;

      const getElectronShells = (atomicNumber: number): number[] => {
        const shells: number[] = [];
        const config = [2, 8, 18, 32, 32, 18, 8];
        let remaining = atomicNumber;
        for (let i = 0; i < config.length && remaining > 0; i++) {
          const electrons = Math.min(remaining, config[i]);
          shells.push(electrons);
          remaining -= electrons;
        }
        return shells;
      };

      p.setup = () => {
        // Get container size and make it square
        const containerWidth = containerRef.current?.clientWidth || 200;
        const containerHeight = containerRef.current?.clientHeight || 200;
        canvasSize = Math.min(containerWidth, containerHeight);

        const canvas = p.createCanvas(canvasSize, canvasSize);
        canvas.parent(containerRef.current!);

        // High DPI support
        p.pixelDensity(window.devicePixelRatio || 1);
      };

      p.windowResized = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        canvasSize = Math.min(containerWidth, containerHeight);
        p.resizeCanvas(canvasSize, canvasSize);
      };

      p.draw = () => {
        // Clear with transparent background
        p.clear();

        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        const maxRadius = canvasSize * 0.4;

        if (!element) {
          // Draw placeholder
          p.fill(40, 40, 50, 150);
          p.noStroke();
          p.circle(centerX, centerY, canvasSize * 0.8);

          p.fill(100);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(14);
          p.text('Velg et grunnstoff', centerX, centerY);
          return;
        }

        const shells = getElectronShells(element.atomicNumber);
        const categoryColor = getCategoryColor(element.category);
        const color = p.color(categoryColor);

        // Draw outer glow
        p.drawingContext.shadowBlur = 30;
        p.drawingContext.shadowColor = categoryColor;
        p.fill(20, 20, 30, 200);
        p.stroke(p.red(color), p.green(color), p.blue(color), 50);
        p.strokeWeight(2);
        p.circle(centerX, centerY, canvasSize * 0.85);
        p.drawingContext.shadowBlur = 0;

        // Draw electron shells (orbits)
        shells.forEach((_, shellIndex) => {
          const shellRadius = 20 + (shellIndex + 1) * ((maxRadius - 20) / shells.length);

          // Orbit ring with gradient effect
          p.noFill();
          p.stroke(p.red(color), p.green(color), p.blue(color), 40 + shellIndex * 15);
          p.strokeWeight(1.5);
          p.circle(centerX, centerY, shellRadius * 2);
        });

        // Draw nucleus with glow
        const nucleusSize = Math.min(35, 15 + element.atomicNumber * 0.15);

        // Nucleus outer glow
        p.drawingContext.shadowBlur = 20;
        p.drawingContext.shadowColor = categoryColor;
        p.fill(color);
        p.noStroke();
        p.circle(centerX, centerY, nucleusSize);

        // Nucleus inner highlight
        p.drawingContext.shadowBlur = 0;
        p.fill(255, 255, 255, 80);
        p.circle(centerX - nucleusSize * 0.15, centerY - nucleusSize * 0.15, nucleusSize * 0.4);

        // Draw electrons
        shells.forEach((electronCount, shellIndex) => {
          const shellRadius = 20 + (shellIndex + 1) * ((maxRadius - 20) / shells.length);
          const speed = 1 - shellIndex * 0.15; // Outer shells move slower

          for (let i = 0; i < electronCount; i++) {
            const angle = animationAngle * speed + (i * p.TWO_PI / electronCount) + shellIndex * 0.5;
            const electronX = centerX + Math.cos(angle) * shellRadius;
            const electronY = centerY + Math.sin(angle) * shellRadius;

            // Electron trail/glow
            p.drawingContext.shadowBlur = 12;
            p.drawingContext.shadowColor = '#00FFFF';

            // Electron outer glow
            p.fill(0, 255, 255, 60);
            p.noStroke();
            p.circle(electronX, electronY, 12);

            // Electron core
            p.fill(0, 255, 255);
            p.circle(electronX, electronY, 6);

            // Electron highlight
            p.fill(255, 255, 255, 200);
            p.circle(electronX - 1, electronY - 1, 2);

            p.drawingContext.shadowBlur = 0;
          }
        });

        // Draw element symbol
        p.fill(255);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textStyle(p.BOLD);
        p.textSize(Math.min(18, nucleusSize * 0.7));
        p.text(element.symbol, centerX, centerY);
        p.textStyle(p.NORMAL);

        // Draw element name below
        p.fill(200);
        p.textSize(12);
        p.text(element.name, centerX, centerY + maxRadius + 25);

        // Draw atomic number
        p.fill(p.red(color), p.green(color), p.blue(color));
        p.textSize(10);
        p.text(`#${element.atomicNumber}`, centerX, centerY + maxRadius + 40);

        animationAngle += 0.02;
      };
    });

    sketchRef.current = sketch;

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [element]);

  // Handle resize with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (sketchRef.current) {
        // Trigger p5's windowResized
        sketchRef.current.windowResized();
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[200px] flex items-center justify-center"
    />
  );
};

export default BohrModel;
