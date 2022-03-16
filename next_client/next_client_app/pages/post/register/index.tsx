import React, { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Image } from "cloudinary-react";

import Header from "../../../components/Header";
import { CREATE_POST_MUTATION } from "../../../quries/adoptionPostQuery";
import { IMG_UPLOAD_URI } from "../../../constants/config";

import styles from './Register.module.scss';

const Register: React.FC<{}> = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    name: "",
    breed: "",
    type: "dog",
    price: "",
    age: "",
    weight: "",
    isGenderMale: "1",
    vaccinated: "1",
    neutered: "1",
    characteristic: "",
    othersInfo: "",
  });
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

  const [uploadedImgs, setUploadedImgs] = useState([]);

  const onClickChoose = (element) => {
    const { name } = element.target;
    const checkboxes = document.getElementsByName(name);
    checkboxes.forEach((cb: HTMLInputElement) => {
      cb.checked = false;
    });
    element.target.checked = true;
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [postQuery] = useMutation(CREATE_POST_MUTATION);
  const writePostFunc = async (e) => {
    e?.preventDefault();
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
          isGenderMale: inputs.isGenderMale === "1",
          vaccinated: inputs.vaccinated === "1",
          neutered: inputs.neutered === "1",
          characteristic: inputs.characteristic,
          othersInfo: inputs.othersInfo,
          uri: uploadedImgs,
        },
      },
    });
    if (response.errors) {
      return alert(response.errors[0].message);  
    }
    alert("제출이 완료되었습니다.");
    router.replace('/');
  };

  const uploadImage = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.CLOUD_NAME);
    Axios.post(IMG_UPLOAD_URI, formData).then(
      (response) => {
        if (response.status === 200) {
          alert("사진이 성공적으로 업로드 되었습니다.");
          setUploadedImgs([...uploadedImgs, response.data.secure_url]);
        } else {
          alert(response.statusText)
        }
      }
    ).catch(e => console.error(e));

    e.target.value = null;
  };

  const CheckBox = (props: {
    name: string;
    label: string;
    value: string | number;
    checked: boolean;
    onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className={styles.input_check_wrap}>
      <label>
        <input
          type="checkbox"
          name={props.name}
          value={props.value}
          onClick={props.onClick}
          onChange={props.onChange}
          checked={props.checked}
        />
        {props.label}
      </label>
    </div>
  )

  return (
    <div>
      <Header
        children="입양글 작성하기"
        rightBtn={{ func: writePostFunc, text: '완료' }}
      />
      <div className={styles.form_style}>
        <div className={styles.title}>
          <input
            name="title"
            onChange={onChange}
            value={title}
            placeholder="제목을 적어주세요"
          ></input>
        </div>
        <div className={styles.table_style}>
          <form>
            <table>
              <tbody>
                <tr>
                  <td className={styles.name}>이름</td>
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
                  <td className={styles.name}>나이</td>
                  <td>
                    <input onChange={onChange} name="age" value={age}></input>
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>타입</td>
                  <td className={styles.dogorcat}>
                    <CheckBox
                      name="type"
                      label="강아지"
                      value="dog"
                      checked={inputs.type === "dog"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                    <CheckBox
                      name="type"
                      label="고양이"
                      value="cat"
                      checked={inputs.type === "cat"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>성별</td>
                  <td className={styles.gender}>
                    <CheckBox
                      name="isGenderMale"
                      label="수컷"
                      value={"1"}
                      checked={inputs.isGenderMale === "1"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                    <CheckBox
                      name="isGenderMale"
                      label="암컷"
                      value={"0"}
                      checked={inputs.isGenderMale === "0"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>가격</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="price"
                      value={price}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>몸무게</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="weight"
                      value={weight}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>품종</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="breed"
                      value={breed}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>예방접종</td>
                  <td className={styles.vaccinated}>
                    <CheckBox
                      name="vaccinated"
                      label="접종"
                      value={"1"}
                      checked={inputs.vaccinated === "1"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                    <CheckBox
                      name="vaccinated"
                      label="미접종"
                      value={"0"}
                      checked={inputs.vaccinated === "0"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>중성화</td>
                  <td className={styles.neutered}>
                    <CheckBox
                      name="neutered"
                      label="접종"
                      value={"1"}
                      checked={inputs.neutered === "1"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                    <CheckBox
                      name="neutered"
                      label="미접종"
                      value={"0"}
                      checked={inputs.neutered === "0"}
                      onClick={onClickChoose}
                      onChange={onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>특징</td>
                  <td>
                    <input
                      onChange={onChange}
                      name="characteristic"
                      value={characteristic}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className={styles.name}>기타정보</td>
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
            <div className={styles.content}>
              <div className={styles.name}>소개글</div>
              <input
                onChange={onChange}
                name="content"
                value={content}
                placeholder="동물에 대한 소개를 해주세요"
              ></input>
            </div>
            <div className={styles.picture}>
              <div className={styles.name}>사진</div>
              <label
                className={styles.input_file_button}
                htmlFor="input-file"
              >여기를 클릭하여 파일을 업로드하세요.</label>
              <input
                type="file"
                id="input-file"
                accept="image/png, image/jpeg"
                onChange={uploadImage}
                style={{ display: "none" }}
              />
              <div className={styles.pictureWrapper}>
                <div className={styles.picture_wrapper_inner}>
                  {uploadedImgs?.map((url: string) => (
                    <div className={styles.pictureChoice}>
                      <Image
                        className={styles.pictureitem}
                        cloudName={process.env.CLOUD_NAME}
                        src={url}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className={styles.submit_btn} onClick={writePostFunc}>제출하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
