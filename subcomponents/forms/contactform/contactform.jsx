"use client";
import Form from "../form";
import { useState } from "react";
import API from "@/subcomponents/api/api";

const Contactform = () => {
  const api = API();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await api
      .crud("POST", "contact", { name: name, email: email, message, message })
      .then((res) => {
        if (res.status === 201)
          alert(
            "Message submitted successfully. Our representatives will contact you shortly."
          );
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const formData = [
    {
      type: "text",
      label: "Name",
      required: true,
      maxLength: 50,
      value: name,
      setValue: (e) => setName(e.target.value),
    },
    {
      type: "email",
      label: "Email",
      required: true,
      maxLength: 50,
      value: email,
      setValue: (e) => setEmail(e.target.value),
    },
    {
      type: "text",
      label: "Message",
      required: true,
      maxLength: 500,
      value: message,
      rows: 4,
      setValue: (e) => setMessage(e.target.value),
    },
  ];

  return (
    <Form
      title={"Enquiry"}
      formData={formData}
      handleSubmit={handleSubmit}
      button={"Send"}
      isLoading={isLoading}
    />
  );
};

export default Contactform;
