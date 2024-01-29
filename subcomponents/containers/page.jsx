import React from "react";

const Page = ({ children, style = {}, innerStyle = {} }) => {
  return (
    <main
      style={{
        paddingTop: "var(--navbar-height)",
        paddingBottom: "var(--footer-overflow)",
        minHeight: "var(--min-height-page)",
        position: "relative",
        ...style,
      }}
    >
      <Filter />
      <div
        style={{
          maxWidth: "var(--max-width)",
          margin: "auto",
          zIndex: 1,
          position: "relative",
          padding: "var(--padding-main)",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </main>
  );
};

export default Page;

const Filter = () => (
  <div
    style={{
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundImage: "var(--filter-1)",
      zIndex: 0,
    }}
  />
);
