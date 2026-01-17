"use client";

import { Button } from "@/components/ui/button";
import { ProcessedData } from "../../app/(public)/result/types";
import { LogOut, GraduationCap, Building2, Calendar, Award, BookOpen } from "lucide-react";

interface StudentHeaderProps {
  data: ProcessedData;
  selectedSemester: number | "OVERALL";
  onSemesterChange: (semester: number | "OVERALL") => void;
  onReset: () => void;
  showMarksBreakdown: boolean;
}

export default function StudentHeader({
  data,
  selectedSemester,
  onSemesterChange,
  onReset,
}: StudentHeaderProps) {
  return (
    <div className="relative animate-slide-up">
      {/* Floating background elements with vibrant colors */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl animate-float-reverse pointer-events-none" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border-2 border-transparent bg-gradient-to-r from-fuchsia-500/10 via-purple-500/5 to-cyan-500/10 overflow-hidden shadow-2xl">
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-cyan-500/10 to-amber-500/20 opacity-70 animate-gradient" />
        
        <div className="relative p-6">
          <div className="flex justify-between items-start flex-wrap gap-6">
            {/* Left section - Student info */}
            <div className="flex-1 min-w-[300px]">
              {/* Name with floating icon */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 rounded-xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse-glow" />
                  <div className="relative p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 shadow-xl transform transition-transform duration-300 group-hover:scale-110 animate-float" style={{ animationDuration: '3s' }}>
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-fuchsia-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent tracking-tight">
                    {data.studentInfo.name}
                  </h1>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Student Profile</p>
                </div>
              </div>
              
              {/* Info cards grid with floating effect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Enrollment Number */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-900/50 to-pink-900/30 border-2 border-fuchsia-500/40 p-3 sm:p-4 transition-all duration-300 hover:border-fuchsia-400/60 hover:shadow-2xl hover:shadow-fuchsia-500/30 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-fuchsia-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 group-hover:scale-110 transition-transform shadow-lg shadow-fuchsia-500/50">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-fuchsia-300 uppercase block mb-0.5 sm:mb-1">
                        Enrollment No.
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-semibold text-white tracking-wide break-all">
                        {data.studentInfo.enrollmentNumber}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Year of Admission */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/50 to-blue-900/30 border-2 border-cyan-500/40 p-3 sm:p-4 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-cyan-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-cyan-300 uppercase block mb-0.5 sm:mb-1">
                        Year of Admission
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {data.studentInfo.yearOfAdmission}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Institute */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-900/50 to-orange-900/30 border-2 border-amber-500/40 p-3 sm:p-4 transition-all duration-300 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/50">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-amber-300 uppercase block mb-0.5 sm:mb-1">
                        Institute
                      </span>
                      <span className="text-xs sm:text-sm text-white leading-snug block">
                        {data.studentInfo.institute}
                        <span className="ml-1.5 sm:ml-2 inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium bg-amber-600/40 text-amber-200 border border-amber-500/40">
                          {data.studentInfo.instituteCode}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Program */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-lime-900/50 to-emerald-900/30 border-2 border-lime-500/40 p-3 sm:p-4 transition-all duration-300 hover:border-lime-400/60 hover:shadow-2xl hover:shadow-lime-500/30 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-lime-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500 group-hover:scale-110 transition-transform shadow-lg shadow-lime-500/50">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-lime-300 uppercase block mb-0.5 sm:mb-1">
                        Program
                      </span>
                      <span className="text-xs sm:text-sm text-white leading-snug block">
                        {data.studentInfo.program}
                        <span className="ml-1.5 sm:ml-2 inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium bg-lime-600/40 text-lime-200 border border-lime-500/40">
                          {data.studentInfo.programCode}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Semester Tabs */}
              <div className="mt-4 sm:mt-6">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-zinc-400 uppercase block mb-2 sm:mb-3">
                  Select Semester
                </span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => onSemesterChange("OVERALL")}
                    className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ${
                      selectedSemester === "OVERALL"
                        ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white shadow-2xl shadow-fuchsia-500/40 scale-105"
                        : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700/80 hover:text-white border-2 border-zinc-700/50 hover:border-fuchsia-500/50"
                    }`}
                  >
                    {selectedSemester === "OVERALL" && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/40 via-purple-500/40 to-cyan-500/40 blur-xl -z-10 animate-pulse" />
                    )}
                    Overall
                  </button>
                  {data.semesters.map((sem, index) => (
                    <button
                      key={sem.euno}
                      onClick={() => onSemesterChange(sem.euno)}
                      className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 animate-scale-in ${
                        selectedSemester === sem.euno
                          ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 text-white shadow-2xl shadow-cyan-500/40 scale-105"
                          : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700/80 hover:text-white border-2 border-zinc-700/50 hover:border-cyan-500/50"
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {selectedSemester === sem.euno && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-fuchsia-500/40 blur-xl -z-10 animate-pulse" />
                      )}
                      Sem {sem.euno}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right section - CGPA Card */}
            <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[220px]">
              <Button
                onClick={onReset}
                variant="outline"
                className="border-red-600 bg-red-700/80 hover:bg-red-600/80 text-white hover:border-red-400/50 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-red-500/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              
              {/* 3D Floating CGPA Card with vibrant colors */}
              <div className="group relative">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse-glow" />
                
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-fuchsia-500/30 via-purple-500/20 to-cyan-500/30 border-2 border-fuchsia-400/50 rounded-2xl p-5 sm:p-6 w-full transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 overflow-hidden shadow-2xl shadow-fuchsia-500/30">
                  {/* Inner decorations */}
                  <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-cyan-400/30 rounded-full blur-2xl animate-float-slow" />
                  <div className="absolute bottom-0 left-0 w-14 sm:w-16 h-14 sm:h-16 bg-fuchsia-400/30 rounded-full blur-xl animate-float-reverse" />
                  
                  {/* Content */}
                  <div className="relative">
                    <p className="text-xs sm:text-sm bg-gradient-to-r from-fuchsia-200 to-cyan-200 bg-clip-text text-transparent mb-1 font-medium tracking-wide">CUMULATIVE GPA</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-fuchsia-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient">
                        {data.cgpa.toFixed(2)}
                      </p>
                      <span className="text-zinc-300 text-base sm:text-lg font-bold">/10</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/70 mt-2 sm:mt-3 font-medium">Weighted average across all semesters</p>
                    
                    {/* Progress indicator */}
                    <div className="mt-3 sm:mt-4">
                      <div className="h-2.5 bg-zinc-800/70 rounded-full overflow-hidden border border-zinc-700/50">
                        <div 
                          className="h-full bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-fuchsia-500/50"
                          style={{ width: `${(data.cgpa / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
