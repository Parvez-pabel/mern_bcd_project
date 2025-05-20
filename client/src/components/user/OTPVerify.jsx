import React from "react";
import SubmitButton from "./SubmitButton";
import ValidationHelper from "../../utility/ValidationHelper";
import { useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore";
import toast from "react-hot-toast";

const OTPVerify = () => {
  let navigate = useNavigate();
  let { OtpFormData, OtpFormOnChange, VerifyLoginRequest } = UserStore();
  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(OtpFormData.otp)) {
      toast.error("Valid OTP required");
    } else {
      let res = await VerifyLoginRequest(OtpFormData.otp);
      res
        ? (toast.success("Login Successful!"), navigate("/"))
        : toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Verification Code</h4>
            <p>
              A verification code has been sent to the email address you provide
            </p>
            <input
              value={OtpFormData.otp}
              onChange={(e) => {
                OtpFormOnChange("otp", e.target.value);
              }}
              placeholder="Verification"
              type="text"
              className="form-control"
            />
            <SubmitButton
              onClick={onFormSubmit}
              className="btn mt-3 btn-success"
              text="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
