const express = require("express");
const {
  ProductBrandList,
  ProductCategoryList,
  ProductSliderList,
  ProductListByBrand,
  ProductListByRemark,
  ProductReviewList,
  ProductDetails,
  ProductListByCategory,
  ProductListBySimilar,
  ProductListByKeyword,
} = require("../controllers/ProductController");
const {
  UserOTP,
  VerifyOTP,
  UserLogout,
  CreateProfile,
  ReadProfile,
} = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const {
  RemoveWishlist,
  Wishlist,
  SaveWishlist,
} = require("../controllers/WishListController");
const {
  SaveCartList,
  RemoveCartList,
  CartList,
  UpdateCartList,
} = require("../controllers/CartListController");
const {
  CreateInvoice,
  InvoiceList,
  InvoiceProductList,
  PaymentSuccess,
  PaymentCancel,
  PaymentFail,
  PaymentIPN,
} = require("../controllers/InvoiceController");

const router = express.Router();

// Define Product related routes
router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductListByCategory);
router.get("/ProductListBySimilar/:CategoryID", ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword", ProductListByKeyword);
router.get("/ProductListByRemark/:Remark", ProductListByRemark);
router.get("/ProductReviewList/:ProductID", ProductReviewList);
// router.get("/CreateProductReview", CreateProductReview);
router.get("/ProductDetails/:ProductID", ProductDetails);

//define user related routes

router.get("/UserOTP/:email", UserOTP);
router.get("/VerifyOTP/:email/:otp", VerifyOTP);
router.get("/UserLogout", AuthVerification, UserLogout);
router.post("/CreateProfile", AuthVerification, CreateProfile);
router.post("/UpdateProfile", AuthVerification, CreateProfile);
router.get("/ReadProfile", AuthVerification, ReadProfile);

//wishlist routes

router.post("/SaveWishlist", AuthVerification, SaveWishlist);
router.post("/RemoveWishlist", AuthVerification, RemoveWishlist);
router.get("/WishList", AuthVerification, Wishlist);

// cart routes
router.post("/SaveCartList", AuthVerification, SaveCartList);
router.post("/RemoveCartList", AuthVerification, RemoveCartList);
router.get("/CartList", AuthVerification, CartList);
router.post("/UpdateCartList/:cartID", AuthVerification, UpdateCartList);

//invoice & payment  routes

router.get("/CreateInvoice", AuthVerification, CreateInvoice);
router.get("/invoiceList", AuthVerification, InvoiceList);
router.get("/invoiceProductList/:inv_id", AuthVerification, InvoiceProductList);
router.get("/paymentSuccess/:trx_id", AuthVerification, PaymentSuccess);
router.get("/paymentCancel/:trx_id", AuthVerification, PaymentCancel);
router.get("/paymentFails/:trx_id", AuthVerification, PaymentFail);
router.get("/paymentIPN/:trx_id", AuthVerification, PaymentIPN);

module.exports = router;
