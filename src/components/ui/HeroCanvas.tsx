"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf: number;
    let W = 0,
      H = 0,
      T = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles();
      initNodes();
    };

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
      ps: number;
      color: string;
      opacity: number;
    };
    let particles: P[] = [];
    const PCOLS = ["rgba(212,160,23,", "rgba(248,201,85,", "rgba(255,220,100,", "rgba(248,231,178,"];

    const initParticles = () => {
      particles = Array.from({ length: 85 }, () => {
        const t = Math.random();
        const x = t < 0.55 ? W * Math.random() * 0.75 : W * (0.4 + Math.random() * 0.6);
        const y =
          t < 0.55 ? H * (0.45 + (1 - t) * 0.45) + (Math.random() - 0.5) * H * 0.22 : H * (0.15 + Math.random() * 0.75);
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.022,
          vy: (Math.random() - 0.5) * 0.018,
          r: Math.random() * 1.8 + 0.4,
          phase: Math.random() * Math.PI * 2,
          ps: 0.004 + Math.random() * 0.007,
          color: PCOLS[Math.floor(Math.random() * PCOLS.length)],
          opacity: Math.random() * 0.65 + 0.2,
        };
      });
    };

    type N = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
    };
    let nodes: N[] = [];

    const initNodes = () => {
      nodes = Array.from({ length: 16 }, () => ({
        x: W * (0.52 + Math.random() * 0.48),
        y: H * (Math.random() * 0.52),
        vx: (Math.random() - 0.5) * 0.016,
        vy: (Math.random() - 0.5) * 0.016,
        r: Math.random() * 1.8 + 0.8,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawWave = (yOff: number, alpha: number, width: number, tOff: number, glow: number) => {
      const time = T * 0.00022 + tOff;

      const x0 = -W * 0.02;
      const y0 = H * (0.88 + Math.sin(time) * 0.035) + yOff;

      const cx1 = W * 0.28;
      const cy1 = H * (0.65 + Math.sin(time * 0.65 + 1.2) * 0.032) + yOff;

      const cx2 = W * 0.58;
      const cy2 = H * (0.38 + Math.sin(time * 0.5 + 2.1) * 0.028) + yOff;

      const x3 = W * 1.02;
      const y3 = H * (0.1 + Math.sin(time * 0.55 + 3) * 0.025) + yOff;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x3, y3);
      ctx.strokeStyle = `rgba(248,201,85,${alpha * 0.18})`;
      ctx.lineWidth = width + glow * 2.2;
      ctx.lineCap = "round";
      ctx.shadowBlur = glow * 4;
      ctx.shadowColor = "rgba(248,201,85,0.55)";
      ctx.stroke();
      ctx.shadowBlur = 0;

      const grad = ctx.createLinearGradient(x0, y0, x3, y3);
      grad.addColorStop(0, `rgba(255,235,130,${alpha * 0.85})`);
      grad.addColorStop(0.35, `rgba(255,220,80,${alpha})`);
      grad.addColorStop(0.65, `rgba(212,160,23,${alpha * 0.9})`);
      grad.addColorStop(1, `rgba(255,240,160,${alpha * 0.45})`);

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x3, y3);
      ctx.strokeStyle = grad;
      ctx.lineWidth = width;
      ctx.shadowBlur = glow * 0.6;
      ctx.shadowColor = "rgba(255,215,80,0.9)";
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        p.phase += p.ps;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const pulse = 0.38 + Math.sin(p.phase) * 0.42;
        const a = p.opacity * pulse;

        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        halo.addColorStop(0, p.color + a * 0.45 + ")");
        halo.addColorStop(1, p.color + "0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ")";
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + "0.75)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const drawNodes = () => {
      nodes.forEach((n) => {
        n.phase += 0.007;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < W * 0.48) n.vx = Math.abs(n.vx);
        if (n.x > W * 1.01) n.vx = -Math.abs(n.vx);
        if (n.y < -H * 0.01) n.vy = Math.abs(n.vy);
        if (n.y > H * 0.55) n.vy = -Math.abs(n.vy);
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const maxD = W * 0.17;
          if (d < maxD) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212,160,23,${(1 - d / maxD) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const p = 0.5 + Math.sin(n.phase) * 0.28;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,160,23,${p * 0.3})`;
        ctx.strokeStyle = `rgba(212,160,23,${p * 0.35})`;
        ctx.lineWidth = 0.7;
        ctx.fill();
        ctx.stroke();
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);

      drawWave(H * 0.08, 0.05, 90, 0, 38);
      drawWave(H * 0.04, 0.09, 60, 4, 30);
      drawWave(H * 0.02, 0.22, 20, 8, 24);
      drawWave(-H * 0.045, 0.28, 15, 14, 20);
      drawWave(-H * 0.085, 0.52, 4.5, 19, 15);
      drawWave(-H * 0.082, 0.78, 1.8, 19.3, 9);

      drawParticles();
      drawNodes();

      T++;
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none", willChange: "transform" }}
    />
  );
}
