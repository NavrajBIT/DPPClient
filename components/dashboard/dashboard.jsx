import Page from "@/subcomponents/containers/page";
import Button from "@/subcomponents/button/button";
import Productsview from "./subcomponents/productsview";

const Dashboard = () => {
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
        <Button
          text="Add product +"
          variant={"primary"}
          href={"/product/add"}
        />
      </div>
      <Productsview />
    </Page>
  );
};

export default Dashboard;
