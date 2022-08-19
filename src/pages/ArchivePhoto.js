import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { dateToString, STRFTimeToDate } from "../common/Function/Time";

import Comment from "../components/Archive/Comment";
import ShowNone from "../components/ShowNone";
import Modal from "../components/Modal";

const AlbumDom = styled.div`
  width: 100%;
  height: 9.3%;

  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.img`
  margin-left: 24px;
`;

const ContentsDom = styled.div`
  width: 100%;
  height: 82.1%;

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20%;
    background: rgba(110, 153, 114);

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(110, 153, 114, 0.5);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  margin-right: auto;
  padding-right: 36px;
`;

const AlbumTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 16px;
  color: #000000;

  margin-bottom: 1px;
`;

const PhotoDom = styled.div`
  width: calc(100% - 20px);

  display: flex;
  flex-direction: column;
`;

const AuthorDom = styled.div`
  width: 100%;
  // PhotoDom의 height가 명시되지 않아 vh 사용
  height: 6.25vh;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ReactionDom = styled.div`
  width: 100%;

  padding: 8px 0 8px 0;
`;

const CommentViewDom = styled.div`
  width: 100%;

  border-top: 1px solid #ebebeb;

  display: flex;
  flex-direction: column;
`;

const CommentAddDom = styled.div`
  width: 100%;
  height: 8.6%;

  border-top: 1px solid #ebebeb;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserImg = styled.img`
  height: 4.5vh;
  width: 4.5vh;

  border: 1px solid #e6e6e6;
  border-radius: 100%;

  margin-left: 10px;
`;

const PhotoInfo = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 1.75vh;
  color: #000000;
`;

const Divider = styled.div`
  width: 1px;
  height: 33.3%;

  background-color: #d3d3d3;
  margin-left: 2.77%;
  margin-right: 2.77%;
`;

const Input = styled.input`
  font-family: "Spoqa Han Sans Bold";
  font-size: 2vh;

  &::placeholder {
    color: #dedede;
  }

  border: 0px;

  width: 55.5%;
  height: 33.3%;
`;

const ApplyCommentButton = styled.div`
  width: 16.7%;
  height: 46.5%;

  font-family: "Spoqa Han Sans Bold";
  font-size: 2vh;
  color: #ffffff;

  border-radius: 5px;
  background-color: #6e9972;

  margin-left: auto;
  margin-right: 2.77%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ArchivePhoto = () => {
  const [albumData, setAlbumData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [familyData, setFamilyData] = useState([]);

  const [inputComment, setInputComment] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [clickedMember, setClickedMember] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  const fetching = () => {
    axios("/dummy/GalleryResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setAlbumData((cur) => (cur = data.data[params.album_id]));
      });

    axios("/dummy/PhotoResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setPhotoData((cur) => (cur = data.data[params.photo_id]));
      });

    axios("/dummy/CommentResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setCommentsData((cur) => (cur = data[params.photo_id].data));
      });
    axios("/dummy/FamilyResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setFamilyData((cur) => (cur = data.data.members));
      });
  };

  useEffect(() => {
    fetching();
  }, []);

  const onClick = (member) => {
    setClickedMember((cur) => (cur = member));
    setIsModal((cur) => (cur = true));
    console.log(albumData);
    console.log(photoData);
    console.log(commentsData);
    console.log(familyData);
    console.log(clickedMember);
    console.log(getUserInfoById(photoData.user_id));
  };

  const getUserInfoById = (userId) => {
    if (!familyData.length) {
      const temp = {
        id: 0,
        name: "",
        nickname: "",
        bio: "",
        profile: "",
      };
      return temp;
    }
    return familyData.find((user) => user.id === userId);
  };

  return (
    <>
      {isModal ? (
        <Modal state={[isModal, setIsModal]} member={clickedMember} />
      ) : null}
      <AlbumDom>
        <BackButton
          src="/img/archive/back_black.svg"
          alt="arrow_back"
          onClick={() => navigate("/archive/" + albumData.album_id)}
        />

        <AlbumInfo>
          <AlbumTitle
            style={{
              fontFamily: "Spoqa Han Sans Regular",
              fontSize: "12px",
              color: "#838078",
            }}
          >
            {dateToString(STRFTimeToDate(albumData.create_at))}
          </AlbumTitle>
          <AlbumTitle>{albumData.title}</AlbumTitle>
        </AlbumInfo>
      </AlbumDom>

      <ContentsDom>
        <PhotoDom>
          <AuthorDom>
            <UserImg
              src={getUserInfoById(photoData.user_id).profile}
              style={{
                height: "3.75vh",
                width: "3.75vh",
                margin: "0",
              }}
              onClick={() => {
                onClick(getUserInfoById(photoData.user_id));
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <PhotoInfo>
                {getUserInfoById(photoData.user_id).nickname}
              </PhotoInfo>
              <PhotoInfo
                style={{
                  fontFamily: "Spoqa Han Sans Regular",
                  fontSize: "1.25vh",
                  color: "#838078",
                }}
              >
                {dateToString(STRFTimeToDate(photoData.updated_at))}
              </PhotoInfo>
            </div>
            <img
              style={{ marginLeft: "auto", marginRight: "10px" }}
              src="/img/archive/menu.svg"
              alt="Menu"
            />
          </AuthorDom>
          <img
            src={photoData.photo_image}
            style={{ width: "100%" }}
            alt={`${params.photo_id}번 사진`}
          />

          <ReactionDom>
            <img
              src={
                photoData.my_like
                  ? "/img/archive/like-button_click.svg"
                  : "/img/archive/like-button.svg"
              }
              alt="like"
              style={{
                marginLeft: "10px",
              }}
            />
            <img
              src={
                photoData.is_bookmarked
                  ? "/img/archive/bookmark_click.svg"
                  : "/img/archive/bookmark.svg"
              }
              alt="like"
              style={{
                marginLeft: "10px",
              }}
            />
            <div
              style={{
                fontFamily: "Spoqa Han Sans Medium",
                fontSize: "12px",
                marginLeft: "10px",
                marginTop: "8px",
              }}
            >
              댓글 {commentsData.length}개
            </div>
          </ReactionDom>
        </PhotoDom>

        <CommentViewDom>
          {commentsData.length ? (
            commentsData.map((comment, idx) => (
              <Comment 
                key={comment.id}
                idx={idx}
                data={{
                  comment: comment
                }}
                state={{
                  modal: [isModal, setIsModal],
                  clicked: [clickedMember, setClickedMember],
                  family: [familyData, setFamilyData]
                }}
              />
            ))
          ) : (
            <ShowNone
              img="/img/archive/speechballoon.png"
              span="사진과 떠오르는 추억이 있으신가요?"
              div="가족들과 댓글로 소통해보세요"
              style={{
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
          )}
        </CommentViewDom>
      </ContentsDom>

      <CommentAddDom>
        <UserImg />
        <Divider />
        <Input
          type="text"
          placeholder="댓글을 입력하세요"
          onChange={(e) => setInputComment(e.target.value)}
        />
        <ApplyCommentButton>등록</ApplyCommentButton>
      </CommentAddDom>
    </>
  );
};

export default ArchivePhoto;
