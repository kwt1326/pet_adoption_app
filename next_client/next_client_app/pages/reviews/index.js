import React from "react";
import Link from "next/link";
import { RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header/index";
import ReviewList from "../../components/ReviewList";
import styles from "./Reviews.module.scss";

function adoptReview() {
  return (
    <div className={styles.container}>
      <Header
        children={"입양후기"}
        rightBtn={undefined}
      />
      <ReviewList />
      <div className={styles.register_btn}>
        <Link href="/reviews/register">
          <div className={styles.writeReview}>
            <RiPencilLine />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default adoptReview;
