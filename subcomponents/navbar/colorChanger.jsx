"use client";
import { useEffect } from "react";

const ColorChanger = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      let nav = document.getElementById("navbar");
      if (parseInt(e.target.scrollTop) > 50) {
        nav.style.backgroundColor = "#3A0201";
      } else {
        nav.style.backgroundColor = "transparent";
      }
    };

    document.body.addEventListener("scroll", handleScroll);

    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default ColorChanger;
