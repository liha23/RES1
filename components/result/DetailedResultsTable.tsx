"use client";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResultAPIResponse,
  ProcessedSemester,
} from "../../app/(public)/result/types";
import { marksToGrade } from "../../app/(public)/result/utils";
import { FileText, ChevronRight } from "lucide-react";

interface DetailedResultsTableProps {
  results: ResultAPIResponse[];
  selectedSemester: number | "OVERALL";
  semesters: ProcessedSemester[];
  showMarksBreakdown?: boolean;
  onToggleMarksBreakdown?: (value: boolean) => void;
}

export default function DetailedResultsTable({
  results,
  selectedSemester,
  semesters,
  showMarksBreakdown = true,
  onToggleMarksBreakdown,
}: DetailedResultsTableProps) {
  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case "O":
        return "bg-gradient-to-r from-green-500/30 to-emerald-500/20 text-green-400 border-green-500/30 shadow-green-500/20";
      case "A+":
        return "bg-gradient-to-r from-purple-500/30 to-violet-500/20 text-purple-300 border-purple-500/30 shadow-purple-500/20";
      case "A":
        return "bg-gradient-to-r from-blue-500/30 to-indigo-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/20";
      case "B+":
        return "bg-gradient-to-r from-cyan-500/30 to-teal-500/20 text-cyan-400 border-cyan-500/30 shadow-cyan-500/20";
      case "B":
        return "bg-gradient-to-r from-yellow-500/30 to-amber-500/20 text-yellow-400 border-yellow-500/30 shadow-yellow-500/20";
      case "C":
        return "bg-gradient-to-r from-orange-500/30 to-amber-500/20 text-orange-400 border-orange-500/30 shadow-orange-500/20";
      case "P":
        return "bg-gradient-to-r from-zinc-500/30 to-slate-500/20 text-zinc-300 border-zinc-500/30 shadow-zinc-500/20";
      default:
        return "bg-gradient-to-r from-red-500/30 to-rose-500/20 text-red-400 border-red-500/30 shadow-red-500/20";
    }
  };

  const getMarksColor = (marks: number) => {
    if (marks >= 90) return "text-green-400";
    if (marks >= 75) return "text-purple-400";
    if (marks >= 60) return "text-blue-400";
    if (marks >= 45) return "text-yellow-400";
    return "text-red-400";
  };

  if (selectedSemester === "OVERALL") {
    // Group by semester
    const groupedBySemester: Record<number, ResultAPIResponse[]> = {};
    results.forEach((result) => {
      if (!groupedBySemester[result.euno]) {
        groupedBySemester[result.euno] = [];
      }
      groupedBySemester[result.euno].push(result);
    });

    const sortedSemesters = Object.keys(groupedBySemester)
      .map(Number)
      .sort((a, b) => a - b);

    return (
      <div className="relative animate-slide-up stagger-5">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-600/5 rounded-2xl blur-xl opacity-50" />
        
        {/* Main card */}
        <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-800/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 animate-float" style={{ animationDuration: '4s' }}>
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    COMPLETE TRANSCRIPT
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    {results.length} subjects across all semesters
                  </p>
                </div>
              </div>
              {onToggleMarksBreakdown && (
                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                  <label
                    htmlFor="marks-breakdown-toggle-overall"
                    className="text-xs sm:text-sm text-zinc-400 cursor-pointer"
                  >
                    Show Details
                  </label>
                  <Switch
                    id="marks-breakdown-toggle-overall"
                    checked={showMarksBreakdown}
                    onCheckedChange={onToggleMarksBreakdown}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
            {sortedSemesters.map((semNum, semIndex) => {
              const semResults = groupedBySemester[semNum];
              const semData = semesters.find((s) => s.euno === semNum);

              return (
                <div
                  key={semNum}
                  className="rounded-xl border border-zinc-800/50 overflow-hidden bg-zinc-900/30 animate-scale-in"
                  style={{ animationDelay: `${semIndex * 0.1}s` }}
                >
                  {/* Semester Header */}
                  <div className="bg-gradient-to-r from-zinc-800/80 to-zinc-900/50 px-3 sm:px-5 py-3 sm:py-4 border-b border-zinc-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/20 flex-shrink-0">
                          {semNum}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base text-white font-semibold">
                            Semester {semNum}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-zinc-500">{semResults.length} subjects</p>
                        </div>
                      </div>
                      {semData && (
                        <div className="flex gap-2 flex-wrap">
                          <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                            <span className="text-[10px] sm:text-xs text-zinc-500">Total: </span>
                            <span className="text-xs sm:text-sm font-semibold text-white">{semData.totalMarks}</span>
                          </div>
                          <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30">
                            <span className="text-[10px] sm:text-xs text-zinc-400">SGPA: </span>
                            <span className="text-xs sm:text-sm font-bold text-purple-400">{semData.sgpa.toFixed(2)}</span>
                          </div>
                          <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                            <span className="text-[10px] sm:text-xs text-zinc-500">Credits: </span>
                            <span className="text-xs sm:text-sm font-semibold text-white">{semData.credits}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Semester Table */}
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow className="border-b border-zinc-800/50 bg-zinc-900/50 hover:bg-zinc-900/50">
                          <TableHead className="text-left p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider md:hidden">
                            Subject
                          </TableHead>
                          <TableHead className="text-left p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                            Code
                          </TableHead>
                          <TableHead className="text-left p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                            Subject Name
                          </TableHead>
                          {showMarksBreakdown && (
                            <>
                              <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                                Internal
                              </TableHead>
                              <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                                External
                              </TableHead>
                            </>
                          )}
                          <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                            Total
                          </TableHead>
                          <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                            Grade
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semResults.map((result, index) => {
                          const totalMarks = parseFloat(result.moderatedprint) || 0;
                          const grade = marksToGrade(totalMarks);
                          return (
                            <TableRow
                              key={`${result.papercode}-${index}`}
                              className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors group"
                            >
                              {/* Mobile: Combined column */}
                              <TableCell className="p-3 sm:p-4 md:hidden">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-zinc-500 font-mono">
                                    {result.papercode}
                                  </span>
                                  <span className="text-xs sm:text-sm text-white leading-snug">
                                    {result.papername}
                                  </span>
                                </div>
                              </TableCell>
                              {/* Desktop columns */}
                              <TableCell className="p-3 sm:p-4 text-zinc-400 font-mono text-xs sm:text-sm hidden md:table-cell">
                                {result.papercode}
                              </TableCell>
                              <TableCell className="p-3 sm:p-4 text-sm sm:text-base text-white hidden md:table-cell">
                                {result.papername}
                              </TableCell>
                              {showMarksBreakdown && (
                                <>
                                  <TableCell className="p-3 sm:p-4 text-center text-xs sm:text-sm text-zinc-400 hidden md:table-cell">
                                    {result.minorprint === "-" ? "-" : result.minorprint}
                                  </TableCell>
                                  <TableCell className="p-3 sm:p-4 text-center text-xs sm:text-sm text-zinc-400 hidden md:table-cell">
                                    {result.majorprint}
                                  </TableCell>
                                </>
                              )}
                              <TableCell className={`p-3 sm:p-4 text-center text-sm sm:text-base font-bold ${getMarksColor(totalMarks)}`}>
                                {result.moderatedprint}
                              </TableCell>
                              <TableCell className="p-3 sm:p-4 text-center">
                                <span
                                  className={`inline-flex px-2 sm:px-3 py-1 rounded-lg text-xs font-bold border shadow-sm ${getGradeBadgeClass(grade)}`}
                                >
                                  {grade}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Single semester view
  return (
    <div className="relative animate-slide-up stagger-5">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-600/5 rounded-2xl blur-xl opacity-50" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 animate-float" style={{ animationDuration: '4s' }}>
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  SEMESTER {selectedSemester}
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                  <span className="text-purple-400">RESULTS</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500">
                  {results.length} subjects
                </p>
              </div>
            </div>
            {onToggleMarksBreakdown && (
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <label
                  htmlFor="marks-breakdown-toggle-semester"
                  className="text-xs sm:text-sm text-zinc-400 cursor-pointer"
                >
                  Show Details
                </label>
                <Switch
                  id="marks-breakdown-toggle-semester"
                  checked={showMarksBreakdown}
                  onCheckedChange={onToggleMarksBreakdown}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-zinc-800/50 bg-zinc-900/50 hover:bg-zinc-900/50">
                <TableHead className="text-left p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider md:hidden">
                  Subject
                </TableHead>
                <TableHead className="text-left p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                  Code
                </TableHead>
                <TableHead className="text-left p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                  Subject Name
                </TableHead>
                {showMarksBreakdown && (
                  <>
                    <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                      Internal
                    </TableHead>
                    <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                      External
                    </TableHead>
                  </>
                )}
                <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  Total
                </TableHead>
                <TableHead className="text-center p-4 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  Grade
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => {
                const totalMarks = parseFloat(result.moderatedprint) || 0;
                const grade = marksToGrade(totalMarks);
                return (
                  <TableRow
                    key={`${result.papercode}-${index}`}
                    className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Mobile: Combined column */}
                    <TableCell className="p-3 sm:p-4 md:hidden">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {result.papercode}
                        </span>
                        <span className="text-xs sm:text-sm text-white leading-snug">
                          {result.papername}
                        </span>
                      </div>
                    </TableCell>
                    {/* Desktop columns */}
                    <TableCell className="p-3 sm:p-4 text-zinc-400 font-mono text-xs sm:text-sm hidden md:table-cell">
                      {result.papercode}
                    </TableCell>
                    <TableCell className="p-3 sm:p-4 text-sm sm:text-base text-white hidden md:table-cell">
                      {result.papername}
                    </TableCell>
                    {showMarksBreakdown && (
                      <>
                        <TableCell className="p-3 sm:p-4 text-center text-xs sm:text-sm text-zinc-400 hidden md:table-cell">
                          {result.minorprint === "-" ? "-" : result.minorprint}
                        </TableCell>
                        <TableCell className="p-3 sm:p-4 text-center text-xs sm:text-sm text-zinc-400 hidden md:table-cell">
                          {result.majorprint}
                        </TableCell>
                      </>
                    )}
                    <TableCell className={`p-3 sm:p-4 text-center text-sm sm:text-base font-bold ${getMarksColor(totalMarks)}`}>
                      {result.moderatedprint}
                    </TableCell>
                    <TableCell className="p-3 sm:p-4 text-center">
                      <span
                        className={`inline-flex px-2 sm:px-3 py-1 rounded-lg text-xs font-bold border shadow-sm ${getGradeBadgeClass(grade)}`}
                      >
                        {grade}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {results.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No subjects found for the selected semester</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
