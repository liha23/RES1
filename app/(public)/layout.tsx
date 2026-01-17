import Navbar from "./navbar";
import Footer from "@/components/ui/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-18 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
