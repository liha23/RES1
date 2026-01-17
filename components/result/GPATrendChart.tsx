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
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden transform transition-all duration-500 group-hover:border-purple-500/30">
        {/* Header with floating icon */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="inline-flex p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 mr-1 animate-float" style={{ animationDuration: '4s' }}>
                  <TrendingUp className="w-4 h-4 text-white" />
                </span>
                GPA JOURNEY
              </h3>
              <p className="text-sm text-zinc-500 mt-1">Track your academic progress over time</p>
            </div>
            
            {/* Stats badges */}
            <div className="flex flex-col gap-2 items-end">
              <div className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                <span className="text-xs text-zinc-400">Avg: </span>
                <span className="text-sm font-bold text-purple-400">{avgSgpa.toFixed(2)}</span>
              </div>
              {trend !== 0 && (
                <div className={`px-3 py-1.5 rounded-full ${trend > 0 ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'} border`}>
                  <span className={`text-sm font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trend > 0 ? '+' : ''}{trend.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-6 pb-6">
          {data.length > 0 ? (
            <ChartContainer
              config={{
                sgpa: {
                  label: "SGPA",
                  color: "#a855f7",
                },
              }}
              className="h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="gpaTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="#a855f7" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
                          <div className="glass rounded-lg p-3 border border-purple-500/30 shadow-xl">
                            <p className="text-xs text-zinc-400 mb-1">{payload[0].payload.semester}</p>
                            <p className="text-lg font-bold text-purple-400">{payload[0].value}</p>
                            <p className="text-xs text-zinc-500">out of 10</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ stroke: "rgba(168, 85, 247, 0.3)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#gpaTrendGradient)"
                    filter="url(#glow)"
                    dot={{ 
                      fill: "#a855f7", 
                      r: 5, 
                      strokeWidth: 3, 
                      stroke: "#18181b",
                      filter: "url(#glow)"
                    }}
                    activeDot={{ 
                      r: 8, 
                      fill: "#a855f7",
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
