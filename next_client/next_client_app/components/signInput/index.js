import React from "react";

function signInput({ value, onChange, placeholder, type }) {
  return <input value={value} onChange={onChange} placeholder={placeholder} type={type}></input>;
}
export default signInput;
