import React from "react";
import { getPromoBanner } from "@/sanity/helpers/queries";
import Link from "next/link";

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

interface PromoBannerData {
    _id: string;
    title: string;
    linkUrl?: string;
    altText: string;
    mobileImage: BannerImage;
    tabletImage: BannerImage;
    desktopImage: BannerImage;
}

const PromoBanner = async () => {
    const promoBanner: PromoBannerData | null = await getPromoBanner();

    if (!promoBanner) {
        return null;
    }

    const bannerContent = (
        <div
            className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100"
            style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
            <picture>
                {/* Mobile: up to 767px */}
                {promoBanner.mobileImage?.asset?.url && (
                    <source
                        srcSet={`${promoBanner.mobileImage.asset.url}?w=540&h=400&fit=crop`}
                        media="(max-width: 767px)"
                    />
                )}
                {/* Tablet: 768px to 1023px */}
                {promoBanner.tabletImage?.asset?.url && (
                    <source
                        srcSet={`${promoBanner.tabletImage.asset.url}?w=960&h=400&fit=crop`}
                        media="(min-width: 768px) and (max-width: 1023px)"
                    />
                )}
                {/* Desktop: 1024px and up */}
                {promoBanner.desktopImage?.asset?.url && (
                    <source
                        srcSet={`${promoBanner.desktopImage.asset.url}?w=1920&h=400&fit=crop`}
                        media="(min-width: 1024px)"
                    />
                )}
                {/* Fallback */}
                <img
                    src={
                        promoBanner.desktopImage?.asset?.url ||
                        promoBanner.tabletImage?.asset?.url ||
                        promoBanner.mobileImage?.asset?.url
                    }
                    alt={promoBanner.altText}
                    className="w-full h-full object-cover"
                />
            </picture>
        </div>
    );

    // If linkUrl is provided, wrap in Link, otherwise just return the content
    if (promoBanner.linkUrl) {
        return (
            <Link
                href={promoBanner.linkUrl}
                className="block"
            >
                {bannerContent}
            </Link>
        );
    }

    return bannerContent;
};

export default PromoBanner;
