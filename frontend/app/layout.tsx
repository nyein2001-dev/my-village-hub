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
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
