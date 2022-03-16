import React, { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_POST_ADOPTREVIEW } from "../../../quries/adoptionPostReviewsQuery";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { IMG_HOST_URI, IMG_UPLOAD_URI } from "../../../constants/config";

function Register(props) {
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.PRESET_NAME);
    Axios.post(IMG_UPLOAD_URI, formData).then((response) => {
      console.log(response);
      const requestData = response.data;
      //      const fileName = requestData.secure_url; // TEST: https://res.cloudinary.com/duzqh6xr0/image/upload/v1643722889/vazvgydltxgzmxgrejud.png
      setFileName(requestData.secure_url);
    });
  };
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const { title, content } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [postQuery] = useMutation(CREATE_POST_ADOPTREVIEW);
  const writePostFunc = async (e) => {
    e.preventDefault();
    const response = await postQuery({
      variables: {
        input: {
          title: inputs.title,
          content: inputs.content,
          uris: [filename],
        },
      },
    });

    alert("제출이 완료되었습니다.");
  };
  return (
    <div>
      <Header
        children="입양후기 글쓰기"
        rightBtn={{ func: () => writePostFunc, text: "완료" }}
        leftBtn={{ func: () => void 0, text: "/reviews" }}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <input
            name="title"
            onChange={onChange}
            value={title}
            placeholder="제목을 적어주세요"
          ></input>
        </div>
        <div className={styles.review}>
          <input
            name="content"
            onChange={onChange}
            value={content}
            placeholder="분양 후기를 들려주세요"
          ></input>
        </div>

        <div className={styles.pictureList}>
          <div>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            ></input>
            <div className={styles.pictureWrapper}>
              <Image
                className={styles.pictureitem}
                cloudName={process.env.CLOUD_NAME}
                src={filename}
              ></Image>
            </div>
            <div className={styles.pictureWrapper}></div>
            <div className={styles.pictureWrapper}></div>
            <button onClick={uploadImage}> 사진 업로드 </button>
          </div>
        </div>
        <button onClick={writePostFunc}> 완료</button>
      </div>
    </div>
  );
}

export default Register;
