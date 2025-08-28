
import axios from "axios";
import { getEmail, setEmail, unauthorized } from "../utility/utility.js";
import Cookies from "js-cookie";
import { create } from "zustand";
const ReviewStore = create((set) => ({
  isReviewSubmit: false,
  ReviewFormData: { des: "", rating: "5", ProductID: "" },
  ReviewFormOnChange: (name, value) => {
    set((state) => ({
      ReviewFormData: {
        ...state.ReviewFormData,
        [name]: value,
      },
    }));
  },

  ReviewSaveRequest: async (PostBody) => {
    try {
      set({ isReviewSubmit: true });
      let res = await axios.post(`/api/CreateReview`, PostBody);
      console.log(res);
      return res.data["status"] === "success";
    } catch (e) {
      const status = e?.response?.status || null;
      console.error("ReviewSaveRequest error:", e);
      unauthorized(status);
    } finally {
      set({ isReviewSubmit: false });
    }
  },
}));

export default ReviewStore;
