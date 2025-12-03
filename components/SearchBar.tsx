"use client";
import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const suggestions = ["mens t shirt", "t shirt", "oversize tee", "womens t shirt"];

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  // Close search when Escape key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
  };

  return (
    <>
      <div onClick={() => setShowSearch(true)} className="cursor-pointer">
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </div>

      {showSearch && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-darkColor/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Suggestions Panel - Horizontal on mobile, vertical on tablet and desktop */}
              <div className="md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div >
                  {/* Vertical layout for tablet and desktop */}
                  <div className="hidden sm:block">
                    <ul className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <li 
                          key={index} 
                          className="p-2 rounded-md hover:border cursor-pointer  flex items-center"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Search className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Horizontal scrollable layout for mobile */}
                  <div className="sm:hidden w-full overflow-x-auto pb-2">
                    <div className="flex gap-2 w-max">
                      {suggestions.map((suggestion, index) => (
                        <div 
                          key={index} 
                          className="flex-shrink-0 bg-white rounded-lg p-3 hover:shadow-sm cursor-pointer transition-all duration-200 flex items-center min-w-[120px]"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Search className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="whitespace-nowrap">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Search Area */}
              <div className="md:w-2/3 lg:w-3/4 xl:w-4/5">
                <form className="relative mb-6" onSubmit={(e) => e.preventDefault()}>
                  <Input
                    placeholder="Search The Drop"
                    className="w-full rounded-sm py-5 pl-4 pr-12 lg:text-lg md:text-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                  {search && (
                    <X
                      onClick={() => setSearch("")}
                      className="mr-2 w-5 h-5 absolute top-1/2 right-12 transform -translate-y-1/2 hover:text-red-600 hoverEffect cursor-pointer"
                    />
                  )}
                  <button
                    type="submit"
                    className={`absolute right-0 top-0 w-12 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-darkColor hover:text-white hoverEffect ${search ? "bg-darkColor text-white" : "bg-darkColor/10"}`}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>
                
                <div className="max-h-[70vh] overflow-y-auto pb-6">
                  {loading ? (
                    <p className="flex items-center px-6 py-10 gap-1 text-center text-yellow-600 font-semibold">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Searching on progress...
                    </p>
                  ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {products.map((product) => (
                        <div key={product._id} >
                          <ProductCard product={product} viewType="compact" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 font-semibold tracking-wide">
                      {search && !loading ? (
                        <p>
                          Nothing Match Drop{" "}
                          <span className="underline">{search}</span>.
                         
                        </p>
                      ) : (
                        <p className="text-black flex items-center justify-center gap-1">
                          <Search className="w-5 h-5" />
                          Search The Drop.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showSearch && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowSearch(false)}
        />
      )}
    </>
  );
};

export default SearchBar;