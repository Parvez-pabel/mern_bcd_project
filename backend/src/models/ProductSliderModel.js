const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    ProductsName: { type: String, required: true },
    ProductsPrice: { type: Number, required: true },
    ProductsDescription: { type: String, required: true },
    ProductsImage: { type: String, required: true },
    ProductsDiscountPrice: { type: String, required: true },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },

  { timestamps: true, versionKey: false }
);

// Create a model for the 'Data' collection
const ProductsSliderModel = mongoose.model("ProductsSliders", DataSchema);

module.exports = ProductsSliderModel;
