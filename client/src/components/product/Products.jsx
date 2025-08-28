import React, { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import ProductsSkeleton from "./../../skeleton/ProductsSkeleton";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const Products = () => {
  const { ProductListByRemark, ProductListByRemarkRequest } = ProductStore();
  useEffect(() => {
    ProductListByRemarkRequest("new");
  }, []);

  return (
    <div className="section">
      <div className="container-fluid py-5 bg-light">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
          <span className="bodySmal mb-3 text-center">
            Explore a World of Choices Across Our Most Popular
          </span>
          <div className="col-12">
            <div>
              <ul
                className="nav nav-pills p-3 justify-content-center mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ProductListByRemarkRequest("new");
                    }}
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-new"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    New
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ProductListByRemarkRequest("trending");
                    }}
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-trending"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Trending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ProductListByRemarkRequest("popular");
                    }}
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-popular"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Popular
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ProductListByRemarkRequest("top");
                    }}
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-top"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                  >
                    Top
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ProductListByRemarkRequest("special");
                    }}
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-special"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                  >
                    Special
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ProductListByRemarkRequest("flash");
                    }}
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-flash"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                  >
                    Flash
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent ">
                <div
                  className="tab-pane fade show active"
                  id="pills-new"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  {ProductListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container ">
                      <div className="row mt-5">
                        {ProductListByRemark.map((item, index) => {
                          let price = (
                            <p className="bodyMedium text-dark my-1">
                              Price{item.price}
                            </p>
                          );
                          if (item.discount === true) {
                            price = (
                              <p className="bodyMedium text-dark my-1">
                                Price:<strike> ${item.price} </strike>{" "}
                                <b>${item.discountPrice}</b>
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
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
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
                                    src={item.image}
                                    alt={item.title}
                                  />
                                </div>

                                {/* Body */}
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
                                    {price}
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

                <div
                  className="tab-pane fade"
                  id="pills-trending"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex="0"
                >
                  {ProductListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ProductListByRemark.map((item, index) => {
                          let price = (
                            <p className="bodyMedium text-dark my-1">
                              Price{item.price}
                            </p>
                          );
                          if (item.discount === true) {
                            price = (
                              <p className="bodyMedium text-dark my-1">
                                Price:<strike> ${item.price} </strike>{" "}
                                <b>${item.discountPrice}</b>
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
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
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
                                    src={item.image}
                                    alt={item.title}
                                  />
                                </div>
                                <div className="card-body d-flex flex-column justify-content-between">
                                  <p
                                    className="bodySmall text-secondary my-1"
                                    style={{ minHeight: "40px" }}
                                  >
                                    {item.title}
                                  </p>
                                  <div className="mt-auto">
                                    {price}
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
                <div
                  className="tab-pane fade"
                  id="pills-popular"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabIndex="0"
                >
                  {ProductListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ProductListByRemark.map((item, index) => {
                          let price = (
                            <p className="bodyMedium text-dark my-1">
                              Price{item.price}
                            </p>
                          );
                          if (item.discount === true) {
                            price = (
                              <p className="bodyMedium text-dark my-1">
                                Price:<strike> ${item.price} </strike>{" "}
                                <b>${item.discountPrice}</b>
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
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
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
                                    {price}
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
                <div
                  className="tab-pane fade"
                  id="pills-special"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {ProductListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ProductListByRemark.map((item, index) => {
                          let price = (
                            <p className="bodyMedium text-dark my-1">
                              Price{item.price}
                            </p>
                          );
                          if (item.discount === true) {
                            price = (
                              <p className="bodyMedium text-dark my-1">
                                Price:<strike> ${item.price} </strike>{" "}
                                <b>${item.discountPrice}</b>
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
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                className="card shadow-sm h-100 rounded-3 bg-white"
                              >
                                {/* Image wrapper */}
                                <div
                                  style={{
                                    padding:"15px",
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

                                {/* Body */}
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
                                    {price}
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
                <div
                  className="tab-pane fade"
                  id="pills-top"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {ProductListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ProductListByRemark.map((item, index) => {
                          let price = (
                            <p className="bodyMedium text-dark my-1">
                              Price{item.price}
                            </p>
                          );
                          if (item.discount === true) {
                            price = (
                              <p className="bodyMedium text-dark my-1">
                                Price:<strike> ${item.price} </strike>{" "}
                                <b>${item.discountPrice}</b>
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
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
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
                                    src={item.image}
                                    alt={item.title}
                                  />
                                </div>

                                {/* Body */}
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
                                    {price}
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
                <div
                  className="tab-pane fade"
                  id="pills-flash"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {ProductListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ProductListByRemark.map((item, index) => {
                          let price = (
                            <p className="bodyMedium text-dark my-1">
                              Price{item.price}
                            </p>
                          );
                          if (item.discount === true) {
                            price = (
                              <p className="bodyMedium text-dark my-1">
                                Price:<strike> ${item.price} </strike>{" "}
                                <b>${item.discountPrice}</b>
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
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
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
                                    src={item.image}
                                    alt={item.title}
                                  />
                                </div>

                                {/* Body */}
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
                                    {price}
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
      </div>
    </div>
  );
};

export default Products;
