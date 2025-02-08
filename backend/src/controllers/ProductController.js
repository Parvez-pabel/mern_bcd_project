const {
  productBrandListService,
  ProductCategoryListService,
  ProductSliderListService,
  ProductListByBrandService,
  ProductListByCategoryService,
  ProductListBySimilarService,
  ProductListByKeywordService,
  ProductListByRemarkService,
  ProductReviewListService,
  ProductDetailsService,
} = require("../routes/services/ProductService");

exports.ProductBrandList = async (req, res) => {
  let result = await productBrandListService();
  return res.status(200).json(result);
};
exports.ProductCategoryList = async (req, res) => {
  let result = await ProductCategoryListService();
  return res.status(200).json(result);
};
exports.ProductSliderList = async (req, res) => {
  let result = await ProductSliderListService();
  return res.status(200).json(result);
};
exports.ProductListByBrand = async (req, res) => {
  let result = await ProductListByBrandService(req);
  return res.status(200).json(result);
};
exports.ProductListByCategory = async (req, res) => {
  let result = await ProductListByCategoryService(req);
  return res.status(200).json(result);
};
exports.ProductListByRemark = async (req, res) => {
    let result = await ProductListByRemarkService(req);
    return res.status(200).json(result);
};
exports.ProductListBySimilar = async (req, res) => {
      let result = await ProductListBySimilarService(req);
      return res.status(200).json(result);
};
exports.ProductListByKeyword = async (req, res) => {
          let result = await ProductListByKeywordService(req);
          return res.status(200).json(result);
};

exports.ProductReviewList = async (req, res) => {
   let result = await ProductReviewListService(req);
   return res.status(200).json(result);
};
// exports.CreateProductReview = async (req, res) => {};
exports.ProductDetails = async (req, res) => {
        let result = await ProductDetailsService(req);
        return res.status(200).json(result);
};
