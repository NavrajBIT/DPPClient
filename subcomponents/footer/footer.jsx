import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      style={{
        background: "var(--primary)",
        color: "var(--text-primary)",
        borderRadius: "var(--footer-overflow) var(--footer-overflow) 0 0",
        transform: "translateY(calc(var(--footer-overflow) * -1))",
        paddingTop: "var(--footer-overflow)",
      }}
    >
      <div
        style={{
          padding: "var(--padding-main)",
          maxWidth: "var(--max-width)",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--padding-main)",
          }}
        >
          <Link href={"/home"}>
            <Image src={"/logo.png"} width={120} height={60} alt="BITDPP" />
          </Link>
          <Socials />
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          @2023 Beyond imagination Technologies
        </div>
      </div>
    </div>
  );
};

export default Footer;

const Socials = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--padding-light)",
    }}
  >
    <Link href={"https://www.linkedin.com/company/bitmemoir/"} target="blank">
      <Image
        src={"/icons/linkedin.svg"}
        height={35}
        width={35}
        alt={"linkedin"}
      />
    </Link>
    <Link href={"https://www.instagram.com/bitmemoir/"} target="blank">
      <Image
        src={"/icons/instagram.svg"}
        height={30}
        width={30}
        alt={"instagram"}
      />
    </Link>
    <Link href={"https://t.me/bitmemoirofficial"} target="blank">
      <Image
        src={"/icons/telegram.svg"}
        height={30}
        width={30}
        alt={"telegram"}
      />
    </Link>
    <Link
      href={"https://twitter.com/Bit_memoir?t=dPPpNawrSKg3mn3BLyYxWA&s=08"}
      target="blank"
    >
      <Image
        src={"/icons/twitter.svg"}
        height={30}
        width={30}
        alt={"twitter"}
      />
    </Link>
  </div>
);
