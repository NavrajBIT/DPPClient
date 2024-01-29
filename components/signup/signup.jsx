"use client";
import Page from "@/subcomponents/containers/page";
import Stepper from "@/subcomponents/stepper/stepper";
import Primaryform from "@/subcomponents/forms/kycforms/primaryform";
import Organizationform from "@/subcomponents/forms/kycforms/organizationform";
import FinishedForm from "@/subcomponents/forms/kycforms/finishedForm";
import { useState } from "react";
import API from "@/subcomponents/api/api";
import { useRouter } from "next/navigation";

const Signup = () => {
  const api = API();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [kycData, setKycData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    name: "",
    address: "",
    country: "",
    website: "",
    description: "",
    reg_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateData = (key, value) => {
    setKycData((prev) => {
      let newData = { ...prev };
      newData[key] = value;
      return newData;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(kycData);
    await api
      .crud("POST", "user/kyc/apply", { ...kycData })
      .then((res) => {
        console.log(res);
        alert(
          `KYC submitted successfully. Our representative will contact you shortly. Request id : ${res.id}`
        );
        router.push("/");
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const changeStep = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  return (
    <Page
      innerStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-main)",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "var(--text-bright)",
        }}
      >
        Signup
      </div>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          maxWidth: "var(--max-width-content)",
          color: "var(--text-primary)",
        }}
      >
        Please fill in the KYC details below. We will send you login credentials
        after reviewing the KYC details.
      </div>
      <Stepper steps={3} step={step} />
      {step === 1 && (
        <Primaryform
          next={changeStep}
          updateData={updateData}
          kycData={kycData}
        />
      )}
      {step === 2 && (
        <Organizationform
          next={changeStep}
          updateData={updateData}
          kycData={kycData}
          back={back}
        />
      )}
      {step === 3 && (
        <FinishedForm
          handleSubmit={handleSubmit}
          kycData={kycData}
          back={back}
          isLoading={isLoading}
        />
      )}
    </Page>
  );
};

export default Signup;
