"use client";
import React from "react";
import ProductInfoModal from "@/components/ProductInfoModal";
import ShareButton from "@/components/ShareButton";
import { Ruler, FileQuestion, Truck } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

interface ProductInfoModalsProps {
  product: PRODUCT_BY_SLUG_QUERYResult;
}

const ProductInfoModals = ({ product }: ProductInfoModalsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
      {/* Size Guide Modal */}
      <ProductInfoModal
        title="Size Guide"
        trigger={
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            <p>Size Guide</p>
          </div>
        }
      >
        {product?.sizeGuideImage ? (
          <div className="space-y-3">
            <Image
              src={urlFor(product.sizeGuideImage).url()}
              alt="Size Guide"
              width={600}
              height={600}
              className="w-full h-auto border border-gray-300 rounded-sm"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-darkColor mb-3">Size Chart</p>
            <p className="text-sm text-gray-600">No size guide image available for this product.</p>
          </div>
        )}
      </ProductInfoModal>

      {/* Ask a Question Modal */}
      <ProductInfoModal
        title="Ask a Question"
        trigger={
          <div className="flex items-center gap-2">
            <FileQuestion className="w-5 h-5" />
            <p>Ask a Question</p>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-darkColor block mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-darkColor focus:ring-1 focus:ring-darkColor"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-darkColor block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-darkColor focus:ring-1 focus:ring-darkColor"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-darkColor block mb-2">
              Your Question
            </label>
            <textarea
              placeholder="Ask your question about this product..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-darkColor focus:ring-1 focus:ring-darkColor resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-darkColor text-white py-2.5 rounded-sm text-sm font-semibold hover:bg-darkColor/90 transition-colors"
          >
            Submit Question
          </button>
        </form>
      </ProductInfoModal>

      {/* Delivery & Return Modal */}
      <ProductInfoModal
        title="Delivery & Return"
        trigger={
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            <p>Delivery & Return</p>
          </div>
        }
      >
        <div className="space-y-5">
          <div>
            <p className="font-semibold text-darkColor mb-3">Delivery Information</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Free Shipping:</strong> On orders over Rs. 5,000</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Standard Delivery:</strong> 3-5 business days</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Express Delivery:</strong> 1-2 business days</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Island Delivery:</strong> 5-7 business days</span>
              </li>
            </ul>
          </div>
          <div className="border-t pt-5">
            <p className="font-semibold text-darkColor mb-3">Return Policy</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Return Window:</strong> 30 days from purchase date</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Condition:</strong> Products must be unused and in original condition</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Free Returns:</strong> On all defective items</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Refund Time:</strong> 5-7 business days after approval</span>
              </li>
            </ul>
          </div>
        </div>
      </ProductInfoModal>

      {/* Share Button */}
      <ShareButton 
        title={product?.name}
        text={`Check out ${product?.name} on our store!`}
      />
    </div>
  );
};

export default ProductInfoModals;
