import React, { useState } from "react";
import PetShopLayout from "../../components/PetShopLayout";
import Header from "../../components/Header/index";

function puppyAdopt(props) {
  return (
    <div>
      <Header children="강아지분양" />
      <PetShopLayout category="all" />
    </div>
  );
}

export default puppyAdopt;
