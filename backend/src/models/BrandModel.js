const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
    },
    brandImg: {
      type: String,
      required: true,
    },
  },

  { timestamps: true, versionKey: false }
);

// Create a model for the 'Data' collection
const BrandModel = mongoose.model("Brands", DataSchema);

module.exports = BrandModel;
