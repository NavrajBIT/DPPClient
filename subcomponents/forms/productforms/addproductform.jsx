"use client";
import { useEffect, useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";
import AsyncSelect from "react-select/async";

const Addproductform = ({ product, type }) => {
  const api = API();
  const router = useRouter();
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );

  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const [productData, setProductdata] = useState({
    name: product ? product.name : "",
    description: product ? product.description : "",
    image: product ? product.image : null,
    certificate: product ? product.certificate : null,
    documents: product ? product.documents : null,
    product_manager: product ? product.product_manager : [],
  });

  const idToUserObj = async () => {
    const productAdminPromise = product.product_manager.map((user) => {
      return api.crud("GET", `organization/users/${user}`);
    });

    const users = await Promise.all(productAdminPromise);
    setProductdata({ ...productData, product_manager: users });
  };

  useEffect(() => {
    product && idToUserObj();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    let product_manager = productData.product_manager.map((user) => {
      return user.id;
    });
    productData["product_manager"] = product_manager;
    let endpoint = product ? `product/${product.id}` : "product";
    let method = product ? "PUT" : "POST";

    await api
      .crud(method, endpoint, productData)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          alert("Success");
          router.back();
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const handleChange = (value) => {
    setProductdata({ ...productData, product_manager: value });
  };

  const formData = [
    {
      type: "image",
      label: "Image",
      value: productData.image,
      setValue: (e) =>
        setProductdata({ ...productData, image: e.target.value }),
    },
    {
      type: "text",
      label: "Product Name",
      required: true,
      maxLength: 100,
      value: productData.name,
      setValue: (e) => setProductdata({ ...productData, name: e.target.value }),
    },
    {
      type: "text",
      label: "Description",
      required: true,
      maxLength: 500,
      value: productData.description,
      rows: 4,
      setValue: (e) =>
        setProductdata({ ...productData, description: e.target.value }),
    },

    {
      type: "file",
      label: "Certificate",
      value: productData.certificate,
      setValue: (e) =>
        setProductdata({ ...productData, certificate: e.target.value }),
    },
    {
      type: "file",
      label: "Documents",
      value: productData.documents,
      setValue: (e) =>
        setProductdata({ ...productData, documents: e.target.value }),
    },
    {
      type: "selectUsers",
      label: "Select User",
      value: productData.product_manager,
      onvaluechange: handleChange,
    },
  ];

  return (
    <>
      <Form
        formData={formData}
        handleSubmit={handleSubmit}
        button={product ? "Save" : "Add +"}
        isLoading={isLoading}
      />
    </>
  );
};

export default Addproductform;
