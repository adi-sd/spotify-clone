"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import AuthModal from "@/components/auth-modal";

const ModalProvider: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
        </>
    );
};

export default ModalProvider;
