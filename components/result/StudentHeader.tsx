"use client";

import { Button } from "@/components/ui/button";
import { ProcessedData } from "../../app/(public)/result/types";
import { ArrowLeft, GraduationCap, Building2, Calendar, Award, BookOpen } from "lucide-react";

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
      {/* Floating background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl animate-float-reverse pointer-events-none" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl border border-zinc-800/50 overflow-hidden">
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-violet-500/10 opacity-50" />
        
        <div className="relative p-6">
          <div className="flex justify-between items-start flex-wrap gap-6">
            {/* Left section - Student info */}
            <div className="flex-1 min-w-[300px]">
              {/* Name with floating icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse-glow" />
                  <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg transform transition-transform duration-300 group-hover:scale-110 animate-float" style={{ animationDuration: '3s' }}>
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    {data.studentInfo.name}
                  </h1>
                  <p className="text-zinc-500 text-sm mt-1">Student Profile</p>
                </div>
              </div>
              
              {/* Info cards grid with floating effect */}
              <div className="grid grid-cols-2 gap-3">
                {/* Enrollment Number */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 p-4 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase block mb-1">
                        Enrollment No.
                      </span>
                      <span className="text-sm font-mono font-semibold text-white tracking-wide">
                        {data.studentInfo.enrollmentNumber}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Year of Admission */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 p-4 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-violet-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/20 group-hover:bg-violet-500/30 transition-colors">
                      <Calendar className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase block mb-1">
                        Year of Admission
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {data.studentInfo.yearOfAdmission}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Institute */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 p-4 transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/10 hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-fuchsia-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-fuchsia-500/20 group-hover:bg-fuchsia-500/30 transition-colors">
                      <Building2 className="w-4 h-4 text-fuchsia-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase block mb-1">
                        Institute
                      </span>
                      <span className="text-sm text-white leading-snug block">
                        {data.studentInfo.institute}
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-700/50 text-zinc-400 border border-zinc-600/30">
                          {data.studentInfo.instituteCode}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Program */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 p-4 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase block mb-1">
                        Program
                      </span>
                      <span className="text-sm text-white leading-snug block">
                        {data.studentInfo.program}
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {data.studentInfo.programCode}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Semester Tabs */}
              <div className="mt-6">
                <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase block mb-3">
                  Select Semester
                </span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => onSemesterChange("OVERALL")}
                    className={`group relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      selectedSemester === "OVERALL"
                        ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700/80 hover:text-white border border-zinc-700/50 hover:border-purple-500/30"
                    }`}
                  >
                    {selectedSemester === "OVERALL" && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-violet-500/30 blur-lg -z-10 animate-pulse" />
                    )}
                    Overall
                  </button>
                  {data.semesters.map((sem, index) => (
                    <button
                      key={sem.euno}
                      onClick={() => onSemesterChange(sem.euno)}
                      className={`group relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 animate-scale-in ${
                        selectedSemester === sem.euno
                          ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25"
                          : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700/80 hover:text-white border border-zinc-700/50 hover:border-purple-500/30"
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {selectedSemester === sem.euno && (
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-violet-500/30 blur-lg -z-10 animate-pulse" />
                      )}
                      Sem {sem.euno}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right section - CGPA Card */}
            <div className="flex flex-col gap-3 md:w-fit w-full">
              <Button
                onClick={onReset}
                variant="outline"
                className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700/80 text-white hover:border-purple-500/30 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              {/* 3D Floating CGPA Card */}
              <div className="group relative">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse-glow" />
                
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-purple-500/20 to-violet-600/10 border border-purple-500/30 rounded-2xl p-6 min-w-[200px] transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 overflow-hidden">
                  {/* Inner decorations */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-violet-500/20 rounded-full blur-xl" />
                  
                  {/* Content */}
                  <div className="relative">
                    <p className="text-sm text-white/80 mb-1 font-medium tracking-wide">CUMULATIVE GPA</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-5xl font-black bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent animate-gradient">
                        {data.cgpa.toFixed(2)}
                      </p>
                      <span className="text-zinc-400 text-lg">/10</span>
                    </div>
                    <p className="text-xs text-white/60 mt-3">Weighted average across all semesters</p>
                    
                    {/* Progress indicator */}
                    <div className="mt-4">
                      <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-1000 ease-out"
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
