import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visualize MongoDB",
  description: "Made with Love by PrismPort",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white justify-center flex`}>
        {children}
      </body>
    </html>
  );
}
