import React from "react";
import styled from "styled-components";

const NoneDom = styled.div`
  width: 100%;
`;

const NoneImg = styled.img`
  width: 3.75vh;
  height: 3.75vh;
`;

const NoneSpan = styled.span`
  font-family: "Spoqa Han Sans Medium";
  font-size: 1.5vh;
  color: #7b7b7b;

  margin-left: 12px;
  margin-top: 1.4vh;
`;

const NoneDiv = styled.div`
  font-family: "Spoqa Han Sans Medium";
  font-size: 3vh;
  margin-top: 18px;
`;

const ShowNone = (props) => {
    
  return (
    <>
      <NoneDom style={props.style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <NoneImg src={props.img} alt="symbol" />
            <NoneSpan>{props.span}</NoneSpan>
          </div>
          <NoneDiv>{props.div}</NoneDiv>
      </NoneDom>
    </>
  );
};

export default ShowNone;
