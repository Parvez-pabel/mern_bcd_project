import React, { useEffect } from "react";
import Details from "../components/product/Details";
import Brands from "../components/product/Brands";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore";


const ProductDetails = () => {
  const {
    ProductDetailsRequest,
    ProductReviewRequest,
    BrandListRequest,
    BrandList,
  } = ProductStore();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await ProductDetailsRequest(id);
      await ProductReviewRequest(id);
      BrandList === null ? await BrandListRequest() : null;
    })();
  }, []);
  return (
    <Layout>
      <Details />
      <Brands />
    </Layout>
  );
};

export default ProductDetails;
