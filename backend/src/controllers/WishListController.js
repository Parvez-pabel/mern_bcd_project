const {
  WishlistService,
  SaveWishlistService,
  RemoveWishlistService,
} = require("../routes/services/WishListService");

exports.Wishlist = async (req, res) => {
  let result = await WishlistService(req);
  return res.status(200).json(result);
};

exports.SaveWishlist = async (req, res) => {
  let result = await SaveWishlistService(req);
  return res.status(200).json(result);
};

exports.RemoveWishlist = async (req, res) => {
  let result = await RemoveWishlistService(req);
  return res.status(200).json(result);
};
