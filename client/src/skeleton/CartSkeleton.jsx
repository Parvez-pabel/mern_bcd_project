import React from "react";
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/images/image.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartSkeleton = () => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Cart Items Section */}
        <div className="col-lg-8">
          <h4 className="mb-4">Shopping Cart</h4>
          {[...Array(4)].map((_, index) => (
            <div className="card p-3 mb-3" key={index}>
              <div className="row align-items-center">
                <div className="col-3 col-md-2">
                  <Lottie
                    animationData={ImagePlaceholder}
                    loop={true}
                    style={{ width: "100%", height: "80px" }}
                  />
                </div>
                <div className="col-9 col-md-4">
                  <Skeleton height={20} width={`80%`} />
                  <Skeleton height={12} width={`60%`} />
                  <Skeleton height={20} width={60} />
                </div>
                <div className="col-12 col-md-3 mt-3 mt-md-0">
                  <Skeleton height={38} />
                </div>
                <div className="col-6 col-md-2 text-md-end mt-3 mt-md-0">
                  <Skeleton height={20} width={60} />
                </div>
                <div className="col-6 col-md-1 text-end mt-3 mt-md-0">
                  <Skeleton circle width={32} height={32} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <Skeleton width={80} />
              <Skeleton width={60} />
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Skeleton width={80} />
              <Skeleton width={60} />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <Skeleton width={80} />
              <Skeleton width={60} />
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <Skeleton width={80} />
              <Skeleton width={80} />
            </div>
            <Skeleton height={36} className="mb-2" />
            <Skeleton height={44} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
