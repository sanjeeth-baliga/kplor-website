// layout.tsx
import type { Metadata } from "next"; // Changed next/font to next
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./footer";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kplor",
    description: "Live classroom experience on autopilot",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            {/* Sticky Navbar */}
            <Navbar/>

            {/* Removed background from here. page.tsx will manage backgrounds. */}
            <div className="min-h-screen rgb(115, 154, 204)"> {/* Set a default white background here */}
                {children}
            </div>

            <Footer />
            </body>
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-7PK6EJB9NX');`}
            </Script>
        </html>
    );
}