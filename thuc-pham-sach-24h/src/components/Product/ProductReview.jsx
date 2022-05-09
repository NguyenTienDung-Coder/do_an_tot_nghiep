import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
const ButtonStyled = styled(Button)`
  background: #51aa1b;
  &:hover {
    border: 1px solid #51aa1b;
    color: #51aa1b;
    background: white;
  }
`;
const WriteReview = styled.div`
  display: ${({ showReview }) => (showReview ? "block" : "none")};
  margin-top: 1rem;
`;

export default function ProductReview() {
  const [rating, setRating] = useState(3);
  const [showReview, setShowReview] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const handleShowReview = () => {
    setShowReview(!showReview);
  };
  const handleEditorChange = (state) => {
    setEditorState(state);
  };



  return (
    <>
      <h2>Đánh giá sản phẩm</h2>
      <ButtonStyled variant="contained" onClick={handleShowReview}>
        Viết bài đánh giá
      </ButtonStyled>
      <WriteReview showReview={showReview}>
        <Rating
          name="rating-value"
          value={rating}
          onChange={(event, newRating) => {
            setRating(newRating);
          }}
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        <Button
          variant="contained"
          onClick={() => {
            console.log(editorState);
          }}
        >
          Gửi đánh giá
        </Button>
      </WriteReview>
    </>
  );
}
