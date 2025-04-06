import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      </head>
      <body>
        <ClerkProvider>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
