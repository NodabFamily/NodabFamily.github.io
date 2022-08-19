import React from "react";
import styled from "styled-components";

import {
  isGalleryNew,
  getIntervalToStringByCase,
  STRFTimeToDate,
} from "../../common/Function/Time";

const GalleryForm = styled.div`
  width: 100%;
  height: 84px;

  margin-top: ${(props) => (props.idx === 0 ? "0" : "10px")};
  margin-bottom: ${(props) => (props.isLast ? "20px" : "0")};

  border: 1px solid #eeeeee;
  border-radius: 5px;
  background-color: white;

  /*
        box-shadow: none 
        | x-position y-position blur spread color 
        | inset | initial | inherit
    */
  box-shadow: 0 2px 4px 0 rgba(116, 116, 116, 0.25);

  display: flex;
  flex-direction: row;

  // For <TagDom/>
  position: relative;

  cursor: pointer;
`;

const TitleDom = styled.div`
  width: calc(55% - 14px);
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 14px;
`;

const ImageDom = styled.div`
  width: 45%;
  height: 100%;

  position: relative;
  z-index: 1;
`;

const GalleryTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 16px;

  color: #42413e;
`;

const EditedTime = styled.div`
  font-family: "Spoqa Han Sans Regular";
  font-size: 10px;

  color: #838078;
`;

const TagDom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  // Parent(GalleryForm has "position:relative")
  position: absolute;
  left: 14px;
  bottom: 4px;
`;

const Tag = styled.div`
  font-family: "Spoqa Han Sans Regular";
  font-size: 8px;
  background-color: #e7f4e8;
  color: #6e9972;

  padding: 0 2px 0 2px;
  height: 12px;
  border-radius: 25px;

  margin-left: ${(props) => (props.idx === 0 ? "0" : "4px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  --widthA: calc(100vw - 48px);
  --widthB: calc(var(--widthA) * 45 / 100);
  width: calc(var(--widthB));
  height: 84px;
  border-radius: 0 5px 5px 0;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: -1;
`;

const BackgroundImg = styled.img`
  position: absolute;

  object-fit: cover;
  // Issue : fail to maintain ratio of picture
  // -> Find keyword 'object-fit' in CSS
  --widthA: calc(100vw - 48px);
  --widthB: calc(var(--widthA) * 45 / 100);
  width: calc(var(--widthB));
  height: 84px;

  background-image: ${(props) => props.src};

  -moz-border-radius: 0 5px 5px 0;
  -khtml-border-radius: 0 5px 5px 0;
  -webkit-border-radius: 0 5px 5px 0;
  border-radius: 0 5px 5px 0;

  filter: blur(1px);
  -webkit-filter: blur(1px);

  z-index: -2;
`;

const ReactionDom = styled.div`
  width: 100%;

  position: absolute;
  bottom: 4px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const LikeCount = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 12px;
  text-align: right;
  color: #ffffff;

  width: 22px;
  margin-right: 8px;
`;

const CommentCount = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 12px;
  text-align: right;
  color: #ffffff;

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

  background-color: #ffffff;

  margin-right: 8px;
`;

const FeatureDom = styled.div`
  position: absolute;
  // (-3) + (-3) px 
  right: -6px;

  display: flex;
  flex-direction: row-reverse;
`;

const StarImg = styled.img`
  width: 15px;
  height: 15px;

  margin: 6px 8px 0 0;
`;

const NewImg = styled.img`
  margin-top: 4px;
`;

const Gallery = (props) => {
  const galleryData = props.data;
  const updatedTime = getIntervalToStringByCase(
    STRFTimeToDate(galleryData.updated_at)
  );
  const isNew = isGalleryNew(STRFTimeToDate(galleryData.create_at));

  return (
    <>
      <GalleryForm idx={props.idx} isLast={props.isLast} onClick={props.onClick}>
        <TitleDom>
          <GalleryTitle>{galleryData.title}</GalleryTitle>
          <EditedTime>{updatedTime}</EditedTime>
        </TitleDom>
        <TagDom>
          {galleryData.tags.map((tag, idx) => (
            <Tag idx={idx}>#{tag}</Tag>
          ))}
        </TagDom>
        <ImageDom>
          <Overlay />
          <BackgroundImg src={galleryData.album_image} />

          <FeatureDom>
            {isNew ? <NewImg src="/img/archive/new.svg" /> : null}
            {galleryData.is_stared ? (
              <StarImg src="/img/archive/star.svg" />
            ) : null}
          </FeatureDom>
          <ReactionDom>
            <LikeImg src="/img/archive/like.svg" />
            <LikeCount>{galleryData.like_num}</LikeCount>
            <Divider />
            <CommentImg src="/img/archive/comment.svg" />
            <CommentCount>{galleryData.comment_num}</CommentCount>
          </ReactionDom>
        </ImageDom>
      </GalleryForm>
    </>
  );
};

export default Gallery;
