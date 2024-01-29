import style from "./stepper.module.css";
import { Fragment } from "react";

const Stepper = ({ steps, step }) => {
  return (
    <div className={style.steppercontainer}>
      {Array.from({ length: steps }, () => 0).map((_, index) => {
        let isComplete = index < step - 1;
        let isSelected = index === step - 1;
        return (
          <Fragment key={"stepper-" + index}>
            <Step isComplete={isComplete} isSelected={isSelected} />
            {index < steps - 1 && <Connector isComplete={isComplete} />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;

const Step = ({ isComplete, isSelected }) => {
  return (
    <div
      className={`${style.unselectedStep} ${
        isComplete && style.completedStep
      } ${isSelected && style.selectedStep}`}
    />
  );
};

const Connector = ({ isComplete }) => {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: isComplete
          ? "2px solid var(--accent-10)"
          : "2px solid var(--accent-30)",
      }}
    />
  );
};
