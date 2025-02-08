const mongoose = require("mongoose");

const formData = require("form-data");
const axios = require("axios");
const CartModel = require("../../models/CartModel");
const ProfileModel = require("../../models/ProfileModel");
const InvoiceModel = require("../../models/InvoiceModel");
const InvoiceProductModel = require("../../models/InvoiceProductModel");

const createInvoiceService = async (req) => {
  try {
    let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
    let cus_email = req.headers.email;
    //step-01 calculate total payable &vat
    let matchStage = { $match: { userID: user_id } };
    let joinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };
    let cartProducts = await CartModel.aggregate([
      matchStage,
      joinStageProduct,
      unwindProductStage,
    ]);
    let totalAmount = 0;
    cartProducts.forEach((element) => {
      let price;
      if (element.product.discount) {
        price = parseFloat(element.product.discountPrice);
      } else {
        price = parseFloat(element.product.price);
      }
      totalAmount += parseFloat(element.qty) * price;
    });

    let vat = totalAmount * 0.05;
    let payAble = totalAmount + vat;

    //step-02 prepare customer details & shipping details
    let profile = await ProfileModel.aggregate([matchStage]);
    let customer_details = `Name: ${profile[0].cus_name}, Email: ${cus_email},Customer Address: ${profile[0].cus_add}, 
                            City: ${profile[0].cus_city}, 
                            State: ${profile[0].cus_state}, 
                            Country: ${profile[0].cus_country}, 
                            Phone: ${profile[0].cus_phone}, 
                            Fax: ${profile[0].cus_fax}, 
                            Postal Code: ${profile[0].cus_postCode}`;
    let Shipping_details = `Name: ${profile[0].ship_name},Shipping Address: ${profile[0].ship_add}, 
                            City: ${profile[0].ship_city}, 
                            State: ${profile[0].ship_state}, 
                            Country: ${profile[0].ship_country}, 
                            Phone: ${profile[0].ship_phone}, 
                            
                            Postal Code: ${profile[0].ship_postCode}`;
    //step-03 transaction & other id
    let trx_id = `MERN${Math.floor(10000000 + Math.random() * 900000000)}`;
    let val_id = 0;
    let delivery_status = "Pending";
    let payment_status = "Pending";
    //step-04 create invoice
    let invoice = await InvoiceModel.create({
      userID: user_id,

      cus_details: customer_details,
      Ship_details: Shipping_details,
      tran_id: trx_id,
      val_id: val_id,
      delivery_status: delivery_status,
      payment_status: payment_status,
      total: totalAmount,
      vat: vat,
      payable: payAble,
    });

    //step-06 create invoice product
    let invoice_id = invoice._id;
    cartProducts.forEach(async (element) => {
      await InvoiceProductModel.create({
        userID: user_id,
        invoiceID: invoice_id,
        productID: element.productID,
        qty: element.qty,
        price: element.product.discount
          ? element.product.discountPrice
          : element.product.price,
        color: element.color,
        size: element.size,
      });
    });

    //step-07 remove cart

    await CartModel.deleteMany({ userID: user_id });
    //step-08 prepare ssl payment

    return {
      status: "success",
      invoice_id,
      // `Total Amount = ${totalAmount} + ${vat}, Pay Able Amount= ${payAble}  `
    };
  } catch (error) {
    console.error("Error in createInvoiceService:", error);
    return { status: "fail", message: "Something went wrong", error };
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
const paymentSuccessService = async (req) => {
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
