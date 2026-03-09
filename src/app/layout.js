import {Roboto} from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

const Robotofont = Roboto({
  variable: "--font-roboto",
  weight: "400",
  subsets: ["latin"],
});


export const metadata = {
  title: "Rivridis Inc | Tech Studio",
  description: "Rivridis Inc. is a technology studio specializing in software development, digital art, and storytelling. We blend technology and creativity to craft immersive digital experiences across platforms.",
};

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${Robotofont.variable} font-main`}>
      <body>
        <NextTopLoader 
          color="#e2d5a6" // Matches your text color
          showSpinner={false}
          shadow={false}
        />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
