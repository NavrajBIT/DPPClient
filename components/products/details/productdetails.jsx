"use client";
import Page from "@/subcomponents/containers/page";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";
import ProductData from "./subcomponents/productData";
import ProductDetail from "./subcomponents/productDetail";

const ProductDetails = ({ params, viewMode }) => {
  const api = API();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .crud("GET", `product/${params.productId}`)
      .then((res) => {
        if (res.status === 200) setProduct(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        color: "var(--text-primary)",
      }}
    >
      <ProductData script={product} viewMode={viewMode} />
      <br />
      <br />
      <ProductDetail script={product} viewMode={viewMode} />
    </Page>
  );
};

export default ProductDetails;
