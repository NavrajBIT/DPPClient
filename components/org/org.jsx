import Page from "@/subcomponents/containers/page";
import Orgform from "@/subcomponents/forms/orgform/orgform";

const Organization = () => {
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
        Organization Details
      </div>
      <Orgform />
    </Page>
  );
};

export default Organization;
