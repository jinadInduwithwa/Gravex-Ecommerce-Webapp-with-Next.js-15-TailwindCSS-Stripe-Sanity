"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const {
    deleteCartProduct,
    getTotalPrice,
    getSubtotalPrice,
    getGroupedItems,
  } = useCartStore();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }
  const cartProducts = getGroupedItems();


  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "94716090011"; // Updated WhatsApp business number

    let message = "🛒 *New Order Request*\n\n";
    message += "*Order Details:*\n";
    message += "─────────────────\n";

    cartProducts.forEach(({ product, quantity, selectedColor, selectedSize }) => {
      const itemTotal = (product.price as number) * quantity;
      message += `• ${product.name}\n`;
      if (selectedColor) message += `  Color: ${selectedColor}\n`;
      if (selectedSize) message += `  Size: ${selectedSize.toUpperCase()}\n`;
      message += `  Qty: ${quantity} × Rs.${product.price} = Rs.${itemTotal.toFixed(2)}\n\n`;
    });

    message += "─────────────────\n";
    message += `*Subtotal:* Rs.${getSubtotalPrice().toFixed(2)}\n`;
    message += `*Discount:* Rs.${(getSubtotalPrice() - getTotalPrice()).toFixed(2)}\n`;
    message += `*Total:* Rs.${getTotalPrice().toFixed(2)}\n\n`;
    message += "Please confirm my order. Thank you!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        {cartProducts?.length ? (
          <>
            <div className="grid lg:grid-cols-3 md:gap-9 py-2 mt-10">
              {/* Products */}
              <div className="lg:col-span-2 rounded-sm">
                <div className="border bg-white rounded-sm">
                  {cartProducts?.map(({ product, quantity, selectedColor, selectedSize }, index) => {
                    return (
                      <div
                        key={`${product?._id}-${selectedColor}-${selectedSize}-${index}`}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-3 md:gap-5"
                      >
                        <div className="flex flex-1 items-center gap-2 h-28 md:h-44">
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-sm overflow-hidden group"
                            >
                              <Image
                                src={urlFor(product?.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-20 h-20 md:w-40 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                              />
                            </Link>
                          )}
                          <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                            <div className="space-y-1.5">
                              <h2 className="font-semibold line-clamp-1 text-sm md:text-base">
                                {product?.name}
                              </h2>
                              <p className="text-xs md:text-sm text-lightColor font-medium line-clamp-2">
                                {product?.intro}
                              </p>
                              <p className="text-xs md:text-sm capitalize">
                                {selectedColor && (

                                  <span className="font-semibold">
                                    {selectedColor} {"/"}
                                  </span>

                                )}

                                {selectedSize && (
                                  <span className="font-semibold uppercase">
                                    {selectedSize}
                                  </span>
                                )}
                              </p>
                              <PriceFormatter
                                amount={(product?.price as number) * quantity}
                                className="font-bold text-sm md:hidden"
                              />
                            </div>
                            <div className="text-gray-500 flex items-center gap-2">

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() =>
                                        handleDeleteProduct(product?._id)
                                      }
                                      className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600">
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between h-28 md:h-44 p-0.5 md:p-1 ml-auto">
                            <PriceFormatter
                              amount={(product?.price as number) * quantity}
                              className="font-bold text-sm md:text-lg hidden md:block"
                            />
                            <div className="scale-90 origin-right md:scale-100">
                              <QuantityButtons product={product} color={selectedColor} size={selectedSize} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
              {/* summary */}
              <div className="lg:col-span-1">
                <div className="hidden md:inline-block w-full bg-white p-6 rounded-sm border">
                  <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <PriceFormatter amount={getSubtotalPrice()} />
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <PriceFormatter
                        amount={getSubtotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                      />
                    </div>
                    <Button
                      onClick={handleWhatsAppOrder}
                      className="w-full rounded-lg font-semibold tracking-wide bg-black hover:bg-black/80"
                      size="lg"
                    >
                      Order via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
              {/* Order summary for mobile view */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                <div className="p-4 rounded-sm border mx-4">
                  <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <PriceFormatter amount={getSubtotalPrice()} />
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <PriceFormatter
                        amount={getSubtotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                      />
                    </div>
                    <Button
                      onClick={handleWhatsAppOrder}
                      className="w-full rounded-lg font-semibold tracking-wide bg-black hover:bg-black/80"
                      size="lg"
                    >
                      Order via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </div>
  );
};

export default CartPage;
