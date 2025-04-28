import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductByCategory = () => {
  const { ProductListByCategoryRequest } = ProductStore();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await ProductListByCategoryRequest(id);
    })();
  }, []);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByCategory;
