import { create } from "zustand";
import { getEmail, setEmail } from "../utility/utility";
import axios from "axios";
import Cookies from "js-cookie";

const UserStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },

  loginFormData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      loginFormData: { ...state.loginFormData, [name]: value },
    }));
  },

  OtpFormData: { otp: "" },
  OtpFormOnChange: (name, value) => {
    set((state) => ({
      OtpFormData: { ...state.OtpFormData, [name]: value },
    }));
  },

  isFormSubmit: false,

  UserOtpRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/UserOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },
  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.get(`/api/VerifyOTP/${email}/${otp}`);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  LogoutRequest: async () => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.get(`/api/UserLogout`);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },
}));

export default UserStore;
