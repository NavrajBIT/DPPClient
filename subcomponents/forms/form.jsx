"use client";
import style from "./form.module.css";
import Button from "../button/button";
import { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import API from "@/subcomponents/api/api";

const Form = ({
  formData,
  title,
  button,
  handleSubmit,
  isLoading,
  children,
  back,
  backbutton,
  abovebuttonData,
}) => {
  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const doublebuttonstyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--padding-main)",
  };
  const singlebuttonstyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <form className={style.myform} onSubmit={submitForm}>
      <div className={style.formtitle}>{title}</div>
      {formData.map((inputData, index) => (
        <InputField inputData={inputData} key={"my-form-" + index} />
      ))}
      {abovebuttonData && abovebuttonData}
      <div style={backbutton ? doublebuttonstyle : singlebuttonstyle}>
        {backbutton && (
          <Button
            text={backbutton}
            variant={"secondary"}
            isLoading={isLoading}
            onClick={back}
          />
        )}
        <Button
          text={button}
          variant={"primary"}
          type="submit"
          isLoading={isLoading}
          style={{ minWidth: "70%" }}
        />
      </div>

      {children}
    </form>
  );
};

export default Form;

export const InputField = ({ inputData }) => {
  const [isFocus, setIsFocus] = useState(false);

  if (inputData.type === "checkbox")
    return <BooleanInput inputData={inputData} />;

  if (inputData.type === "selectUsers")
    return <UserInput inputData={inputData} />;

  if (inputData.type === "image") return <ImageInput inputData={inputData} />;

  if (inputData.type === "file") return <FileInput inputData={inputData} />;

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const isFilled =
    inputData.value && inputData.value.length && inputData.value.length > 0;

  const label = `${inputData.label} ${inputData.required ? "*" : ""}`;

  return (
    <div className={style.inputcontainer}>
      <label
        style={{
          color: isFocus ? "var(--text-primary)" : "var(--text-dark)",
        }}
      >
        {isFocus || isFilled ? label : ""}
      </label>
      {inputData.rows ? (
        <textarea
          type={inputData.type}
          name={inputData.label}
          placeholder={!isFocus ? label : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={inputData.required}
          maxLength={inputData.maxLength ? inputData.maxLength : ""}
          value={inputData.value}
          onChange={inputData.setValue}
          rows={inputData.rows}
          style={{
            borderBottom: isFocus
              ? "1px solid var(--text-bright)"
              : "1px solid var(--accent-20)",
            resize: "none",
            fontFamily: "Arial, sans-serif",
          }}
        />
      ) : (
        <input
          type={inputData.type}
          name={inputData.label}
          placeholder={!isFocus ? label : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={inputData.required}
          maxLength={inputData.maxLength ? inputData.maxLength : ""}
          value={inputData.value}
          onChange={inputData.setValue}
          style={{
            borderBottom: isFocus
              ? "1px solid var(--text-bright)"
              : "1px solid var(--accent-20)",
          }}
        />
      )}
    </div>
  );
};

const BooleanInput = ({ inputData }) => {
  const id = inputData.label + "-input-id";

  return (
    <div className={style.booleaninputcontainer}>
      <input
        type="checkbox"
        id={id}
        checked={inputData.value}
        onChange={inputData.setValue}
      />
      <label htmlFor={id}>{inputData.label}</label>
    </div>
  );
};

const UserInput = ({ inputData }) => {
  const api = API();
  const loadOptions = async () => {
    return api.crud("GET", "organization/users");
  };

  return (
    <div className={""}>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={inputData.value}
        getOptionLabel={(e) => e.username}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onChange={inputData.onvaluechange}
        isMulti
        placeholder={inputData.label}
      />
    </div>
  );
};

const ImageInput = ({ inputData }) => {
  return (
    <label htmlFor="image">
      <p style={{ color: "var(--text-dark)", marginBottom: "15px" }}>
        Profile Image
      </p>
      <input type="file" name="image" id="image" />
      {/* <input type="file" name="image" id="image" style={{ display: "none" }} /> */}
      {/* <img
        src={inputData.value}
        alt="product image"
        style={{ height: "200px", width: "300px" }}
      /> */}
    </label>
  );
};

const FileInput = ({ inputData }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: "10px",
      }}
    >
      <p style={{ color: "var(--text-dark)" }}>{inputData.label}</p>
      <input type="file" />
    </div>
  );
};
