"use client";

import { useMemo } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ResultAPIResponse } from "../../app/(public)/result/types";
import { BarChart3 } from "lucide-react";

interface SemesterBarChartProps {
  subjects: ResultAPIResponse[];
}

export default function SemesterBarChart({ subjects }: SemesterBarChartProps) {
  const chartData = useMemo(() => {
    return subjects.map((subject) => {
      const internalMarks = parseFloat(subject.minorprint) || 0;
      const externalMarks = parseFloat(subject.majorprint) || 0;
      const totalMarks = parseFloat(subject.moderatedprint) || 0;

      return {
        code: subject.papercode,
        name: subject.papername,
        internalMarks,
        externalMarks,
        totalMarks,
      };
    });
  }, [subjects]);

  const avgMarks = chartData.length > 0 
    ? chartData.reduce((sum, d) => sum + d.totalMarks, 0) / chartData.length 
    : 0;

  const highestMarks = chartData.length > 0 
    ? Math.max(...chartData.map(d => d.totalMarks))
    : 0;

  return (
    <div className="relative group animate-slide-up stagger-3">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden transform transition-all duration-500 group-hover:border-purple-500/30">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="inline-flex p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 mr-1 animate-float" style={{ animationDuration: '5s' }}>
                  <BarChart3 className="w-4 h-4 text-white" />
                </span>
                SUBJECT PERFORMANCE
              </h3>
              <p className="text-sm text-zinc-500 mt-1">Internal vs External marks breakdown</p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col gap-2 items-end">
              <div className="px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                <span className="text-xs text-zinc-400">Avg: </span>
                <span className="text-sm font-bold text-indigo-400">{avgMarks.toFixed(1)}</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                <span className="text-xs text-zinc-400">Best: </span>
                <span className="text-sm font-bold text-green-400">{highestMarks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-6 pb-6">
          {chartData.length > 0 ? (
            <ChartContainer
              config={{
                internalMarks: {
                  label: "Internal",
                  color: "#a855f7",
                },
                externalMarks: {
                  label: "External",
                  color: "#e9d5ff",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                  <defs>
                    <linearGradient id="internalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="externalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.7} />
                    </linearGradient>
                    <filter id="barShadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2"/>
                    </filter>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(113, 113, 122, 0.2)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="code"
                    tick={{ fill: "#71717a", fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(113, 113, 122, 0.3)' }}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="glass rounded-lg p-4 border border-indigo-500/30 shadow-xl min-w-[180px]">
                            <p className="text-xs text-zinc-400 mb-1">{data.code}</p>
                            <p className="font-bold text-white text-sm mb-3 line-clamp-2">{data.name}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-400">Internal</span>
                                <span className="text-sm font-semibold text-purple-400">{data.internalMarks}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-400">External</span>
                                <span className="text-sm font-semibold text-violet-300">{data.externalMarks}</span>
                              </div>
                              <div className="border-t border-zinc-700 pt-2 flex justify-between items-center">
                                <span className="text-xs text-zinc-400">Total</span>
                                <span className="text-base font-bold text-white">{data.totalMarks}/100</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="internalMarks" 
                    stackId="a" 
                    fill="url(#internalGradient)" 
                    radius={[0, 0, 0, 0]}
                    filter="url(#barShadow)"
                  />
                  <Bar 
                    dataKey="externalMarks" 
                    stackId="a" 
                    fill="url(#externalGradient)" 
                    radius={[4, 4, 0, 0]}
                    filter="url(#barShadow)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-zinc-500">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No subject data available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="px-6 pb-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm bg-gradient-to-b from-purple-500 to-purple-600" />
            <span className="text-xs text-zinc-400">Internal Marks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-sm bg-gradient-to-b from-violet-300 to-violet-400" />
            <span className="text-xs text-zinc-400">External Marks</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl" />
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl" />
      </div>
    </div>
  );
}
