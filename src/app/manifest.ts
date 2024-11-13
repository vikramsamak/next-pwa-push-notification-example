import type { MetadataRoute } from "next";

interface CustomScreenshot {
  src: string;
  type: string;
  sizes: string;
  form_factor: "narrow" | "wide";
}

interface CustomManifest extends MetadataRoute.Manifest {
  screenshots: CustomScreenshot[];
}

export default function manifest(): CustomManifest {
  return {
    name: "NextJS-PWA",
    short_name: "NextJS-PWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/wide.png",
        type: "image/png",
        sizes: "1910x883",
        form_factor: "wide",
      },
      {
        src: "/screenshots/narrow.png",
        type: "image/png",
        sizes: "427x759",
        form_factor: "narrow",
      },
    ],
  };
}
