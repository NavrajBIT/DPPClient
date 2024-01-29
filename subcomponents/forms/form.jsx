"use client";
import style from "./form.module.css";
import Button from "../button/button";
import { useRef, useState } from "react";

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
