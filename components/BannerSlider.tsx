"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Title from "./Title";

interface BannerImage {
  asset?: {
    _id: string;
    url: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface Banner {
  _id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  altText: string;
  mobileImage: BannerImage;
  tabletImage: BannerImage;
  desktopImage: BannerImage;
}

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality - must be called before any early returns
  useEffect(() => {
    if (!isAutoPlay || !banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, banners]);

  // Early return AFTER all hooks
  if (!banners || banners.length === 0) {
    return null;
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 2000);
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % banners.length);
  };


  return (
    <div
      className="relative w-full h-[350px] md:h-[500px] lg:h-[700px] overflow-hidden bg-gray-900 group"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Banner Container */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <BannerSlide
            key={banner._id}
            banner={banner}
            isActive={index === currentIndex}
          />
        ))}
      </div>



      {/* Dots Navigation */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 backdrop-blur-sm ${index === currentIndex
                ? "bg-white w-10 h-3"
                : "bg-white/50 w-3 h-3 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface BannerSlideProps {
  banner: Banner;
  isActive: boolean;
}

const BannerSlide: React.FC<BannerSlideProps> = ({ banner, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* Image with responsive srcset */}
      <picture>
        {/* Mobile: up to 767px */}
        {banner.mobileImage?.asset?.url && (
          <source
            srcSet={`${banner.mobileImage.asset.url}?w=540&h=700&fit=crop`}
            media="(max-width: 767px)"
          />
        )}
        {/* Tablet: 768px to 1023px */}
        {banner.tabletImage?.asset?.url && (
          <source
            srcSet={`${banner.tabletImage.asset.url}?w=960&h=600&fit=crop`}
            media="(min-width: 768px) and (max-width: 1023px)"
          />
        )}
        {/* Desktop: 1024px and up */}
        {banner.desktopImage?.asset?.url && (
          <source
            srcSet={`${banner.desktopImage.asset.url}?w=1920&h=600&fit=crop`}
            media="(min-width: 1024px)"
          />
        )}
        {/* Fallback */}
        <img
          src={banner.desktopImage?.asset?.url || banner.tabletImage?.asset?.url || banner.mobileImage?.asset?.url}
          alt={banner.altText}
          className="w-full h-full object-cover"
        />
      </picture>

      {/* Overlay Gradient - More Sophisticated */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-start items-start px-4 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-20 lg:pt-24 z-10">
        <div className="max-w-2xl">
          {/* Title - Using Title Component Style */}
          <Title className="text-white mb-2 md:mb-3 line-clamp-2 drop-shadow-lg font-black">
            {banner.title}
          </Title>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-4 md:mb-5 line-clamp-3 font-light drop-shadow-md leading-relaxed">
            {banner.description}
          </p>

          {/* CTA Button - Small Rounded White Button */}
          <Link
            href={banner.buttonLink}
            className="inline-block px-4 sm:px-5 md:px-6 lg:px-7 py-1.5 sm:py-2 md:py-2.5 bg-white text-black font-semibold text-xs sm:text-xs md:text-sm lg:text-base rounded-full hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95"
          >
            {banner.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
