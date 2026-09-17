"use client";

import React, { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Fallback to window.location.href in browser if url prop is not provided or relative
  const getShareUrl = () => {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    }
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return url || "";
  };

  const handleCopy = async () => {
    const shareUrl = getShareUrl();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const openShareWindow = (shareLink: string) => {
    window.open(shareLink, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(shareUrl)}`;
    openShareWindow(twitterUrl);
  };

  const handleFacebookShare = () => {
    const shareUrl = getShareUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    openShareWindow(facebookUrl);
  };

  const handleNativeShare = async () => {
    const shareUrl = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error invoking Web Share API:", err);
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B2B3B]/90 via-[#243447]/80 to-[#1B2B3B]/90 border border-white/10 p-5 sm:p-6 my-8 backdrop-blur-md shadow-lg shadow-black/20">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-48 h-24 bg-[#FF8C00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-24 bg-[#1DA1F2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8C00]">
            Spread the knowledge
          </span>
          <h4 className="text-lg font-bold text-white tracking-tight">
            Found this article helpful? Share it!
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* X / Twitter */}
          <button
            type="button"
            onClick={handleTwitterShare}
            className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-black/60 border border-white/10 hover:border-white/20 text-gray-200 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Share on X (Twitter)"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-sm font-medium">X / Twitter</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookShare}
            className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] border border-[#1877F2]/20 hover:border-[#1877F2] text-[#60a5fa] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Share on Facebook"
          >
            <svg
              className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm ${
              copied
                ? "bg-[#00C853]/20 border-[#00C853]/40 text-[#00E676]"
                : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#FF8C00]/40 text-gray-200 hover:text-[#FF8C00]"
            }`}
            aria-label="Copy article link"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#00E676] transition-transform animate-in zoom-in-50" />
                <span className="text-sm font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span className="text-sm font-medium">Copy Link</span>
              </>
            )}
          </button>

          {/* Mobile Web Share API button if supported */}
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="sm:hidden group inline-flex items-center justify-center p-2.5 rounded-xl bg-[#FF8C00]/10 hover:bg-[#FF8C00]/20 border border-[#FF8C00]/30 text-[#FF8C00] transition-all"
              aria-label="More share options"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
