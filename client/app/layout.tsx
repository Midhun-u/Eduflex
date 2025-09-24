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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/logo/logo.png" />
      </head>
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
