import React, { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

import PetListItem from "./PetListItem";
import { useIntersection } from '../../hooks/useIntersection';
import {
  GET_ADOPTION_POST_LIST,
  TOGGLE_LIKE_MUTATION,
} from "../../quries/adoptionPostQuery";

import style from "./PetList.module.scss";

function PetList({ petType, category, likedOnly }) {
  const [page, setPage] = useState(1);

  const getIsProfit = useCallback(
    () => (category === "all" ? undefined : category === "petshop"),
    [category]
  );

  const getPostInputData = useCallback(
    () => ({
      variables: {
        input: {
          isProfit: getIsProfit(),
          page,
          petType,
          isLiked: likedOnly,
        },
      },
      fetchPolicy: 'cache-and-network'
    }),
    [petType, category, likedOnly, page]
  );

  const { loading, data, fetchMore } = useQuery(
    GET_ADOPTION_POST_LIST,
    getPostInputData()
  );
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);

  const toggleLikeMutation = async (postId) => {
    const result = await toggleLike({
      variables: {
        input: {
          postId,
        },
      },
    });
    if (result?.errors) {
      console.error(result.errors);
      alert(result.errors);
      return;
    }
    setPage(1);
    getListMore();
    window.scrollTo(0, 0);
  };

  const getListMore = async () => {
    const result = await fetchMore(getPostInputData());
    if (result?.error) {
      console.error(result.error);
      alert(result.error.message);
    }
  };

  const [, setObserverRef] = useIntersection(async (_entry, _observer) => loadMore());

  useEffect(() => {
    setPage(1);
    getListMore();
  }, [petType, category, likedOnly]);

  useEffect(() => {
    getListMore();
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  if (data?.getPosts) {
    const petList = data?.getPosts;
    return (
      <section className={style.container}>
        <div className={style.pet_list}>
          {petList.map((petitem, i) => (
            <Link
              href={{
                pathname: `/post/detail/${petitem.id}`,
              }}
              key={i}
            >
              <div>
                <PetListItem
                  key={i}
                  petitem={petitem}
                  toggleLikeMutation={toggleLikeMutation}
                />
              </div>
            </Link>
          ))}
        </div>
        <div className={style.div_intersection_observer} ref={setObserverRef}>
          {loading && <span>loading...</span>}
        </div>
      </section>
    );
  }

  return null;
}

export default PetList;
