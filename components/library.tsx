"use client";

import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useAuthModal from "@/hooks/use-auth-modal";
import useUploadModal from "@/hooks/use-upload-modal";
import { useUser } from "@/hooks/use-user";
import { Song } from "@/types";
import MediaItem from "./media-item";
import useOnPlay from "@/hooks/use-on-play";
import useSubscribeModal from "@/hooks/use-subscribe-modal";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const subscribeModal = useSubscribeModal();
    const { user, subscription } = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen(false);
        }

        if (!subscription) {
            return subscribeModal.onOpen();
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
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem onClick={(id: string) => onPlay(id)} key={item.id} data={item}></MediaItem>
                ))}
            </div>
        </div>
    );
};

export default Library;
