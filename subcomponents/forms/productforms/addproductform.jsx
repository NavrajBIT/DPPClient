"use client";
import { useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";

const Addproductform = ({ product }) => {
  const api = API();
  const router = useRouter();
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    let endpoint = product ? `product/${product.id}` : "product";
    let method = product ? "PATCH" : "POST";
    await api
      .crud(method, endpoint, { name, description })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          router.back();
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const formData = [
    {
      type: "text",
      label: "Product Name",
      required: true,
      maxLength: 100,
      value: name,
      setValue: (e) => setName(e.target.value),
    },
    {
      type: "text",
      label: "Description",
      required: true,
      maxLength: 500,
      value: description,
      rows: 4,
      setValue: (e) => setDescription(e.target.value),
    },
  ];

  return (
    <Form
      title={"Product"}
      formData={formData}
      handleSubmit={handleSubmit}
      button={product ? "Save" : "Add +"}
      isLoading={isLoading}
    />
  );
};

export default Addproductform;
