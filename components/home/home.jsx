"use client";

import Page from "@/subcomponents/containers/page";
import Button from "@/subcomponents/button/button";
import API from "@/subcomponents/api/api";

const Home = () => {
  const api = API();

  return (
    <Page
      style={{
        color: "white",
        backgroundImage: "url('./bg1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100%",
      }}
      innerStyle={{ height: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-main)",
          height: "100%",
          justifyContent: "space-around",
        }}
      >
        <div />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-main)",
          }}
        >
          <div style={{ fontSize: "4rem", fontWeight: "900" }}>BIT DPP</div>
          <div style={{ fontWeight: "500" }}>
            The new-age Digital Product Passport
          </div>
          <div style={{ width: "fit-content" }}>
            <Button
              text="Get Started"
              variant="primary"
              endIcon="arrow_forward"
              href="/dashboard"
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              background: "var(--filter-1)",
              padding: "var(--padding-main)",
              margin: "auto",
              maxWidth: "var(--max-width-content)",
              borderRadius: "var(--border-radius-small)",
              textAlign: "center",
            }}
          >
            Welcome to BITDPP, where innovation meets authentication, and the
            future of digital product documentation unfolds. Our platform is
            your gateway to a seamless, secure, and interconnected world of
            product passports.
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
