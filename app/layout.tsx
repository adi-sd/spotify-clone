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
import getSongsByUserId from "@/actions/get-songs-by-user";
import getActiveProductWithPrices from "@/actions/get-active-product-with-prices";
import MusicPlayer from "@/components/music-player";

// Constants
const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "A Music Player built with Next.js and Tailwind CSS",
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userSongs = await getSongsByUserId();
    const products = await getActiveProductWithPrices();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className={font.className}>
                <ToasterProvider></ToasterProvider>
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider products={products}></ModalProvider>
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <MusicPlayer></MusicPlayer>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
