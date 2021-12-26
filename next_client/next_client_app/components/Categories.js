import React from "react";
import s from "./Categories.module.scss";
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
    <div className={s.CategoryBlock}>
      {categories.map((c) => (
        <Link href={`/puppyadopt/${c.link}`}>
          <div
            className={`${s.CategoryItem} ${
              category === c.name ? `${s.active}` : ""
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
