import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

export const metadata: Metadata = {
    title: "Taung Ywar Ma Village",
    description: "Help village products reach the market while sharing the village's culture with the world.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`font-sans antialiased bg-surface-muted text-text-main flex flex-col min-h-screen`}>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
