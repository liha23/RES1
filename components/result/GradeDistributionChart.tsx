"use client";

import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Award } from "lucide-react";

const GRADE_COLORS: Record<string, { main: string; gradient: string }> = {
  O: { main: "#a3e635", gradient: "from-lime-400 to-emerald-400" },
  "A+": { main: "#e879f9", gradient: "from-fuchsia-400 to-pink-400" },
  A: { main: "#22d3ee", gradient: "from-cyan-400 to-blue-400" },
  "B+": { main: "#38bdf8", gradient: "from-sky-400 to-indigo-400" },
  B: { main: "#fbbf24", gradient: "from-amber-400 to-orange-400" },
  C: { main: "#fb923c", gradient: "from-orange-400 to-red-400" },
  P: { main: "#a78bfa", gradient: "from-violet-400 to-purple-400" },
  F: { main: "#f87171", gradient: "from-red-500 to-rose-500" },
};

interface GradeDistributionChartProps {
  data: { grade: string; count: number }[];
}

export default function GradeDistributionChart({
  data,
}: GradeDistributionChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    fill: GRADE_COLORS[item.grade]?.main || "#65a30d",
  }));

  const totalSubjects = chartData.reduce((sum, item) => sum + item.count, 0);
  const topGrade = chartData.length > 0 
    ? chartData.reduce((prev, curr) => prev.count > curr.count ? prev : curr)
    : null;

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, grade }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    grade: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.08) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      >
        {grade}
      </text>
    );
  };

  return (
    <div className="relative group animate-slide-up stagger-2">
      {/* Vibrant glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 via-purple-500/20 to-cyan-500/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border-2 border-transparent bg-gradient-to-br from-fuchsia-500/10 via-purple-500/5 to-cyan-500/10 overflow-hidden transform transition-all duration-500 group-hover:border-fuchsia-400/40 shadow-xl">
        {/* Header */}
        <div className="p-4 sm:p-6 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span className="inline-flex p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 mr-1 animate-float shadow-xl shadow-fuchsia-500/50" style={{ animationDuration: '4.5s' }}>
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </span>
                <span className="bg-gradient-to-r from-fuchsia-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">GRADE SPECTRUM</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 sm:mt-1">Distribution across all subjects</p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-2 items-start">
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-pink-500/20 border border-fuchsia-400/50">
                <span className="text-[10px] sm:text-xs text-fuchsia-300">Total: </span>
                <span className="text-xs sm:text-sm font-bold text-white">{totalSubjects}</span>
              </div>
              {topGrade && (
                <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-lime-500/30 to-emerald-500/20 border border-lime-400/50">
                  <span className="text-[10px] sm:text-xs text-lime-300">Most: </span>
                  <span className="text-xs sm:text-sm font-bold text-white">{topGrade.grade}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {chartData.length > 0 ? (
            <ChartContainer config={{}} className="h-[200px] sm:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {chartData.map((entry, index) => (
                      <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={entry.fill} stopOpacity={1} />
                        <stop offset="100%" stopColor={entry.fill} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="count"
                    stroke="rgba(24, 24, 27, 0.8)"
                    strokeWidth={2}
                    filter="url(#shadow)"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#pieGradient-${index})`}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const percentage = ((data.count / totalSubjects) * 100).toFixed(0);
                        return (
                          <div className="glass rounded-lg p-3 border border-fuchsia-500/30 shadow-xl">
                            <p className="text-lg font-bold text-white">Grade {data.grade}</p>
                            <p className="text-sm text-zinc-400">{data.count} subjects ({percentage}%)</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    content={({ payload }) => (
                      <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {payload?.map((entry, index) => (
                          <div key={index} className="flex items-center gap-1.5">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs text-zinc-400">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-zinc-500">
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No grade data available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-fuchsia-500/10 blur-2xl" />
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-pink-500/10 blur-2xl" />
      </div>
    </div>
  );
}
