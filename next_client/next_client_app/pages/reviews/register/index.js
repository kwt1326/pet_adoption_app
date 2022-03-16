import React, { useState } from "react";
import Header from "../../../components/Header";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_POST_ADOPTREVIEW } from "../../../quries/adoptionPostReviewsQuery";
import { Image } from "cloudinary-react";
import Axios from "axios";
import { IMG_HOST_URI, IMG_UPLOAD_URI } from "../../../constants/config";

function Register() {
  const router = useRouter();
  const [uploadedImgs, setUploadedImgs] = useState([]);

  const uploadImage = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.PRESET_NAME);
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
          uris: uploadedImgs,
        },
      },
    });

    alert("제출이 완료되었습니다.");
  };

  return (
    <div>
      <Header
        children="입양후기 글쓰기"
        rightBtn={{ func: writePostFunc, text: "완료" }}
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
          <textarea
            name="content"
            onChange={onChange}
            value={content}
            placeholder="분양 후기를 들려주세요"
          ></textarea>
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
          <div className={styles.picture_wrapper}>
            <div className={styles.picture_wrapper_inner}>
              {uploadedImgs?.map(url => (
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
      </div>
    </div>
  );
}

export default Register;
