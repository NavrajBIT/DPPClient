"use client";
import Form from "../form";

const Organizationform = ({ next, updateData, kycData, back }) => {
  const formData = [
    {
      type: "text",
      label: "Name of Organization",
      required: true,
      maxLength: 100,
      value: kycData.name,
      setValue: (e) => updateData("name", e.target.value),
    },
    {
      type: "text",
      label: "Address",
      required: true,
      maxLength: 500,
      rows: 4,
      value: kycData.address,
      setValue: (e) => updateData("address", e.target.value),
    },
    {
      type: "text",
      label: "Country",
      required: true,
      maxLength: 100,
      value: kycData.country,
      setValue: (e) => updateData("country", e.target.value),
    },
    {
      type: "text",
      label: "Website",
      required: true,
      maxLength: 100,
      value: kycData.website,
      setValue: (e) => updateData("website", e.target.value),
    },
    {
      type: "text",
      label: "Description",
      required: true,
      maxLength: 500,
      rows: 4,
      value: kycData.description,
      setValue: (e) => updateData("description", e.target.value),
    },
    {
      type: "text",
      label: "Registration number",
      required: true,
      maxLength: 50,
      value: kycData.reg_id,
      setValue: (e) => updateData("reg_id", e.target.value),
    },
  ];

  return (
    <Form
      title={"Organization Details"}
      formData={formData}
      handleSubmit={next}
      button={"Next >>"}
      backbutton={"<< Back"}
      back={back}
    />
  );
};

export default Organizationform;
