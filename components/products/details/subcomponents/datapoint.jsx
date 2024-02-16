import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import Adddatapointform from "@/subcomponents/forms/productforms/adddatapointform";
import Updatedatapointform from "@/subcomponents/forms/productforms/updatedp";
import Editdatafieldform from "@/subcomponents/forms/productforms/editdatafield";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";
import EditdataPointform from "@/subcomponents/forms/productforms/editdatapoint";

const Datapoint = ({ datapoint, script, profile, datapointdata }) => {
  const api = API();
  const [editdatapointpopup, seteditdatapointpopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async (id) => {
    setIsLoading(true);
    await api
      .crud(
        "DELETE",
        `product/${script.productId}/datafield/${script.df_id}/datapoint/${id}`
      )
      .then((res) => {
        datapointdata();
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
    >
      <div
        style={{
          color: "var(--text-accent)",
          fontSize: "2rem",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 var(--padding-light)",
          alignItems: "center",
          fontFamily: "arial",
        }}
      >
        <div>
          <div>{datapoint.dataPointName}</div>
          <div style={{ fontSize: "1.3rem", color: "grey" }}>
            {datapoint.info}
          </div>
        </div>
        {(profile.is_orgAdmin || profile.is_orgFounder) && (
          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              text="edit"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                seteditdatapointpopup(true);
              }}
            />
            <Button
              text="delete"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(datapoint.datapointId);
              }}
            />
          </div>
        )}
      </div>

      {editdatapointpopup && (
        <Popup
          close={(e) => {
            e.stopPropagation();
            seteditdatapointpopup(false);
          }}
        >
          <EditdataPointform
            script={script}
            data={datapoint}
            updateData={datapointdata}
            close={() => seteditdatapointpopup(false)}
          />
        </Popup>
      )}
    </div>
  );
};

export default Datapoint;
