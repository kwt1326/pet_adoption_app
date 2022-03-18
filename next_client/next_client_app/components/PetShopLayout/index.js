import React, { Fragment } from "react";
import Categories from "../Categories";
import PetList from "../PetList";

function PetShopLayout({ petType, category, notUseTab, likedOnly }) {
  return (
    <Fragment>
      {!notUseTab && <Categories category={category} />}
      <PetList petType={petType} category={category} likedOnly={likedOnly} />
    </Fragment>
  );
}
export default PetShopLayout;
