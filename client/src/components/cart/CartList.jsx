import React, { useEffect, useState } from "react";
import CartStore from "./../../store/CartStore";
import CartSkeleton from "./../../skeleton/CartSkeleton";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CartList = () => {
  const {
    CartList,
    CartCount,
    CartTotal,
    CartVatTotal,
    CartPayableTotal,
    CartListRequest,
    RemoveCartListRequest,
    CartSaveRequest,
  } = CartStore();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping] = useState(5);

  useEffect(() => {
    (async () => {
      await CartListRequest();
    })();
  }, []);

  const remove = async (cartID) => {
    await RemoveCartListRequest(cartID);
    await CartListRequest();
    toast.success("Item removed from cart");
  };

  const updateQty = async (item, newQty) => {
    if (newQty < 1) return;
    const postBody = {
      color: item.color,
      size: item.size,
    };
    await CartSaveRequest(postBody, item.productID, newQty);
    await CartListRequest();
  };

  const handlePromoApply = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10);
      toast.success("Promo code applied");
    } else {
      setDiscount(0);
      toast.error("Invalid promo code");
    }
  };

  const finalTotal = CartPayableTotal + shipping - discount;

  if (CartList === null) return <CartSkeleton />;
  if (CartList.length === 0)
    return <h4 className="text-center my-5">🛒 Your cart is empty.</h4>;

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Cart Items Section */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Shopping Cart</h4>
            <span className="text-muted">{CartCount} items</span>
          </div>

          {/* Product Cards */}
          <div className="d-flex flex-column gap-3">
            {CartList.map((item) => (
              <div className="card p-3" key={item._id}>
                <div className="row align-items-center">
                  {/* Product Image (clickable) */}
                  <div className="col-3 col-md-2">
                    <Link to={`/details/${item.product._id}`}>
                      <img
                        src={
                          item.product?.image ?? "https://placehold.co/600x400"
                        }
                        className="img-fluid rounded"
                        alt="Product"
                      />
                    </Link>
                  </div>

                  {/* Product Info (clickable) */}
                  <div className="col-9 col-md-4">
                    <Link
                      to={`/details/${item.product._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h6 className="mb-1">{item.product?.title}</h6>
                      <p className="text-muted small mb-1">
                        {item.color || "N/A"} | {item.size || "N/A"}
                      </p>
                      {item.product?.discount && (
                        <span className="badge bg-danger">DISCOUNT</span>
                      )}
                    </Link>
                  </div>

                  {/* Quantity Control */}
                  <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQty(item, item.qty - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.qty}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQty(item, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-6 col-md-2 text-md-end mt-2 mt-md-0 mt-3">
                    <span className="fw-bold">
                      $
                      {item.product?.discount
                        ? item.product?.discountPrice
                        : item.product?.price}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="col-6 col-md-1 text-end">
                    <button
                      onClick={() => remove(item._id)}
                      className="btn btn-sm btn-outline-danger mt-3"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>${CartTotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">VAT (5%)</span>
              <span className="text-danger">+${CartVatTotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Promo Discount</span>
              <span className="text-success">-${discount.toFixed(2)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">${finalTotal.toFixed(2)}</span>
            </div>

            {/* Promo Code Input */}
            <div className="input-group mb-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="form-control"
                placeholder="Promo code"
              />
              <button
                onClick={handlePromoApply}
                className="btn btn-outline-secondary"
              >
                Apply
              </button>
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
