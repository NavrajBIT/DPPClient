"use client";
import Page from "@/subcomponents/containers/page";
import Addproductform from "@/subcomponents/forms/productforms/addproductform";
import { useState, useEffect } from "react";
import API from "@/subcomponents/api/api";

const Editproduct = ({ params }) => {
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
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "var(--text-bright)",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Edit Product
      </div>
      {product && <Addproductform product={product} />}
    </Page>
  );
};

export default Editproduct;
