const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    cus_add: { type: String },
    cus_city: { type: String },
    cus_country: { type: String },
    cus_fax: { type: String },
    cus_name: { type: String },
    cus_phone: { type: String },
    cus_postCode: { type: String },
    cus_state: { type: String },
    ship_add: { type: String },
    ship_city: { type: String },
    ship_country: { type: String },
    ship_name: { type: String },
    ship_phone: { type: String },
    ship_postCode: { type: String },
    ship_state: { type: String },
  },

  { timestamps: true, versionKey: false }
);

// Create a model for the 'Data' collection
const ProfileModel = mongoose.model("profiles", DataSchema);

module.exports = ProfileModel;
