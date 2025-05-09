import axios from "axios";
import { create } from "zustand";

const FeatureStore = create((set) => ({
  FeatureList: null,
  FeatureListRequest: async () => {
    let res = await axios.get(`/api/FeaturesList`);
    if (res.data["status"] === "success") {
      set({ FeatureList: res.data["data"] });
    }
  },
}));

export default FeatureStore;
