"use client";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";
import style from "../product.module.css";
import Button from "@/subcomponents/button/button";

const Productsview = () => {
  const api = API();
  const [products, setProducts] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    poppulateProducts();
  }, []);

  const poppulateProducts = async () => {
    setIsloading(true);
    await api
      .crud("GET", "product")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setProducts(res);
        }
      })
      .catch((err) => console.log(err));
    setIsloading(false);
  };

  const deleteProduct = async (id) => {
    setIsloading(true);
    await api.crud("DELETE", `product/${id}`);
    await poppulateProducts();
    setIsloading(false);
  };

  return (
    <div className={style.productscontainer}>
      {products &&
        products.length > 0 &&
        products.map((product, index) => {
          return (
            <div key={"product-" + index} className={style.productcard}>
              <div className={style.producttitle}>{product.name}</div>
              <div className={style.productdescription}>
                {product.description}
              </div>
              <div className={style.buttoncontainer}>
                <Button
                  text=""
                  startIcon={"edit"}
                  variant="secondary"
                  href={`/product/${product.id}/edit`}
                />
                <Button
                  text=""
                  startIcon={"delete"}
                  variant="secondary"
                  onClick={() => deleteProduct(product.id)}
                />
                <Button
                  text=""
                  startIcon={"qr_code"}
                  variant="secondary"
                  href={`/product/${product.id}/update`}
                />
                <Button
                  text=""
                  startIcon={"visibility"}
                  variant="primary"
                  href={`/product/${product.id}`}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Productsview;
