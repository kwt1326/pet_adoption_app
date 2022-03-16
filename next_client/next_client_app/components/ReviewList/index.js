import ReviewListItem from "./ReviewListItem";
import styles from "./ReviewList.module.scss";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  QUERY_ADOPTREVIEW_LIST,
  TOGGLE_LIKE_MUTATION,
} from "../../quries/adoptionPostReviewsQuery";

function ReviewList(props) {
  const [mount, setMount] = useState(false);
  const [page, setPage] = useState(1);
  const [pageEndRef, setPageEndRef] = useState(null);
  const [isStartObserve, setStartObserve] = useState(false);

  const [toggleLike, toggleLikeResult] = useMutation(TOGGLE_LIKE_MUTATION);

  const toggleLikeMutation = async (postId) => {
    await toggleLike({
      variables: {
        input: {
          postId,
        },
      },
    });
  };
  
  const getPostInputData = useCallback(
    () => ({
      variables: {
        input: {
          page,
        },
      },
    }),
    [page]
  );
  
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
      getListMore();
    }
  }, [page]);

  useEffect(() => {
    setMount(true);
  }, []);

  const loadMore = () => setPage((prev) => prev + 1);

  if (data?.getAdoptReviews) {
    const list = data?.getAdoptReviews;

    return (
      <section>
        <div className={styles.listContainer}>
          {list.map((item, i) => (
            <Link
              key={i}
              href={{
                pathname: `/reviews/${list[i].id}`,
              }}
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
        </div>
      </section>
    );
  }
  return null;
}

export default ReviewList;
