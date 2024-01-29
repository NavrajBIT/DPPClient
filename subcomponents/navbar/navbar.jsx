import Image from "next/image";
import Link from "next/link";
import Button from "../button/button";
import style from "./navbar.module.css";
import ColorChanger from "./colorChanger";
import LoginButton from "./loginButton";

const Navbar = () => {
  return (
    <div
      id="navbar"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "var(--navbar-height)",
          maxWidth: "var(--max-width)",
          margin: "auto",
          padding: "var(--padding-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--padding-main)",
        }}
      >
        <Link href={"/home"}>
          <Image src={"/logo.png"} width={120} height={60} alt="BITDPP" />
        </Link>
        <NavButtons />
      </div>
      <ColorChanger />
    </div>
  );
};

export default Navbar;

const NavButtons = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--padding-light)",
        alignItems: "center",
      }}
    >
      <div className={style.contactbutton}>
        <Button text={"Contact"} variant={"nav"} href={"/contact"} />
      </div>
      <LoginButton />
    </div>
  );
};
