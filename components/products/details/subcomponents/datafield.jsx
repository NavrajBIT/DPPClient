import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import Adddatapointform from "@/subcomponents/forms/productforms/adddatapointform";
import Updatedatapointform from "@/subcomponents/forms/productforms/updatedp";
import Editdatafieldform from "@/subcomponents/forms/productforms/editdatafield";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";

const Datafield = ({ datafield, script, profile, datafielddata }) => {
  const api = API();
  const [datapointpopup, setdatapointpopup] = useState(false);
  const [updatedatapointpopup, setupdatedatapointpopup] = useState(false);
  const [selecteddatapoint, setselecteddatapoint] = useState(null);
  const [editdatafieldpopup, seteditdatafirldpopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);

  const deleteProduct = async (id) => {
    setIsLoading(true);
    await api
      .crud("DELETE", `product/${script.id}/datafield/${id}`)
      .then((res) => {
        datafielddata();
      });

    setIsLoading(false);
  };

  return (
    <div
      style={{
        background: "var(--accent-10)",
        padding: "var(--padding-light)",
        borderRadius: "var(--border-radius)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "var(--padding-light)",
        cursor: "pointer",
      }}
      onClick={() => {
        console.log(123);
      }}
    >
      <div
        style={{
          color: "var(--text-accent)",
          fontSize: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 var(--padding-light)",
          alignItems: "center",
          fontFamily: "arial",
        }}
      >
        <div>
          <div>{datafield.fieldName}</div>
          <div style={{ fontSize: "1.5rem", color: "grey" }}>
            {datafield.field_description}
          </div>
        </div>
        {(profile.is_orgAdmin || profile.is_orgFounder) && (
          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              text="edit"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                seteditdatafirldpopup(true);
              }}
            />
            <Button
              text="delete"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(datafield.datafieldId);
              }}
            />
          </div>
        )}
      </div>

      {datafield?.datapoints?.map((dp, index) => {
        return (
          <div
            key={datafield.fieldName + "-dp-" + index}
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 5fr",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant={"link"}
                text=""
                startIcon={"edit"}
                onClick={() => {
                  setupdatedatapointpopup(true);
                  setselecteddatapoint(dp);
                }}
              />
              {dp.name}
            </div>
            <div>:</div>
            <div>{dp.value}</div>
          </div>
        );
      })}
      {/* <div>
        <Button
          text={"Add datapoint +"}
          variant={"link"}
          onClick={() => setdatapointpopup(true)}
        />
      </div>
      {datapointpopup && (
        <Popup close={() => setdatapointpopup(false)}>
          <Adddatapointform
            datafieldId={datafield.datafieldId}
            productId={script.id}
            close={() => {
              script.poppulateProduct();
              setdatapointpopup(false);
            }}
          />
        </Popup>
      )}
      {updatedatapointpopup && selecteddatapoint && (
        <Popup close={() => setupdatedatapointpopup(false)}>
          <Updatedatapointform
            datafieldId={datafield.datafieldId}
            datapoint={selecteddatapoint}
            close={() => {
              script.poppulateProduct();
              setupdatedatapointpopup(false);
            }}
          />
        </Popup>
      )} */}

      {editdatafieldpopup && (
        <Popup
          close={(e) => {
            e.stopPropagation();
            seteditdatafirldpopup(false);
          }}
        >
          <Editdatafieldform
            productId={script.id}
            data={datafield}
            updateData={datafielddata}
            close={() => seteditdatafirldpopup(false)}
          />
        </Popup>
      )}
    </div>
  );
};

export default Datafield;
