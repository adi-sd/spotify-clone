"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import AuthModal from "@/components/auth-modal";
import UploadModal from "@/components/upload-modal";
import SubscribeModal from "@/components/subscribe-modal";
import { ProductWithPrice } from "@/types";
import PlayListModal from "@/components/playlist-modal";

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
            <PlayListModal></PlayListModal>
        </>
    );
};

export default ModalProvider;
