import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import BackToTopButton from "@/components/ui/BackToTopButton";
import { SkipLinks } from "@/components/accessibility/SkipLinks";
import {
  generateMetadataUtil,
  generateViewport,
} from "@/utils/generateMetadata";

export const metadata = generateMetadataUtil({
  title: "IPURESULT",
  description:
    "Check IPU results 2025-2026 instantly: semester-wise marks, CGPA, SGPA, subject grades, and rank. Fast, mobile-friendly result checker for Guru Gobind Singh Indraprastha University students.",
  keywords: [
    "GGSIPU result",
    "IPU result",
    "GGSIPU result 2025",
    "GGSIPU result 2026",
    "check GGSIPU result",
    "IPU semester result",
    "Guru Gobind Singh Indraprastha University result",
  ],
});

export const viewport = generateViewport();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="antialiased font-sans"
        suppressHydrationWarning
      >
        {/* Skip Links for keyboard navigation */}
        <SkipLinks />

        {children}
        <Toaster />
        <BackToTopButton />
      </body>
    </html>
  );
}
