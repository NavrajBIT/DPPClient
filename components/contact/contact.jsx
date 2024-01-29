import Page from "../../subcomponents/containers/page";
import Contactform from "../../subcomponents/forms/contactform/contactform";

const Contact = () => {
  return (
    <Page
      innerStyle={{
        display: "flex",
        gap: "var(--padding-main)",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Info />
      <Contactform />
    </Page>
  );
};

export default Contact;

const Info = () => {
  return (
    <div
      style={{
        fontSize: "1.5rem",
        maxWidth: "var(--max-width-content)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          color: "var(--text-accent)",
          fontSize: "2rem",
          fontWeight: "700",
        }}
      >
        Feel Free to reach out for further details
      </div>
      <div>
        <div
          style={{
            color: "var(--text-primary)",
          }}
        >
          Email Address:
        </div>
        <div
          style={{
            color: "var(--text-bright)",
          }}
        >
          hello@beimagine.tech
        </div>
      </div>
      <div>
        <div
          style={{
            color: "var(--text-primary)",
          }}
        >
          Address:
        </div>
        <div
          style={{
            color: "var(--text-bright)",
          }}
        >
          B-8 First Floor, Multan Nagar Paschim Vihar Delhi, North West
          DL-110063
        </div>
      </div>
    </div>
  );
};
