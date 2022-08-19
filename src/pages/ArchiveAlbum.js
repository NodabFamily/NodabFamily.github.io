import React from "react";
import axios from "axios";
import styled from "styled-components";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { dateToString, STRFTimeToDate } from "../common/Function/Time";

import Photo from "../components/Archive/Photo";

const ScrollDom = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

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
`;

// 부모 Flex, 자신 relative => height 못 정하고 자식 요소에 의해 크기 결정.
// 안 좋은 설계,,,,
const HeaderDom = styled.div`
  width: 100vw;

  position: relative;
`;

const BackButton = styled.img`
  position: absolute;
  top: 2.5vh;
  left: 24px;

  z-index: 2;
`;

const RoundBox = styled.div`
  height: 20vh;

  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);

  box-shadow: 0 3px 6px 0 rgba(116, 116, 116, 0.25);
`;

const AlbumImg = styled.img`
  width: 100vw;
  height: 30vh;

  filter: blur(1px);
  -webkit-filter: blur(1px);
`;

const FlexableTitleBox = styled.div`
  width: calc(100vw - 48px);
  // height: ${(props) => props.y};
  height: 15vh;

  position: relative;
  left: 50%;
  top: 0%;
  transform: translate(-50%, 0);

  background-color: #ffffff;
  border-radius: 5px 5px 0 0;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const AlbumTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 24px;

  text-align: center;

  margin-top: 20px;
`;

const AlbumDate = styled.div`
  font-family: "Spoqa Han Sans Regular";
  font-size: 12px;
  color: #838078;

  text-align: center;
`;

const PhotoAddButton = styled.div`
  width: calc(100vw - 48px);
  height: 5vh;

  position: relative;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);

  background-color: #b7ccb9;
  border-radius: 5px 5px 5px 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
`;

const PhotoAddTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 16px;
  color: #547757;
  margin-left: 6px;
`;

const MenuDom = styled.div`
  width: 100%;
  height: 8.75vh;

  background-color: #ffffff;
  position: absolute;

  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 16px;
  color: #000000;

  margin-bottom: 1px;
`;

const InfoDom = styled.div`
  width: 100%;
  height: 10%;

  border: 1px solid #ebebeb;

  margin-top: 5vh;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FilterDom = styled.div`
  width: 22.5%;
  height: 100%;
  // 100% 설정 시, border-bottom 잘림으로 인한 설정.

  border: 1px solid #ebebeb;
  border-radius: 4px 0 0 4px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const FilterTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 1.75vh;

  width: 100%;

  display: flex;
  justify-content: center;
`;

const FilterImg = styled.img`
  width: 1.25vh;
  height: 0.5vh;

  margin-right: 1.66vw;
`;

const ReactionDom = styled.div`
  width: 100%;
  height: 4.345vh;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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

  margin-right: 14px;
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

const ArchiveAlbum = () => {
  const [albumData, setAlbumData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  // make state which contains scrollState

  const ref = useRef();
  const navigate = useNavigate();
  const params = useParams();

  const fetching = () => {
    axios("/dummy/GalleryResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setAlbumData((cur) => (cur = data.data[params.album_id]));
      });

    axios("/dummy/PhotoResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setPhotos((cur) => (cur = data[params.album_id].data));
      });
  };

  useEffect(() => {
    fetching();
    if (typeof window.innerWidth != "undefined") {
      ref.current = window.innerHeight;
    }
  }, []);

  const handleScroll = (e) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // make this calculate scrollState
  const getFlexableHeight = () => {
    let viewHeight = ref.current;

    let defaultHeight = viewHeight * 0.15;

    let defaultScrollY = viewHeight * 0.1125;
    let maxScrollY = viewHeight * 0.2125;

    if (scrollY <= defaultScrollY) {
      console.log("default");
      return defaultHeight.toString() + "px";
    } else if (defaultScrollY < scrollY && scrollY < maxScrollY) {
      console.log("shrink");
      return (
        (
          defaultHeight *
          (((defaultScrollY - scrollY) / scrollY) * 100)
        ).toString() + "px"
      );
    } else if (scrollY >= maxScrollY) {
      console.log("max");
      return "0";
    }
  };

  return (
    <>
      <ScrollDom onScroll={handleScroll}>
        <BackButton
          src={
            scrollY >= ref.current * 0.1
              ? "/img/archive/back_black.svg"
              : "/img/archive/back_white.svg"
          }
          alt="arrow_back"
          onClick={() => navigate("/archive")}
        />

        {scrollY > ref.current * 0.2125 ? (
          <>
            <MenuDom>
              <MenuTitle
                style={{
                  fontFamily: "Spoqa Han Sans Regular",
                  fontSize: "12px",
                  color: "#838078",
                }}
              >
                {dateToString(STRFTimeToDate(albumData.create_at))}
              </MenuTitle>
              <MenuTitle>{albumData.title}</MenuTitle>
            </MenuDom>
            <PhotoAddButton
              style={{
                boxShadow: "0 2px 4px 0 rgba(116, 116, 116, 0.25)",
                bottom: "8.125vh",
                position: "absolute",
              }}
            >
              <img src="/img/archive/photo_add.svg" />
              <PhotoAddTitle>사진 추가하기</PhotoAddTitle>
            </PhotoAddButton>
          </>
        ) : null}

        <HeaderDom>
          <AlbumImg src={albumData.album_image} />

          {/* RoundBox is not flex-box */}
          <RoundBox>
            <FlexableTitleBox y={getFlexableHeight()} yy={scrollY}>
              <AlbumTitle>{albumData.title}</AlbumTitle>
              <AlbumDate>
                {dateToString(STRFTimeToDate(albumData.create_at))}
              </AlbumDate>
            </FlexableTitleBox>
            <PhotoAddButton
              style={{
                borderRadius: "0 0 5px 5px",
                borderTop: "1px solid #e2e2e2",
              }}
            >
              <img src="/img/archive/photo_add.svg" />
              <PhotoAddTitle
                style={{
                  fontFamily: "Spoqa Han Sans Medium",
                }}
              >
                사진 추가하기
              </PhotoAddTitle>
            </PhotoAddButton>
          </RoundBox>
        </HeaderDom>

        <InfoDom>
          <FilterDom>
            <FilterImg src="/img/archive/expand.svg"></FilterImg>
            <FilterTitle>최신 순</FilterTitle>
          </FilterDom>
          <ReactionDom>
            {/* 재사용 코드로 리팩토링 할 것. */}
            <LikeImg src="/img/archive/like_black.svg" />
            <LikeCount>{albumData.like_num}</LikeCount>
            <Divider />
            <CommentImg src="/img/archive/comment_black.svg" />
            <CommentCount>{albumData.comment_num}</CommentCount>
            <Divider />
            <LikeImg src="/img/archive/gallery.svg" />
            <LikeCount>{photos.length}</LikeCount>
          </ReactionDom>
        </InfoDom>

        {photos.map((photo, idx) => (
          <Photo
            key={photo.id}
            idx={idx}
            photo={photo}
            isLast={photos.length === idx + 1}
          />
        ))}
      </ScrollDom>
    </>
  );
};

export default ArchiveAlbum;
