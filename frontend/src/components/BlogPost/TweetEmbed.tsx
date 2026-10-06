"use client";

import React, { useEffect, useRef, useState } from "react";

interface TweetEmbedProps {
  id: string;
}

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        createTweet: (
          tweetId: string,
          targetEl: HTMLElement,
          options?: Record<string, any>
        ) => Promise<HTMLElement | null>;
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export default function TweetEmbed({ id }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTwitterScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if (window.twttr?.widgets?.createTweet) {
          resolve();
          return;
        }

        const existingScript = document.getElementById("twitter-wjs") as HTMLScriptElement | null;
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          return;
        }

        const script = document.createElement("script");
        script.id = "twitter-wjs";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadTwitterScript().then(() => {
      if (!isMounted || !containerRef.current || !window.twttr?.widgets) return;

      containerRef.current.innerHTML = "";
      window.twttr.widgets
        .createTweet(id, containerRef.current, {
          theme: "dark",
          align: "center",
          conversation: "none",
          dnt: true,
        })
        .then(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error("Failed to render Twitter widget:", err);
          if (isMounted) {
            setIsLoading(false);
          }
        });
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <span className="my-6 block not-prose w-full">
      <span className="flex flex-col items-center justify-center min-h-[160px] w-full">
        {isLoading && (
          <span className="flex items-center justify-center p-6 text-sm text-gray-400">
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent mr-2" />
            Loading post from X...
          </span>
        )}
        <span ref={containerRef} className="w-full flex justify-center" />
      </span>
    </span>
  );
}
