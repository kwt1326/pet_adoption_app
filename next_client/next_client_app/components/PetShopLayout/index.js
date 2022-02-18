import React, { Fragment } from "react";
import Categories from "../Categories";
import PetList from "../PetList";
function PetShopLayout({ category }) {
  return (
    <Fragment>
      <Categories category={category} />
      <PetList category={category} />
    </Fragment>
  );
}
export default PetShopLayout;
