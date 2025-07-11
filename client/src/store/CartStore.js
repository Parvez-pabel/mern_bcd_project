import axios from "axios";
import { create } from "zustand";
import { unauthorized } from "../utility/utility";

const CartStore = create((set) => ({
  isCartSubmit: false,
  CartForm: { productID: "", color: "", size: "" },
  CartFormChange: (name, value) => {
    set((state) => ({
      CartForm: {
        ...state.CartForm,
        [name]: value,
      },
    }));
  },

  CartSaveRequest: async (PostBody, productID, quantity) => {
    try {
      set({ isCartSubmit: true });
      PostBody.productID = productID;
      PostBody.qty = quantity;
      let res = await axios.post(`/api/SaveCartList`, PostBody);
      return res.data["status"] === "success";
    } catch (e) {
      if (e.response && e.response.status) {
        unauthorized(e.response.status);
      } else {
        console.error("Unexpected error in Request:", e);

        unauthorized(null);
      }
    } finally {
      set({ isCartSubmit: false });
    }
  },
  CartList: null,
  CartCount: 0,
  CartTotal: 0,
  CartVatTotal: 0,
  CartPayableTotal: 0,

  CartListRequest: async () => {
    try {
      const res = await axios.get(`api/CartList`);
      const cartData = res.data?.data || [];

      let total = 0;

      cartData.forEach((item) => {
        const price = item.product.discount
          ? parseInt(item.product.discountPrice)
          : parseInt(item.product.price);
        total += parseInt(item.qty) * price;
      });

      const vat = total * 0.05;
      const payable = total + vat;

      set({
        CartList: cartData,
        CartCount: cartData.length,
        CartTotal: total,
        CartVatTotal: vat,
        CartPayableTotal: payable,
      });
    } catch (e) {
      const status = e?.response?.status || null;
      console.error("CartListRequest error:", e);
      unauthorized(status);
    }
  },
  RemoveCartListRequest: async (cartID) => {
    try {
      set({
        CartList: null,
      });
      await axios.post(`api/RemoveCartList`, { _id: cartID });
    } catch (e) {
      const status = e?.response?.status || null;
      console.error("CartListRequest error:", e);
      unauthorized(status);
    }
  },
}));
export default CartStore;
