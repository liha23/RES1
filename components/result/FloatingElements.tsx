"use client";

interface FloatingElementsProps {
  variant?: "default" | "minimal" | "dense";
}

export default function FloatingElements({ variant = "default" }: FloatingElementsProps) {
  if (variant === "minimal") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle floating orbs */}
        <div className="floating-orb w-32 h-32 bg-purple-500 top-10 right-10 animate-float-slow" />
        <div className="floating-orb w-24 h-24 bg-violet-600 bottom-20 left-10 animate-float-reverse" />
      </div>
    );
  }

  if (variant === "dense") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Multiple floating elements */}
        <div className="floating-orb w-40 h-40 bg-purple-500 top-0 right-1/4 animate-float-slow" />
        <div className="floating-orb w-32 h-32 bg-violet-600 top-1/3 left-10 animate-float" />
        <div className="floating-orb w-24 h-24 bg-fuchsia-500 bottom-1/4 right-10 animate-float-reverse" />
        <div className="floating-orb w-36 h-36 bg-indigo-500 bottom-10 left-1/3 animate-float-slow stagger-2" />
        <div className="floating-orb w-20 h-20 bg-purple-400 top-1/2 right-1/3 animate-float stagger-3" />
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 border-2 border-purple-500/30 rotate-45 animate-rotate-slow" />
        <div className="absolute bottom-40 right-40 w-6 h-6 border-2 border-violet-500/30 animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-purple-500/20 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary floating orbs */}
      <div className="floating-orb w-64 h-64 bg-purple-500/40 -top-20 -right-20 animate-float-slow" />
      <div className="floating-orb w-48 h-48 bg-violet-600/30 top-1/3 -left-20 animate-float" />
      <div className="floating-orb w-32 h-32 bg-fuchsia-500/30 bottom-20 right-1/4 animate-float-reverse" />
      
      {/* Secondary accent orbs */}
      <div className="floating-orb w-24 h-24 bg-indigo-500/20 top-1/2 right-10 animate-float stagger-2" />
      <div className="floating-orb w-20 h-20 bg-purple-400/25 bottom-1/3 left-1/4 animate-float-slow stagger-3" />
      
      {/* Small decorative elements */}
      <div className="absolute top-32 right-1/3 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse" />
      <div className="absolute bottom-48 left-1/2 w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-pulse stagger-2" />
      <div className="absolute top-1/2 right-20 w-2.5 h-2.5 bg-fuchsia-400/50 rounded-full animate-pulse stagger-3" />
    </div>
  );
}
