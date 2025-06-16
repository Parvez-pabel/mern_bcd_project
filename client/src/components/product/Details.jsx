import React, { useState } from "react";
import ProductImages from "./ProductImages";
import ProductStore from "../../store/ProductStore";
import DetailsSkeleton from "../../skeleton/DetailsSkeleton";
import parse from "html-react-parser";
import Reviews from "./Reviews";
import CartButton from "./../cart/CartButton";
import toast from "react-hot-toast";
import CartStore from "../../store/CartStore";

const Details = () => {
  const { ProductDetails } = ProductStore();
  const [Quantity, SetQuantity] = useState(1);
  const { CartFormChange, CartForm, CartSaveRequest, CartListRequest } =
    CartStore();
  const IncrementQuantity = () => {
    SetQuantity((Quantity) => Quantity + 1);
  };
  const DecrementQuantity = () => {
    if (Quantity > 1) {
      SetQuantity((Quantity) => Quantity - 1);
    }
  };
  const AddCart = async (productID) => {
    if (CartForm.color === "" || CartForm.size === "") {
      toast.error("Please select both color and size");
      return;
    }
    let res = await CartSaveRequest(CartForm, productID, Quantity);
    if (res) {
      toast.success("Cart Item Added");
      await CartListRequest();
    }
  };
  if (ProductDetails === null) {
    return <DetailsSkeleton />;
  } else {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-3">
              <ProductImages />
            </div>
            <div className="col-md-5 p-3">
              <h4>{ProductDetails[0].title}</h4>
              <p className="text-muted bodySmal my-1">
                {ProductDetails[0].category.categoryName}
              </p>
              <p className="text-muted bodySmal my-1">
                {ProductDetails[0].brand.brandName}
              </p>
              <p className="bodySmal mb-2 mt-1">{ProductDetails[0].shortDes}</p>

              {ProductDetails[0].discount ? (
                <span className=" fs-4 ">
                  <strike className="text-secondary">
                    $ {ProductDetails[0].price}
                  </strike>{" "}
                  <b>$ {ProductDetails[0].discountPrice}</b>
                </span>
              ) : (
                <span>{ProductDetails[0].price}</span>
              )}

              <div className="row">
                <div className="col-4 p-2">
                  <label className="bodySmal">Size</label>
                  <select
                    value={CartForm.size}
                    onChange={(e) => {
                      CartFormChange("size", e.target.value);
                    }}
                    className="form-control my-2 form-select"
                  >
                    <option value="">Size</option>
                    {ProductDetails[0].details.size
                      .split(",")
                      .map((item, index) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Color</label>
                  <select
                    value={CartForm.color}
                    onChange={(e) => {
                      CartFormChange("color", e.target.value);
                    }}
                    className="form-control my-2 form-select"
                  >
                    <option value="">Color</option>
                    {ProductDetails[0].details.color
                      .split(",")
                      .map((item, index) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Quantity</label>
                  <div className="input-group my-2">
                    <button
                      onClick={DecrementQuantity}
                      className="btn btn-outline-secondary"
                    >
                      -
                    </button>
                    <input
                      value={Quantity}
                      type="text"
                      className="form-control bg-light text-center"
                      readOnly
                    />
                    <button
                      onClick={IncrementQuantity}
                      className="btn btn-outline-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-4 p-2">
                  <CartButton
                    onClick={async () => {
                      await AddCart(ProductDetails[0]["_id"]);
                    }}
                    className="btn w-100 btn-success"
                    text="Add to Cart"
                  />
                </div>
                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Wish</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Speci-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Speci-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Speci-tab-pane"
                  aria-selected="true"
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Review-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Review-tab-pane"
                  aria-selected="false"
                >
                  Review
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Speci-tab-pane"
                role="tabpanel"
                aria-labelledby="Speci-tab"
                tabIndex="0"
              >
                {parse(ProductDetails[0].details.des)}
              </div>
              <div
                className="tab-pane fade"
                id="Review-tab-pane"
                role="tabpanel"
                aria-labelledby="Review-tab"
                tabIndex="0"
              >
                <Reviews />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
