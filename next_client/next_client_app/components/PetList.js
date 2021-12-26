import React, { useCallback, useEffect, useState, useRef } from "react";
import PetListItem from "./PetListItem";
import style from "./PetList.module.scss";
import axios from "axios";

function PetList({ category }) {
  const [petlist, setPetlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const pageEnd = useRef();

  const fetchData = async (page) => {
    console.log(page, category, petlist);
    try {
      const res = await axios.get(`http://localhost:3001/${category}/${page}`);
      setPetlist((petlist) => [...petlist, ...res.data.data]);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setPetlist([]);
    setPage(1);
  }, [category]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    if (loading) {
      try {
        const observer = new IntersectionObserver(
          (entries) => {
            console.log(entries[0]);
            if (entries[0].isIntersecting) {
              loadMore();
            }
          },
          { threshold: 0.5 }
        );
        console.log("hello" + observer);
        observer.observe(pageEnd.current);
      } catch (e) {
        console.log(e);
      }
    }
  }, [loading]);
  if (!petlist) return null;
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      <div className={style.PetList}>
        {petlist.map((petitem) => (
          <PetListItem
            petitem={petitem}
            key={petitem.id}
            onClick={() => {
              // console.log(petitem.islike);
              petitem.islike = !petitem.islike;
              // console.log(petitem.islike);
            }}
          ></PetListItem>
        ))}
      </div>
      <button onClick={loadMore} ref={pageEnd}>
        loadmore...
      </button>
    </>
  );
}

export default PetList;
