import React from "react";
import Header from "../../components/Header/index";
import ReviewList from "../../components/ReviewList";
import { RiPencilLine } from "react-icons/ri";
import styles from "./Reviews.module.scss";
import Link from "next/link";

import { useRouter, withRouter } from "next/router";
function adoptReview() {
  const router = useRouter();
  return (
    <div>
      <Header
        children={"입양후기"}
        rightBtn={undefined}
        leftBtn={{ func: () => void 0, text: "/main" }}
      />
      <ReviewList></ReviewList>
      <Link href="/reviews/register">
        <button className={styles.writeReview}>
          <RiPencilLine></RiPencilLine>
        </button>
      </Link>
    </div>
  );
}

export default adoptReview;
