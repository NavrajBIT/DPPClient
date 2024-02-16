"use client";
import { useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";

const Adddatapointform = ({ datafieldId, close, productId }) => {
  const api = API();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    let endpoint = `product/${productId}/datafield/${datafieldId}/datapoint`;
    let method = "POST";
    await api
      .crud(method, endpoint, {
        dataPointName: datafieldId,
        info: value,
        dataPointManager: admin.map((user) => {
          return user.id;
        }),
      })
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 299) {
          close();
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const handleChange = (data) => {
    setAdmin(data);
  };

  const formData = [
    {
      type: "text",
      label: "Name",
      required: true,
      maxLength: 100,
      value: name,
      setValue: (e) => setName(e.target.value),
    },
    {
      type: "text",
      label: "Information",
      required: true,
      maxLength: 100,
      value: value,
      setValue: (e) => setValue(e.target.value),
    },
    {
      type: "selectUsers",
      label: "Select User",
      value: admin,
      onvaluechange: handleChange,
    },
  ];

  return (
    <Form
      title={"Add Data Point"}
      formData={formData}
      handleSubmit={handleSubmit}
      button={"Add Data Point"}
      isLoading={isLoading}
    />
  );
};

export default Adddatapointform;
