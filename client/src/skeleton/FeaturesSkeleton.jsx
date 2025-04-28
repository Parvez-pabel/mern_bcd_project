import Lottie from "lottie-react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceHolder from "../assets/images/image.json";

const FeaturesSkeleton = () => {
  return (
    <>
      <div className="container section">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Features</h1>
          <span className="bodySmal mb-5 text-center">
            Explore a World of Choices Across Our Most Popular <br />
            Shopping Categories{" "}
          </span>
          {Array.from({ length: 4 }).map((item, index) => {
            return (
              <div key={index} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <Lottie
                          className="w-100"
                          animationData={ImagePlaceHolder}
                          loop={true}
                        />
                      </div>
                      <div className="col-8">
                        <Skeleton count={3} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeaturesSkeleton;
