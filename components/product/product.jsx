"use client";
import Page from "@/subcomponents/containers/page";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";

const Product = ({ params }) => {
  const api = API();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .crud("GET", `product/all/${params.productId}`)
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
      <div
        style={{
          background: "var(--accent-10)",
          padding: "var(--padding-light)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
          borderRadius: "var(--border-radius-small)",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            color: "var(--text-bright)",
            fontWeight: "700",
          }}
        >
          {product?.name}
        </div>
        <div>{product?.description}</div>
      </div>

      {product?.datafields?.map((df, index) => (
        <Detail datafield={df} key={"data-field-" + index} />
      ))}
    </Page>
  );
};

export default Product;

const Detail = ({ datafield }) => {
  return (
    <div
      style={{
        background: "var(--accent-10)",
        padding: "var(--padding-light)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
        borderRadius: "var(--border-radius-small)",
      }}
    >
      <div
        style={{
          fontSize: "1.25rem",
          color: "var(--text-bright)",
        }}
      >
        {datafield?.name}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
        }}
      >
        {datafield?.datapoints?.map((dp, index) => (
          <DP datapoint={dp} key={"data-point-" + datafield.id + "-" + index} />
        ))}
      </div>
    </div>
  );
};

const DP = ({ datapoint }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 5fr",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {datapoint.name}
      </div>
      <div>:</div>
      <div>{datapoint.value}</div>
    </div>
  );
};
