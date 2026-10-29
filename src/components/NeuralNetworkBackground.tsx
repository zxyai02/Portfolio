import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  isSpiking: boolean;
  spikeRadius: number;
  spikeAlpha: number;
  colorType: 'primary' | 'accent' | 'secondary';
}

interface SynapticPacket {
  sourceIdx: number;
  targetIdx: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

export const NeuralNetworkBackground: React.FC = () => {
  const { theme } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false
  });

  // Track window scroll for 3D parallax drift
  const scrollYRef = useRef<number>(0);
  const prevScrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY, active: true });
    };

    const handleMouseLeave = () => {
      setMousePos(prev => ({ ...prev, active: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Neural Network Canvas Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive node count
    const nodeCount = Math.min(105, Math.max(50, Math.floor((width * height) / 18000)));
    const connectionDist = width < 768 ? 95 : 135;
    const connectionDistSq = connectionDist * connectionDist;
    const mouseRadius = 160;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    // Generate Nodes distributed across whole page with gentle velocities
    const nodes: NodeParticle[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const colorRand = Math.random();
      const colorType: 'primary' | 'accent' | 'secondary' =
        colorRand > 0.8 ? 'accent' : colorRand > 0.4 ? 'primary' : 'secondary';

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 1.2,
        baseAlpha: Math.random() * 0.5 + 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        isSpiking: false,
        spikeRadius: 0,
        spikeAlpha: 0,
        colorType
      });
    }

    // Synaptic Packets traveling between interconnected nodes
    const packets: SynapticPacket[] = [];
    const maxPackets = Math.floor(nodeCount * 0.28);

    const spawnPacket = (fromIdx: number, toIdx: number) => {
      if (packets.length >= maxPackets) return;
      packets.push({
        sourceIdx: fromIdx,
        targetIdx: toIdx,
        progress: 0,
        speed: Math.random() * 0.018 + 0.012,
        color:
          theme === 'dark'
            ? Math.random() > 0.4
              ? '#FBBF24' // Electric Amber
              : '#38BDF8' // Cyber Cyan
            : Math.random() > 0.4
            ? '#D97706' // Deep Amber
            : '#2563EB' // Royal Blue
      });
    };

    let lastTime = performance.now();
    let spikeTimer = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      // Handle subtle scroll velocity transfer to particle drift
      const scrollDelta = (scrollYRef.current - prevScrollYRef.current) * 0.04;
      prevScrollYRef.current += (scrollYRef.current - prevScrollYRef.current) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Periodically trigger a synaptic spike at a random node
      spikeTimer += dt;
      if (spikeTimer > 1200) {
        spikeTimer = 0;
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (targetNode && !targetNode.isSpiking) {
          targetNode.isSpiking = true;
          targetNode.spikeRadius = targetNode.radius;
          targetNode.spikeAlpha = 0.85;
        }
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move node
        node.x += node.vx;
        node.y += node.vy - scrollDelta;
        node.pulsePhase += node.pulseSpeed;

        // Screen edge wrapping
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        // Interactive mouse proximity response (gentle repulsion/field attraction)
        if (mousePos.active) {
          const dx = mousePos.x - node.x;
          const dy = mousePos.y - node.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRadius) * 0.8;
            node.x -= (dx / dist) * force;
            node.y -= (dy / dist) * force;
          }
        }

        // Draw node body with gentle pulsating glow
        const currentAlpha =
          node.baseAlpha + Math.sin(node.pulsePhase) * (theme === 'dark' ? 0.25 : 0.15);

        let nodeColor =
          theme === 'dark'
            ? node.colorType === 'accent'
              ? `rgba(251, 191, 36, ${currentAlpha})`
              : node.colorType === 'primary'
              ? `rgba(56, 189, 248, ${currentAlpha})`
              : `rgba(228, 228, 231, ${currentAlpha * 0.8})`
            : node.colorType === 'accent'
            ? `rgba(217, 119, 6, ${currentAlpha})`
            : node.colorType === 'primary'
            ? `rgba(37, 99, 235, ${currentAlpha})`
            : `rgba(71, 85, 105, ${currentAlpha * 0.9})`;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Synaptic Spike / Action Potential Halo Ring
        if (node.isSpiking) {
          node.spikeRadius += 0.6;
          node.spikeAlpha -= 0.02;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.spikeRadius, 0, Math.PI * 2);
          ctx.strokeStyle =
            theme === 'dark'
              ? `rgba(251, 191, 36, ${Math.max(0, node.spikeAlpha)})`
              : `rgba(217, 119, 6, ${Math.max(0, node.spikeAlpha)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          if (node.spikeAlpha <= 0) {
            node.isSpiking = false;
          }
        }
      }

      // Draw Synaptic Connection Lines between neighboring nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / connectionDist) * (theme === 'dark' ? 0.28 : 0.18);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(148, 163, 184, ${lineAlpha})`
                : `rgba(71, 85, 105, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Chance to trigger a signal packet along this active connection
            if (Math.random() < 0.0012) {
              spawnPacket(i, j);
            }
          }
        }

        // Draw connections to Mouse Pointer if active
        if (mousePos.active) {
          const mdx = nodes[i].x - mousePos.x;
          const mdy = nodes[i].y - mousePos.y;
          const mdistSq = mdx * mdx + mdy * mdy;

          if (mdistSq < mouseRadiusSq) {
            const mdist = Math.sqrt(mdistSq);
            const mAlpha = (1 - mdist / mouseRadius) * (theme === 'dark' ? 0.45 : 0.28);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(251, 191, 36, ${mAlpha})`
                : `rgba(217, 119, 6, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and Draw Traveling Neural Signal Packets (Action Potentials)
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        const n1 = nodes[packet.sourceIdx];
        const n2 = nodes[packet.targetIdx];

        if (!n1 || !n2) {
          packets.splice(p, 1);
          continue;
        }

        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          // Packet reached target: ignite target with brief micro-pulse
          n2.pulsePhase = 0;
          packets.splice(p, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * packet.progress;
        const py = n1.y + (n2.y - n1.y) * packet.progress;

        // Glowing packet head
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.fill();

        // Trailing glow
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === 'dark'
            ? 'rgba(251, 191, 36, 0.25)'
            : 'rgba(217, 119, 6, 0.2)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, mousePos.active]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 
        CENTRAL NEURAL NETWORK GLOBE (USER'S PROVIDED ARTWORK)
        Features the provided image:
        /assets/aistudio/Gray_abstract_social_communications_round_background__Vector_paper____dcf21e04.jpg
        - Dark Theme: High-tech inverted luminescent spherical network core
        - Light Theme: Refined, crisp architectural communications globe
        - Slow, hypnotic breathing/float oscillation effect
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`relative max-w-[850px] lg:max-w-[1100px] w-full px-4 transition-all duration-700 ${
            theme === 'dark'
              ? 'opacity-40 contrast-125 brightness-95 invert'
              : 'opacity-55 contrast-110'
          }`}
          style={{
            animation: 'neuralPulse 12s ease-in-out infinite alternate'
          }}
        >
          <img
            src="/assets/aistudio/Gray_abstract_social_communications_round_background__Vector_paper____dcf21e04.jpg"
            alt="Neural Network Communications Globe"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[85vh] object-contain mx-auto drop-shadow-2xl"
          />

          {/* Radial Neural Core Glow behind/around the Globe */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl pointer-events-none -z-10 ${
              theme === 'dark'
                ? 'bg-gradient-to-tr from-cyan-500/10 via-amber-500/10 to-indigo-500/10 scale-90'
                : 'bg-gradient-to-tr from-amber-500/5 via-sky-500/5 to-slate-500/5 scale-90'
            }`}
          />
        </div>
      </div>

      {/* 
        FULL-PAGE INTERACTIVE NEURAL NETWORK CANVAS
        Draws dynamic synaptic nodes, distance connections, data packets, 
        and interactive mouse fields across the ENTIRE viewport
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 
        LEGIBILITY SHROUD
        Subtle gradient veil to guarantee effortless reading of foreground text
        while keeping the whole-page neural animation vivid and crisp
      */}
      <div
        className={`absolute inset-0 transition-colors duration-500 pointer-events-none z-20 ${
          theme === 'dark'
            ? 'bg-zinc-950/45'
            : 'bg-[#FAF8F5]/35'
        }`}
      />

      {/* Embedded CSS for smooth organic breathing of the network globe */}
      <style>{`
        @keyframes neuralPulse {
          0% {
            transform: scale(0.97) rotate(-0.5deg);
          }
          50% {
            transform: scale(1.02) rotate(0.5deg);
          }
          100% {
            transform: scale(0.98) rotate(-0.2deg);
          }
        }
      `}</style>
    </div>
  );
};
