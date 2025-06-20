import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="section-bottom shadow-sm bg-white ">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4">
              <h1 className="bodyMedium">Legals</h1>
              <p>
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </p>
              <p>
                <Link className="nav-link" to="/refund">
                  Refund Policy
                </Link>
              </p>
              <p>
                <Link className="nav-link" to="/terms">
                  Terms
                </Link>
              </p>
            </div>
            <div className="col-md-4">
              <h1 className="bodyMedium">Information</h1>
              <p>
                <Link className="nav-link" to="/howtobuy">
                  How to buy
                </Link>
              </p>
              <p>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </p>
              <p>
                <Link className="nav-link" to="/complain">
                  Complain
                </Link>
              </p>
            </div>
            <div className="col-md-4">
              <h1 className="bodyMedium">About</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <img
                className="w-75"
                src="https://e-signer.xyz/uploads_demo/home/ssl.webp"
                alt="payment"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark p-1 text-center  fixed-bottom">
        <p className="text-white bodySmal">All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
