"use client";

import Page from "@/subcomponents/containers/page";
import Addproductform from "@/subcomponents/forms/productforms/addproductform";

import { useState, useEffect } from "react";
import API from "@/subcomponents/api/api";

const ProductForm = ({ params, type }) => {
  const api = API();
  const [product, setProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (params) {
      getProductFormDetails();
    } else {
      setIsLoaded(true);
    }
  }, []);

  const getProductFormDetails = async () => {
    setIsLoaded(false);
    await api
      .crud("GET", `product/${params.productId}`)
      .then((res) => {
        if (res.status === 200) setProduct(res);
      })
      .catch((err) => console.log(err));
    setIsLoaded(true);
  };

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
        {type} Product
      </div>

      {isLoaded && (
        <Addproductform product={params ? product : null} type={type} />
      )}
    </Page>
  );
};

export default ProductForm;
