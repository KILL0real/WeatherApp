"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

const data = [
  { time: "10AM", value: 60 },
  { time: "11AM", value: 40 },
  { time: "12AM", value: 90 },
  { time: "01PM", value: 35 },
  { time: "02PM", value: 80 },
  { time: "03PM", value: 30 },
];

export default function RainChart() {
  const [textColor, setTextColor] = useState("#000");

  useEffect(() => {
    const getColor = () => {
      const root = document.documentElement;
      const color = getComputedStyle(root)
        .getPropertyValue("--text-color")
        .trim();
      setTextColor(color || "#000");
    };

    getColor();

    const observer = new MutationObserver(() => getColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const gridColor = textColor === "#ffffff" ? "#333" : "#ddd";

  return (
    <div
      style={{
        width: "100%",
        minWidth: 297,
        maxWidth: 350,
        height: 300,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <h2 style={{ margin: 0, paddingLeft: 6, color: textColor }}>
        Chance Of Rain
      </h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={gridColor}
          />
          <XAxis
            dataKey="time"
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="number"
            domain={[0, 90]}
            ticks={[30, 60, 90]}
            tickFormatter={(value) => {
              if (value === 30) return "Heavy";
              if (value === 60) return "Sunny";
              if (value === 90) return "Rainy";
              return "";
            }}
            tick={{ fill: textColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: textColor === "#ffffff" ? "#1c1c1c" : "#fff",
              borderColor: "#ccc",
              color: textColor,
            }}
            labelStyle={{ color: textColor }}
            itemStyle={{ color: textColor }}
          />

          <Bar
            dataKey="value"
            fill="#ccc"
            barSize={6}
            radius={[10, 10, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1e90ff"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#1e90ff",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
