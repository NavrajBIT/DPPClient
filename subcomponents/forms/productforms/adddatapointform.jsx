"use client";
import { useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";

const Adddatapointform = ({ datafieldId, close }) => {
  const api = API();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    let endpoint = `product/${datafieldId}/datapoint`;
    let method = "POST";
    await api
      .crud(method, endpoint, { name, datafield_id: datafieldId, value })
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          close();
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const formData = [
    {
      type: "text",
      label: "Data Point Name",
      required: true,
      maxLength: 100,
      value: name,
      setValue: (e) => setName(e.target.value),
    },
    {
      type: "text",
      label: "Data Point Value",
      required: true,
      maxLength: 100,
      value: value,
      setValue: (e) => setValue(e.target.value),
    },
  ];

  return (
    <Form
      title={"Add Data Point"}
      formData={formData}
      handleSubmit={handleSubmit}
      button={"Add +"}
      isLoading={isLoading}
    />
  );
};

export default Adddatapointform;
