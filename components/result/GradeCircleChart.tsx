"use client";

import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { LabelList, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { ResultAPIResponse } from "../../app/(public)/result/types";
import { marksToGrade } from "../../app/(public)/result/utils";
import { Target, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GradeCircleChartProps {
  subjects: ResultAPIResponse[];
}

export default function GradeCircleChart({ subjects }: GradeCircleChartProps) {
  const GRADE_ORDER = ["O", "A+", "A", "B+", "B", "C", "P", "F"] as const;
  const GRADE_KEY: Record<(typeof GRADE_ORDER)[number], string> = {
    O: "o",
    "A+": "aPlus",
    A: "a",
    "B+": "bPlus",
    B: "b",
    C: "c",
    P: "p",
    F: "f",
  };

  const gradeCount: Record<(typeof GRADE_ORDER)[number], number> = {
    O: 0, "A+": 0, A: 0, "B+": 0, B: 0, C: 0, P: 0, F: 0,
  };

  for (const subject of subjects) {
    const marks = parseFloat(subject.moderatedprint) || 0;
    const grade = marksToGrade(marks) as (typeof GRADE_ORDER)[number];
    if (grade in gradeCount) gradeCount[grade]++;
  }

  const totalSubjects = subjects.length;
  const chartData = GRADE_ORDER.map((grade) => ({
    gradeKey: GRADE_KEY[grade],
    gradeLabel: grade,
    count: gradeCount[grade],
    fill: `var(--color-${GRADE_KEY[grade]})`,
  })).filter((d) => d.count > 0);

  const chartConfig = {
    count: { label: "Subjects" },
    o: { label: "O", color: "#22c55e" },
    aPlus: { label: "A+", color: "#a855f7" },
    a: { label: "A", color: "#8b5cf6" },
    bPlus: { label: "B+", color: "#6366f1" },
    b: { label: "B", color: "#3b82f6" },
    c: { label: "C", color: "#f59e0b" },
    p: { label: "P", color: "#f97316" },
    f: { label: "F", color: "#ef4444" },
  } satisfies ChartConfig;

  const top = chartData.reduce<{ gradeLabel: string; count: number } | null>(
    (acc, cur) => (!acc || cur.count > acc.count ? { gradeLabel: cur.gradeLabel, count: cur.count } : acc),
    null
  );
  
  const passCount = subjects.reduce((sum, s) => {
    const marks = parseFloat(s.moderatedprint) || 0;
    return sum + (marksToGrade(marks) !== "F" ? 1 : 0);
  }, 0);
  const passRate = totalSubjects > 0 ? Math.round((passCount / totalSubjects) * 100) : 0;

  const allMarks = subjects.map((s) => parseFloat(s.moderatedprint) || 0);
  const totalMarks = allMarks.reduce((sum, m) => sum + m, 0);
  const averageMarks = totalSubjects > 0 ? totalMarks / totalSubjects : 0;
  const highestMarks = allMarks.length > 0 ? Math.max(...allMarks) : 0;
  const lowestMarks = allMarks.length > 0 ? Math.min(...allMarks) : 0;
  const failCount = gradeCount.F;

  const getTrendIcon = () => {
    if (averageMarks >= 75) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (averageMarks >= 50) return <Minus className="w-4 h-4 text-yellow-400" />;
    return <TrendingDown className="w-4 h-4 text-red-400" />;
  };

  return (
    <div className="relative group animate-slide-up stagger-4">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden transform transition-all duration-500 group-hover:border-purple-500/30">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="inline-flex p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 mr-1 animate-float" style={{ animationDuration: '3.5s' }}>
                  <Target className="w-4 h-4 text-white" />
                </span>
                GRADE ANALYSIS
              </h3>
              <p className="text-sm text-zinc-500 mt-1">Comprehensive grade breakdown</p>
            </div>
            
            {/* Pass rate badge */}
            <div className={`px-3 py-1.5 rounded-full ${passRate >= 80 ? 'bg-green-500/20 border-green-500/30' : passRate >= 50 ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-red-500/20 border-red-500/30'} border`}>
              <span className="text-xs text-zinc-400">Pass: </span>
              <span className={`text-sm font-bold ${passRate >= 80 ? 'text-green-400' : passRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>{passRate}%</span>
            </div>
          </div>
        </div>

        <div className="p-6 pt-2">
          {chartData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Radial Chart */}
              <div className="relative">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[220px]"
                >
                  <RadialBarChart
                    data={chartData}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={35}
                    outerRadius={100}
                  >
                    <PolarAngleAxis type="number" domain={[0, Math.max(...chartData.map(d => d.count)) + 1]} tick={false} />
                    <ChartTooltip
                      cursor={false}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const percentage = ((data.count / totalSubjects) * 100).toFixed(0);
                          return (
                            <div className="glass rounded-lg p-3 border border-green-500/30 shadow-xl">
                              <p className="text-lg font-bold text-white">Grade {data.gradeLabel}</p>
                              <p className="text-sm text-zinc-400">{data.count} subjects ({percentage}%)</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <RadialBar 
                      dataKey="count" 
                      background={{ fill: 'rgba(39, 39, 42, 0.5)' }}
                      cornerRadius={10}
                    >
                      <LabelList
                        position="insideStart"
                        dataKey="gradeLabel"
                        className="fill-white capitalize font-bold"
                        fontSize={10}
                      />
                    </RadialBar>
                  </RadialBarChart>
                </ChartContainer>
                
                {/* Center stat */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{totalSubjects}</p>
                    <p className="text-xs text-zinc-500">Subjects</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="space-y-3">
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500 mb-1">Average</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">{averageMarks.toFixed(1)}</span>
                      {getTrendIcon()}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500 mb-1">Highest</p>
                    <span className="text-xl font-bold text-green-400">{highestMarks.toFixed(0)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500 mb-1">Lowest</p>
                    <span className="text-xl font-bold text-orange-400">{lowestMarks.toFixed(0)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500 mb-1">Failed</p>
                    <span className={`text-xl font-bold ${failCount > 0 ? 'text-red-400' : 'text-green-400'}`}>{failCount}</span>
                  </div>
                </div>

                {/* Grade breakdown */}
                <div className="p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                  <p className="text-xs text-zinc-500 mb-2 font-semibold">Grade Distribution</p>
                  <div className="grid grid-cols-4 gap-2">
                    {GRADE_ORDER.map((grade) => {
                      const count = gradeCount[grade];
                      if (count === 0) return null;
                      const configKey = GRADE_KEY[grade] as keyof typeof chartConfig;
                      const configEntry = chartConfig[configKey];
                      const bgColor = 'color' in configEntry ? configEntry.color : '#71717a';
                      return (
                        <div key={grade} className="text-center">
                          <div 
                            className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs font-bold text-white mb-1"
                            style={{ backgroundColor: bgColor }}
                          >
                            {grade}
                          </div>
                          <span className="text-xs text-zinc-400">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {top && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
                    <span className="text-xs text-zinc-400">Most Common Grade</span>
                    <span className="text-sm font-bold text-purple-400">{top.gradeLabel} ({top.count})</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-zinc-500">
              <div className="text-center">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No grade data available</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-green-500/10 blur-2xl" />
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl" />
      </div>
    </div>
  );
}
