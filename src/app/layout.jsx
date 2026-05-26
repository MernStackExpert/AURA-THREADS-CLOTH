import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aura Threads | Premium Clothing Brand",
  description: "Discover the latest trends in fashion with Aura Threads.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#000",
                color: "#fff",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderRadius: "0px",
                padding: "16px 24px",
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
