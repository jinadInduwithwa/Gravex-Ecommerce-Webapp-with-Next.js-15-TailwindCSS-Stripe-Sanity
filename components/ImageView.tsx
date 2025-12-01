"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ZoomIn, ZoomOut, X } from "lucide-react";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
}

const ImageView = ({ images = [] }: Props) => {
  const [active, setActive] = useState(images[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden relative bg-white cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={urlFor(active).url()}
            alt="productImage"
            width={700}
            height={700}
            priority
            className="w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-105 hoverEffect rounded-md"
          />
          <div className="absolute top-3 right-3 bg-darkColor/80 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-5 h-5" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images?.map((image) => (
          <button
            onClick={() => setActive(image)}
            key={image?._key}
            className={`border rounded-md overflow-hidden transition-all ${
              active?._key === image?._key
                ? "ring-2 ring-darkColor"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt="productImage"
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>

      {/* Full Screen Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => {
              setIsModalOpen(false);
              resetZoom();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50 bg-darkColor/80 p-3 rounded-lg">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-2 hover:bg-white/10 rounded"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white px-3 py-2 text-sm font-semibold min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-2 hover:bg-white/10 rounded"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={resetZoom}
              className="text-white hover:text-gray-300 transition-colors px-3 py-2 text-xs font-semibold hover:bg-white/10 rounded ml-2"
            >
              Reset
            </button>
          </div>

          {/* Zoomed Image Container */}
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
            >
              <Image
                src={urlFor(active).url()}
                alt="productImage"
                width={1000}
                height={1000}
                priority
                className="w-[700px] h-[700px] object-contain select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageView;
