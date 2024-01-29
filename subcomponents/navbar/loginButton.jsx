"use client";
import Button from "../button/button";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const poppulateJWT = () => {
    const jwt = localStorage.getItem("jwtToken");
    if (jwt && jwt !== null && jwt !== undefined && jwt !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    poppulateJWT();
  }, [pathname]);

  if (isLoggedIn)
    return (
      <Button text={"Dashboard"} variant={"primary"} href={"/dashboard"} />
    );

  return <Button text={"Login"} variant={"primary"} href={"/login"} />;
};

export default LoginButton;
