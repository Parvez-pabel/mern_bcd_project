import { create } from "zustand";
import { unauthorized } from "../utility/utility";
import axios from "axios";

const WishStore = create((set) => ({
  isWishSubmit: false,
  WishSaveRequest: async (ProductID) => {
    try {
      set({ isWishSubmit: true });
      let res = await axios.post(`/api/SaveWishList`, {
        ProductID: ProductID,
      });
      return res.data["status"] === "success";
    } catch (e) {
      const status = e?.response?.status || null;
      console.error("WishListRequest error:", e);
      unauthorized(status);
    } finally {
      set({ isWishSubmit: false });
    }
  },
  WishList: null,
  WishCount: 0,
  WishListRequest: async () => {
    try {
      let res = await axios.get(`/api/WishList`);
      set({ WishList: res.data["data"] });
      set({ WishCount: res.data["data"].length });
    } catch (e) {
      const status = e?.response?.status || null;
      console.error("CartListRequest error:", e);
      unauthorized(status);
    }
  },

  RemoveWishListRequest: async (ProductID) => {
    try {
      set({ WishList: null });
      await axios.post(`/api/RemoveWishlist`, { ProductID: ProductID });
    } catch (e) {
      const status = e?.response?.status || null;
      console.error("CartListRequest error:", e);
      unauthorized(status);
    }
  },
}));
export default WishStore;
