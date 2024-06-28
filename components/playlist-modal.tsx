"use client";

import { Song } from "@/types";
import MediaItem from "./media-item";
import Modal from "./modal";
import usePlayListModal from "@/hooks/use-playlist-modal";

const PlayListModal: React.FC = () => {
    const playList = usePlayListModal();

    const onChange = () => {
        if (playList.isOpen) {
            playList.onClose();
        }
    };

    return (
        <Modal title="Playlist" description="Currently Playing Songs" isOpen={playList.isOpen} onChange={onChange}>
            {playList.songs.length !== 0 ? (
                playList.songs.map((song: Song) => <MediaItem key={song.id} data={song}></MediaItem>)
            ) : (
                <div className="text-center">No Songs Available!</div>
            )}
        </Modal>
    );
};

export default PlayListModal;
