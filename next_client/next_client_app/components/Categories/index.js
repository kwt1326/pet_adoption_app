import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Categories.module.scss";

const categories = [
  {
    name: "all",
    text: "전체",
    link: "all",
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

function Categories({ category }) {
  const router = useRouter();
  const _category = category || 'all';
  let pathname = router.pathname;
  pathname = pathname.replace('[type]', router.query.type)

  return (
    <div className={styles.CategoryBlock}>
      {categories.map((c, index) => (
        <Link
          href={`${pathname}?category=${c.link}`}
          key={index}
        >
          <div
            className={`${styles.CategoryItem} ${
              _category === c.name ? `${styles.active}` : ""
            }`}
            key={c.name}
          >
            <a>{c.text}</a>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
