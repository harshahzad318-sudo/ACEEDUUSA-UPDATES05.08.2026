import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import PwaManager from "@/components/pwa/PwaManager";
import MobileBottomNav from "@/components/pwa/MobileBottomNav";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: "#0A192F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aceeducation.us"),
  title: {
    default: "ACE Education USA | Premium 1-on-1 Online & In-Home Tutoring",
    template: "%s | ACE Education USA",
  },
  description: "ACE Education USA provides personalized 1-on-1 online and in-home academic tutoring across all 50 US states. Expert tutors for Math, Reading, Science, SAT/ACT prep, and AP/IB courses.",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://aceeducation.us",
  },
  verification: {
    google: "CWsbxKKJA_5YieYzejs0l3mQbVH21kOzCr-59BYcBpw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ACE Education USA",
  },
  keywords: [
    "ACE Education USA",
    "online tutoring",
    "in-home tutoring",
    "1-on-1 tutoring",
    "SAT prep",
    "ACT prep",
    "math tutor",
    "english tutor",
    "homeschool support",
    "AP tutoring",
    "IB tutoring",
    "K-12 academic tutoring",
  ],
  authors: [{ name: "ACE Education USA", url: "https://aceeducation.us" }],
  publisher: "ACE Education USA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aceeducation.us",
    siteName: "ACE Education USA",
    title: "ACE Education USA | Premium 1-on-1 Online & In-Home Tutoring",
    description: "Personalized online and in-home academic tutoring across all 50 US states. Top 1% vetted tutors for grades K-12 and college prep.",
    images: [
      {
        url: "https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w1000",
        width: 1200,
        height: 630,
        alt: "ACE Education USA Official Crest Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ACEEducationUS",
    title: "ACE Education USA | Premium 1-on-1 Online & In-Home Tutoring",
    description: "Personalized online and in-home academic tutoring across all 50 US states.",
    images: ["https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w1000"],
  },
  icons: {
    icon: [
      { url: "https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w500", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ACE Education USA",
  "alternateName": "ACE Education US",
  "url": "https://aceeducation.us",
  "logo": "https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w1000",
  "description": "Premier nationwide provider of 1-on-1 online and in-home academic tutoring, Digital SAT/ACT prep, homeschool support, and specialized learning services across all 50 US states.",
  "telephone": "+1-800-555-ACE1",
  "email": "contact@aceeducation.us",
  "sameAs": [
    "https://facebook.com/aceeducationusa",
    "https://twitter.com/ACEEducationUS",
    "https://linkedin.com/company/aceeducationusa",
    "https://instagram.com/aceeducationusa"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "USA",
    "streetAddress": "Nationwide Educational Services Across All 50 States"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Academic Tutoring & Test Prep Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1-on-1 Online Tutoring",
          "description": "Live, interactive private tutoring using proprietary whiteboard and curriculum tools."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "In-Home Private Tutoring",
          "description": "In-person private academic instruction delivered right at your home."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital SAT & ACT Test Prep",
          "description": "Adaptive prep, practice diagnostic exams, and score improvement guarantees."
        }
      }
    ]
  }
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ACE Education USA",
  "url": "https://aceeducation.us",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aceeducation.us/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const linkedinId = process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ID;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w500" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Structured Data / JSON-LD for AI Search Engines & Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-sans pb-16 md:pb-0">
        {/* Analytics & Pixel Integrations */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}

        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}

        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {linkedinId && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${linkedinId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            `}
          </Script>
        )}

        <AuthProvider>
          <LanguageProvider>
            <PwaManager />
            <TopHeader />
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
            <MobileBottomNav />
            <ChatBot />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
