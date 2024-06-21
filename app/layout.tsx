// Library Imports
import type { Metadata } from "next";

// Styling Imports
import { Figtree } from "next/font/google";
import "./globals.css";

// Component Imports
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";
import ModalProvider from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toaster-provider";

// Constants
const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "A Music Player built with Next.js and Tailwind CSS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className={font.className}>
                <ToasterProvider></ToasterProvider>
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider></ModalProvider>
                        <Sidebar>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
