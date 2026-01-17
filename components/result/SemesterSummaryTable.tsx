"use client";

import { ProcessedSemester } from "../../app/(public)/result/types";
import { TableIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SemesterSummaryTableProps {
  semesters: ProcessedSemester[];
}

export default function SemesterSummaryTable({
  semesters,
}: SemesterSummaryTableProps) {
  const getTrendIcon = (index: number) => {
    if (index === 0) return null;
    const current = semesters[index].sgpa;
    const previous = semesters[index - 1].sgpa;
    const diff = current - previous;
    
    if (diff > 0.1) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (diff < -0.1) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-zinc-500" />;
  };

  const getPerformanceColor = (sgpa: number) => {
    if (sgpa >= 9) return "from-green-500 to-emerald-500";
    if (sgpa >= 8) return "from-purple-500 to-violet-500";
    if (sgpa >= 7) return "from-blue-500 to-indigo-500";
    if (sgpa >= 6) return "from-cyan-500 to-teal-500";
    if (sgpa >= 5) return "from-yellow-500 to-amber-500";
    return "from-red-500 to-rose-500";
  };

  const totalCredits = semesters.reduce((sum, sem) => sum + sem.credits, 0);
  const totalMarks = semesters.reduce((sum, sem) => sum + sem.totalMarks, 0);
  const avgSgpa = semesters.length > 0 
    ? semesters.reduce((sum, sem) => sum + sem.sgpa, 0) / semesters.length 
    : 0;

  return (
    <div className="relative animate-slide-up stagger-3">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-600/5 rounded-2xl blur-xl opacity-50" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/50">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 animate-float" style={{ animationDuration: '4.5s' }}>
                <TableIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  SEMESTER OVERVIEW
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500">Performance across all semesters</p>
              </div>
            </div>
            
            {/* Summary stats */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-500">Avg SGPA: </span>
                <span className="text-xs sm:text-sm font-bold text-purple-400">{avgSgpa.toFixed(2)}</span>
              </div>
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-500">Total Credits: </span>
                <span className="text-xs sm:text-sm font-bold text-white">{totalCredits}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Semester cards grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {semesters.map((sem, index) => (
              <div
                key={sem.euno}
                className="group relative rounded-xl bg-zinc-800/30 border border-zinc-700/30 overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Progress bar at top */}
                <div className="h-1.5 bg-zinc-800">
                  <div 
                    className={`h-full bg-gradient-to-r ${getPerformanceColor(sem.sgpa)} transition-all duration-700`}
                    style={{ width: `${(sem.sgpa / 10) * 100}%` }}
                  />
                </div>
                
                <div className="p-4">
                  {/* Semester header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${getPerformanceColor(sem.sgpa)} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}>
                        {sem.euno}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white">Semester {sem.euno}</span>
                    </div>
                    {getTrendIcon(index)}
                  </div>
                  
                  {/* SGPA highlight */}
                  <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/5 border border-purple-500/20">
                    <p className="text-[10px] sm:text-xs text-zinc-500 mb-1">SGPA</p>
                    <p className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${getPerformanceColor(sem.sgpa)} bg-clip-text text-transparent`}>
                      {sem.sgpa.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="p-2 rounded-lg bg-zinc-800/50">
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">Marks</p>
                      <p className="text-white font-semibold">{sem.totalMarks}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-800/50">
                      <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">Credits</p>
                      <p className="text-white font-semibold">{sem.credits}</p>
                    </div>
                  </div>
                </div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
          
          {/* Total summary bar */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-purple-500/10 border border-purple-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <TableIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Total Summary</p>
                  <p className="text-sm sm:text-base text-white font-semibold">{semesters.length} Semesters Completed</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-zinc-500">Total Marks</p>
                  <p className="text-base sm:text-xl font-bold text-white">{totalMarks}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-zinc-500">Total Credits</p>
                  <p className="text-base sm:text-xl font-bold text-white">{totalCredits}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] sm:text-xs text-zinc-500">Average SGPA</p>
                  <p className="text-base sm:text-xl font-bold text-purple-400">{avgSgpa.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
