import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import Adddatafieldform from "@/subcomponents/forms/productforms/adddatafield";
import { useState } from "react";
import Datafield from "./datafield";

const ProductDetails = ({ script }) => {
  const [datafieldpopup, setdatafirldpopup] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          color: "var(--text-primary)",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--text-accent)",
          }}
        >
          Product Data
        </div>
        <Button
          text={"Add Data Field +"}
          variant={"primary"}
          onClick={() => setdatafirldpopup(true)}
        />
        {datafieldpopup && (
          <Popup close={() => setdatafirldpopup(false)}>
            <Adddatafieldform
              productId={script.productId}
              close={() => {
                script.poppulateProduct();
                setdatafirldpopup(false);
              }}
            />
          </Popup>
        )}
        <div
          style={{
            width: "100%",
            padding: "var(--padding-main)",
            background: "var(--primary)",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--padding-main)",
          }}
        >
          {script?.product?.datafields?.map((df, index) => {
            return (
              <Datafield
                datafield={df}
                key={"data-field-" + index}
                script={script}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
