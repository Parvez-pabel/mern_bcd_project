import React from "react";

import InvoiceList from "../components/invoice/InvoiceList.jsx";
import Layout from "../components/layout/Layout.jsx";

const OrderPage = () => {
  return (
    <Layout>
      <InvoiceList />
    </Layout>
  );
};

export default OrderPage;
