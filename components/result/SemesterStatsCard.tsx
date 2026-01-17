"use client";

import { TrendingUp, Award, Percent, BookOpen } from "lucide-react";

interface SemesterStatsCardProps {
  totalMarks: number;
  maxMarks: number;
  sgpa: number;
  percentage: number;
  totalCredits: number;
}

export default function SemesterStatsCard({
  totalMarks,
  maxMarks,
  sgpa,
  percentage,
  totalCredits,
}: SemesterStatsCardProps) {
  const stats = [
    {
      label: "Total Marks",
      value: totalMarks,
      subValue: `/ ${maxMarks}`,
      description: "Marks Obtained",
      icon: TrendingUp,
      color: "from-cyan-400 to-blue-500",
      glowColor: "cyan-500",
      delay: "stagger-1",
    },
    {
      label: "SGPA",
      value: sgpa.toFixed(2),
      subValue: "/ 10",
      description: "Semester GPA",
      icon: Award,
      color: "from-fuchsia-400 to-pink-500",
      glowColor: "fuchsia-500",
      delay: "stagger-2",
    },
    {
      label: "Percentage",
      value: percentage.toFixed(1),
      subValue: "%",
      description: "Overall Score",
      icon: Percent,
      color: "from-amber-400 to-orange-500",
      glowColor: "amber-500",
      delay: "stagger-3",
    },
    {
      label: "Credits",
      value: totalCredits,
      subValue: "",
      description: "Total Credits",
      icon: BookOpen,
      color: "from-lime-400 to-emerald-500",
      glowColor: "lime-500",
      delay: "stagger-4",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`relative group animate-slide-up ${stat.delay}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Floating card with 3D effect */}
          <div className="relative h-full">
            {/* Vibrant glow effect behind card */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow`} />
            
            {/* Main card */}
            <div className={`relative h-full glass rounded-2xl border-2 border-${stat.glowColor}/30 p-3 sm:p-4 lg:p-5 overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:border-${stat.glowColor}/60 shadow-xl`}>
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
              
              {/* Floating icon */}
              <div className="relative z-10">
                <div className={`inline-flex p-2 sm:p-2.5 lg:p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-2 sm:mb-3 lg:mb-4 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 animate-float shadow-xl shadow-${stat.glowColor}/50`} style={{ animationDuration: `${3 + index * 0.5}s` }}>
                  <stat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                </div>
                
                <p className="text-[9px] sm:text-[10px] lg:text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 sm:mb-2">
                  {stat.label}
                </p>
                
                <div className="flex items-baseline gap-0.5 sm:gap-1">
                  <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent tabular-nums`}>
                    {stat.value}
                  </span>
                  {stat.subValue && (
                    <span className="text-sm sm:text-base lg:text-lg text-zinc-400 font-medium">
                      {stat.subValue}
                    </span>
                  )}
                </div>
                
                <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-2">
                  {stat.description}
                </p>
              </div>
              
              {/* Corner decoration */}
              <div className={`absolute -bottom-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-20 blur-xl`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
