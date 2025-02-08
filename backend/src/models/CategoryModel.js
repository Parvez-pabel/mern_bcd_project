const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
      unique: true,
    },
    CategoryImg: {
      type: String,
      required: true,
    },
  },

  { timestamps: true, versionKey: false }
);

// Create a model for the 'Data' collection
const CategoryModel = mongoose.model("categories", DataSchema);

module.exports = CategoryModel;
