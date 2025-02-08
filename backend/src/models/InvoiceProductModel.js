const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    invoiceID: { type: String, required: true },
    productID: { type: String, required: true },
    qty: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
  },

  { timestamps: true }
);

const InvoiceProductModel = mongoose.model("invoiceproducts", DataSchema);

module.exports = InvoiceProductModel;
