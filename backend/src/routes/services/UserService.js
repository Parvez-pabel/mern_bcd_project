const ProfileModel = require("../../models/ProfileModel");
const UserModel = require("../../models/UserModel");
const EmailSend = require("../../utility/EmailHelper");
const { encodedToken } = require("../../utility/TokenHelper");

const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let OTP = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `MERN E-Commerce Project Your OTP is ${OTP}`;
    let EmailSubject = "Email Verification ";

    await EmailSend(email, EmailSubject, EmailText);
    await UserModel.updateOne(
      {
        email: email,
      },
      { $set: { otp: OTP } },
      {
        upsert: true,
      }
    );
    return { status: "success", message: "6 Digit OTP sent successfully" };
  } catch (error) {
    console.error("Error in UserOTPService:", error);
    return { status: "fail", message: error.message };
  }
};
const VerifyOTPService = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    //check user existing
    let exists = await UserModel.exists({ email: email, otp: otp });
    if (exists) {
      //user id read
      let user_id = await UserModel.findOne({ email: email, otp: otp }).select(
        "_id"
      );
      // creating token
      let token = encodedToken(email, user_id._id.toString());
      // otp code update to 0
      await UserModel.updateOne(
        {
          email: email,
        },
        { $set: { otp: "0" } }
      );

      return { status: "success", message: "OTP Verified", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (error) {
    console.error("Error in VerifyOTPService:", error);
  }
};

const CreateProfileService = async (req) => {
  //create & update profile
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.user_id = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error in CreateProfileService:", error);
    return { status: "fail", message: error.message };
  }
};
// const ReadProfileService = async (req) => {
//   //read profile
//   try {
//     let user_id = req.headers.user_id;
//     let profile = await ProfileModel.findOne({ userID: user_id });
//     if (profile) {
//       return { status: "success", profile: profile };
//     } else {
//       return { status: "fail", message: "Profile not found" };
//     }
//   } catch (error) {
//     console.error("Error in ReadProfileService:", error);
//     return { status: "fail", message: error.message };
//   }
// };
const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await ProfileModel.find({ userID: user_id });
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
module.exports = {
  UserOTPService,
  VerifyOTPService,
  CreateProfileService,
  ReadProfileService,
};
