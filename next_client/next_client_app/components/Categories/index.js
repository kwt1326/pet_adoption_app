import React from "react";
import styles from "./Categories.module.scss";
import Link from "next/link";

const categories = [
  {
    name: "all",
    text: "전체",
    link: "",
  },
  {
    name: "petshop",
    text: "펫샵",
    link: "petshop",
  },
  {
    name: "shelter",
    text: "보호소",
    link: "shelter",
  },
];

function Categories({ category, onSelect }) {
  return (
    <div className={styles.CategoryBlock}>
      {categories.map((c, index) => (
        <Link href={`/puppyadopt/${c.link}`} key={index}>
          <div
            className={`${styles.CategoryItem} ${
              category === c.name ? `${styles.active}` : ""
            }`}
            key={c.name}
            onClick={() => onSelect(c.name)}
          >
            <a>{c.text}</a>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
