import React from "react";
import style from "./SingInput.module.scss";

function SignInput({ value, onChange, placeholder, type, errorText, maxLength, onkeypress }) {
  return (
    <div className={style.container}>
      <input value={value} onChange={onChange} placeholder={placeholder} type={type} maxLength={maxLength} className={style.inputContent} ></input>
      {errorText !== "" ? <div style={{ marginTop: "5px", fontSize: "12px", color: "crimson" }}>{errorText}</div> : null}
    </div>
  );
}
export default SignInput;
