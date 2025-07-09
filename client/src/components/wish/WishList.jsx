import React, { useEffect } from "react";
import WishStore from "../../store/WishStore";

const WishList = () => {
  // const { WishList, WishListRequest } = WishStore();

  // useEffect(() => {
  //   WishListRequest(); // call it only once
  // }, []);
  // const AddCart = async (productID) => {
  //   const { CartSaveRequest, CartListRequest } = CartStore();
  //   let res = await CartSaveRequest(productID);
  //   if (res) {
  //     toast.success("Cart Item Added");
  //     await CartListRequest();
  //   }
  // };
  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Cart Items Section */}
        <div className="col-lg-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Shopping Cart</h4>
            <span className="text-muted">3 items</span>
          </div>

          {/* Product Cards */}
          <div className="d-flex flex-column gap-3">
            {/* Product Card */}
            <div className="card p-3">
              <div className="row align-items-center">
                <div className="col-3 col-md-2">
                  <img
                    src="https://placehold.co/600x400"
                    className="img-fluid"
                    alt="Product"
                  />
                </div>
                <div className="col-9 col-md-4">
                  <h6 className="mb-1">Wireless Headphones</h6>
                  <p className="text-muted small mb-1">
                    Black | Premium Series
                  </p>
                  <span className="badge bg-danger">20% OFF</span>
                </div>
                <div className="col-12 col-md-3 mt-2 mt-md-0 ">
                  <div className="input-group ">
                    <button className="btn btn-outline-secondary">-</button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value="1"
                      min="1"
                      readOnly
                    />
                    <button className="btn btn-outline-secondary">+</button>
                  </div>
                </div>
                <div className="col-6 col-md-2 text-md-end mt-2 mt-md-0 mt-3">
                  <span className="fw-bold">$129.99</span>
                </div>
                {/* <div>
                  <CartButton
                    onClick={async () => {
                      await AddCart(ProductDetails[0]["_id"]);
                    }}
                    className="btn w-100 btn-success"
                    text="Add to Cart"
                  />
                </div> */}
                <div className="col-6 col-md-1 text-end ">
                  <button className="btn btn-sm btn-outline-danger mt-3">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
