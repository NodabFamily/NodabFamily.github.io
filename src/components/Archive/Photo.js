import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const PhotoDom = styled.div`
  width: calc(100% - 48px);

  cursor: pointer;
`;

const ReactionDom = styled.div`
  width: 100%;
  height: 18px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  margin-top: 5px;
  margin-bottom: ${(props) => (props.isLast ? "calc(8.125vh + 20px)" : "20px")};
`;

const PhotoImg = styled.img`
  width: 100%;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
`;

const LikeCount = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 12px;
  text-align: right;
  color: #000000;

  width: 22px;
  margin-right: 8px;
`;

const CommentCount = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 12px;
  text-align: right;
  color: #000000;

  width: 22px;
  margin-right: 8px;
`;

const LikeImg = styled.img`
  width: 10px;

  margin-right: 8px;
`;

const CommentImg = styled.img`
  width: 10px;

  margin-right: 8px;
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;

  background-color: #000000;

  margin-right: 8px;
`;

const Photo = (props) => {
    const navigate = useNavigate();

  const photoData = props.photo;

  const navigateToPhoto = () => {
    navigate("/archive/" + photoData.album_id + "/" + photoData.id);
  };

  return (
    <>
      <PhotoDom onClick={navigateToPhoto}>
        <PhotoImg src={photoData.photo_image} />

        <ReactionDom isLast={props.isLast}>
          <LikeImg src="/img/archive/like_black.svg" />
          <LikeCount>{photoData.like_count}</LikeCount>
          <Divider />
          <CommentImg src="/img/archive/comment_black.svg" />
          <CommentCount>{photoData.comment_count}</CommentCount>
        </ReactionDom>
      </PhotoDom>
    </>
  );
};

export default Photo;
