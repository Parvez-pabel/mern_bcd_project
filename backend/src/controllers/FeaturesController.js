const {
  FeatureListService,
  LegalsDetailsService,
} = require("../routes/services/FeaturesService");

exports.FeatureList = async (req, res) => {
  let result = await FeatureListService(req);
  return res.status(200).json(result);
};
exports.LegalsDetails = async (req, res) => {
  let result = await LegalsDetailsService(req);
  return res.status(200).json(result);
};
