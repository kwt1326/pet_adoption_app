import React , { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { FaDog, FaCat, FaListAlt, FaBuilding } from "react-icons/fa";

import Carousel from "./carousel";
import Header from "../../components/Header/index";
import PetListItem from "../../components/PetList/PetListItem";
import { GET_RECENTLY_ADOPTION_POST_LIST, TOGGLE_LIKE_MUTATION } from "../../quries/adoptionPostQuery";

import styles from "./Main.module.scss";

function Main() {
  const router = useRouter();

  const { loading, data, fetchMore } = useQuery(GET_RECENTLY_ADOPTION_POST_LIST);
  const [toggleLike, toggleLikeResult] = useMutation(TOGGLE_LIKE_MUTATION);
  
  const toggleLikeMutation = async (postId) => {
    const result = await toggleLike({
      variables: {
        input: {
          postId
        }
      }
    })
    if (result?.errors) {
      console.error(result.errors);
      alert(result.errors);
      return;
    }
    fetchMore({});
  }

  const RecentlyPetList = (props: { type: string }) => {
    if (!loading && data) {
      const { getRecentlyPosts } = data;
      return (
        <div className={styles.list_container}>
          {getRecentlyPosts && getRecentlyPosts[props.type].map((petitem, i) => (
             <Link
             href={{
               pathname: `/post/detail/${petitem.id}`,
             }}
             key={i}
           ><div>
            <PetListItem
              key={i}
              petitem={petitem}
              toggleLikeMutation={toggleLikeMutation}
            /></div></Link>
          ))}
        </div>
      )
    }
    return null;
  }

  return (
    <Fragment>
      <Header children={undefined} rightBtn={undefined} />
      <Carousel />
      <ul className={styles.nav}>
        <li>
          <Link href="/post/list/dog">
            <a>
              <div>
                <FaDog />
                <span>강아지 분양</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/post/list/cat">
            <a>
              <div>
                <FaCat />
                <span>고양이 분양</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/reviews">
            <a>
              <div>
                <FaListAlt />
                <span>입양 후기</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/authAgency">
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
        <RecentlyPetList type="dog" />
        <div className={styles.btnBox}>
          <button onClick={() => router.push("/post/list/dog")}>더 많은 강아지 보러가기 &#62;</button>
        </div>
        <h4>최신 고양이 분양글</h4>
        <RecentlyPetList type="cat" />
        <div className={styles.btnBox}>
          <button onClick={() => router.push("/post/list/cat")}>더 많은 고양이 보러가기 &#62;</button>
        </div>
      </div>
      <div className={styles.spacing_box} />
    </Fragment>
  );
};

export default Main;
