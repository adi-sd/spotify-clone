"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song } from "@/types";
import MediaItem from "./media-item";
import LikeButton from "./like-button";
import Slider from "./slider";
import useMusicPlayer from "@/hooks/use-music-player";
import useSound from "use-sound";
import { TbPlaylist } from "react-icons/tb";
import usePlayListModal from "@/hooks/use-playlist-modal";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
    songs?: Song[];
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl, songs }) => {
    const player = useMusicPlayer();
    const playList = usePlayListModal();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) return;
        const currentIndex = player.ids.findIndex((id) => id == player.activeId);
        const nextSong = player.ids[currentIndex + 1] || player.ids[0];
        player.setId(nextSong);
    };

    const onPlayPervious = () => {
        if (player.ids.length === 0) return;
        const currentIndex = player.ids.findIndex((id) => id == player.activeId);
        const nextSong = player.ids[currentIndex - 1] || player.ids[player.ids.length - 1];
        player.setId(nextSong);
    };

    const onOpenPlaylist = () => {
        if (!player.songs) {
            return;
        } else {
            playList.setSongs(player.songs);
            playList.onOpen();
        }
    };

    const [play, { pause, sound }] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"],
    });

    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload();
        };
    }, [sound]);

    const handlePlay = () => {
        console.log(songUrl);
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}></MediaItem>
                    <LikeButton songId={song.id} size={30}></LikeButton>
                </div>
            </div>

            <div className="flex md:hidden col-auto justify-end items-center">
                <div
                    onClick={handlePlay}
                    className="flex items-center justify-center h-10 w-10  rounded-full bg-white p-1 cursor-pointer"
                >
                    <Icon size={30} className="text-black"></Icon>
                </div>
            </div>

            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward
                    size={30}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                    onClick={onPlayPervious}
                ></AiFillStepBackward>
                <div
                    onClick={handlePlay}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
                >
                    <Icon size={30} className="text-black"></Icon>
                </div>
                <AiFillStepForward
                    size={30}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                    onClick={onPlayNext}
                ></AiFillStepForward>
            </div>

            <div className="hidden md:flex w-full justify-end items-center gap-x-6 pr-2">
                <div className="flex items-center justify-center cursor-pointer">
                    <TbPlaylist size={30} onClick={onOpenPlaylist}></TbPlaylist>
                </div>
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon onClick={toggleMute} size={30} className="cursor-pointer"></VolumeIcon>
                    <Slider value={volume} onChange={(value) => setVolume(value)}></Slider>
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
