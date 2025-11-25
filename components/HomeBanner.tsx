import React from "react";
import { getAllBanners } from "@/sanity/helpers/queries";
import BannerSlider from "./BannerSlider";

const HomeBanner = async () => {
  const banners = await getAllBanners();

  if (banners && banners.length > 0) {
    return <BannerSlider banners={banners} />;
  }

  return null;
};

export default HomeBanner;
