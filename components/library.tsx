"use client";

import useAuthModal from "@/hooks/use-auth-modal";
import useUploadModal from "@/hooks/use-upload-modal";
import { useUser } from "@/hooks/use-user";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

interface LibraryProps {}

const Library: React.FC<LibraryProps> = ({}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onClick = () => {
        if (!user) {
            return authModal.onOpen(false);
        }
        return uploadModal.onOpen();
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="inline-flex items-center gap-x-4">
                    <TbPlaylist className="text-neutral-400" size={26}></TbPlaylist>
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <AiOutlinePlus
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                    onClick={onClick}
                    size={20}
                ></AiOutlinePlus>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">List of Songs!</div>
        </div>
    );
};

export default Library;
