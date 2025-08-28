const {
  createInvoiceService,
  paymentFailService,
  paymentCancelService,
  paymentIPNService,
  paymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
} = require("../routes/services/InvoiceService");

exports.CreateInvoice = async (req, res) => {
  let result = await createInvoiceService(req);
  return res.status(200).json(result);
};
exports.PaymentSuccess = async (req, res) => {
  let result = await paymentSuccessService(req);
  return res.redirect("http://localhost:5173/orders");
};
exports.PaymentFail = async (req, res) => {
  let result = await paymentFailService(req);
  return res.redirect("http://localhost:5173/orders");
};
exports.PaymentCancel = async (req, res) => {
  let result = await paymentCancelService(req);
  return res.redirect("http://localhost:5173/orders");
};
exports.PaymentIPN = async (req, res) => {
  let result = await paymentIPNService(req);
  return res.status(200).json(result);
};

exports.InvoiceList = async (req, res) => {
  let result = await InvoiceListService(req);
  return res.status(200).json(result);
};
exports.InvoiceProductList = async (req, res) => {
  let result = await InvoiceProductListService(req);
  return res.status(200).json(result);
};
