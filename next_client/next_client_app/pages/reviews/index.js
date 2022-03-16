import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header/index";
import ReviewList from "../../components/ReviewList";
import styles from "./Reviews.module.scss";

function adoptReview() {
  return (
    <div>
      <Header
        children={"입양후기"}
        rightBtn={undefined}
        leftBtn={{ func: () => void 0, text: "/main" }}
      />
      <ReviewList />
      <Link href="/reviews/register">
        <button className={styles.writeReview}>
          <RiPencilLine />
        </button>
      </Link>
    </div>
  );
}

export default adoptReview;
