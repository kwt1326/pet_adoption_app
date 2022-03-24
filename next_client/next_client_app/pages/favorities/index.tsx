import React, { Fragment } from "react";
import { NextRouter, withRouter } from "next/router";
import PetShopLayout from "../../components/PetShopLayout";
import Header from "../../components/Header/index";

const Favorities: React.FC<{ router: NextRouter }> = (props) => {
  return (
    <Fragment>
      <Header children={'찜리스트'} rightBtn={undefined} />
      <PetShopLayout
        category={'all'}
        petType={undefined}
        notUseTab
        likedOnly
      />
    </Fragment>
  );
}

export default withRouter(Favorities);
