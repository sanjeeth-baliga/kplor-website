import React, { useEffect, useRef } from 'react';

const GRID_SIZE = 160; // Distance between grid points
const NODE_RADIUS = 4;
const CONNECTION_OPACITY = 0.18;
const NODE_GLOW = 0.45;
const PULSE_SPEED = 1.2;
const JITTER = 18; // Random offset for organic look
const MOUSE_GLOW_RADIUS = 180; // px
const MOUSE_GLOW_INTENSITY = 1.2; // Multiplier for glow
const MOUSE_FADE_SPEED = 0.08; // How quickly the glow fades out

const NeuronGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; glow: number }>({ x: 0, y: 0, active: false, glow: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let scrollY = window.scrollY;
    let scrollX = window.scrollX;

    // Generate grid points
    let gridPoints: { x: number; y: number; jitterX: number; jitterY: number; }[] = [];
    let connections: [number, number][] = [];

    const generateGrid = () => {
      gridPoints = [];
      connections = [];
      const cols = Math.ceil(width / GRID_SIZE) + 2;
      const rows = Math.ceil(height / GRID_SIZE) + 2;
      for (let y = -1; y < rows; y++) {
        for (let x = -1; x < cols; x++) {
          const jitterX = (Math.random() - 0.5) * JITTER;
          const jitterY = (Math.random() - 0.5) * JITTER;
          gridPoints.push({
            x: x * GRID_SIZE + jitterX,
            y: y * GRID_SIZE + jitterY,
            jitterX,
            jitterY,
          });
        }
      }
      // Connect each node to its right and bottom neighbor
      const getIndex = (x: number, y: number) => (y + 1) * (cols) + (x + 1);
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const idx = getIndex(x, y);
          // Right neighbor
          connections.push([idx, getIndex(x + 1, y)]);
          // Bottom neighbor
          connections.push([idx, getIndex(x, y + 1)]);
          // Diagonal neighbor (optional, for more organic look)
          if (Math.random() > 0.5) connections.push([idx, getIndex(x + 1, y + 1)]);
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      generateGrid();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      scrollX = window.scrollX;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      mouseRef.current.glow = 1;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Fade out mouse glow
      if (!mouseRef.current.active && mouseRef.current.glow > 0) {
        mouseRef.current.glow = Math.max(0, mouseRef.current.glow - MOUSE_FADE_SPEED);
      }

      // Offset for infinite grid effect
      const offsetX = -((scrollX % GRID_SIZE) + GRID_SIZE);
      const offsetY = -((scrollY % GRID_SIZE) + GRID_SIZE);

      // Draw connections
      connections.forEach(([a, b]) => {
        const nodeA = gridPoints[a];
        const nodeB = gridPoints[b];
        if (!nodeA || !nodeB) return;
        // Check if either end is near the mouse
        let mouseGlow = 0;
        if (mouseRef.current.glow > 0) {
          const ax = nodeA.x + offsetX;
          const ay = nodeA.y + offsetY;
          const bx = nodeB.x + offsetX;
          const by = nodeB.y + offsetY;
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const distA = Math.hypot(ax - mx, ay - my);
          const distB = Math.hypot(bx - mx, by - my);
          if (distA < MOUSE_GLOW_RADIUS || distB < MOUSE_GLOW_RADIUS) {
            mouseGlow = (1 - Math.min(distA, distB) / MOUSE_GLOW_RADIUS) * mouseRef.current.glow;
          }
        }
        ctx.save();
        ctx.strokeStyle = `rgba(0,255,255,${CONNECTION_OPACITY + mouseGlow * 0.35})`;
        ctx.lineWidth = 1.2 + mouseGlow * 2.2;
        ctx.beginPath();
        ctx.moveTo(nodeA.x + offsetX, nodeA.y + offsetY);
        ctx.lineTo(nodeB.x + offsetX, nodeB.y + offsetY);
        ctx.stroke();
        ctx.restore();
      });

      // Draw nodes
      gridPoints.forEach((node, i) => {
        // Pulsing effect
        const pulse = 1 + Math.sin(time * PULSE_SPEED + i) * 0.25;
        // Mouse glow effect
        let mouseGlow = 0;
        if (mouseRef.current.glow > 0) {
          const dx = node.x + offsetX - mouseRef.current.x;
          const dy = node.y + offsetY - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_GLOW_RADIUS) {
            mouseGlow = (1 - dist / MOUSE_GLOW_RADIUS) * mouseRef.current.glow;
          }
        }
        // Glow
        const gradient = ctx.createRadialGradient(
          node.x + offsetX,
          node.y + offsetY,
          0,
          node.x + offsetX,
          node.y + offsetY,
          NODE_RADIUS * 4 * pulse * (1 + mouseGlow * MOUSE_GLOW_INTENSITY)
        );
        gradient.addColorStop(0, `rgba(0,255,255,${NODE_GLOW * 0.7 + mouseGlow * 0.7})`);
        gradient.addColorStop(1, 'rgba(0,255,255,0)');
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x + offsetX, node.y + offsetY, NODE_RADIUS * 4 * pulse * (1 + mouseGlow * MOUSE_GLOW_INTENSITY), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Core
        ctx.save();
        ctx.fillStyle = mouseGlow > 0.2 ? '#fff' : '#cfe2f3';
        ctx.beginPath();
        ctx.arc(node.x + offsetX, node.y + offsetY, NODE_RADIUS * pulse * (1 + mouseGlow * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
};

export default NeuronGridBackground; 