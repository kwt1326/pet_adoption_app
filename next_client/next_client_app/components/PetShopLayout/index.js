import React, { useCallback, useState } from "react";
import Categories from "../Categories";
import PetList from "../PetList";

function PetShopLayout({ category }) {
  const [category2, setCategory] = useState(category);
  const onSelect = useCallback((category) => setCategory(category), []);
  return (
    <>
      <Categories category={category2} onSelect={onSelect}></Categories>
      <PetList category={category2}></PetList>
    </>
  );
}
export default PetShopLayout;
