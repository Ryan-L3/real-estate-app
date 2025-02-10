import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Snackbar } from "@mui/material";
import Script from "next/script"; // Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ryan Le - Real Estate App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
