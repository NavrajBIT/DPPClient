"use client";
import Page from "@/subcomponents/containers/page";
import Button from "@/subcomponents/button/button";
import Usersview from "./subcomponents/usersview";

import { useEffect } from "react";

const Users = () => {
  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
      }}
    >
      <div
        style={{
          color: "var(--text-bright)",
          fontSize: "1.5rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Users
      </div>
      <div style={{ width: "fit-content" }}>
        <Button text="Add User +" variant={"primary"} href={"/users/add"} />
      </div>
      <Usersview />
    </Page>
  );
};

export default Users;
