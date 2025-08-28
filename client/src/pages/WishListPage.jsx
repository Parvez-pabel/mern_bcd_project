import React, { useEffect } from "react";
import Layout from "./../components/layout/Layout";
import WishList from "../components/wish/Wishlist";
import Brands from "./../components/product/Brands";
import Categories from "./../components/product/Categories";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";

const WishListPage = () => {
  const {
    ProductDetailsRequest,
    ProductReviewRequest,
    BrandListRequest,
    CategoryListRequest,
    CategoryList,
    BrandList,
  } = ProductStore();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await ProductDetailsRequest(id);
      await ProductReviewRequest(id);

      BrandList === null ? await BrandListRequest() : null;
      CategoryList === null ? await CategoryListRequest() : null;
    })();
  }, []);
  return (
    <div>
      <Layout>
        <WishList />
        <Brands />
        <Categories />
      </Layout>
    </div>
  );
};

export default WishListPage;
