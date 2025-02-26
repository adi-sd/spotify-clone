"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/box";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <BounceLoader color="#22c55e" size={40}></BounceLoader>
        </Box>
    );
};

export default Loading;
