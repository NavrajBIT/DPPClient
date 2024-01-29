import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import Adddatapointform from "@/subcomponents/forms/productforms/adddatapointform";
import Updatedatapointform from "@/subcomponents/forms/productforms/updatedp";
import { useState } from "react";

const Datafield = ({ datafield, script }) => {
  const [datapointpopup, setdatapointpopup] = useState(false);
  const [updatedatapointpopup, setupdatedatapointpopup] = useState(false);
  const [selecteddatapoint, setselecteddatapoint] = useState(null);

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
      }}
    >
      <div style={{ color: "var(--text-accent)", fontSize: "1.5rem" }}>
        {datafield.name}
      </div>

      {datafield?.datapoints?.map((dp, index) => {
        return (
          <div
            key={datafield.name + "-dp-" + index}
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
      <div>
        <Button
          text={"Add datapoint +"}
          variant={"link"}
          onClick={() => setdatapointpopup(true)}
        />
      </div>
      {datapointpopup && (
        <Popup close={() => setdatapointpopup(false)}>
          <Adddatapointform
            datafieldId={datafield.id}
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
            datafieldId={datafield.id}
            datapoint={selecteddatapoint}
            close={() => {
              script.poppulateProduct();
              setupdatedatapointpopup(false);
            }}
          />
        </Popup>
      )}
    </div>
  );
};

export default Datafield;
