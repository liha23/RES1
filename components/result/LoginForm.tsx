"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, GraduationCap, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  enrollmentNumber: string;
  password: string;
  captcha: string;
  captchaImage: string;
  isLoading: boolean;
  isLoadingCaptcha: boolean;
  error: string;
  onEnrollmentChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onCaptchaChange: (value: string) => void;
  onRefreshCaptcha: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  enrollmentNumber,
  password,
  captcha,
  captchaImage,
  isLoading,
  isLoadingCaptcha,
  error,
  onEnrollmentChange,
  onPasswordChange,
  onCaptchaChange,
  onRefreshCaptcha,
  onSubmit,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Login Form Card */}
      <Card className="bg-zinc-900 border-zinc-800 w-full max-w-xl mx-auto relative sm:max-w-xl">
        <CardContent className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="relative inline-flex mb-5">
              <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-black shadow-xl transform transition-transform hover:scale-110 duration-300">
                <GraduationCap className="h-8 w-8" strokeWidth={2.5} />
              </div>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              IPURESULT
            </h1>
            <p className="text-zinc-400 text-sm font-medium">
              Enter your credentials to view your result analysis
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="enrollment" className="text-white">
                Enrollment Number
              </Label>
              <Input
                id="enrollment"
                type="text"
                placeholder="Enter Enrollment No."
                value={enrollmentNumber}
                onChange={(e) => onEnrollmentChange(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-zinc-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="captcha" className="text-white">
                Captcha
              </Label>
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  id="captcha"
                  type="text"
                  placeholder="ENTER CAPTCHA"
                  value={captcha}
                  onChange={(e) =>
                    onCaptchaChange(e.target.value.toUpperCase())
                  }
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 flex-1 w-full md:w-auto"
                  disabled={isLoading}
                />
                <div className="flex gap-2">
                  {isLoadingCaptcha || !captchaImage ? (
                    <Skeleton className="h-10 w-32 border border-zinc-700 rounded" />
                  ) : (
                    <img
                      src={captchaImage}
                      alt="Captcha"
                      className="h-10 w-32 border border-zinc-700 rounded bg-white object-contain"
                    />
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={onRefreshCaptcha}
                    disabled={isLoadingCaptcha || isLoading}
                    className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${
                        isLoadingCaptcha ? "animate-spin" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-primary/10 border border-primary/50 rounded text-primary text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold mb-1">Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || isLoadingCaptcha}
              className="w-full bg-primary hover:bg-purple-400 text-black font-semibold py-4 text-base"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-zinc-500 text-xs mt-4">
            Data is fetched directly from GGSIPU Exam Portal.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
