const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const WishlistModel = mongoose.model("wishes", DataSchema);

module.exports = WishlistModel;
