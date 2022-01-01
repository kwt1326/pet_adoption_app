import React from "react";
import PetShopLayout from "../../components/PetShopLayout";
import Header from "../../components/Header/index";

function shelter(props) {
  return (
    <div>
      <Header children="강아지분양" />
      <PetShopLayout category="shelter" />
    </div>
  );
}

export default shelter;
