import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaDog, FaCat, FaListAlt, FaBuilding } from "react-icons/fa";
import Carousel from "./carousel";
import Header from "../../components/Header/index";
import PetListItem from "../../components/PetList/PetListItem";
import petstyles from "../../components/PetList/PetList.module.scss";
import styles from "../../styles/Main.module.scss";
import Link from "next/link";

const Main = () => {
  const [petlist, setPetlist] = useState([]);
  const [list, setList] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/list?category=all&page=1`);
      setPetlist((petlist) => [...petlist, ...res.data.list]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
    // loginFunc();
  }, []);

  useEffect(() => {
    const temp = petlist.slice(0, 6);
    setList(temp);
  }, [petlist]);

  return (
    <div>
      <Header children={""} />
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
        <div className={petstyles.PetList}>{list && list.map((petitem) => <PetListItem petitem={petitem} key={petitem.id}></PetListItem>)}</div>
        <div className={styles.btnBox}>
          <button onClick={() => router.push("./puppyadopt")}>더 많은 강아지 보러가기 &#62;</button>
        </div>
        <h4>최신 고양이 분양글</h4>
        <div className={petstyles.PetList}>{list && list.map((petitem) => <PetListItem petitem={petitem} key={petitem.id}></PetListItem>)}</div>
        <div className={styles.btnBox}>
          <button onClick={() => router.push("./puppyadopt")}>더 많은 고양이 보러가기 &#62;</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
