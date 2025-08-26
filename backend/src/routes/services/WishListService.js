const { default: mongoose } = require("mongoose");
const WishlistModel = require("../../models/WishModel");

const WishlistService = async (req) => {
  try {
    let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
    let matchStage = {
      $match: {
        userID: user_id,
      },
    };
    let joiningStageProduct = {
      $lookup: {
        from: "products",
        localField: "ProductID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };
    let joiningStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindProductBrandStage = { $unwind: "$brand" };

    let joiningStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindProductCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        _id: 0,
        userID: 0,
        "category._id": 0,
        "product._id": 0,
        brandID: 0,
        categoryID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "product.createdAt": 0,
        "category.updatedAt": 0,
        "product.updatedAt": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
      },
    };

    let data = await WishlistModel.aggregate([
      matchStage,
      joiningStageProduct,
      unwindProductStage,
      joiningStageBrand,
      unwindProductBrandStage,
      joiningStageCategory,
      unwindProductCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "something went wrong" };
  }
};
const SaveWishlistService = async (req) => {
  // create & update wishlist
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await WishlistModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "Wishlist updated successfully" };
  } catch (error) {
    return { status: "fail", message: "something went wrong" };
  }
};
const RemoveWishlistService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await WishlistModel.deleteOne(reqBody);
    return { status: "success", message: "Wishlist Deleted successfully" };
  } catch (error) {
    return { status: "fail", message: "something went wrong" };
  }
};

module.exports = {
  WishlistService,
  SaveWishlistService,
  RemoveWishlistService,
};
