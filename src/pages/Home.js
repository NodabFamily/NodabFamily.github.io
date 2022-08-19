import React from "react";
import axios from "axios";
import styled from "styled-components";

import { useState, useEffect, useRef } from "react";

import FamilyProfile from "../components/Home/FamilyProfile";
import Modal from "../components/Modal";
import Api from "../Api";

const HeaderDom = styled.div`
  width: 100%;
  height: 25%;
`;

const CoverImage = styled.img`
  width: 100vw;
  height: 23.125vh;

  object-fit: cover;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 23.125vh;

  position: absolute;
  top: 0px;

  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 4vh;
  color: #ffffff;
  margin: 0.5vh;
`;

const Alarm = styled.img`
  height: 2.5vh;

  position: absolute;
  right: 24px;
  top: 3vh;
`;

const FamilyDom = styled.div`
  width: 100%;
  height: 20%;

  border-bottom: 1px solid #f2f2f2;
`;

const ProfileDom = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 2.5vh - 24px);

  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isOverflowed ? "none" : "center")};
  align-items: center;

  padding: 0 20px 0 20px;

  overflow-x: auto;
  overflow-y: hidden;
`;

const InfoDom = styled.div`
  width: 100%;
  height: 55%;

  background-color: #fdfcfa;
`;

const Mascot = styled.img`
  width: 100%;
  height: 100%;

  object-fit: scale-down;
`;

const Home = () => {
  const [familyData, setFamilyData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [clickedMember, setClickedMember] = useState({});

  const ref = useRef();

  const fetching = () => {
    axios("/dummy/FamilyResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setFamilyData((cur) => (cur = data.data));
      });
  };

  useEffect(() => {
    fetching();
    if (typeof window.innerWidth != "undefined") {
      ref.current = window.innerWidth;
    }
  }, []);

  const isOverflowed = () => {
    if (!familyData.members) return false;

    if (84 * familyData.members.length - 20 > ref.current - 40) return true;
    return false;
  };

  const onClick = (member) => {
    setClickedMember((cur) => cur = member);
    setIsModal((cur) => cur = true);
  }

  return (
    <>
      {isModal ? <Modal state={[isModal, setIsModal]} member={clickedMember} /> : null}

      <HeaderDom>
        <CoverImage src={familyData.cover_image} />
        <Overlay>
          <Alarm src="/img/home/alarm.svg" />
          <Title>{familyData.family_name}</Title>
          <Title
            style={{
              fontFamily: "Spoqa Han Sans Medium",
              fontSize: "2vh",
            }}
          >
            {familyData.bio}
          </Title>
        </Overlay>
      </HeaderDom>

      <FamilyDom>
        <Title
          style={{
            fontSize: "2.5vh",
            color: "#000000",
            margin: "16px 0 0 24px",
          }}
        >
          메세지
        </Title>
        <ProfileDom isOverflowed={isOverflowed()}>
          {familyData.members
            ? familyData.members.map((member, idx) => (
                <FamilyProfile
                  member={member}
                  idx={idx}
                  key={member.id}
                  isLast={familyData.members.length === idx + 1}
                  onClick={onClick}
                />
              ))
            : null}
        </ProfileDom>
      </FamilyDom>
      <InfoDom>
        <Api />
        <Mascot src="/img/home/mascot/2.gif" />
      </InfoDom>
    </>
  );
};

export default Home;
