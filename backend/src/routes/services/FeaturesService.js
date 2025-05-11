const FeatureModel = require("../../models/FeatureModel");
const LegalModel = require("../../models/LegalModel");

const FeatureListService = async () => {
  try {
    let data = await FeatureModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const LegalsDetailsService = async (req) => {
  try {
    let type = req.params.type;
    let data = await LegalModel.find({ type: type });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
module.exports = {
  FeatureListService,
  LegalsDetailsService,
};
