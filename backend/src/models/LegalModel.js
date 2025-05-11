const mongoose = require("mongoose");

const LegalSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["privacy", "terms", "refund", "cookies", "disclaimer"], // extend as needed
      unique: true, // ensure one document per type (e.g., one privacy policy)
    },
  },
  {
    timestamps: true,
  }
);

const LegalModel = mongoose.model("legals", LegalSchema);
module.exports = LegalModel;
