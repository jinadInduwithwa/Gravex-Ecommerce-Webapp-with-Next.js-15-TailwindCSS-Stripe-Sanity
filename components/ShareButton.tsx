"use client";
import React from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const ShareButton = ({ 
  title = "Check this out!", 
  text = "Check out this amazing product",
  url 
}: ShareButtonProps) => {
  const handleShare = async () => {
    // Use current URL if not provided
    const shareUrl = url || typeof window !== "undefined" ? window.location.href : "";
    
    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled the share dialog
        console.log("Share cancelled");
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
        alert("Failed to copy link");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-black hover:text-red-600 transition-colors hoverEffect"
      title="Share this product"
    >
      <Share2 className="w-5 h-5" />
      <p>Share</p>
    </button>
  );
};

export default ShareButton;
