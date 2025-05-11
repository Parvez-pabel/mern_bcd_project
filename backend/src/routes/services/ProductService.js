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
    let ProductID = new mongoose.Types.ObjectId(req.params.ProductID);
    let MatchStage = { $match: { _id: ProductID } };

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
        foreignField: "productID",
        as: "details",
      },
    };

    let UnwindBrandStage = {
      $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
    };
    let UnwindCategoryStage = {
      $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
    };
    let UnwindDetailsStage = {
      $unwind: { path: "$details", preserveNullAndEmptyArrays: true },
    };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductsModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message || JSON.stringify(e) }; // ✅ Fixed
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
    let UnwindBrandStage = {
      $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
    };
    let UnwindCategoryStage = {
      $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
    };
    // projection of data needed and unnessesary data
    let projectionStage = {
      $project: {
        title: 1,
        price: { $toDouble: "$price" },
        discount: 1,
        discountPrice: { $toDouble: "$discountPrice" }, // make sure you're storing this
        star: 1,
        image: 1,
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
    const productID = req.params.ProductID;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return { status: "fail", data: "Invalid ProductID" };
    }

    const ObjectID = new mongoose.Types.ObjectId(productID);
    let matchStage = { $match: { ProductID: ObjectID } };
    let JoinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let UnWindProfileStage = { $unwind: "$profile" };
    let ProjectionStage = {
      $project: {
        des: 1,
        rating: 1,
        createdAt: 1,
        updatedAt: 1,
        profile: {
          cus_name: "$profile.cus_name",
          cus_add: "$profile.cus_add",
        },
      },
    };

    const data = await ReviewModel.aggregate([
      matchStage,
      JoinWithProfileStage,
      UnWindProfileStage,
      ProjectionStage,
    ]);

    return { status: "success", data };
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

// --------------------------------------------------
const ListByFilterService = async (req) => {
  try {
    const { ObjectId } = require("mongodb");
    let matchCondition = {};
    if (req.body["categoryID"]) {
      matchCondition.categoryID = new ObjectId(req.body["categoryID"]);
    }
    if (req.body["brandID"]) {
      matchCondition.brandID = new ObjectId(req.body["brandID"]);
    }

    let matchStage = { $match: matchCondition };

    let AddFieldStage = {
      $addFields: {
        numericPrice: { $toInt: "$price" },
      },
    };

    let priceMin = parseInt(req.body["priceMin"]);
    let priceMax = parseInt(req.body["priceMax"]);
    let PriceMatchConditions = {};

    if (!isNaN(priceMin)) {
      PriceMatchConditions["numericPrice"] = { $gte: priceMin };
    }
    if (!isNaN(priceMax)) {
      PriceMatchConditions["numericPrice"] = {
        ...(PriceMatchConditions["numericPrice"] || {}),
        $lte: priceMax,
      };
    }

    let PriceMatchStage = { $match: PriceMatchConditions };

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
        from: "categories", // ✅ correct collection name
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductsModel.aggregate([
      matchStage,
      AddFieldStage,
      PriceMatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
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
  ListByFilterService,
};
