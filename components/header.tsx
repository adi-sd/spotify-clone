"use client"!;

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FaPlusCircle, FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import Button from "./button";
import useAuthModal from "@/hooks/use-auth-modal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/use-user";
import useUploadModal from "@/hooks/use-upload-modal";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user, userDetails } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // Reset any currently playing songs
        router.refresh();

        if (error) {
            toast.error("An error occurred while logging out");
        } else {
            toast.success("Logged out successfully!");
        }
    };

    return (
        <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretLeft className="text-white" size={35}></RxCaretLeft>
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretRight className="text-white" size={35}></RxCaretRight>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-4 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20}></HiHome>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20}></BiSearch>
                    </button>
                    <button
                        className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
                        onClick={uploadModal.onOpen}
                    >
                        <FaPlusCircle className="text-black" size={20}></FaPlusCircle>
                    </button>
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={() => {
                                    router.push("/profile");
                                }}
                                className="flex items-center gap-x-3 pl-3 pr-4 py-2"
                            >
                                {userDetails?.avatar_url ? (
                                    (console.log(userDetails.avatar_url),
                                    (
                                        <Image
                                            className="rounded-full"
                                            src={userDetails.avatar_url}
                                            alt="Avatar Image"
                                            width={25}
                                            height={25}
                                        ></Image>
                                    ))
                                ) : (
                                    <FaUserAlt></FaUserAlt>
                                )}
                                <p>{userDetails?.full_name ? userDetails.full_name : "User Profile"}</p>
                            </Button>
                            <Button onClick={handleLogout} className="bg-white px-6 py-2">
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={() => {
                                        authModal.onOpen(true);
                                    }}
                                    className="px-5 py-2"
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        authModal.onOpen(false);
                                    }}
                                    className="bg-white px-6 py-2"
                                >
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Header;
