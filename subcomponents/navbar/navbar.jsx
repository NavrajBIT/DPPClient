import Image from "next/image";
import Link from "next/link";
import NavButtons from "./navButtons";

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
          maxWidth: "var(--max-width)",
          margin: "auto",
          padding: "var(--padding-light) var(--padding-main)",
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
    </div>
  );
};

export default Navbar;
