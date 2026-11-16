// layout.tsx
import type { Metadata } from "next"; // Changed next/font to next
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./footer";
import { SITE, SITE_URL } from "../lib/site";

// Company data for Google (shown to crawlers only, invisible to visitors).
// Edit company facts in src/lib/site.ts.
const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE.name,
            legalName: SITE.legalName,
            url: SITE_URL,
            logo: SITE.logo,
            email: SITE.email,
            sameAs: SITE.socials.map((s) => s.url),
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE.name,
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
    ],
};
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE.title,
        // Other pages become e.g. "Video Catalogue | Kplor"
        template: "%s | Kplor",
    },
    description: SITE.description,
    // Canonical URLs are set per page (see src/lib/seo.ts), never here,
    // otherwise every page would inherit the homepage as its canonical.
    openGraph: {
        type: "website",
        siteName: SITE.name,
        title: SITE.title,
        description: SITE.description,
        // Preview image comes from src/app/opengraph-image.tsx
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.description,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Load gtag.js from Google */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-7PK6EJB9NX"
                    strategy="afterInteractive"
                />
                {/* Initialize gtag */}
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-7PK6EJB9NX');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
            >
            {/* Sticky Navbar */}
            <Navbar/>

            {/* Removed background from here. page.tsx will manage backgrounds. */}
            <div className="min-h-screen rgb(115, 154, 204)"> {/* Set a default white background here */}
                {children}
            </div>

            <Footer />
            </body>
            
        </html>
    );
}
