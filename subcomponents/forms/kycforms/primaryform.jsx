"use client";
import Form from "../form";

const Primaryform = ({ next, updateData, kycData }) => {
  const formData = [
    {
      type: "text",
      label: "First Name",
      required: true,
      maxLength: 50,
      value: kycData.first_name,
      setValue: (e) => updateData("first_name", e.target.value),
    },
    {
      type: "text",
      label: "Last Name",
      required: true,
      maxLength: 50,
      value: kycData.last_name,
      setValue: (e) => updateData("last_name", e.target.value),
    },
    {
      type: "tel",
      label: "Phone",
      required: true,
      maxLength: 15,
      value: kycData.phone,
      setValue: (e) => updateData("phone", e.target.value),
    },
    {
      type: "email",
      label: "Email",
      required: true,
      maxLength: 50,
      value: kycData.email,
      setValue: (e) => updateData("email", e.target.value),
    },
  ];

  return (
    <Form
      title={"Personal Details"}
      formData={formData}
      handleSubmit={next}
      button={"Next >>"}
    />
  );
};

export default Primaryform;
