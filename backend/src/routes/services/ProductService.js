const BrandModel = require("../../models/BrandModel");
const CategoryModel = require("../../models/CategoryModel");
const ProductsModel = require("../../models/ProductModel");
const ProductsSliderModel = require("../../models/ProductSliderModel");
const mongoose = require("mongoose");
const ReviewModel = require("../../models/ReviewModel");
// similar with productBrandListService ProductCategoryListService ProductSliderListService
const productBrandListService = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
const ProductCategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
const ProductSliderListService = async () => {
  try {
    let data = await ProductsSliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
//similar ProductListByBrandService to ProductListByCategoryService, ProductListByRemarkService
const ProductListByBrandService = async (req) => {
  try {
    if (!mongoose.isValidObjectId(req.params.BrandID)) {
      return { status: "fail", message: "Invalid BrandID" };
    }
    let BrandID = new mongoose.Types.ObjectId(req.params.BrandID);
    let MatchStage = { $match: { brandID: BrandID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    //to making array to object using mongodb aggregation $unwind
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    // projection of data needed and unnessesary data
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };
    let data = await ProductsModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const ProductListByCategoryService = async (req) => {
  try {
    if (!mongoose.isValidObjectId(req.params.CategoryID)) {
      return { status: "fail", message: "Invalid CategoryID" };
    }
    let CategoryID = new mongoose.Types.ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    //to making array to object using mongodb aggregation $unwind
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    // projection of data needed and unnessesary data
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };
    let data = await ProductsModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const ProductListByRemarkService = async (req) => {
  try {
    if (!req.params.Remark) {
      return { status: "fail", message: "Invalid Remark" };
    }
    let Remark = req.params.Remark;
    let MatchStage = { $match: { remark: Remark } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    //to making array to object using mongodb aggregation $unwind
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    // projection of data needed and unnessesary data
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };
    let data = await ProductsModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

const ProductListBySimilarService = async (req) => {
  try {
    let CategoryID = new mongoose.Types.ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let limitStage = { $limit: 20 };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    //to making array to object using mongodb aggregation $unwind
    let UnWindBrandStage = { $unwind: "$brand" };
    let UnWindCategoryStage = { $unwind: "$category" };
    // projection of data needed and unnessesary data
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };
    let data = await ProductsModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      projectionStage,
      limitStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

const ProductDetailsService = async (req) => {
  try {
    let ProductID;

    // Validate if ProductID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.ProductID)) {
      return { status: "fail", message: "Invalid Product ID format" };
    }

    ProductID = new mongoose.Types.ObjectId(req.params.ProductID);

    // Match product by ID first (to optimize performance)
    let MatchStage = { $match: { _id: ProductID } };

    // Lookup stages
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };

    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let JoinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "_id",
        as: "details",
      },
    };

    // Unwind stages (preserve empty arrays to avoid document removal)
    let UnWindBrandStage = {
      $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
    };
    let UnWindCategoryStage = {
      $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
    };
    let UnWindDetailsStage = {
      $unwind: { path: "$details", preserveNullAndEmptyArrays: true },
    };

    // Projection (removing unnecessary fields)
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    // Aggregation pipeline
    let data = await ProductsModel.aggregate([
      MatchStage, // Match first
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnWindBrandStage,
      UnWindCategoryStage,
      UnWindDetailsStage,
      ProjectionStage,
    ]);

    if (data.length === 0) {
      return { status: "fail", message: "Product not found" };
    }

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

const ProductListByKeywordService = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    let searchParams = [
      { title: SearchRegex },
      { shortDes: SearchRegex },
      { remark: SearchRegex },
    ];
    let SearchQuery = { $or: searchParams };
    let limitStage = parseInt(req.query.limit) || 10;

    let MatchStage = { $match: SearchQuery };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    //to making array to object using mongodb aggregation $unwind
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    // projection of data needed and unnessesary data
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };
    let data = await ProductsModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
      { $sort: { createdAt: -1 } },
      { $limit: limitStage },
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

const ProductReviewListService = async (req) => {
  try {
    let ProductID = new mongoose.Types.ObjectId(req.params.ProductID);

    let MatchStage = { $match: { productID: ProductID } };

    let joinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let unWindProfileStage = { $unwind: "$profile" };
    let projectionStage = {
      $project: {
        des: 1,
        rating: 1,
        createdAt: 1,
        updatedAt: 1,
        "profile.cus_name": 1,
        "profile.cus_country": 1,
      },
    };

    let data = await ReviewModel.aggregate([
      MatchStage,
      joinWithProfileStage,
      unWindProfileStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

const CreateReviewService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    let Review = await ReviewModel.create({
      userID: user_id,
      ProductID: reqBody["ProductID"],
      des: reqBody["des"],
      rating: reqBody["rating"],
    });
    return { status: "success", data: Review };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

module.exports = {
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
  CreateReviewService,
};
