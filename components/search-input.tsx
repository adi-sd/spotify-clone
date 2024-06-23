"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useDebounce from "@/hooks/use-debounce";
import Input from "./input";

interface SearchInputProps {}

const SearchInput: React.FC<SearchInputProps> = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: "/search",
            query,
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            className="bg-neutral-800 h-[70px] focus:border focus:border-neutral-500 placeholder:text-lg placeholder:p-3"
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        ></Input>
    );
};

export default SearchInput;
