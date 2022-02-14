import React, { Fragment } from "react";
import { NextRouter, withRouter } from "next/router";
import PetShopLayout from "../../../components/PetShopLayout";
import Header from "../../../components/Header/index";

const PostList: React.FC<{ router: NextRouter }> = (props) => {
  const { query } = props.router;
  return (
    <Fragment>
      <Header children={undefined} rightBtn={undefined} />
      <PetShopLayout category={query.type} />
    </Fragment>
  );
}

export default withRouter(PostList);
