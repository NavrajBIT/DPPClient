"use client";
import buttonstyle from "./button.module.css";
import Link from "next/link";
import Icon from "../icons/icon";
import { useEffect, useState } from "react";

const Button = ({
  text,
  variant,
  onClick,
  href,
  startIcon,
  endIcon,
  type,
  style,
  isLoading,
}) => {
  const [loadState, setLoadState] = useState("-");

  useEffect(() => {
    let myinterval = setInterval(() => {
      setLoadState((prev) => {
        if (prev === "-") return "- - -";
        if (prev === "- - -") return "-";
      });
    }, 300);

    return () => clearInterval(myinterval);
  }, []);

  const classes = {
    nav: "navbutton",
    primary: "primarybutton",
    secondary: "secondarybutton",
    link: "linkbutton",
  };

  if (href)
    return (
      <Link
        className={buttonstyle[classes[variant]]}
        href={href}
        style={style && style}
      >
        {startIcon && <Icon icon={startIcon} />}
        {isLoading ? "---" : text}
        {endIcon && <Icon icon={endIcon} />}
      </Link>
    );

  return (
    <button
      className={`${buttonstyle[classes[variant]]} ${
        isLoading && buttonstyle.loadingbutton
      }`}
      onClick={onClick}
      type={type ? type : "button"}
      style={style && style}
    >
      {startIcon && <Icon icon={startIcon} />}
      {isLoading ? loadState : text}
      {endIcon && <Icon icon={endIcon} />}
    </button>
  );
};

export default Button;
