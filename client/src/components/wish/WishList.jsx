import React, { useEffect } from "react";
import ProductsSkeleton from "./../../skeleton/ProductsSkeleton";
import NoData from "../NoData/NoData";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import WishStore from "../../store/WishStore";

const WishList = () => {
  const { WishListRequest, WishList, RemoveWishListRequest } = WishStore();

  useEffect(() => {
    (async () => {
      await WishListRequest();
    })();
  }, []);

  const remove = async (productID) => {
    await RemoveWishListRequest(productID);
    await WishListRequest();
  };

  if (WishList === null) {
    return (
      <div className="container">
        <div className="row">
          <ProductsSkeleton />
        </div>
      </div>
    );
  } else if (WishList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          {WishList.map((item, i) => {
            let price = (
              <p className="bodyMedium  text-dark my-1">
                Price: ${item["product"]["price"]}{" "}
              </p>
            );
            if (item["product"]["discount"] === true) {
              price = (
                <p className="bodyMedium  text-dark my-1">
                  Price:<strike> ${item["product"]["price"]} </strike> $
                  {item["product"]["discountPrice"]}{" "}
                </p>
              );
            }
            return (
              <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="card shadow-sm h-100 rounded-3 bg-white"
                >
                  {/* Image wrapper */}
                  <div
                    style={{
                      padding: "15px",
                      height: "180px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="w-100 h-100 rounded-top-2"
                      style={{ objectFit: "contain" }}
                      src={item["product"]["image"]}
                      alt={item.title}
                    />
                  </div>
                  <div className="card-body">
                    <p
                      className="bodySmall text-secondary my-1 text-truncate"
                      style={{ minHeight: "40px" }}
                    >
                      {item["product"]["title"]}
                    </p>
                    <div className="mt-auto">
                      {price}
                      <StarRatings
                        rating={parseFloat(item["product"]["star"])}
                        starRatedColor="red"
                        starDimension="15px"
                        starSpacing="2px"
                      />
                    </div>

                    <p className="mt-3">
                      <button
                        onClick={async () => {
                          await remove(item["ProductID"]);
                        }}
                        className="btn  btn-outline-danger btn-sm"
                      >
                        Remove
                      </button>
                      <Link
                        className="btn mx-2 btn-outline-success btn-sm"
                        to={`/details/${item["ProductID"]}`}
                      >
                        Details
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default WishList;
