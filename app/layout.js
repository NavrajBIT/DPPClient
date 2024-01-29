import "./globals.css";
import "./globalicons.css";
import { Inter } from "next/font/google";
import Navbar from "@/subcomponents/navbar/navbar";
import Footer from "@/subcomponents/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BIT DPP",
  description: "The new-age Digital Product Passport",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
