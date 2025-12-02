"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

interface FilterOptions {
  availability: string | null;
  priceRange: [number, number];
  size: string | null;
  sortBy: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortBy: string) => void;
  isDrawer?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const availabilityOptions = [
  { label: "In Stock", value: "instock" },
  { label: "Out of Stock", value: "outofstock" },
  { label: "All", value: "all" },
];

const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "One Size",
];

const sortOptions = [
  { label: "Alphabetically, A-Z", value: "name_asc" },
  { label: "Alphabetically, Z-A", value: "name_desc" },
  { label: "Price, low to high", value: "price_asc" },
  { label: "Price, high to low", value: "price_desc" },
  { label: "Date, old to new", value: "date_asc" },
  { label: "Date, new to old", value: "date_desc" },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  onSortChange,
  isDrawer = false,
  isOpen = false,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    availability: false,
    price: false,
    size: false,
    sort: false,
  });

  const [filters, setFilters] = useState<FilterOptions>({
    availability: "all",
    priceRange: [0, 10000],
    size: null,
    sortBy: "name_asc",
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAvailabilityChange = (value: string) => {
    const newFilters = {
      ...filters,
      availability: filters.availability === value ? "all" : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice: [number, number] = [
      filters.priceRange[0],
      parseInt(e.target.value),
    ];
    const newFilters = { ...filters, priceRange: newPrice };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size: string) => {
    const newSize = filters.size === size ? null : size;
    const newFilters = { ...filters, size: newSize };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onSortChange(value);
  };

  const resetFilters = () => {
    const resetFilterValues: FilterOptions = {
      availability: "all",
      priceRange: [0, 10000],
      size: null,
      sortBy: "name_asc",
    };
    setFilters(resetFilterValues);
    onFilterChange(resetFilterValues);
    onSortChange("name_asc");
  };

  const FilterContent = () => (
    <>
      {/* Availability Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between font-semibold text-sm hover:text-darkColor transition-colors"
        >
          <span>Availability</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.availability ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.availability && (
          <div className="mt-3 space-y-2">
            {availabilityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer hover:text-darkColor transition-colors"
              >
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  checked={filters.availability === option.value}
                  onChange={() => handleAvailabilityChange(option.value)}
                  className="w-4 h-4 cursor-pointer accent-black"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b py-4">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between font-semibold text-sm hover:text-darkColor transition-colors"
        >
          <span>Price</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Max Price: LKR {filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-darkColor"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>LKR 0</span>
                <span>LKR 10000</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b py-4">
        <button
          onClick={() => toggleSection("size")}
          className="w-full flex items-center justify-between font-semibold text-sm hover:text-darkColor transition-colors"
        >
          <span>Size</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.size ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.size && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`py-2 px-3 text-sm border rounded transition-all duration-200 flex items-center justify-center gap-1 ${
                  filters.size === size
                    ? "bg-darkColor text-white border-darkColor"
                    : "border-gray-300 hover:border-darkColor text-gray-700"
                }`}
              >
                {size}
                {filters.size === size && <Check size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div className="border-b py-4">
        <label className="block font-semibold text-sm mb-2 hover:text-darkColor transition-colors">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-darkColor focus:border-transparent transition-all"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <div className="pt-4">
        <Button
          onClick={resetFilters}
          className="w-full bg-gray-200 text-darkColor hover:bg-gray-300 font-semibold rounded-md transition-colors"
        >
          Reset Filters
        </Button>
      </div>
    </>
  );

  // If drawer mode, render as overlay/drawer
  if (isDrawer) {
    return (
      <>
        {/* Mobile Filter Drawer Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Filter Drawer */}
        <div
          className={`fixed left-0 top-0 h-screen w-80 bg-white shadow-lg transition-transform duration-300 z-50 lg:hidden overflow-y-auto ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="sticky top-0 bg-white p-4 flex items-center justify-between">
            <h2 className="font-bold text-lg">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-4 space-y-4">
            <FilterContent />
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="w-full md:min-w-56 bg-white   p-4 space-y-4 max-h-fit sticky top-20">
      <FilterContent />
    </div>
  );
};

export default FilterSidebar;
