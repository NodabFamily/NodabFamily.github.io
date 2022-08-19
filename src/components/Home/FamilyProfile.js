import React from "react";
import styled from "styled-components";

const MemberDom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: ${(props) => props.isLast ? "0px": "24px"};

  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 100%;

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  object-fit: cover;
`;

const ProfileNickname = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 12px;

  margin-top: 1vh;
`;

const FamilyProfile = (props) => {
  const memberData = props.member;
  return (
    <>
      <MemberDom isLast={props.isLast} onClick={(e) => props.onClick(memberData)}>
        <ProfileImg src={memberData.profile} />
        <ProfileNickname>{memberData.nickname}</ProfileNickname>
      </MemberDom>
    </>
  );
};

export default FamilyProfile;
