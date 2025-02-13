const mongoose = require("mongoose");
const axios = require("axios");
const CartModel = require("../../models/CartModel");
const ProfileModel = require("../../models/ProfileModel");
const InvoiceModel = require("../../models/InvoiceModel");
const InvoiceProductModel = require("../../models/InvoiceProductModel");
const PaymentSettingModel = require("../../models/PaymentSettingModel");
const FormData = require("form-data");

// const createInvoiceService = async (req) => {
//   try {
//     let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
//     let cus_email = req.headers.email;
//     //step-01 calculate total payable &vat

//     let matchStage = { $match: { userID: user_id } };
//     let joinStageProduct = {
//       $lookup: {
//         from: "products",
//         localField: "productID",
//         foreignField: "_id",
//         as: "product",
//       },
//     };
//     let unwindProductStage = { $unwind: "$product" };
//     let cartProducts = await CartModel.aggregate([
//       matchStage,
//       joinStageProduct,
//       unwindProductStage,
//     ]);
//     let totalAmount = 0;
//     cartProducts.forEach((element) => {
//       let price;
//       if (element.product.discount) {
//         price = parseFloat(element.product.discountPrice);
//       } else {
//         price = parseFloat(element.product.price);
//       }
//       totalAmount += parseFloat(element.qty) * price;
//     });

//     let vat = totalAmount * 0.05;
//     let payAble = totalAmount + vat;

//     //step-02 prepare customer details & shipping details
//     let profile = await ProfileModel.aggregate([
//       { $match: { userID: user_id } },
//     ]);
//     if (!profile.length) {
//       throw new Error("User profile not found.");
//     }
//     let customer_details = `Name: ${profile[0].cus_name}, Email: ${cus_email},Customer Address: ${profile[0].cus_add},
//                             City: ${profile[0].cus_city},
//                             State: ${profile[0].cus_state},
//                             Country: ${profile[0].cus_country},
//                             Phone: ${profile[0].cus_phone},
//                             Fax: ${profile[0].cus_fax},
//                             Postal Code: ${profile[0].cus_postCode}`;
//     let Shipping_details = `Name: ${profile[0].ship_name},Shipping Address: ${profile[0].ship_add},
//                             City: ${profile[0].ship_city},
//                             State: ${profile[0].ship_state},
//                             Country: ${profile[0].ship_country},
//                             Phone: ${profile[0].ship_phone},

//                             Postal Code: ${profile[0].ship_postCode}`;
//     //step-03 transaction & other id
//     let trx_id = `MERN${Math.floor(10000000 + Math.random() * 900000000)}`;
//     let val_id = 0;
//     let delivery_status = "Pending";
//     let payment_status = "Pending";
//     //step-04 create invoice
//     let invoice = await InvoiceModel.create({
//       userID: user_id,
//       cus_details: customer_details,
//       Ship_details: Shipping_details,
//       tran_id: trx_id,
//       val_id: val_id,
//       delivery_status: delivery_status,
//       payment_status: payment_status,
//       total: totalAmount,
//       vat: vat,
//       payable: payAble,
//     });

//     //step-06 create invoice product
//     let invoice_id = invoice._id;
//     cartProducts.forEach(async (element) => {
//       await InvoiceProductModel.create({
//         userID: user_id,
//         invoiceID: invoice_id,
//         productID: element.productID,
//         qty: element.qty,
//         price: element.product.discount
//           ? element.product.discountPrice
//           : element.product.price,
//         color: element.color,
//         size: element.size,
//       });
//     });

//     //step-07 remove cart

//     await CartModel.deleteMany({ userID: user_id });
//     // console.log("Profile Data:", profile);
//     // console.log("Payable Amount:", payAble);
//     // console.log("Customer Email:", cus_email);

//     //step-08 prepare ssl payment
//     let PaymentSettings = await PaymentSettingModel.find();

//     const form = new FormData();
//     //credentials & settings
//     if (!PaymentSettings.length) {
//       throw new Error("Payment settings not found.");
//     }

//     form.append("store_id", PaymentSettings[0]["store_id"]);

//     form.append("store_passwd", PaymentSettings[0]["store_passwd"]);

//     form.append("total_amount", payAble.toString());

//     form.append("currency", PaymentSettings[0]["store_passwd"]);

//     form.append("tran_id", trx_id);

//     form.append("success_url", PaymentSettings[0]["success_url"]);

//     form.append("fail_url", PaymentSettings[0]["fail_url"]);

//     form.append("cancel_url", PaymentSettings[0]["cancel_url"]);

//     form.append("ipn_url", PaymentSettings[0]["store_passwd"]);

//     form.append("init_url", PaymentSettings[0]["init_url"]);

//     //customer info

//     form.append("cus_name", profile[0]["cus_name"]);
//     form.append("cus_email", cus_email);
//     form.append("cus_add1", profile[0]["cus_add"]);
//     form.append("cus_add2", profile[0]["cus_add"]);
//     form.append("cus_city", profile[0]["cus_city"]);
//     form.append("cus_state", profile[0]["cus_state"]);
//     form.append("cus_postcode", profile[0]["cus_postcode"]);
//     form.append("cus_country", profile[0]["cus_country"]);
//     form.append("cus_phone", profile[0]["cus_phone"]);
//     form.append("cus_fax", profile[0]["cus_phone"]);

//     //shipping info
//     form.append("shipping_method", "yes");
//     form.append("ship_name", profile[0]["ship_name"]);
//     form.append("ship_add1", profile[0]["ship_add"]);
//     form.append("ship_add2", profile[0]["ship_add"]);
//     form.append("ship_city", profile[0]["ship_city"]);
//     form.append("ship_state", profile[0]["ship_state"]);
//     form.append("ship_country", profile[0]["ship_country"]);
//     form.append("ship_postcode", profile[0]["ship_postcode"]);
//     // product info

//     form.append("product_name", "According to invoice");
//     form.append("product_category", "According to invoice");
//     form.append("product_profile", "According to invoice");
//     form.append("product_amount", "According to invoice");

//     //req & res with axios
//     let SSLRes = await axios.post(PaymentSettings[0].init_url, form, {
//       headers: form.getHeaders(), // Required for FormData
//     });

//     return {
//       status: "success",
//       data: SSLRes,
//       // `Total Amount = ${totalAmount} + ${vat}, Pay Able Amount= ${payAble}  `
//     };
//   } catch (error) {
//     console.error("Error in createInvoiceService:", error);
//     return { status: "fail", message: "Something went wrong", error };
//   }
// };
const createInvoiceService = async (req) => {
  try {
    let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
    let cus_email = req.headers.email;

    // Calculate total payable & VAT
    let cartProducts = await CartModel.aggregate([
      { $match: { userID: user_id } },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    let totalAmount = 0;
    cartProducts.forEach((item) => {
      let price = item.product.discount
        ? parseFloat(item.product.discountPrice)
        : parseFloat(item.product.price);
      totalAmount += item.qty * price;
    });

    let vat = totalAmount * 0.05;
    let payAble = totalAmount + vat;

    // Fetch user profile
    let profile = await ProfileModel.aggregate([
      { $match: { userID: user_id } },
    ]);
    console.log(profile);
    if (!profile.length) throw new Error("User profile not found.");

    let customer_details = `Name: ${profile[0].cus_name}, Email: ${cus_email}, Address: ${profile[0].cus_add}, City: ${profile[0].cus_city}, Country: ${profile[0].cus_country},Fax:${profile[0].cus_fax} Phone: ${profile[0].cus_phone}, Post Code: ${profile[0].cus_postCode}`;

    let shipping_details = `Name: ${profile[0].ship_name}, Address: ${profile[0].ship_add}, City: ${profile[0].ship_city}, Country: ${profile[0].ship_country}, Phone: ${profile[0].ship_phone}`;

    // Generate transaction details
    let trx_id = `MERN${Math.floor(10000000 + Math.random() * 900000000)}`;

    // Create invoice
    let invoice = await InvoiceModel.create({
      userID: user_id,
      cus_details: customer_details,
      Ship_details: shipping_details,
      tran_id: trx_id,
      val_id: 0,
      delivery_status: "Pending",
      payment_status: "Pending",
      total: totalAmount,
      vat: vat,
      payable: payAble,
    });

    // Save invoice products
    let invoice_id = invoice._id;
    for (let item of cartProducts) {
      await InvoiceProductModel.create({
        userID: user_id,
        invoiceID: invoice_id,
        productID: item.productID,
        qty: item.qty,
        price: item.product.discount
          ? item.product.discountPrice
          : item.product.price,
        color: item.color,
        size: item.size,
      });
    }

    // Remove items from cart
    await CartModel.deleteMany({ userID: user_id });

    // Fetch payment settings
    let PaymentSettings = await PaymentSettingModel.find();
    if (!PaymentSettings.length) throw new Error("Payment settings not found.");

    const form = new FormData();
    form.append("store_id", PaymentSettings[0].store_id);
    form.append("store_passwd", PaymentSettings[0].store_passwd);
    form.append("total_amount", payAble.toString());
    form.append("currency", "BDT");
    form.append("tran_id", trx_id);
    form.append("success_url", `${PaymentSettings[0].success_url}/${trx_id}`);
    form.append("fail_url", `${PaymentSettings[0].fail_url}/${trx_id}`);
    form.append("cancel_url", `${PaymentSettings[0].cancel_url}/${trx_id}`);
    form.append("ipn_url", `${PaymentSettings[0].ipn_url}/${trx_id}`);

    // Customer info
    form.append("cus_name", profile[0].cus_name);
    form.append("cus_email", cus_email);
    form.append("cus_add1", profile[0].cus_add);
    form.append("cus_add2", profile[0].cus_add);
    form.append("cus_city", profile[0].cus_city);
    form.append("cus_country", profile[0].cus_country);
    form.append("cus_state", profile[0].cus_state);
    form.append("cus_postcode", profile[0].cus_postCode);
    form.append("cus_phone", profile[0].cus_phone);

    // Shipping info
    form.append("ship_name", profile[0].ship_name);
    form.append("ship_add", profile[0].ship_add);
    form.append("ship_add1", profile[0].ship_add);
    form.append("ship_city", profile[0].ship_city);
    form.append("ship_country", profile[0].ship_country);
    form.append("cus_city", profile[0].cus_city);
    form.append("cus_country", profile[0].cus_country);
    form.append("ship_state", profile[0].ship_state);
    form.append("ship_postCode", profile[0].ship_postCode);
    form.append("ship_phone", profile[0].ship_phone);

    // Product info
    form.append("product_name", "According to invoice");
    form.append("product_category", "According to invoice");
    form.append("product_profile", "According to invoice");
    form.append("product_amount", "According to invoice");

    // Send request to payment gateway
    let SSLRes = await axios.post(PaymentSettings[0].init_url, form, {
      headers: form.getHeaders(),
    });

    return { status: "success", data: SSLRes.data };
  } catch (error) {
    console.error("Error in createInvoiceService:", error);
    return { status: "fail", message: error.message };
  }
};
const paymentSuccessService = async (req) => {
  try {
    let trxID = req.params.trx_id
    let invoice = await InvoiceModel.findOneAndUpdate(
      { tran_id: trxID },
      { payment_status: "Completed" },
      { new: true }
    );
    if (!invoice) throw new Error("Invoice not found.");
    return { status: "success", data: invoice };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const paymentFailService = async (req) => {
  try {
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const paymentCancelService = async (req) => {
  try {
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const paymentIPNService = async (req) => {
  try {
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const InvoiceListService = async (req) => {
  try {
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const InvoiceProductListService = async (req) => {
  try {
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
module.exports = {
  createInvoiceService,
  paymentFailService,
  paymentCancelService,
  paymentIPNService,
  paymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
};
