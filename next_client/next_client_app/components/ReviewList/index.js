import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";

import ReviewListItem from "./ReviewListItem";
import { useIntersection } from '../../hooks/useIntersection';
import {
  QUERY_ADOPTREVIEW_LIST,
  TOGGLE_LIKE_MUTATION,
} from "../../quries/adoptionPostReviewsQuery";

import styles from "./ReviewList.module.scss";

function ReviewList() {
  const [page, setPage] = useState(1);
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);

  const toggleLikeMutation = async (id) => {
    const result = await toggleLike({
      variables: { input: Number(id), },
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
  
  const loadMore = useCallback(() => setPage(prev => prev + 1), []);

  const getPostInputData = useCallback(() => ({
    variables: { input: { page }, },
  }), [page]);
  
  const { loading, data, fetchMore } = useQuery(
    QUERY_ADOPTREVIEW_LIST,
    getPostInputData()
  );

  const getListMore = async () => {
    const result = await fetchMore(getPostInputData());
    if (result?.error) {
      console.error(result.error);
      alert(result.error.message);
    }
  };

  const [, setObserverRef] = useIntersection((_entry, _observer) => loadMore());
  
  useEffect(() => {
    getListMore();
  }, [page]);

  if (data?.getAdoptReviews) {
    const list = data?.getAdoptReviews;

    return (
      <section className={styles.container}>
        <div className={styles.listContainer}>
          {list.map((item, i) => (
            <Link
              key={i}
              href={`/reviews/${list[i].id}`}
            >
              <div>
                <ReviewListItem
                  key={i}
                  item={item}
                  toggleLikeMutation={toggleLikeMutation}
                />
              </div>
            </Link>
          ))}
          <div className={styles.div_intersection_observer} ref={setObserverRef}>
            {loading && <span>loading...</span>}
          </div>
        </div>
      </section>
    );
  }
  return null;
}

export default ReviewList;
