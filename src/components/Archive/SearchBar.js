import React from "react";
import { useState } from "react";
import styled from "styled-components";

const MobileDom = styled.div`
  width: calc(100% - 48px);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterDom = styled.div`
  width: 22.5%;
  height: 95%;
  // 100% 설정 시, border-bottom 잘림으로 인한 설정.

  border: 1px solid #ebebeb;
  border-radius: 4px 0 0 4px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const InputDom = styled.div`
  width: 77.4%;
  height: 95%;
  // 100% 설정 시, border-bottom 잘림으로 인한 설정.

  border: 1px solid #ebebeb;
  border-radius: 0 4px 4px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FilterTitle = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 1.5vh;

  width: 100%;

  display: flex;
  justify-content: center;
`;

const FilterImg = styled.img`
  width: 1.25vh;
  height: 0.5vh;

  margin-right: 1.66vw;
`;

const InputImg = styled.img`
  width: 2vh;
  height: 2vh;

  margin-left: 2.77vw;
  margin-right: 2.22vw;
`;

const Input = styled.input`
  font-family: "Spoqa Han Sans Medium";
  font-size: 1.5vh;

  &::placeholder {
    color: #dedede;
  }

  border: 0px;

  width: calc(100% - 2vh);
  height: 95%;
`;

const SearchBar = (props) => {
  return (
    <>
      <MobileDom>
        <FilterDom>
          <FilterImg src="/img/archive/expand.svg"></FilterImg>
          <FilterTitle>최신 순</FilterTitle>
        </FilterDom>
        <InputDom>
          <InputImg src="/img/archive/search.svg"></InputImg>
          <Input
            type="text"
            placeholder="제목 또는 해시태그로 검색하세요"
            onChange={(e) => props.input[1](e.target.value)}
          />
        </InputDom>
      </MobileDom>
    </>
  );
};

export default SearchBar;
