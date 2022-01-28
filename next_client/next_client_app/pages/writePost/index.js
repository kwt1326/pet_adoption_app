import React from "react";
import Header from "../../components/Header";
import style from "./writePost.module.scss";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_POST_MUTATION } from "../../quries/adoptionPostQuery";
import { responsePathAsArray } from "graphql";
import Axios from "axios";
import { Image } from "cloudinary-react";
function WritePost(props) {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    name: "",
    breed: "",
    type: "강아지",
    price: "",
    age: "",
    weight: "",
    isGenderMale: true,
    vaccinated: true,
    neutered: true,
    characteristic: "",
    othersInfo: "",
  });
  const [image, setImage] = useState("");
  const {
    title,
    content,
    name,
    breed,
    type,
    price,
    age,
    weight,
    isGenderMale,
    vaccinated,
    neutered,
    characteristic,
    othersInfo,
  } = inputs;

  const onClickChoose = (element) => {
    const { name, value } = element.target;
    console.log(name, value);
    const checkboxes = document.getElementsByName(name);
    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
    element.target.checked = true;
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [postQuery] = useMutation(CREATE_POST_MUTATION);
  const writePostFunc = async (e) => {
    console.log(inputs);
    e.preventDefault();
    const response = await postQuery({
      variables: {
        input: {
          title: inputs.title,
          content: inputs.content,
          name: inputs.name,
          breed: inputs.breed,
          type: inputs.type,
          price: Number(inputs.price),
          age: Number(inputs.age),
          weight: Number(inputs.weight),
          isGenderMale: inputs.isGenderMale == "1" ? true : false,
          vaccinated: inputs.vaccinated == "1" ? true : false,
          neutered: inputs.neutered == "1" ? true : false,
          characteristic: inputs.characteristic,
          othersInfo: inputs.othersInfo,
        },
      },
    });
    alert("제출이 완료되었습니다.");
    console.log(response);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    //console.log(files[0]);
    const formData = new FormData();
    formData.append("file", image);
    console.log(image);
    formData.append("upload_preset", "usyitpua");
    Axios.post(
      "https://api.cloudinary.com/v1_1/duzqh6xr0/image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <Header children="입양글 작성하기"></Header>
      <div className={style.formstyle}>
        <div className={style.title}>
          <input
            name="title"
            onChange={onChange}
            value={title}
            placeholder="제목을 적어주세요"
          ></input>
        </div>
        <div className={style.tablestyle}>
          <form>
            <table>
              <tbody>
                <tr>
                  <td className={style.name}>이름</td>
                  <td>
                    <input
                      name="name"
                      onChange={onChange}
                      type="text"
                      value={name}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>나이</td>
                  <td>
                    <input onChange={onChange} name="age" value={age}></input>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>타입</td>

                  <td className={style.dogorcat}>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="type"
                          value="강아지"
                          onClick={(e) => onClickChoose(e)}
                          onChange={onChange}
                        ></input>
                        강아지
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="type"
                          value="고양이"
                          onChange={onChange}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        고양이
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>성별</td>
                  <td className={style.gender}>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="isGenderMale"
                          value={1}
                          onChange={onChange}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        수컷
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="isGenderMale"
                          value={0}
                          onChange={onChange}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        암컷
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>가격</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="price"
                      value={price}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>몸무게</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="weight"
                      value={weight}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>품종</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="breed"
                      value={breed}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>예방접종</td>
                  <td className={style.vaccinated}>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="vaccinated"
                          onChange={onChange}
                          value={1}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        접종
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="vaccinated"
                          onChange={onChange}
                          value={0}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        미접종
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>중성화</td>
                  <td className={style.neutered}>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="neutered"
                          value={1}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        접종
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="neutered"
                          onChange={onChange}
                          value={0}
                          onClick={(e) => onClickChoose(e)}
                        ></input>
                        미접종
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>특징</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="characteristic"
                      onChange={onChange}
                      value={characteristic}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={style.name}>기타정보</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="othersInfo"
                      value={othersInfo}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={style.content}>
              <div className={style.name}>소개글</div>
              <input
                onChange={onChange}
                name="content"
                value={content}
                placeholder="동물에 대한 소개를 해주세요"
              ></input>
            </div>
            <div className={style.picture}>
              <div className={style.name}>사진</div>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              ></input>
              <button onClick={uploadImage}> 사진 업로드 </button>
              <div className={style.pictureWrapper}>
                <div className={style.pictureChoice}>
                  <Image
                    className={style.pictureitem}
                    cloudName="usyitpua"
                    src="https://res.cloudinary.com/duzqh6xr0/image/upload/v1642759988/ehwg1zei5rf3sj4mftmz.jpg"
                  ></Image>
                </div>
              </div>
            </div>
            <button onClick={writePostFunc}> 제출하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WritePost;
/*
 */
