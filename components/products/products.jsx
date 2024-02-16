"use client";
import Page from "@/subcomponents/containers/page";
import Button from "@/subcomponents/button/button";
import Productsview from "./subcomponents/productsview";
import API from "@/subcomponents/api/api";
import { useEffect, useState } from "react";

const Products = () => {
  const api = API();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    await api
      .crud("GET", "organization/users/profile")
      .then((res) => {
        if (res.status === 200) {
          if (res.is_orgAdmin == true || res.is_orgFounder == true) {
            setIsAdmin(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          color: "var(--text-bright)",
          fontSize: "1.5rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Products
      </div>
      <div style={{ width: "fit-content" }}>
        {isAdmin && (
          <Button
            text="Add product +"
            variant={"primary"}
            href={"/products/add"}
          />
        )}
      </div>
      <Productsview admin={isAdmin} />
    </Page>
  );
};

export default Products;
