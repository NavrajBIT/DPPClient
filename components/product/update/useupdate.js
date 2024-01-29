"use client";
import { useState, useEffect } from "react";
import API from "@/subcomponents/api/api";

const useupdate = (productId) => {
  const api = API();
  const [isLoading, setIsLaoding] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    poppulateProduct();
  }, []);

  const poppulateProduct = async () => {
    setIsLaoding(true);
    await api
      .crud("GET", `product/all/${productId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) setProduct(res);
      })
      .catch((err) => console.log(err));

    setIsLaoding(false);
  };

  return { productId, product, poppulateProduct };
};

export default useupdate;
