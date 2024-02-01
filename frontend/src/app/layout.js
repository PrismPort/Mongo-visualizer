import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Peek",
  description: "Made with Love by PrismPort",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white h-screen justify-center flex`}
      >
        {children}
      </body>
    </html>
  );
}
