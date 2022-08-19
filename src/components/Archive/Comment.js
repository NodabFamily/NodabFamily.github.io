import React from "react";
import styled from "styled-components";

import { dateToString, STRFTimeToDate } from "../../common/Function/Time";

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid #e6e6e6;
  border-radius: 100%;
`;

const CommentDom = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 12px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentContentDom = styled.div`
  background-color: #ecedf1;
  border-radius: 5px;

  padding-left: 8px;
  padding-right: 8px;
  margin-left: 10px;
  margin-right: 10px;
`;

const CommentDate = styled.div`
  font-family: "Spoqa Han Sans Regular";
  font-size: 8px;
  color: #000000;
  white-space: nowrap;

  margin-top: auto;
  margin-right: 10px;
`;

const AComment = styled.div`
  font-family: "Spoqa Han Sans Bold";
  font-size: 10px;
  white-space: pre-wrap;

  margin: 6px 0 6px 0;
`;

const Comment = (props) => {
  const commentData = props.data.comment;

  const onClick = (member) => {
    props.state.clicked[1]((cur) => (cur = member));
    props.state.modal[1]((cur) => (cur = true));
  };

  const getUserInfoById = (userId) => {
    if (!props.state.family[0].length) {
      const temp = {
        id: 0,
        name: "",
        nickname: "",
        bio: "",
        profile: "",
      };
      return temp;
    }
    return props.state.family[0].find((user) => user.id === userId);
  };

  return (
    <>
      <CommentDom>
        <UserImg
          onClick={() => {
            onClick(getUserInfoById(commentData.user_id));
          }}
          src={getUserInfoById(commentData.user_id).profile}
        />
        <CommentContentDom>
          <AComment
            style={{
              fontFamily: "Spoqa Han Sans Regular",
            }}
          >
            {getUserInfoById(commentData.user_id).nickname}
          </AComment>
          <AComment>{commentData.comment}</AComment>
        </CommentContentDom>
        <CommentDate>
          {dateToString(STRFTimeToDate(commentData.updated_at))}
        </CommentDate>
      </CommentDom>
    </>
  );
};

export default Comment;
