"use client";
import { useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";

const Updatedatapointform = ({ datafieldId, datapoint, close }) => {
  const api = API();

  const [value, setValue] = useState(datapoint.value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    let endpoint = `product/${datafieldId}/datapoint/${datapoint.id}`;
    let method = "PATCH";
    await api
      .crud(method, endpoint, { datafield_id: datafieldId, value })
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
      label: "Data Point Value",
      required: true,
      maxLength: 100,
      value: value,
      setValue: (e) => setValue(e.target.value),
    },
  ];

  return (
    <Form
      title={datapoint.name}
      formData={formData}
      handleSubmit={handleSubmit}
      button={"Update"}
      isLoading={isLoading}
    />
  );
};

export default Updatedatapointform;
