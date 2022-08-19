import axios from "axios";
import https from "https-browserify";
import React, { useEffect } from "react";
import { useState } from "react";
import AWS from "aws-sdk";

import {
  postAlbum,
  updateAlbum,
  getAlbumDetail,
  getAlbum,
  deleteAlbum,
  postLike,
  deleteLike,
  postComment,
  updateComment,
  deleteComment,
} from "./api/Archive/index";

import {
  updateFamilyInfo,
  postFamily,
  getFamily,
  deleteFamily,
  putFamily,
} from "./api/Family/index";

const Api = () => {
  const [response, setResponse] = useState({});

  const [ownerData, setOwnerData] = useState("너영나영노영누영2");
  const region = "ap-northeast-2";
  const bucket = "osds-bucket";
  const endpoint = "image/";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket, // 버킷 이름
        Key: endpoint + ownerData + ".png", // 유저 아이디
        Body: file, // 파일 객체
      },
    });
    console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID);
    console.log(process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);

    const promise = upload.promise();
    promise.then(
      function (e) {
        alert("성공");
        console.log(e);
      },
      function (err) {
        alert("실패");
        console.log(err);
      }
    );
  };

  const fetching = () => {
    axios
      .get("http://www.osds.kro.kr:8000/api/v1/families/1/validate")
      .then((res) => {
        console.log(res);
      });
  };

  const login = () => {
    axios
      .post(
        "//www.osds.kro.kr:8000/api/v1/users/login",
        {
          username: "osds",
          password: "osds10!",
        },
        {
          headers: {
            "User-Agent": "test",
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <button onClick={fetching}>get families</button>
      <button onClick={login}>login</button>
      <input type="file" onChange={handleFileInput} />

      <h1> Album 관련 API </h1>
      <button onClick={() => getAlbumDetail(1, 1)}>1. 앨범 상세 조회</button>
      <button onClick={() => getAlbum(1)}>2. 앨범 조회</button>
      <button onClick={() => deleteAlbum()}>3. 앨범 삭제</button>
      <button onClick={() => updateAlbum()}>4. 앨범 전체 내용 수정</button>
      <button onClick={() => postAlbum()}>5. 앨범 생성</button>

      <br />

      <h1> Family 관련 API </h1>
      <button onClick={() => postFamily()}>1. 가족생성</button>
      <button onClick={() => updateFamilyInfo()}>
        2. 가족 비밀번호 검증 및 유저 정보 업데이트
      </button>
      <button onClick={() => getFamily(1)}>3. 가족 조회</button>
      <button onClick={() => deleteFamily()}>4. 가족 삭제</button>
      <button onClick={() => putFamily()}>5. 가족 수정</button>

      <br />

      <h1> Like 관련 API </h1>
      <button onClick={() => postLike()}>1. 가족생성</button>
      <button onClick={() => deleteLike()}>
        2. 가족 비밀번호 검증 및 유저 정보 업데이트
      </button>

      <br />

      <h1> Comment 관련 API </h1>
      <button onClick={() => postComment()}>1. 댓글 작성</button>
      <button onClick={() => updateComment()}>2. 댓글 수정</button>
      <button onClick={() => deleteComment()}>3. 댓글 삭제</button>
    </>
  );
};

export default Api;
