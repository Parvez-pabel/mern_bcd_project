const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    ProductsName: { type: String, required: true },
    ProductsPrice: { type: Number, required: true },
    ProductsQuantity: { type: Number, required: true },
    ProductsDescription: { type: String, required: true },
    ProductsImage: { type: String, required: true },
    ProductsCategory: { type: String, required: true },
    ProductsBrand: { type: String, required: true },
    ProductsStar: { type: String, required: true },
    ProductsStock: { type: String, required: true },
    ProductsRemark: { type: String, required: true },
    ProductsDiscount: { type: String, required: true },
    ProductsDiscountPrice: { type: String, required: true },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },

  { timestamps: true, versionKey:false }
);

// Create a model for the 'Data' collection
const ProductsModel = mongoose.model("Products", DataSchema);

module.exports = ProductsModel;
