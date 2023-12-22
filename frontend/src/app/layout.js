import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./_context/AppContext.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visualize MongoDB",
  description: "Made with Love by PrismPort",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white flex overflow-y-hidden`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
