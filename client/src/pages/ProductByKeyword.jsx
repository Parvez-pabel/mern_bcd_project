import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import ProductList from "../components/product/ProductList";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";

const ProductByKeyword = () => {
  const { ProductListByKeyWordRequest } = ProductStore();
  const { Keyword } = useParams();
  useEffect(() => {
    (async () => {
      await ProductListByKeyWordRequest(Keyword);
    })();
  }, [Keyword]);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByKeyword;
