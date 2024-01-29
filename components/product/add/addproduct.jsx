import Page from "@/subcomponents/containers/page";
import Addproductform from "@/subcomponents/forms/productforms/addproductform";

const Addproduct = () => {
  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "var(--text-bright)",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Add Product
      </div>
      <Addproductform />
    </Page>
  );
};

export default Addproduct;
