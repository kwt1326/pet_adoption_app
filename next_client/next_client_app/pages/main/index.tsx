import React , { Fragment, useEffect } from "react";
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

  const { data, refetch } = useQuery(GET_RECENTLY_ADOPTION_POST_LIST, {
    fetchPolicy: 'cache-and-network'
  });
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
    refetch();
  }

  useEffect(() => {
    refetch();
  }, [])

  const RecentlyPetList = (props: { type: string }) => {
    if (data) {
      const { getRecentlyPosts } = data;
      return (
        <div className={styles.list_container}>
          {getRecentlyPosts && getRecentlyPosts[props.type].map((petitem, i) => (
            <Link
              href={`/post/detail/${petitem.id}`}
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
                <span>????????? ??????</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/post/list/cat">
            <a>
              <div>
                <FaCat />
                <span>????????? ??????</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/reviews">
            <a>
              <div>
                <FaListAlt />
                <span>?????? ??????</span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/authAgencies">
            <a>
              <div>
                <FaBuilding />
                <span>?????? ??????</span>
              </div>
            </a>
          </Link>
        </li>
      </ul>
      <div className={styles.contentBox}>
        <h4>?????? ????????? ?????????</h4>
        <RecentlyPetList type="dog" />
        <div className={styles.btnBox}>
          <button onClick={() => router.push("/post/list/dog")}>??? ?????? ????????? ???????????? &#62;</button>
        </div>
        <h4>?????? ????????? ?????????</h4>
        <RecentlyPetList type="cat" />
        <div className={styles.btnBox}>
          <button onClick={() => router.push("/post/list/cat")}>??? ?????? ????????? ???????????? &#62;</button>
        </div>
      </div>
      <div className={styles.spacing_box} />
    </Fragment>
  );
};

export default Main;
