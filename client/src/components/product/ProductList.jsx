import React, { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";

const ProductList = () => {
  const {
    ProductList,
    BrandList,
    BrandListRequest,
    CategoryList,
    CategoryListRequest,
    ProductListByFilterRequest,
  } = ProductStore();

  let [Filter, SetFilter] = useState({
    brandID: "",
    categoryID: "",
    priceMax: "",
    priceMin: "",
  });

  const inputOnChange = async (name, value) => {
    SetFilter((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      BrandList === null ? await BrandListRequest() : null;
      CategoryList === null ? await CategoryListRequest() : null;
      let isEveryFilterPropertyEmpty = Object.values(Filter).every(
        (value) => value === ""
      );
      !isEveryFilterPropertyEmpty
        ? await ProductListByFilterRequest(Filter)
        : null;
    })();
  }, [Filter]);

  return (
    <div className="container mt-2  ">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-50 p-3 shadow-sm">
            <label className="from-label mt-3">Brands</label>
            <select
              value={Filter.brandID}
              onChange={async (e) => {
                await inputOnChange("brandID", e.target.value);
              }}
              className="form-control form-select"
            >
              <option value="">Choose Brands</option>
              {BrandList !== null ? (
                BrandList.map((item, index) => {
                  return (
                    <option key={index} value={item["_id"]}>
                      {item.brandName}{" "}
                    </option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="from-label mt-3">Category</label>
            <select
              value={Filter.categoryID}
              onChange={async (e) => {
                await inputOnChange("categoryID", e.target.value);
              }}
              className="form-control form-select"
            >
              <option value="">Choose Category</option>
              {CategoryList !== null ? (
                CategoryList.map((item, index) => {
                  return (
                    <option key={index} value={item["_id"]}>
                      {item.categoryName}{" "}
                    </option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="from-label mt-3">
              Maximum Price ${Filter.priceMax}
            </label>
            <input
              value={Filter.priceMax}
              onChange={async (e) => {
                await inputOnChange("priceMax", e.target.value);
              }}
              min={0}
              max={1000000}
              step={1000}
              type="range"
              className="form-range"
            />
            <label className="from-label mt-3">
              Minimum Price ${Filter.priceMin}
            </label>
            <input
              value={Filter.priceMin}
              onChange={async (e) => {
                await inputOnChange("priceMin", e.target.value);
              }}
              min={0}
              max={1000000}
              step={1000}
              type="range"
              className="form-range"
            />
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              {ProductList === null ? (
                <ProductsSkeleton />
              ) : (
                <div className="container">
                  <div className="row">
                    {ProductList.map((item, index) => {
                      let Price = (
                        <p className="bodyMedium text-dark my-1">
                          Price {item.price}
                        </p>
                      );
                      if (item.discount === true) {
                        Price = (
                          <p>
                            Price:<strike> ${item.price}</strike>
                            <b> ${item.discountPrice}</b>
                          </p>
                        );
                      }
                      return (
                        <div
                          key={index}
                          className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                        >
                          <Link
                            to={`/details/${item._id}`}
                            className="card shadow-sm h-100 rounded-3 bg-white"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                height: "180px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                className="w-100 h-100 rounded-top-2"
                                style={{ objectFit: "contain" }}
                                src={item.image}
                                alt={item.title}
                              />
                            </div>

                            <div
                              className="card-body d-flex flex-column justify-content-between"
                              style={{ flexGrow: 1 }}
                            >
                              <p
                                className="bodySmall text-secondary my-1 text-truncate"
                                style={{ minHeight: "40px" }}
                              >
                                {item.title}
                              </p>
                              
                              <div className="mt-auto">
                                {Price}
                                <StarRatings
                                  rating={Number(item?.star || 0)}
                                  starRatedColor="red"
                                  starDimension="15px"
                                  starSpacing="2px"
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
