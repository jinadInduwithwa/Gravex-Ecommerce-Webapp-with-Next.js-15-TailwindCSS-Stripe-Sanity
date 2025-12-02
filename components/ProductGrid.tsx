"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, SlidersHorizontal } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import ViewOptions, { ViewType } from "./ViewOptions";
import { Button } from "./ui/button";

interface FilterOptions {
  availability: string | null;
  priceRange: [number, number];
  size: string | null;
  sortBy: string;
}

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    availability: "all",
    priceRange: [0, 5000],
    size: null,
    sortBy: "name_asc",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Use client.fetch with proper query
      const query = `*[_type == 'product' && variant == $variant] {
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
      const response = await client.fetch(query, { variant: selectedTab.toLowerCase() });
      setProducts(response || []);
    } catch (error) {
      console.log("Product fetching Error", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [selectedTab, fetchData]);

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply availability filter
    if (filters.availability && filters.availability !== "all") {
      result = result.filter((product) => {
        const totalStock =
          product?.colors?.reduce(
            (total: number, color: { sizes?: Array<{ stock?: number }> }) => {
              const colorStock =
                color.sizes?.reduce(
                  (sum: number, size: { stock?: number }) =>
                    sum + (size.stock || 0),
                  0
                ) || 0;
              return total + colorStock;
            },
            0
          ) || product?.stock || 0;

        if (filters.availability === "instock") return totalStock > 0;
        if (filters.availability === "outofstock") return totalStock === 0;
        return true;
      });
    }

    // Apply price filter
    if (filters.priceRange && filters.priceRange[1] < 5000) {
      result = result.filter(
        (product) => (product?.price || 0) <= filters.priceRange[1]
      );
    }

    // Apply size filter
    if (filters.size) {
      result = result.filter((product) => {
        return product?.colors?.some((color: any) =>
          color.sizes?.some(
            (s: any) => s.size?.toLowerCase() === filters.size?.toLowerCase()
          )
        );
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "name_asc":
        result.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
        break;
      case "name_desc":
        result.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""));
        break;
      case "price_asc":
        result.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case "price_desc":
        result.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case "date_asc":
        result.sort(
          (a, b) =>
            new Date(a?._createdAt || "").getTime() -
            new Date(b?._createdAt || "").getTime()
        );
        break;
      case "date_desc":
        result.sort(
          (a, b) =>
            new Date(b?._createdAt || "").getTime() -
            new Date(a?._createdAt || "").getTime()
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  // Grid classes based on view type
  const getGridClasses = () => {
    switch (viewType) {
      case "compact":
        return "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4";
      case "showcase":
        return "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10";
      case "grid":
      default:
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5";
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="mt-10 flex flex-col items-center w-full">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {/* Mobile Filter Toggle Button */}
      <div className="flex lg:hidden items-center gap-2 w-full mt-6">
        <Button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-darkColor text-white hover:bg-darkColor/80 font-semibold"
        >
          <SlidersHorizontal size={20} />
          Filters
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterSidebar
        isDrawer={true}
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      <div className="flex flex-col lg:flex-row items-start gap-5 w-full mt-10">
        {/* Sidebar - Filters (Desktop only) */}
        <div className="hidden lg:block w-full lg:max-w-xs">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Products Section */}
        <div className="flex-1 w-full">
          {/* View Options */}
          <div className="mb-6 flex justify-center lg:justify-end">
            <ViewOptions currentView={viewType} onViewChange={setViewType} />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader2 className="animate-spin" />  
              </div>
            </div>
          ) : (
            <>
              {filteredAndSortedProducts?.length ? (
                <div className={`${getGridClasses()} w-full`}>
                  {filteredAndSortedProducts?.map((product: Product) => (
                    <AnimatePresence key={product?._id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ProductCard product={product} viewType={viewType} />
                      </motion.div>
                    </AnimatePresence>
                  ))}
                </div>
              ) : (
                <NoProductsAvailable selectedTab={selectedTab} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
