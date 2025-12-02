"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
} from "lightweight-charts";
import { OHLCPoint } from "@/src/types/market";

interface StockChartProps {
  data: OHLCPoint[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

export default function StockChart({ data, colors }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 1. Initialize Chart
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current!.clientWidth,
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: colors?.backgroundColor || "#111827",
        }, // Gray-900
        textColor: colors?.textColor || "#D1D5DB",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" },
      },
    });

    chartRef.current = chart;

    // 2. Add Candlestick Series (Updated for v5+)
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // 3. Set Data
    // Lightweight charts expects data sorted by time.
    // Ensure your API sends it sorted, or sort here if needed.
    candlestickSeries.setData(
      data.map((item) => ({
        time: item.time, // Format: '2023-01-01'
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }))
    );

    // 4. Fit Content
    chart.timeScale().fitContent();

    // 5. Handle Resizing
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, colors]);

  return <div ref={chartContainerRef} className="w-full" />;
}
