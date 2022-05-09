import React from "react";
import styled from "styled-components";
const ReviewList = styled.div`
  margin: 1rem auto;
  border-bottom: 1px dotted #51aa1b;
  padding: 0 1rem;
  text-align: left;
`;
const NameContainer = styled.div`
  display: flex;
`;
const UserName = styled.p`
  font-weight: bold;
  color: #51aa1b;
`;
const ReviewContent = styled.div`
  font-size: 14px;
`;
const ListReview = ({ review }) => {
  console.log(review.rating);
  return (
    <>
      <ReviewList>
        <NameContainer>
          <UserName>{review.name}</UserName>
          <span
            style={{ fontSize: "12px", lineHeight: "24px", marginLeft: "10px" }}
          >
            đã đánh giá <strong>{review.rating}</strong> sao
          </span>
        </NameContainer>
        <ReviewContent>{review.comment}</ReviewContent>
      </ReviewList>
    </>
  );
};

export default ListReview;
