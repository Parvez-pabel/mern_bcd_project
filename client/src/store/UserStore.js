import { create } from "zustand";
import { getEmail, setEmail, unauthorized } from "../utility/utility";
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

  //profile form manage
  ProfileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postCode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postCode: "",
    ship_state: "",
  },
  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },
  //profile details fetching
  ProfileDetails: null,

  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(`/api/ReadProfile`);
      if (
        res.data.status === "success" &&
        res.data.data &&
        res.data.data.length > 0
      ) {
        set({
          ProfileDetails: res.data["data"][0],
          ProfileForm: res.data["data"][0],
        });
      } else {
        set({
          ProfileDetails: [],
        });
      }
    } catch (e) {
      if (e.response && e.response.status) {
        unauthorized(e.response.status);
      } else {
        console.error("Unexpected error in Request:", e);

        unauthorized(null);
      }
    }
  },

  //profile updating
  ProfileSaveRequest: async (PostBody) => {
    try {
      set({
        ProfileDetails: null,
      });
      let res = await axios.post(`/api/UpdateProfile`, PostBody);
      return res.data["status"] === "success";
    } catch (e) {
      if (e.response && e.response.status) {
        unauthorized(e.response.status);
      } else {
        console.error("Unexpected error in Request:", e);

        unauthorized(null);
      }
      // unauthorized is a function made in utility for authorizing the user is login or not
    }
  },
}));

export default UserStore;
