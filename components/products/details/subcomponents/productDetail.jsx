import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import Adddatafieldform from "@/subcomponents/forms/productforms/adddatafield";
import { useEffect, useState } from "react";
import Datafield from "./datafield";
import API from "@/subcomponents/api/api";
import { useRouter, usePathname } from "next/navigation";

const ProductDetail = ({ script, viewMode }) => {
  const api = API();
  const [datafieldpopup, setdatafirldpopup] = useState(false);
  const [dataField, setDataField] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    script?.id != undefined && getDataFieldData();
    getProfile();
  }, [script?.id]);

  const getProfile = async () => {
    await api
      .crud("GET", `organization/users/profile`)
      .then((res) => {
        if (res.status == 200) {
          setProfile(res);
          setIsAdmin(res.is_orgAdmin || res.is_orgFounder);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataFieldData = async () => {
    await api
      .crud("GET", `product/${script.id}/datafield`)
      .then((res) => {
        if (res.status == 200) {
          setDataField(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          Product Data Fields
        </div>
        {isAdmin && !viewMode && (
          <Button
            text={"Add Data Field +"}
            variant={"primary"}
            onClick={() => setdatafirldpopup(true)}
          />
        )}
        {datafieldpopup && (
          <Popup close={() => setdatafirldpopup(false)}>
            <Adddatafieldform
              productId={script.id}
              close={() => {
                getDataFieldData();
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
          {dataField.map((df, index) => {
            return (
              <>
                <div
                  style={{ cursor: "pointer", width: "100%" }}
                  onClick={() =>
                    (location.href = `${script.id}/${df.datafieldId}`)
                  }
                >
                  <Datafield
                    datafield={df}
                    key={"data-field-" + index}
                    script={script}
                    profile={profile}
                    datafielddata={getDataFieldData}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
