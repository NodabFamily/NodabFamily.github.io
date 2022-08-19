import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Gallery from "./Gallery";
import ShowNone from "../ShowNone";

import "../../fonts/fonts.css";

const MobileDom = styled.div`
  width: calc(100% - 48px);
  height: calc(100% - 20px);
`;

const GalleryList = (props) => {
  const [galleries, setGalleries] = useState([]);
  const [searchedGalleries, setSearchedGalleries] = useState([]);

  const navigate = useNavigate();

  const fetching = () => {
    axios("/dummy/GalleryResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setGalleries((cur) => (cur = data.data));
      });
  };

  const isSearchTagInList = (gallery, searchWord) => {
    let searched = [];

    for (let i = 0; i < gallery.tags.length; i++) {
      if (gallery.tags[i].includes(searchWord)) {
        searched.push(gallery.tags[i]);
      }
    }

    if (searched.length) return true;

    return false;
  };

  const navigateToAlbum = (album_id) => {
    navigate("/archive/" + album_id);
    console.log("/archive/" + album_id);
  };

  useEffect(() => {
    fetching();
    setSearchedGalleries((cur) => (cur = galleries));
    console.log(galleries);
  }, []);

  useEffect(() => {
    if (props.input[0] !== "") {
      setSearchedGalleries(
        (cur) =>
          (cur = galleries
            .filter((gallery) => gallery.title.includes(props.input[0]))
            .concat(
              galleries.filter((gallery) =>
                isSearchTagInList(gallery, props.input[0])
              )
            ))
      );
    } else {
      setSearchedGalleries((e) => (e = galleries));
    }
  }, [props.input[0], galleries]);

  return (
    <>
      <MobileDom>
        {searchedGalleries.length ? (
          searchedGalleries.map((gallery, idx) => (
            <Gallery
              key={gallery.album_id}
              isLast={searchedGalleries.length === idx + 1}
              idx={idx}
              data={gallery}
              onClick={() => navigateToAlbum(gallery.album_id)}
            />
          ))
        ) : (
          <ShowNone
            img="/img/archive/fireworks.png"
            span="기억에 남는 사진이 있으신가요?"
            div="우리 가족의 추억을 쌓아보세요"
          />
        )}

        {/* Dummy Tag for margin-bottom of Last element */}
        <div style={{ width: "1px", height: "1px" }}></div>
      </MobileDom>
    </>
  );
};

export default GalleryList;
