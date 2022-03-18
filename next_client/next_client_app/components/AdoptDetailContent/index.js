import React from "react";
import { ImLocation } from "react-icons/im";
import { BsPhone } from "react-icons/bs";

import style from "./AdoptDetailContent.module.scss";

function AdoptDetailContent({ category, petitem }) {
  const title = petitem.title;
  const content = petitem.content;
  const petinfo = petitem.pet;
  const writer = petitem.writter;

  return (
    <div>
      {category === "intro" && (
        <div className={style.intro}>
          <div className={style.title}>{title}</div>
          <div className={style.petabsinfo}>
            <div className={style.petabsinfo2}>
              {petinfo.breed} / {petinfo.age} /{" "}
              {petinfo.isGenderMale === true ? "남아" : "여아"}
            </div>
            <div className={style.petprice}>{petinfo.price} 원</div>
          </div>
          <div className={style.content}>{content}</div>
        </div>
      )}
      {category === "profile" && (
        <div className={style.profile}>
          <table className={style.basicinfo}>
            <tbody>
              <tr>
                <td className={style.title}>기본정보</td>
              </tr>
              <tr>
                <td>이름</td>
                <td>{petinfo.name}</td>
              </tr>
              <tr>
                <td>나이</td>
                <td>{petinfo.age}</td>
              </tr>
              <tr>
                <td>성별</td>
                {petinfo.isGenderMale === true ? "남아" : "여아"}
              </tr>
              <tr>
                <td>몸무게</td>
                <td>{petinfo.weight} kg</td>
              </tr>
              <tr>
                <td>예방접종</td>
                <td>{petinfo.vaccinated === true ? "접종완료" : "미접종"}</td>
              </tr>
              <tr>
                <td>중성화</td>
                <td>{petinfo.neutered === true ? "완료" : "미완료"}</td>
              </tr>
              <tr>
                <td>특징</td>
                <td>{petinfo.characteristic}</td>
              </tr>
              <tr>
                <td>기타정보</td>
                <td>{petinfo.othersInfo}</td>
              </tr>
            </tbody>
          </table>
          <table className={style.saleHistory}>
            <tbody>
              <tr>
                <td className={style.title}>거래기록</td>
              </tr>
              <tr>
                <td>구입처</td>
                <td>모름</td>
              </tr>
              <tr>
                <td>구입일</td>
                <td>모름</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {category === "shelter" && (
        <div className={style.shelter}>
          <div>
            <div className={style.title}>
              {writer.companyName} {">"}
            </div>
            <div className={style.info}>
              <div className={style.phoneNumber}>
                <BsPhone className={style.icon}></BsPhone>
                {writer.phoneNumber.substring(0, 3)} -{" "}
                {writer.phoneNumber.substring(3, 7)} -{" "}
                {writer.phoneNumber.substring(7, 11)}
              </div>
              <div className={style.address}>
                <ImLocation className={style.icon}></ImLocation>
                {writer.address}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdoptDetailContent;
