import Page from "@/subcomponents/containers/page";
import Adduserform from "@/subcomponents/forms/userform/adduserform";

const Adduser = () => {
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
        Add User
      </div>
      <Adduserform />
    </Page>
  );
};

export default Adduser;
