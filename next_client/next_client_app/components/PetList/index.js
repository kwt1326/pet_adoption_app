import React, { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import PetListItem from "./PetListItem";
import {
  GET_ADOPTION_POST_LIST,
  TOGGLE_LIKE_MUTATION,
} from "../../quries/adoptionPostQuery";

import style from "./PetList.module.scss";
import Link from "next/link";
function PetList({ category }) {
  const [mount, setMount] = useState(false);
  const [page, setPage] = useState(1);
  const [pageEndRef, setPageEndRef] = useState(null);
  const [isStartObserve, setStartObserve] = useState(false);

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
        },
      },
    }),
    [category, page]
  );

  const { loading, data, fetchMore } = useQuery(
    GET_ADOPTION_POST_LIST,
    getPostInputData()
  );
  const [toggleLike, toggleLikeResult] = useMutation(TOGGLE_LIKE_MUTATION);

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
    window.scrollTo(0, 0);
  };

  const getListMore = async () => {
    const result = await fetchMore(getPostInputData());
    if (result?.error) {
      console.error(result.error);
      alert(result.error.message);
    }
  };

  useEffect(() => {
    if (mount && pageEndRef && !isStartObserve) {
      try {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              loadMore();
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(pageEndRef);
        setStartObserve(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [pageEndRef]);

  useEffect(() => {
    if (mount) {
      setPage(1);
      getListMore();
    }
  }, [category]);

  useEffect(() => {
    if (mount) {
      getListMore();
    }
  }, [page]);

  useEffect(() => {
    setMount(true);
  }, []);

  const loadMore = () => setPage((prev) => prev + 1);

  if (data?.getPosts) {
    const petList = data?.getPosts;
    return (
      <section className={style.container}>
        <div className={style.pet_list}>
          {petList.map((petitem, i) => (
            <Link
              href={{
                pathname: `/post/list/${category}/${i}`,
                query: { pet: JSON.stringify(petitem) },
              }}
              as={`/post/list/${category}/${i}`}
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
        <div className={style.div_intersection_observer} ref={setPageEndRef}>
          {loading && <span>loading...</span>}
        </div>
      </section>
    );
  }
  return null;
}

export default PetList;
