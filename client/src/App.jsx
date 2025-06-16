import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductByBrand from "./pages/ProductByBrand";
import ProductByCategory from "./pages/ProductByCategory";
import ProductByKeyword from "./pages/ProductByKeyword";
import ProductDetails from "./pages/ProductDetails";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import RefundPage from "./pages/RefundPage";
import HowToBuy from "./pages/HowToBuy";
import ContactPage from "./pages/ContactPage";
import ComplainPage from "./pages/ComplainPage";
import TermsPage from "./pages/TermsPage";

import LoginPage from "./pages/LoginPage";
import OtpPage from "./pages/OtpPage";
import ProfilePage from "./pages/ProfilePage";

import CartListPage from "./pages/CartListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/by-brand/:id" element={<ProductByBrand />} />
        <Route path="/by-Category/:id" element={<ProductByCategory />} />
        <Route path="/by-keyword/:Keyword" element={<ProductByKeyword />} />
        <Route path="/details/:id" element={<ProductDetails />} />
        //legalInformation
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/howtobuy" element={<HowToBuy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/complain" element={<ComplainPage />} />
        //Cart
        <Route path="/cart" element={<CartListPage />} />
        //Login
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
