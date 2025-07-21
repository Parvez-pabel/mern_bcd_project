import axios from "axios";
import { create } from "zustand";

const ProductStore = create((set) => ({
  BrandList: null,
  BrandListRequest: async () => {
    let res = await axios.get(`/ProductBrandList`);
    if (res.data["status"] === "success") {
      set({ BrandList: res.data["data"] });
    }
  },
  CategoryList: null,
  CategoryListRequest: async () => {
    let res = await axios.get(`/ProductCategoryList`);
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });
    }
  },
  SliderList: null,
  SliderListRequest: async () => {
    let res = await axios.get(`/ProductSliderList`);
    if (res.data["status"] === "success") {
      set({ SliderList: res.data["data"] });
    }
  },
  ProductListByRemark: null,
  ProductListByRemarkRequest: async (remark) => {
    set({ ProductListByRemark: null });
    let res = await axios.get(`/ProductListByRemark/${remark}`);
    if (res.data["status"] === "success") {
      set({ ProductListByRemark: res.data["data"] });
    }
  },
  ProductList: null,
  ProductListByBrandRequest: async (BrandID) => {
    set({ ProductList: null });
    let res = await axios.get(`/ProductListByBrand/${BrandID}`);
    if (res.data["status"] === "success") {
      set({ ProductList: res.data["data"] });
    }
  },
  ProductListByCategoryRequest: async (CategoryID) => {
    set({ ProductList: null });
    let res = await axios.get(`/ProductListByCategory/${CategoryID}`);
    if (res.data["status"] === "success") {
      set({ ProductList: res.data["data"] });
    }
  },
  ProductListByKeyWordRequest: async (Keyword) => {
    set({ ProductList: null });
    let res = await axios.get(`/ProductListByKeyword/${Keyword}`);
    if (res.data["status"] === "success") {
      set({ ProductList: res.data["data"] });
    }
  },
  ProductListBySimilarRequest: async (CategoryID) => {
    set({ ProductList: null });
    let res = await axios.get(`/ProductListBySimilar/${CategoryID}`);
    if (res.data["status"] === "success") {
      set({ ProductList: res.data["data"] });
    }
  },

  SearchKeyWord: "",
  setSearchKeyWord: (keyword) => {
    set({ SearchKeyWord: keyword });
  },
  ProductListByFilterRequest: async (postBody) => {
    set({ ProductList: null });
    let res = await axios.post(`/ProductListByFilter`, postBody);
    if (res.data["status"] === "success") {
      set({ ProductList: res.data["data"] });
    }
  },
  ProductDetails: null,
  ProductDetailsRequest: async (ProductID) => {
    set({ ProductDetails: null });
    let res = await axios.get(`/ProductDetails/${ProductID}`);
    if (res.data["status"] === "success") {
      set({ ProductDetails: res.data["data"] });
    }
  },
  ProductReview: null,
  ProductReviewRequest: async (ProductID) => {
    set({ ProductReview: null });
    let res = await axios.get(`/ProductReviewList/${ProductID}`);
    if (res.data["status"] === "success") {
      set({ ProductReview: res.data["data"] });
    }
  },
}));

export default ProductStore;
