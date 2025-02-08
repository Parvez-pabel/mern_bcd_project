const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    ProductsDescription: { type: String, required: true },
    ProductsImage1: { type: String, required: true },
    ProductsImage2: { type: String, required: true },
    ProductsImage3: { type: String, required: true },
    ProductsImage4: { type: String, required: true },
    ProductsImage5: { type: String },
    ProductsImage6: { type: String },
    ProductsImage7: { type: String },
    ProductsImage8: { type: String },
    ProductsColor: { type: String, required: true },
    ProductsSize: { type: String, required: true },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },

  { timestamps: true, versionKey: false }
);

// Create a model for the 'Data' collection
const ProductDetailsModel = mongoose.model("ProductsDetails", DataSchema);

module.exports = ProductDetailsModel;
