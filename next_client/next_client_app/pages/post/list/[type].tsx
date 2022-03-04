import React, { Fragment } from "react";
import { NextRouter, withRouter } from "next/router";
import PetShopLayout from "../../../components/PetShopLayout";
import Header from "../../../components/Header/index";

const PostList: React.FC<{ router: NextRouter }> = (props) => {
  const { query } = props.router;
  
  const getTitle = (type: string | string[]) => {
    switch (type) {
      case 'dog':
        return '강아지 분양하기';
      case 'cat':
        return '고양이 분양하기';
      default:
        return undefined;
    }
  }

  return (
    <Fragment>
      <Header children={getTitle(query.type)} rightBtn={undefined} />
      <PetShopLayout
        petType={query.type}
        category={query.category}
        notUseTab={undefined}
        likedOnly={undefined}
      />
    </Fragment>
  );
}

export default withRouter(PostList);
