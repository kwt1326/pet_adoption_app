import React from "react";
import style from "./SingInput.module.scss";

function SignInput({ value, onChange, placeholder, type, errorText, maxLength }) {
  return (
    <div className={style.container}>
      <input
        type={type || 'text'}
        className={style.inputContent}
        placeholder={placeholder || ''}
        value={value || ''}
        maxLength={maxLength || 100}
        onChange={onChange}
      />
      {errorText !== "" ? <div style={{ margin: "5px 0", fontSize: "12px", color: "crimson" }}>{errorText}</div> : null}
    </div>
  );
}
export default SignInput;
