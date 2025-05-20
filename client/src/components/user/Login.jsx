import React from "react";
import SubmitButton from "../../components/user/SubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  let { loginFormData, LoginFormOnChange, UserOtpRequest } = UserStore();
  const onFormSubmit = async () => {
    if (!ValidationHelper.IsEmail(loginFormData.email)) {
      toast.error("Valid Email required");
    } else {
      let res = await UserOtpRequest(loginFormData.email);
      res
        ? (toast.success("Otp sent Successfully!"), navigate("/otp"))
        : toast.error("Something Went Wrong!");
    }
  };
  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Your Email</h4>
            <p>
              A verification code will be sent to the email address you provide
            </p>
            <input
              onChange={(e) => {
                LoginFormOnChange("email", e.target.value);
              }}
              value={loginFormData.email}
              placeholder="Email Address"
              type="email"
              className="form-control"
            />
            <SubmitButton
              onClick={onFormSubmit}
              className="btn mt-3 btn-success"
              text="Next"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
