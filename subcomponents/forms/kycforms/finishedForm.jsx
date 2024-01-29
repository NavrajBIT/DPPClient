import Form from "../form";

const FinishedForm = ({ kycData, handleSubmit, back, isLoading }) => {
  return (
    <Form
      title={"Review Details"}
      formData={[]}
      handleSubmit={handleSubmit}
      button={"Submit"}
      backbutton={"<< Back"}
      back={back}
      abovebuttonData={<PreviewData kycData={kycData} />}
      isLoading={isLoading}
    />
  );
};

export default FinishedForm;

const PreviewData = ({ kycData }) => {
  const personalData = {
    "First name": kycData.first_name,
    "Last name": kycData.last_name,
    Phone: kycData.phone,
    Email: kycData.email,
  };
  const organizationDetails = {
    "Name of organization": kycData.name,
    Address: kycData.address,
    Country: kycData.country,
    Website: kycData.website,
    Description: kycData.description,
    "Registration Number": kycData.reg_id,
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-light)",
        color: "var(--text-primary)",
      }}
    >
      <div style={{ color: "var(--accent-20)", fontSize: "1.5rem" }}>
        Personal Details:
      </div>
      {Object.keys(personalData).map((key) => {
        return (
          <div
            key={key}
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 5fr",
            }}
          >
            <div>{key}</div>
            <div>:</div>
            <div>{personalData[key]}</div>
          </div>
        );
      })}
      <div style={{ color: "var(--accent-20)", fontSize: "1.5rem" }}>
        Organization Details:
      </div>
      {Object.keys(organizationDetails).map((key) => {
        return (
          <div
            key={key}
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 5fr",
            }}
          >
            <div>{key}</div>
            <div>:</div>
            <div>{organizationDetails[key]}</div>
          </div>
        );
      })}
    </div>
  );
};
