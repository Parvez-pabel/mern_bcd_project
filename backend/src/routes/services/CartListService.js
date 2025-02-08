const CartModel = require("../../models/CartModel");
const mongoose = require("mongoose");

const CartListService = async (req) => {
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
        localField: "productID",
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

    let data = await CartModel.aggregate([
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
const SaveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    if (!user_id) {
      return { status: "fail", message: "User ID is missing in headers" };
    }
    reqBody.userID = user_id;
    if (!mongoose.Types.ObjectId.isValid(reqBody.productID)) {
      return { status: "fail", message: "Invalid productID" };
    }
    await CartModel.create(reqBody);

    return { status: "success", message: "CartList added successfully" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const UpdateCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;
    await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: reqBody }
    );
    return { status: "success", message: "CartList updated successfully" };
  } catch (error) {
    return { status: "fail", message: "something went wrong" };
  }
}; //end of UpdateCartListService function  //end of module.exports  objec

const RemoveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "CartList removed successfully" };
  } catch (error) {
    return { status: "fail", message: "something went wrong" };
  }
};

module.exports = {
  CartListService,
  SaveCartListService,
  UpdateCartListService,
  RemoveCartListService,
};
