"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface GPATrendChartProps {
  data: { semester: string; sgpa: number }[];
}

export default function GPATrendChart({ data }: GPATrendChartProps) {
  const avgSgpa = data.length > 0 
    ? data.reduce((sum, d) => sum + d.sgpa, 0) / data.length 
    : 0;
  
  const trend = data.length >= 2 
    ? data[data.length - 1].sgpa - data[0].sgpa 
    : 0;

  return (
    <div className="relative group animate-slide-up">
      {/* Vibrant glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-indigo-500/30 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border-2 border-transparent bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10 overflow-hidden transform transition-all duration-500 group-hover:border-cyan-400/40 shadow-xl">
        {/* Header with floating icon */}
        <div className="p-4 sm:p-6 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span className="inline-flex p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 mr-1 animate-float shadow-xl shadow-cyan-500/50" style={{ animationDuration: '4s' }}>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </span>
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">GPA JOURNEY</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 sm:mt-1">Track your academic progress over time</p>
            </div>
            
            {/* Stats badges */}
            <div className="flex gap-2 items-start">
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/20 border border-cyan-400/50">
                <span className="text-[10px] sm:text-xs text-cyan-300">Avg: </span>
                <span className="text-xs sm:text-sm font-bold text-white">{avgSgpa.toFixed(2)}</span>
              </div>
              {trend !== 0 && (
                <div className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${trend > 0 ? 'bg-gradient-to-r from-lime-500/30 to-emerald-500/20 border-lime-400/50' : 'bg-gradient-to-r from-red-500/30 to-rose-500/20 border-red-400/50'} border`}>
                  <span className={`text-xs sm:text-sm font-bold ${trend > 0 ? 'text-lime-300' : 'text-red-300'}`}>
                    {trend > 0 ? '+' : ''}{trend.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {data.length > 0 ? (
            <ChartContainer
              config={{
                sgpa: {
                  label: "SGPA",
                  color: "#22d3ee",
                },
              }}
              className="h-[200px] sm:h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="gpaTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6} />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(113, 113, 122, 0.2)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="semester"
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(113, 113, 122, 0.3)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass rounded-lg p-3 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/40">
                            <p className="text-xs text-cyan-300 mb-1">{payload[0].payload.semester}</p>
                            <p className="text-lg font-bold text-cyan-300">{payload[0].value}</p>
                            <p className="text-xs text-zinc-400">out of 10</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ stroke: "rgba(34, 211, 238, 0.5)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    fill="url(#gpaTrendGradient)"
                    filter="url(#glow)"
                    dot={{ 
                      fill: "#22d3ee", 
                      r: 5, 
                      strokeWidth: 3, 
                      stroke: "#18181b",
                      filter: "url(#glow)"
                    }}
                    activeDot={{ 
                      r: 8, 
                      fill: "#22d3ee",
                      stroke: "#fff",
                      strokeWidth: 2,
                      filter: "url(#glow)"
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-zinc-500">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No GPA data available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-violet-500/10 blur-2xl" />
      </div>
    </div>
  );
}
