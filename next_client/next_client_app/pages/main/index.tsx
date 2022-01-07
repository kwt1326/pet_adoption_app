import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import axios from "axios";
import cookie from 'js-cookie';
import { FaDog, FaCat, FaListAlt, FaBuilding } from "react-icons/fa";
import Carousel from "./carousel";
import Header from "../../components/Header/index";
import PetListItem from "../../components/PetList/PetListItem";
import { LOGIN_QUERY } from '../../quries/authQuery';

import petstyles from "../../components/PetList/PetList.module.scss";
import styles from "../../styles/Main.module.scss";

const Main = () => {

  const [petlist, setPetlist] = useState([]);
  const [list, setList] = useState([]);
  const router = useRouter();

  const [loginQuery, { data: token }] = useLazyQuery(LOGIN_QUERY);
  
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/list?category=all&page=1`
      );
      setPetlist((petlist) => [...petlist, ...res.data.list]);
    
    } catch (e) {
      console.error(e);
    }
  };

  const loginFunc = async () => {
    const response = await loginQuery({
      variables: {
        input: {
          email: "tester@unknowncompany.com",
          password: "dqwjklw@123132"
        }
      }
    });

    const responseData = response?.data?.login;
    if (responseData) {
      cookie.set(process.env.JWT_KEY, responseData.result);
    }
    console.log("RESPONSE", response, token);
  }

  useEffect(() => {
    // fetchData();
    loginFunc();
  }, []);

  useEffect(() => {
    const temp = petlist.slice(0, 6);
    setList(temp);
  }, [petlist]);

  return (
    <div>
      <Header children={""} />
      <div className={styles.eventBanner}>
        <Carousel />
      </div>
      <ul className={styles.nav}>
        <li>
          <div>
            <FaDog />
            <span>강아지 분양</span>
          </div>
        </li>
        <li>
          <div>
            <FaCat />
            <span>고양이 분양</span>
          </div>
        </li>
        <li>
          <div>
            <FaListAlt />
            <span>입양 후기</span>
          </div>
        </li>
        <li>
          <div>
            <FaBuilding />
            <span>인증 업체</span>
          </div>
        </li>
      </ul>
      <div className={styles.contentBox}>
        <h4>최신 강아지 분양글</h4>
        <div className={petstyles.PetList}>
        {  list && list.map((petitem) => (
         <PetListItem petitem={petitem} key={petitem.id}></PetListItem>)
        )}
      </div>
        <div className={styles.btnBox}>     
          <button onClick={()=>router.push('./puppyadopt')} >더 많은 강아지 보러가기 &#62;</button>
        </div>
        <h4>최신 고양이 분양글</h4>
        <div className={petstyles.PetList}>
        {list && list.map((petitem) => (
         <PetListItem petitem={petitem} key={petitem.id}></PetListItem>)
        )}
      </div>
          <div className={styles.btnBox}>
          <button onClick={()=>router.push('./puppyadopt')}>더 많은 고양이 보러가기 &#62;</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
