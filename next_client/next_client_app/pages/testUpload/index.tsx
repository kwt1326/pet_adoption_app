import Axios from 'axios';
import React, { useState } from 'react';
import { Image } from "cloudinary-react";
import Header from '../../components/Header';
import { IMG_HOST_URI, IMG_UPLOAD_URI } from "../../constants/config";

function TEST() {
  const [file, setFile] = useState(null);
  const [filename, setFileName ] = useState(null);
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
        src={filename}
      ></Image>
    </div>
  )  
}

export default TEST;