import Axios from 'axios';
import React, { useState } from 'react';
import { Image } from "cloudinary-react";
import Header from '../../components/Header';
import { IMG_HOST_URI, IMG_UPLOAD_URI } from "../../constants/config";

function TEST() {
  const [file, setFile] = useState(null)

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.CLOUD_NAME);
    Axios.post(IMG_UPLOAD_URI, formData).then((response) => {
      const requestData = response.data;
      const fileName = requestData.public_id; // TEST: "vazvgydltxgzmxgrejud"
    });
  };

  return (
    <div>
      <Header children={"테스트 페이지"} />
      <form encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      </form>
      <button onClick={uploadImage}>업로드</button>
      <Image
        style={{ width: '200px', height: '200px' }}
        cloudName={process.env.CLOUD_NAME}
        src={`${IMG_HOST_URI}/ehwg1zei5rf3sj4mftmz.jpg`}
      ></Image>
    </div>
  )  
}

export default TEST;