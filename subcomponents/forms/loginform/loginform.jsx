"use client";
import Form from "../form";
import { useState } from "react";
import API from "@/subcomponents/api/api";
import Button from "@/subcomponents/button/button";
import { useRouter } from "next/navigation";

const Loginform = () => {
  const api = API();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await api
      .getToken({
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          alert(res.error);
        } else {
          router.back();
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const formData = [
    {
      type: "text",
      label: "Username",
      required: true,
      maxLength: 50,
      value: username,
      setValue: (e) => setUsername(e.target.value),
    },
    {
      type: "password",
      label: "Password",
      required: true,
      maxLength: 50,
      value: password,
      setValue: (e) => setPassword(e.target.value),
    },
    {
      type: "checkbox",
      label: "Remember me",
      value: rememberme,
      setValue: (e) => setRememberme(!rememberme),
    },
  ];

  return (
    <Form
      title={"Login"}
      formData={formData}
      handleSubmit={handleSubmit}
      button={"Login"}
      isLoading={isLoading}
    >
      <div>
        <Button
          text={"Forgot Password"}
          variant={"link"}
          href={"/resetpassword"}
        />
      </div>
      <div style={{ color: "var(--text-primary)" }}>
        Don't have an account?{" "}
        <Button text={"Signup"} variant={"link"} href={"/signup"} />
      </div>
    </Form>
  );
};

export default Loginform;
