
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "3mmc54h9",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false, // We need fresh data for registration checks
    token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
    return builder.image(source);
};
