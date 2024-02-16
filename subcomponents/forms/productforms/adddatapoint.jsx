"use client";
import { useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";

const AdddataPointform = ({ params, close }) => {
  const api = API();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    let endpoint = `product/${params.productId}/datafield/${params.df_id}/datapoint`;
    let method = "POST";
    await api
      .crud(method, endpoint, {
        dataPointName: name,
        info: value,
        dataPointManager: selectedUser.map((user) => {
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

  const handleChange = (value) => {
    setSelectedUser(value);
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
      label: "Data Point description",
      required: true,
      maxLength: 100,
      value: value,
      setValue: (e) => setValue(e.target.value),
    },
    {
      type: "selectUsers",
      label: "Select Data Point Admin",
      value: selectedUser,
      onvaluechange: handleChange,
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

export default AdddataPointform;
