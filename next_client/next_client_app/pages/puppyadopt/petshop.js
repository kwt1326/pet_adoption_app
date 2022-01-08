import React from "react";
import PetShopLayout from "../../components/PetShopLayout";
import Header from "../../components/Header/index";

function petShop(props) {
  return (
    <div>
      <Header children="강아지분양" />
      <PetShopLayout category="petshop" />
    </div>
  );
}

export default petShop;
