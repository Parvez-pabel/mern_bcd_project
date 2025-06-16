const {
  UserOTPService,
  VerifyOTPService,
  CreateProfileService,
  ReadProfileService,
} = require("../routes/services/UserService");

exports.UserOTP = async (req, res) => {
  let result = await UserOTPService(req);
  return res.status(200).json(result);
};
exports.VerifyOTP = async (req, res) => {
  let result = await VerifyOTPService(req);
  // set cookie for holding token
  if (result.status === "success") {
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    }; // 24 hour expiry time
    res.cookie("token", result.token, cookieOption);
  } else {
    return res.status(200).json(result);
  }
  return res.status(200).json(result);
};

exports.UserLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};
exports.CreateProfile = async (req, res) => {
  //create & update profile
  let result = await CreateProfileService(req);
  return res.status(200).json(result);
};

exports.ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(200).json(result);
};
