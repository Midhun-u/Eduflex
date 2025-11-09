import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import Footer from "@/components/layout/Footer";
import "./global.scss";
import ReduxProvider from "@/components/features/ReduxProvider";
import Toaster from "@/components/ui/Toaster";

const poppins = Poppins({
  subsets : ['latin'],
  weight : ['400' , '500' , '600' , '700'],
  variable : '--font-poppins'
});

export const metadata: Metadata = {
  title: "Eduflex",
  description: "Learning Management System",
  icons : {
    icon : "/assets/logo/logo.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ReduxProvider>
          {children}
          <Footer />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
