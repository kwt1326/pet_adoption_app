import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaDog, FaCat, FaListAlt, FaBuilding } from "react-icons/fa";
import Carousel from "./carousel";
import Header from "../../components/Header/index";
import PetListItem from "../../components/PetList/PetListItem";
import petstyles from "../../components/PetList/PetList.module.scss";
import styles from "../../styles/Main.module.scss";
import Link from "next/link";
import { GET_ADOPTION_POST_LIST2 } from "../../quries/adoptionPostQuery";
import { useLazyQuery } from "@apollo/client";

const Main = () => {
  const [petList, setPetlist] = useState([]);
  const [list, setList] = useState([]);
  const router = useRouter();
  const [getPostsQuery, { loading, error, previousData, data }] = useLazyQuery(
    GET_ADOPTION_POST_LIST2
  );
  const fetchData = async () => {
    try {
      const isProfit = undefined;
      const result = await getPostsQuery({
        variables: {
          input: {
            isProfit,
          },
        },
      });

      console.log(result.error.message)
      const prevData = petList || [];
      const curData = result.data?.getPosts || [];
 
      if (petList) {
        const newData = petList.concat(curData);
        setPetlist(newData);
      } else {
        setPetlist(curData);
      }
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const temp = petList.slice(0, 6);
    setList(temp);
  }, [petList]);

  return (
    <div>
      <Header />
      <Carousel />
      <ul className={styles.nav}>
        <li>
          <Link href="puppyadopt">
            <a>
              <div>
                <FaDog />
                <span>강아지 분양</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="catAdopt">
            <a>
              <div>
                <FaCat />
                <span>고양이 분양</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="adoptReview">
            <a>
              <div>
                <FaListAlt />
                <span>입양 후기</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="authagency">
            <a>
              <div>
                <FaBuilding />
                <span>인증 업체</span>
              </div>
            </a>
          </Link>
        </li>
      </ul>
      <div className={styles.contentBox}>
        <h4>최신 강아지 분양글</h4>
        <div className={petstyles.PetList}>{list && list.map((petitem, i) => <PetListItem petitem={petitem} key={i}></PetListItem>)}</div>
        <div className={styles.btnBox}>
          <button onClick={() => router.push("./puppyadopt")}>더 많은 강아지 보러가기 &#62;</button>
        </div>
        <h4>최신 고양이 분양글</h4>
        <div className={petstyles.PetList}>{list && list.map((petitem,i) => <PetListItem petitem={petitem} key={i}></PetListItem>)}</div>
        <div className={styles.btnBox}>
          <button onClick={() => router.push("./puppyadopt")}>더 많은 고양이 보러가기 &#62;</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
