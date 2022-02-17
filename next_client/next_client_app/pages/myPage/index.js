import React, { useState } from "react";
import { useUserInfo } from "../../hooks/user";

function myPage() {
  const userInfo = useUserInfo();
  console.log(userInfo);
  return (
    <div>
      <span></span>
      <span>..</span>
    </div>
  );
}

export default myPage;
