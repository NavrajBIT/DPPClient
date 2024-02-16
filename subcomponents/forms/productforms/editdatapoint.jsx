"use client";
import { useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";

const EditdataPointform = ({ script, data, updateData }) => {
  const api = API();
  const [name, setName] = useState(data ? data.dataPointName : "");
  const [value, setValue] = useState(data ? data.info : "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    data ? data.dataPointManager : []
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    let endpoint = `product/${script.productId}/datafield/${script.df_id}/datapoint/${data.datapointId}`;
    let method = "PUT";
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
    updateData();
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
      title={"Edit Data Point"}
      formData={formData}
      handleSubmit={handleSubmit}
      button={"Update"}
      isLoading={isLoading}
    />
  );
};

export default EditdataPointform;
