"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import ProductCard from "./ProductCard";
import Title from "./Title";

interface ProductCarouselProps {
    title?: string;
    viewAllLink?: string;
    limit?: number;
    status?: "new" | "hot" | "sale";
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
    title = "Featured Products",
    viewAllLink,
    limit = 12,
    status,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // Fetch products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            let query = `*[_type == 'product'`;
            if (status) {
                query += ` && status == $status`;
            }
            query += `] | order(_createdAt desc) [0...${limit}] {
        _id,
        name,
        slug,
        price,
        discount,
        stock,
        _createdAt,
        images[],
        colors[] {
          colorName,
          colorCode,
          colorImage,
          sizes[] {
            size,
            stock
          }
        }
      }`;

            const params = status ? { status } : {};
            const response = await client.fetch(query, params);
            setProducts(response || []);
        } catch (error) {
            console.error("Error fetching carousel products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [limit, status]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Update scroll button states
    const updateScrollButtons = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        updateScrollButtons();
        container.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);

        return () => {
            container.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [products, updateScrollButtons]);

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlay || products.length === 0) return;

        const container = scrollContainerRef.current;
        if (!container) return;

        const timer = setInterval(() => {
            const cardWidth = container.firstElementChild?.clientWidth || 250;
            const gap = 16; // gap-4 = 16px
            const scrollAmount = cardWidth + gap;

            if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
                // Reset to beginning
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }, 4000);

        return () => clearInterval(timer);
    }, [isAutoPlay, products]);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const cardWidth = container.firstElementChild?.clientWidth || 250;
        const gap = 16;
        const scrollAmount = (cardWidth + gap) * 2; // Scroll 2 cards at a time

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });

        // Pause auto-play briefly when manually navigating
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 8000);
    };

    if (loading) {
        return (
            <div className="py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[48%] sm:w-[32%] md:w-[24%] lg:w-[24%] aspect-square bg-gray-200 rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div
            className="py-8 relative group"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Title>{title}</Title>
                {viewAllLink && (
                    <Link
                        href={viewAllLink}
                        className="px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition-all"
                    >
                        View All
                    </Link>
                )}
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Left Navigation Button */}
                <button
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${canScrollLeft
                        ? "opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:scale-110"
                        : "opacity-0 cursor-not-allowed"
                        }`}
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>

                {/* Right Navigation Button */}
                <button
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${canScrollRight
                        ? "opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:scale-110"
                        : "opacity-0 cursor-not-allowed"
                        }`}
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </button>

                {/* Products Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="flex-shrink-0 w-[48%] sm:w-[32%] md:w-[24%] lg:w-[24%] snap-start"
                        >
                            <ProductCard product={product} viewType="grid" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator dots (optional, for mobile) */}
            <div className="flex justify-center gap-1 mt-4 md:hidden">
                {products.slice(0, Math.min(5, Math.ceil(products.length / 2))).map((_, index) => (
                    <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-gray-300"
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
