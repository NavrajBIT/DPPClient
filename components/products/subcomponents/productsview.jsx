"use client";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";
import style from "../product.module.css";
import Button from "@/subcomponents/button/button";

const Productsview = ({ admin }) => {
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
            <div
              key={"product-" + index}
              className={style.productcard}
              style={{ cursor: "pointer" }}
              onClick={() => (location.href = `products/${product.id}`)}
            >
              <div className={style.producttitle}>{product.name}</div>
              <div className={style.productdescription}>
                {product.description}
              </div>
              <div className={style.buttoncontainer}>
                {admin && (
                  <>
                    <Button
                      text=""
                      startIcon={"edit"}
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        location.href = `/products/${product.id}/edit`;
                      }}
                    />
                    <Button
                      text=""
                      startIcon={"delete"}
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                    />
                  </>
                )}
                <Button
                  text=""
                  startIcon={"qr_code"}
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    location.href = `/products/${product.id}/detailed-view`;
                  }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Productsview;
