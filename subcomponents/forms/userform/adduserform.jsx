"use client";
import { useEffect, useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";
import AsyncSelect from "react-select/async";

const Adduserform = () => {
  const api = API();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    if (cnfPassword != userData["password"]) {
      setError("Password and Confirm Password is different");
    } else {
      await api
        .crud("POST", "organization/users", userData)
        .then((res) => {
          if (res.status === 201) {
            router.back();
          } else if (res.username !== undefined) {
            setError("Username already exist");
          } else if (res.email !== undefined) {
            setError("Email already exist");
          }
        })
        .catch((err) => {
          console.log(res);
        });
    }
    // let users = selectedUser.map((user) => user.id);
    // let endpoint = product ? `product/${product.id}` : "product";
    // let method = product ? "PATCH" : "POST";
    // await api
    //   .crud(method, endpoint, { name, description, users })
    //   .then((res) => {
    //     if (res.status >= 200 && res.status <= 299) {
    //       router.back();
    //     }
    //   })
    //   .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const handleChange = (value) => {
    setSelectedUser(value);
  };

  const formData = [
    {
      type: "text",
      label: "First Name",
      required: true,
      maxLength: 100,
      value: userData["firstName"],
      setValue: (e) => {
        setUserData({ ...userData, firstName: e.target.value });
      },
    },
    {
      type: "text",
      label: "Last Name",
      required: true,
      maxLength: 500,
      value: userData["lastName"],

      setValue: (e) => {
        setUserData({ ...userData, lastName: e.target.value });
      },
    },
    {
      type: "text",
      label: "User Name",
      required: true,
      maxLength: 500,
      value: userData["username"],

      setValue: (e) => {
        setUserData({ ...userData, username: e.target.value });
        error == "Username already exist" && setError("");
      },
    },
    {
      type: "email",
      label: "Email",
      required: true,
      maxLength: 500,
      value: userData["email"],
      setValue: (e) => {
        setUserData({ ...userData, email: e.target.value });
        error == "Email already exist" && setError("");
      },
    },
    {
      type: "password",
      label: "Password",
      required: true,
      maxLength: 500,
      value: userData["password"],
      setValue: (e) => {
        setUserData({ ...userData, password: e.target.value });
        error == "Password and Confirm Password is different" && setError("");
      },
    },
    {
      type: "password",
      label: "Confirm Password",
      required: true,
      maxLength: 500,
      value: cnfPassword,
      setValue: (e) => {
        setCnfPassword(e.target.value);
        error == "Password and Confirm Password is different" && setError("");
      },
    },
  ];

  return (
    <div style={{ width: "var(--max-width-content)" }}>
      <div>
        <div style={{ color: "red", padding: "4% 4%", height: "50px" }}>
          {error}
        </div>
      </div>
      <>
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          button="Add +"
          isLoading={isLoading}
        />
      </>
    </div>
  );
};

export default Adduserform;
