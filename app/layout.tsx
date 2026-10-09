import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaming Gadgets on Rent in Bangalore - PS5, Xbox, VR | SharePal",
  description:
    "Rent gaming consoles, PS5 with FC26/FC27, controllers, Xbox Series S, VR headsets & racing wheels in Bangalore. Free doorstep delivery & pickup, zero security deposit options, verified quality gear.",
  keywords: [
    "gaming console on rent",
    "PS5 on rent Bangalore",
    "rent playstation 5 Bangalore",
    "Xbox on rent",
    "VR headset rent Bangalore",
    "SharePal gaming rent",
  ],
  authors: [{ name: "SharePal" }],
  metadataBase: new URL("https://sharepal.in"),
  alternates: {
    canonical: "/bangalore/gaming-gadgets-on-rent",
  },
  openGraph: {
    title: "Gaming Gadgets on Rent in Bangalore | SharePal",
    description:
      "Rent PS5 consoles with FC26/FC27, Xbox, VR headsets & racing wheels in Bangalore with doorstep delivery.",
    url: "https://sharepal.in/bangalore/gaming-gadgets-on-rent",
    siteName: "SharePal",
    images: [
      {
        url: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp",
        width: 1200,
        height: 630,
        alt: "Gaming Consoles on Rent in Bangalore - SharePal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming Gadgets on Rent in Bangalore | SharePal",
    description: "Rent PS5 consoles, Xbox & VR in Bangalore from SharePal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "PlayStation Portal Remote Player",
        description: "PlayStation Portal Remote Player on rent in Bangalore",
        offers: {
          "@type": "Offer",
          price: "158.25",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Product",
        position: 2,
        name: "PS5 + FC27 + 1 Controller",
        description: "PS5 Console with FC27 and 1 Controller on rent in Bangalore",
        offers: {
          "@type": "Offer",
          price: "250.00",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${ubuntu.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased selection:bg-[#8ee600] selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
