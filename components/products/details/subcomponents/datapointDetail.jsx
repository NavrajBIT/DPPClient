import Button from "@/subcomponents/button/button";
import Popup from "@/subcomponents/popup/popup";
import AdddataPointform from "@/subcomponents/forms/productforms/adddatapoint";
import { useEffect, useState } from "react";

import API from "@/subcomponents/api/api";
import Page from "@/subcomponents/containers/page";
import Datapoint from "./datapoint";

const DataPointDetail = ({ params }) => {
  const api = API();
  const [datapointpopup, setdatapointpopup] = useState(false);
  const [dataPoint, setDataPoint] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getdataPointData();
    getProfile();
  }, []);

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

  const getdataPointData = async () => {
    await api
      .crud(
        "GET",
        `product/${params.productId}/datafield/${params.df_id}/datapoint`
      )
      .then((res) => {
        if (res.status == 200) {
          setDataPoint(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(dataPoint);

  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        color: "var(--text-primary)",
      }}
    >
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
              padding: "5% 0",
            }}
          >
            Data Points
          </div>
          {isAdmin && (
            <Button
              text={"Add Data Points +"}
              variant={"primary"}
              onClick={() => setdatapointpopup(true)}
            />
          )}
          {datapointpopup && (
            <Popup close={() => setdatapointpopup(false)}>
              <AdddataPointform
                params={params}
                closePopup={setdatapointpopup}
                close={() => {
                  getdataPointData();
                  setdatapointpopup(false);
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
            {dataPoint?.map((dp, index) => {
              return (
                <>
                  <Datapoint
                    datapoint={dp}
                    key={"data-point-" + index}
                    script={params}
                    profile={profile}
                    datapointdata={getdataPointData}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DataPointDetail;
