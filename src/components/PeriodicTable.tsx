import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { elementData } from '../data/elementData';
import { ScrollArea } from './ui/scroll-area';

const PeriodicTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up previous sketch if it exists
    if (sketchRef.current) {
      sketchRef.current.remove();
    }

    // Create new P5 sketch
    const sketch = new p5((p: p5) => {
      // Configuration
      const cellSize = 35; // Further reduced cell size
      const padding = 2;
      const tablePadding = 20;
      let selectedElement: any = null;
      let canvas: p5.Renderer;
      let canvasWidth = 0;
      let canvasHeight = 0;
      
      // Category colors updated for futuristic look
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
          'unknown': '#403E43'
        };
        
        return colors[category] || '#403E43';
      };
      
      // Calculate positions for each element
      const getElementPosition = (atomicNumber: number) => {
        const element = elementData.find(e => e.atomicNumber === atomicNumber);
        if (!element) return { x: 0, y: 0 };
        
        // Account for special positioning in periodic table
        let x = element.group * (cellSize + padding) + tablePadding;
        let y = element.period * (cellSize + padding) + tablePadding;
        
        // Adjust lanthanides and actinides to appear below main table
        if (element.category === 'lanthanide') {
          y = 8.5 * (cellSize + padding) + tablePadding;
          x = (element.atomicNumber - 56) * (cellSize + padding) + tablePadding + 2 * (cellSize + padding);
        } else if (element.category === 'actinide') {
          y = 9.5 * (cellSize + padding) + tablePadding;
          x = (element.atomicNumber - 88) * (cellSize + padding) + tablePadding + 2 * (cellSize + padding);
        }
        
        return { x, y };
      };

      p.setup = () => {
        // Create responsive canvas with optimal sizing for side-by-side layout
        canvasWidth = Math.min(1200, window.innerWidth - 40);
        canvasHeight = 550; // Reduced height to fit in viewport
        canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent(containerRef.current!);
        p.textAlign(p.CENTER, p.CENTER);
        p.ellipseMode(p.CENTER);
        
        // Set text rendering for better quality
        p.textFont('Inter, system-ui, sans-serif');
      };

      p.draw = () => {
        // Background with grid pattern
        p.background('#121212');
        
        // Draw subtle grid
        p.stroke(40, 40, 50, 50);
        p.strokeWeight(0.2);
        const gridSize = 20;
        for (let x = 0; x < canvasWidth; x += gridSize) {
          p.line(x, 0, x, canvasHeight);
        }
        for (let y = 0; y < canvasHeight; y += gridSize) {
          p.line(0, y, canvasWidth, y);
        }
        
        // Draw placeholder grid for complete periodic table
        drawPeriodicTableGrid();
        
        // Draw defined elements from elementData
        elementData.forEach(element => {
          const { x, y } = getElementPosition(element.atomicNumber);
          const isSelected = selectedElement === element;
          
          // Draw cell with glassmorphism effect
          let cellColor = p.color(getCategoryColor(element.category));
          
          if (isSelected) {
            p.fill(cellColor.levels[0], cellColor.levels[1], cellColor.levels[2], 230);
            p.stroke('#00FFFF');
            p.strokeWeight(2);
          } else {
            p.fill(cellColor.levels[0], cellColor.levels[1], cellColor.levels[2], 180);
            p.stroke(255, 70);
            p.strokeWeight(1);
          }
          
          // Cell with rounded corners and subtle glow
          if (isSelected) {
            // Draw glow effect for selected element
            p.noFill();
            p.stroke(cellColor.levels[0], cellColor.levels[1], cellColor.levels[2], 80);
            p.strokeWeight(6);
            p.rect(x, y, cellSize, cellSize, 5);
            
            p.stroke('#00FFFF');
            p.strokeWeight(2);
          }
          
          p.rect(x, y, cellSize, cellSize, 4);
          
          // Draw element content
          p.noStroke();
          p.fill(255);
          p.textSize(7);
          p.text(element.atomicNumber, x + 8, y + 8);
          p.textSize(12); // Reduced text size
          p.textStyle(p.BOLD);
          p.text(element.symbol, x + cellSize/2, y + cellSize/2);
          p.textStyle(p.NORMAL);
          p.textSize(5); // Reduced name text size
          p.text(element.name, x + cellSize/2, y + cellSize - 5);
        });
        
        // Draw element details and animation
        if (selectedElement) {
          // Position details panel on the right side instead of below
          drawElementDetails(selectedElement);
          
          // Position atom animation to the right side
          drawAtomAnimation(selectedElement);
        } else {
          // Draw legend when no element is selected
          drawLegend();
        }
      };
      
      // Draw a grid for the complete periodic table structure
      const drawPeriodicTableGrid = () => {
        p.stroke(40, 40, 50, 80);
        p.strokeWeight(0.5);
        p.fill(30, 30, 40, 40);
        
        // Draw placeholder cells for all elements (1-118)
        for (let period = 1; period <= 7; period++) {
          for (let group = 1; group <= 18; group++) {
            // Skip cells that would be empty in a standard periodic table
            if ((period === 1 && group > 1 && group < 18) || 
                (period <= 3 && group >= 3 && group <= 12)) {
              continue;
            }
            
            const x = group * (cellSize + padding) + tablePadding;
            const y = period * (cellSize + padding) + tablePadding;
            p.rect(x, y, cellSize, cellSize, 3);
          }
        }
        
        // Draw placeholder cells for lanthanides and actinides
        for (let i = 0; i < 15; i++) {
          // Lanthanides (period 6, inner transition metals)
          p.rect((i + 3) * (cellSize + padding) + tablePadding, 
                 8.5 * (cellSize + padding) + tablePadding, 
                 cellSize, cellSize, 3);
          
          // Actinides (period 7, inner transition metals)
          p.rect((i + 3) * (cellSize + padding) + tablePadding, 
                 9.5 * (cellSize + padding) + tablePadding, 
                 cellSize, cellSize, 3);
        }
      };
      
      // Draw element details panel - Redesigned for futuristic look
      const drawElementDetails = (element: any) => {
        // Position panel on the right side
        const panelX = canvasWidth - 320;
        const panelY = tablePadding;
        const panelWidth = 300;
        const panelHeight = 180;
        
        // Background with glassmorphism effect
        p.drawingContext.shadowBlur = 15;
        p.drawingContext.shadowColor = 'rgba(0, 200, 255, 0.2)';
        p.fill(20, 25, 40, 220);
        p.stroke(0, 200, 255, 80);
        p.strokeWeight(1);
        p.rect(panelX, panelY, panelWidth, panelHeight, 8);
        p.drawingContext.shadowBlur = 0;
        
        // Element info with improved typography
        p.noStroke();
        p.textAlign(p.LEFT, p.CENTER);
        
        // Element name and symbol with gradient
        let elementColor = p.color(getCategoryColor(element.category));
        p.fill(elementColor);
        p.textSize(22);
        p.textStyle(p.BOLD);
        p.text(`${element.name} (${element.symbol})`, panelX + 15, panelY + 25);
        
        // Draw horizontal separator line
        p.stroke(0, 200, 255, 40);
        p.strokeWeight(1);
        p.line(panelX + 15, panelY + 40, panelX + panelWidth - 15, panelY + 40);
        
        // Element details with modern styling
        p.noStroke();
        p.fill(200, 220, 255);
        p.textStyle(p.NORMAL);
        p.textSize(14);
        p.text(`Atomnummer: ${element.atomicNumber}`, panelX + 15, panelY + 55);
        p.text(`Atomvekt: ${element.atomicWeight}`, panelX + 15, panelY + 75);
        p.text(`Kategori: ${element.category}`, panelX + 15, panelY + 95);
        
        // Wrap elektronkonfigurasjon text if it's too long
        const elektronConfig = element.electronConfiguration;
        const maxWidth = panelWidth - 30; // Leave some padding
        const wrappedText = wrapText(p, elektronConfig, maxWidth, 14);
        p.text(`Elektronkonfigurasjon: ${wrappedText}`, panelX + 15, panelY + 115);
        
        p.text(`Tilstand ved romtemperatur: ${element.state}`, panelX + 15, panelY + 135);
        p.text(`Oppdaget: ${element.yearDiscovered}`, panelX + 15, panelY + 155);
        
        p.textAlign(p.CENTER, p.CENTER);
      };

      // Utility function to wrap text
      const wrapText = (p5Inst: p5, text: string, maxWidth: number, textSize: number) => {
        p5Inst.textSize(textSize);
        if (p5Inst.textWidth(text) <= maxWidth) return text;
        
        // If text is too long, truncate and add ellipsis
        let truncatedText = text;
        while (p5Inst.textWidth(truncatedText + '...') > maxWidth) {
          truncatedText = truncatedText.slice(0, -1);
        }
        return truncatedText + '...';
      };
      
      // Draw atom animation - Enhanced with futuristic styling
      const drawAtomAnimation = (element: any) => {
        // Position the atom animation to the right
        const centerX = canvasWidth - 170;
        const centerY = 300; // Positioned below the element details panel
        
        // Enhanced nucleus with glow effect
        p.drawingContext.shadowBlur = 20;
        p.drawingContext.shadowColor = getCategoryColor(element.category);
        p.fill(getCategoryColor(element.category));
        p.noStroke();
        p.ellipse(centerX, centerY, 40, 40);
        p.drawingContext.shadowBlur = 0;
        
        // Draw electron shells with glowing effect
        const shellCount = Math.min(4, Math.ceil(element.atomicNumber / 8));
        
        for (let shell = 1; shell <= shellCount; shell++) {
          const shellRadius = shell * 30; // Slightly reduced radius
          
          // Draw shell orbit with glowing cyan
          p.noFill();
          p.stroke(0, 200, 255, 40 + (20 / shell)); // Fade outer shells
          p.strokeWeight(1.5);
          p.ellipse(centerX, centerY, shellRadius * 2, shellRadius * 2);
          
          // Draw electrons with particle effect
          const electronsInShell = Math.min(shell * 8, element.atomicNumber - ((shell - 1) * 8));
          for (let e = 0; e < electronsInShell; e++) {
            const angle = (p.frameCount * 0.02 / shell) + (e * (p.TWO_PI / electronsInShell));
            const electronX = centerX + p.cos(angle) * shellRadius;
            const electronY = centerY + p.sin(angle) * shellRadius;
            
            // Glow effect for electrons
            p.drawingContext.shadowBlur = 8;
            p.drawingContext.shadowColor = 'rgba(0, 200, 255, 0.8)';
            p.fill(0, 200, 255);
            p.noStroke();
            p.ellipse(electronX, electronY, 8, 8);
            p.drawingContext.shadowBlur = 0;
            
            // Additional particle trail effect
            p.fill(0, 200, 255, 30);
            const trailLength = 5;
            for (let t = 1; t <= trailLength; t++) {
              const trailAngle = angle - (0.05 * t);
              const trailX = centerX + p.cos(trailAngle) * shellRadius;
              const trailY = centerY + p.sin(trailAngle) * shellRadius;
              p.ellipse(trailX, trailY, 8 - t, 8 - t);
            }
          }
        }
        
        // Add a title for the animation with futuristic style
        p.fill(0, 200, 255);
        p.textSize(16);
        p.textStyle(p.BOLD);
        p.text("ATOMSTRUKTUR", centerX, centerY - 100);
        
        // Add decorative lines
        p.stroke(0, 200, 255, 60);
        p.strokeWeight(1);
        p.line(centerX - 80, centerY - 100, centerX - 20, centerY - 100);
        p.line(centerX + 20, centerY - 100, centerX + 80, centerY - 100);
      };
      
      // Draw category legend - Moved to bottom right with futuristic design
      const drawLegend = () => {
        const legendX = canvasWidth - 200;
        const legendY = canvasHeight - 220;
        
        // Background with glassmorphism
        p.drawingContext.shadowBlur = 15;
        p.drawingContext.shadowColor = 'rgba(0, 200, 255, 0.2)';
        p.fill(20, 25, 40, 220);
        p.stroke(0, 200, 255, 80);
        p.strokeWeight(1);
        p.rect(legendX, legendY, 180, 200, 8);
        p.drawingContext.shadowBlur = 0;
        
        // Title with modern styling
        p.noStroke();
        p.fill(0, 200, 255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        p.textStyle(p.BOLD);
        p.text("GRUNNSTOFFKATEGORIER", legendX + 90, legendY + 20);
        
        // Draw separator line
        p.stroke(0, 200, 255, 40);
        p.strokeWeight(1);
        p.line(legendX + 20, legendY + 35, legendX + 160, legendY + 35);
        
        p.textAlign(p.LEFT, p.CENTER);
        p.textSize(12);
        p.textStyle(p.NORMAL);
        
        const categories = [
          { name: 'Alkalimetall', color: '#FF5A8C' },
          { name: 'Jordalkalimetall', color: '#FFC300' },
          { name: 'Overgangsmetall', color: '#00EAFF' },
          { name: 'Post-overgangsmetall', color: '#9B87F5' },
          { name: 'Halvmetall', color: '#7E69AB' },
          { name: 'Ikke-metall', color: '#6E59A5' },
          { name: 'Edelgass', color: '#1EAEDB' },
          { name: 'Lantanid', color: '#8B5CF6' },
          { name: 'Aktinid', color: '#0EA5E9' }
        ];
        
        categories.forEach((cat, i) => {
          const y = legendY + 50 + i * 18;
          
          // Colorful category boxes with glow
          p.fill(cat.color);
          p.stroke(255, 30);
          p.rect(legendX + 10, y - 6, 14, 14, 3);
          
          p.noStroke();
          p.fill(200, 220, 255);
          p.text(cat.name, legendX + 30, y);
        });
        
        p.textAlign(p.CENTER, p.CENTER);
      };
      
      // Mouse interaction
      p.mouseMoved = () => {
        selectedElement = null;
        
        elementData.forEach(element => {
          const { x, y } = getElementPosition(element.atomicNumber);
          
          if (
            p.mouseX > x && 
            p.mouseX < x + cellSize && 
            p.mouseY > y && 
            p.mouseY < y + cellSize
          ) {
            selectedElement = element;
          }
        });
      };
      
      // Handle window resize
      p.windowResized = () => {
        canvasWidth = Math.min(1200, window.innerWidth - 40);
        p.resizeCanvas(canvasWidth, canvasHeight);
      };
    });
    
    sketchRef.current = sketch;
    
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={containerRef} 
        className="w-full border border-cyan-400/20 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10 backdrop-blur-sm"
        style={{ height: "550px" }}
      ></div>
      <p className="text-sm text-cyan-400/80 mt-2 italic tracking-wide">
        Hold musepekeren over grunnstoffene for å se detaljer og atomstruktur
      </p>
    </div>
  );
};

export default PeriodicTable;
