"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth, SocialAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import Modal from "./modal";
import useAuthModal from "@/hooks/use-auth-modal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen, isSignUp } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const getDescription = () => {
        if (isSignUp) {
            return "Sign up for a new Spotify Clone account.";
        } else {
            return "Login to your Spotify Clone account.";
        }
    };

    return (
        <Modal title="Welcome Back!" description={getDescription()} isOpen={isOpen} onChange={onChange}>
            <Auth
                theme="dark"
                magicLink
                view={isSignUp ? "sign_up" : "sign_in"}
                supabaseClient={supabaseClient}
                providers={["spotify"]}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            },
                        },
                    },
                }}
            ></Auth>
        </Modal>
    );
};

export default AuthModal;
