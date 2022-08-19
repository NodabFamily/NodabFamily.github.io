import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useState, useEffect } from "react";

const ModalDom = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  position: absolute;

  z-index: 1;
`;

const Window = styled.div`
  width: 83.3vw;
  height: 50vh;

  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleDom = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 2.25vh;

  width: 100%;
  height: 10%;

  border-bottom: 1px solid #f2f2f2;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileDom = styled.div`
  width: 100%;
  height: 20%;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MessageDom = styled.div`
  width: 100%;
  height: 57.5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: space-between;
`;

const ButtonDom = styled.div`
  width: 100%;
  height: 12.5%;

  display: flex;
`;

const Button = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 2vh;
  color: #ffffff;
  background-color: #6e9972;

  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  over-fit: cover;

  margin-left: 14px;
`;

const UserInfo = styled.div`
  width: 66.6%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserDiv = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 2vh;
  color: #42413e;

  margin: 2%;
  margin-left: 14px;
`;

const MessageTitle = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 1.75vh;
  color: #000000;
`;

const Choice = styled.div`
  width: 12.5vh;
  height: 12.5vh;

  background-color: #fdfcfa;

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  font-family: "Spoqa Han Sans Regulat";
  font-size: 2vh;
  color: #686868;
`;

const MessageOption = styled.div`
  width: 100%;
  height: 7.5vh;

  position: relative;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
`;

const EmojiDom = styled.div`
  width: 5vh;
  height: 5vh;

  background-color: ${(props) => props.idx === props.choice ? "#6E9972" : "#ecedf1"};
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Modal = (props) => {
  const memberData = props.member;

  const [choiceIdx, setChoiceIdx] = useState(-1);
  const [messageData, setMessageData] = useState([]);

  const fetching = () => {
    axios("/dummy/MessageResponse.json")
      .then((res) => res.data)
      .then((data) => {
        setMessageData((cur) => (cur = data.data.messages));
      });
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <>
      <ModalDom>
        <Window>
          <TitleDom>
            <img
              style={{
                width: "2.25vh",
                height: "2.25vh",
                marginRight: "4px",
              }}
              src="/img/modal/family_man_woman_girl_boy.png"
              alt="가족 아이콘"
            />
            프로필
          </TitleDom>

          <ProfileDom>
            <UserImg src={memberData.profile} alt={memberData.id} />
            <UserInfo>
              <UserDiv>{memberData.nickname}</UserDiv>
              <UserDiv
                style={{
                  fontFamily: "Spoqa Han Sans Regular",
                  fontSize: "1.5vh",
                }}
              >
                {memberData.bio}
              </UserDiv>
            </UserInfo>
          </ProfileDom>

          <MessageDom>
            <MessageTitle>
              <img
                style={{
                  width: "1.75vh",
                  height: "1.75vh",
                  marginRight: "4px",
                }}
                src="/img/modal/right_anger_bubble.png"
                alt="right_anger_bubble"
              />
              간단 메세지 보내기
            </MessageTitle>
            <Choice>
              {choiceIdx < 0 ? null : 
              <img 
                style={{
                    width: "8vh",
                    height: "8vh"
                }}
                src={messageData[choiceIdx].emoji} 
                alt={choiceIdx}
                />}
              
            </Choice>
            <Message>
              {choiceIdx < 0 ? " " : `\"${messageData[choiceIdx].message}\"`}
            </Message>
            <MessageOption>
              {messageData.length
                ? messageData.map((message, idx) => (
                    <EmojiDom
                      key={message.id}
                      idx={idx}
                      choice={choiceIdx}
                      onClick={() => setChoiceIdx(idx)}
                    >
                      <img
                        style={{
                          width: "3.125vh",
                          height: "3.125vh",
                        }}
                        src={message.emoji}
                        alt={message.id}
                      />
                    </EmojiDom>
                  ))
                : null}
            </MessageOption>
          </MessageDom>

          <ButtonDom>
            <Button
              style={{
                backgroundColor: "#B7CCB9",
                borderRadius: "0 0 0 5px",
              }}
              onClick={() => props.state[1](false)}
            >
              닫기
            </Button>
            <Button
              style={{
                borderRadius: "0 0 5px 0",
              }}
              onClick={() => props.state[1](false)}
            >
              보내기
            </Button>
          </ButtonDom>
        </Window>
      </ModalDom>
    </>
  );
};

export default Modal;
