"use client";

import { useEffect, useRef } from "react";

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return `${d.getDate()}/${d.getMonth() + 1}`;
});

const DATA = [
  420, 380, 510, 490, 620, 580, 700, 650, 480, 520,
  610, 590, 680, 720, 640, 750, 800, 760, 690, 710,
  840, 820, 780, 900, 870, 920, 980, 940, 1100, 1247,
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Chart: any;
  }
}

export default function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const initChart = () => {
      if (!canvasRef.current || !window.Chart) return;
      if (chartRef.current) chartRef.current.destroy();

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const grad = ctx.createLinearGradient(0, 0, 0, 260);
      grad.addColorStop(0, "rgba(255,77,109,0.18)");
      grad.addColorStop(1, "rgba(255,77,109,0)");

      chartRef.current = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: DAYS,
          datasets: [
            {
              label: "Faturamento (R$)",
              data: DATA,
              borderColor: "#ff4d6d",
              backgroundColor: grad,
              borderWidth: 2.5,
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#ff4d6d",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1a1a2e",
              titleColor: "#fff",
              bodyColor: "rgba(255,255,255,0.7)",
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: (ctx: { raw: number }) =>
                  ` R$ ${ctx.raw.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: "#9ca3af",
                font: { size: 10, family: "Poppins" },
                maxTicksLimit: 10,
              },
            },
            y: {
              grid: { color: "#f3f4f6" },
              ticks: {
                color: "#9ca3af",
                font: { size: 10, family: "Poppins" },
                callback: (v: number) => `R$${v}`,
              },
            },
          },
          interaction: { intersect: false, mode: "index" },
        },
      });
    };

    if (window.Chart) {
      initChart();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js";
      script.onload = initChart;
      document.head.appendChild(script);
    }

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <div style={{ position: "relative", height: 260 }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
