import React from "react";

/* eslint-disable react/display-name */
const PrivateComponent = (Component: any) => {
  return (props: { auth?: unknown, data: unknown }) => {
    if (props?.auth) {
      return <Component {...props} />
    }
    // alter 401 redirect
    return <>접근이 제한된 페이지 입니다.</>
  }
}

export default PrivateComponent;
