"use client"!;

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
    disabled?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href, disabled }) => {
    const router = useRouter();

    const onClick = () => {
        // Add Auth in future
        router.push(href);
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled ? disabled : false}
            className="relative group flex items-center rounded-md gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4 disabled:cursor-not-allowed"
        >
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image className="object-cover" fill src={image} alt={name}></Image>
            </div>
            <p className="font-semibold truncate py-5">{name}</p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 pl-[¸] drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black"></FaPlay>
            </div>
        </button>
    );
};

export default ListItem;
