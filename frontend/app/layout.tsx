import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

export const metadata: Metadata = {
    title: {
        template: '%s — Taung Ywar Ma Village',
        default: 'Taung Ywar Ma Village',
    },
    description: "Help village products reach the market while sharing the village's culture with the world.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`font-sans antialiased bg-gray-50 text-text-primary flex flex-col min-h-screen`}>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-brand text-white px-4 py-2 rounded shadow-card font-medium">
                    Skip to main content
                </a>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
