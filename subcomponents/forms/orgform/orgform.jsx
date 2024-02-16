"use client";
import { useEffect, useState } from "react";
import Form from "../form";
import { useRouter } from "next/navigation";
import API from "@/subcomponents/api/api";
import AsyncSelect from "react-select/async";

const Orgform = () => {
  const api = API();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getOrganizationData();
  }, []);

  const getOrganizationData = async () => {
    await api
      .crud("GET", "organization")
      .then(async (res) => {
        console.log(res);
        if (res.status == 200) {
          const adminPromise = res.organizationManager.map((user) => {
            return api.crud("GET", `organization/users/${user}`);
          });
          const admins = await Promise.all(adminPromise);
          setName(res.name);
          setAbout(res.about);
          setAdmin(admins);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const adminId = admin.map((user) => {
      return user.id;
    });
    const body = {
      name: name,
      about: about,
      organizationManager: adminId,
    };
    await api
      .crud("PUT", "organization", body)
      .then((res) => {
        if (res.status == 200) {
          alert("Success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const handleChange = (value) => {
    setAdmin(value);
  };

  const formData = [
    {
      type: "text",
      label: "Organization Name",
      required: true,
      maxLength: 100,
      value: name,
      setValue: (e) => {
        setName(e.target.value);
      },
    },
    {
      type: "text",
      label: "Organization Description",
      required: true,
      rows: 4,
      maxLength: 500,
      value: about,

      setValue: (e) => {
        setAbout(e.target.value);
      },
    },
    {
      type: "selectUsers",
      label: "Select User",
      value: admin,
      onvaluechange: handleChange,
    },
  ];

  return (
    <div style={{ width: "var(--max-width-content)" }}>
      {name != "" && (
        <Form
          formData={formData}
          handleSubmit={handleSubmit}
          button="Save"
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Orgform;
