"use client";
import Page from "@/subcomponents/containers/page";
import useupdate from "./useupdate";
import Button from "@/subcomponents/button/button";
import ProductData from "./subcomponents/productData";
import ProductDetails from "./subcomponents/productDetails";

const Update = ({ params }) => {
  const script = useupdate(params.productId);
  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <div>
        <Button text="<< Back" variant="nav" href={"/dashboard"} />
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          color: "var(--text-bright)",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Update product
      </div>
      <ProductData script={script} />
      <ProductDetails script={script} />
    </Page>
  );
};

export default Update;
