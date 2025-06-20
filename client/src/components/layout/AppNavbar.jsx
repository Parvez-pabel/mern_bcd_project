import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/zawyahlogo.png";
import ProductStore from "../../store/ProductStore";
import UserStore from "../../store/UserStore";
import SubmitButton from "../user/SubmitButton";
import toast from "react-hot-toast";
import CartStore from "../../store/CartStore";
import WishStore from "../../store/WishStore";

const AppNavbar = () => {
  const isLogin = UserStore((state) => state.isLogin);
  const LogoutRequest = UserStore((state) => state.LogoutRequest);
  const navigate = useNavigate();
  const SearchKeyWord = ProductStore((state) => state.SearchKeyWord);
  const setSearchKeyWord = ProductStore((state) => state.setSearchKeyWord);
  const { CartCount, CartListRequest } = CartStore();
  const { WishCount, WishListRequest } = WishStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    const Keyword = SearchKeyWord.trim();
    if (Keyword.length > 0) {
      navigate(`/by-keyword/${Keyword}`);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    (async () => {
      if (isLogin()) {
        await CartListRequest();
        await WishListRequest();
      }
    })();
  }, []);
  const onLogout = async () => {
    await LogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    toast.success("Logout Successful!"), navigate("/");
  };
  return (
    <>
      <div className="container-fluid text-white p-2 bg-success ">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-6">
              <span>
                <span className="f-12">
                  <i className="bi bi-envelope"></i> Support@PlanB.com{" "}
                </span>
                <span className="f-12 mx-2">
                  <i className="bi bi-envelope"></i> 09556633551{" "}
                </span>
              </span>
            </div>
            <div className="col-md-6 d-flex justify-content-end ">
              <span className="float-end">
                <span className="bodySmal mx-2">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className="bodySmal mx-2">
                  <i className="bi bi-youtube"></i>
                </span>
                <span className="bodySmal">
                  <i className="bi bi-facebook"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3 ">
        <div className="container ">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} alt="" width="120px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav06">
            <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
              <li className="nav-item me-4">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-lg-flex ">
            <div className="input-group">
              <form onSubmit={handleSubmit} className="d-flex gap-2">
                <input
                  onChange={(e) => setSearchKeyWord(e.target.value)}
                  className="form-control btn-outline-success "
                  type="search"
                  placeholder="Search"
                />
                <button
                  to={
                    SearchKeyWord?.length > 0
                      ? `/by-keyword/${SearchKeyWord}`
                      : `/`
                  }
                  className="btn btn-outline-success"
                  type="submit"
                >
                  🔍
                </button>
              </form>
            </div>
            <div className="d-flex ">
              <Link to="/cart" className="btn ms-2 position-relative">
                <i className="bi text-dark  bi-bag"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {CartCount}
                </span>
              </Link>

              <Link to="/wish" className="btn ms-2 position-relative">
                <i className="bi text-dark  bi-bag"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {WishCount}
                </span>
              </Link>

              {isLogin() ? (
                <>
                  <Link to="/profile" className="btn ms-3 btn-success d-flex ">
                    <i className="bi bi-person-circle"></i>
                  </Link>
                  <SubmitButton
                    onClick={onLogout}
                    className="btn ms-3 btn-success d-flex"
                    text="Logout"
                  ></SubmitButton>
                </>
              ) : (
                <Link to="/login" className="btn ms-3 btn-success d-flex">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavbar;
