import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import Adddatafieldform from "@/subcomponents/forms/productforms/adddatafield";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";
import { useRouter, usePathname } from "next/navigation";
import Datafield from "./datafield";

const ProductDetail = ({ script, viewMode }) => {
  const api = API();
  const [data, setdata] = useState([]);

  useEffect(() => {
    script && getProductDetails();
  }, [script]);

  const getProductDetails = async () => {
    await api
      .crud("GET", `product/${script.id}/detailedview`)
      .then((res) => {
        if (res.status == 200) {
          setdata(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Data Fields</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: "var(--text-primary)",
            width: "100%",
          }}
        >
          {data.map((product) => {
            return (
              <ul>
                {product.datafields.map((df) => {
                  return (
                    <Datafield datafield={df} key={"data-field-" + df.id} />
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
