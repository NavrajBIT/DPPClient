import style from "./popup.module.css";

const Popup = ({ children, close }) => {
  return (
    <div className={style.background}>
      <div className={style.popup}>
        <div className={style.closebutton} onClick={close}>
          X
        </div>

        {children}
      </div>
    </div>
  );
};

export default Popup;
