import { Price } from "@/types";
import { error } from "console";

export const getURL = () => {
    let url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";
    url = url.includes("http") ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
};

export const postData = async ({ url, data }: { url: string; data?: { price: Price } }) => {
    console.log("POST REQUEST: ", url, data);
    const response: Response = await fetch(url, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        console.error("Error in postData!");
        throw new Error(response.statusText);
    }
    return response.json();
};

export const toDateTime = (seconds: number) => {
    let time = new Date("1970-01-01T00:30:00Z");
    time.setSeconds(seconds);
    return time;
};
