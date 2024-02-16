"use client";
import Button from "../button/button";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import menu from "../../public/nav/menu.png";
import close from "../../public/nav/close.png";
import Image from "next/image";
import API from "@/subcomponents/api/api";
import "./navbar.css";

const NavButton = () => {
  const api = API();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const pathname = usePathname();

  const poppulateJWT = () => {
    const jwt = localStorage.getItem("jwtToken");
    if (jwt && jwt !== null && jwt !== undefined && jwt !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const getNameAndRole = async () => {
    await api
      .crud("GET", "organization/users/profile")
      .then((res) => {
        if (res.status == 200) {
          setIsAdmin(res.is_orgAdmin);
          setIsOwner(res.is_orgFounder);
          setName(res.firstName);
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location = "/";
  };

  useEffect(() => {
    poppulateJWT();
    getNameAndRole();
  }, [pathname]);

  const displayButtons = () => {
    return isLoggedIn ? (
      <>
        {isAdmin && <Button text={"Users"} variant={"nav"} href={"/users"} />}

        <Button text={"Products"} variant={"nav"} href={"/products"} />
        <Button text={"Contact"} variant={"nav"} href={"/contact"} />
        <div className="userMenu">
          <Button
            text={`Hello,${name}`}
            variant={"primary"}
            className="userMenuButton"
          />
          <ul className="userMenuItems">
            <li>profile</li>
            {isOwner && (
              <li onClick={() => (location.href = "/org")}>
                organization Details
              </li>
            )}
            <li onClick={logout}>logout</li>
          </ul>
        </div>
      </>
    ) : (
      <>
        <Button text={"Contact"} variant={"nav"} href={"/contact"} />

        <Button text={"Login"} variant={"primary"} href={"/login"} />
      </>
    );
  };

  return (
    <div>
      <div className="nav-buttons">{displayButtons()}</div>

      <div id="mobilemenu">
        <Image
          src={menuOpen ? menu : close}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
    </div>
  );
};

export default NavButton;
