import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProductStore from "../store/ProductStore";
import FeatureStore from "./../store/FeatureStore";
import Slider from "./../components/product/Slider";
import Features from "./../components/product/Features";
import Categories from "./../components/product/Categories";
import Products from "./../components/product/Products";
import Brands from "./../components/product/Brands";

const HomePage = () => {
  const {
    BrandListRequest,
    ProductListByRemarkRequest,
    SliderListRequest,
    CategoryListRequest,
  } = ProductStore();
  const { FeatureListRequest } = FeatureStore();

  // useEffect(() => {
  //   (async () => {
  //     await SliderListRequest();
  //     await FeatureListRequest();
  //     await CategoryListRequest();
  //     await ProductListByRemarkRequest("new");
  //     await BrandListRequest();
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          SliderListRequest(),
          FeatureListRequest(),
          CategoryListRequest(),
          ProductListByRemarkRequest("new"),
          BrandListRequest(),
        ]);
      } catch (error) {
        console.error("API request error:", error);
      }
    })();
  }, []);
  return (
    <Layout>
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />
    </Layout>
  );
};

export default HomePage;
