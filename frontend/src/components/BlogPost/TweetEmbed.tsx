"use client";

import React from "react";
import { Tweet } from "react-tweet";

interface TweetEmbedProps {
  id: string;
}

export default function TweetEmbed({ id }: TweetEmbedProps) {
  return (
    <div className="my-6 flex justify-center not-prose" data-theme="dark">
      <div className="w-full max-w-[550px]">
        <Tweet id={id} />
      </div>
    </div>
  );
}
