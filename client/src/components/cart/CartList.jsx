import React from "react";

const CartList = () => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Cart Items Section */}
        <div className="col-lg-8">
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
                <div className="col-6 col-md-1 text-end ">
                  <button className="btn btn-sm btn-outline-danger mt-3">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* অন্যান্য Product Card এর জন্য উপরের Card টা কপি করে item data দিয়ে map করা যেতে পারে */}
          </div>
        </div>

        {/* Summary Section */}
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>$479.97</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Discount</span>
              <span className="text-success">-$26.00</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Shipping</span>
              <span>$5.00</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">$458.97</span>
            </div>

            {/* Promo Code Input */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <button className="btn btn-outline-secondary">Apply</button>
            </div>

            <button className="btn btn-success w-100 mb-3">
              Proceed to Checkout
            </button>

            <div className="text-center text-muted small">
              <i className="bi bi-shield-check text-success"></i> Secure
              checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
