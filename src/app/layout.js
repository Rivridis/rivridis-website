import {Roboto} from "next/font/google";
import "./globals.css";

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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
