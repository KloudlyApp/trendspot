import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Header from "./components/Header";
import Updates from "./components/Updates";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trendspot.",
  description: "Trending TikTok Videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative dark:bg-black flex justify-between`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}
          <Updates/>
        </ThemeProvider>
      </body>
    </html>
  );
}
