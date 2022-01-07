import React, { useEffect, useState, useRef } from "react";
import { useLazyQuery } from '@apollo/client';
import PetListItem from "./PetListItem";
import { GET_ADOPTION_POST_LIST } from '../../quries/adoptionPostQuery';

import style from "./PetList.module.scss";

function PetList({ category }) {
  const [page, setPage] = useState(1);
  const [pageEndRef, setPageEndRef] = useState(null);
  const [petList, setPetList] = useState(null);
  const [isStartObserve, setStartObserve] = useState(false);

  const [getPostsQuery, {
    loading,
    error,
    previousData,
    data,
  }] = useLazyQuery(GET_ADOPTION_POST_LIST)

  const fetchData = async (page) => {
    try {
      // const res = await axios.get(`/api/list?category=${category}&page=${page}`);
      // setPetlist((petlist) => [...petlist, ...res.data.list]);

      // isProfit : true >>> 이득을 보는 업체 false >>> 보호소 undefined >>> 전체
      const isProfit = category === 'all' ? undefined
        : category === 'petshop' ? true
          : false

      const result = await getPostsQuery({
        variables: {
          input: {
            page,
            /* isProfit */
          }
        }
      })

      const prevData = petList || []
      const curData = result.data?.getPosts?.result || []
      setPetList([...prevData, ...curData])
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (pageEndRef && !isStartObserve) {
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
  }, [pageEndRef])

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  if (petList) {
    return (
      <section>
        <div className={style.PetList}>
          {
            petList.map((petitem, i) => (
              <PetListItem
                petitem={petitem}
                key={i}
                onClick={() => {
                  petitem.islike = !petitem.islike;
                }}
              ></PetListItem>
            ))
          }
        </div>
        <button onClick={loadMore} ref={setPageEndRef}>
          loadmore...
        </button>
      </section>
    );
  }
  return null;
}

export default PetList;
