import React from "react";
import styles from "./AdoptDetailCategories.module.scss";
import { BsPhone } from "react-icons/bs";

const categories = [
  {
    name: "intro",
    text: "소개글",
  },
  {
    name: "profile",
    text: "프로필",
  },
  {
    name: "shelter",
    text: "업체정보",
  },
];

function AdoptDetailCategories({ category, onSelect }) {
  return (
    <div className={styles.CategoryBlock}>
      {categories.map((c, index) => (
        <div
          className={`${styles.CategoryItem} ${
            category === c.name ? `${styles.active}` : ""
          }`}
          key={c.name}
          onClick={() => onSelect(c.name)}
        >
          <a>{c.text}</a>
        </div>
      ))}
    </div>
  );
}

export default AdoptDetailCategories;
