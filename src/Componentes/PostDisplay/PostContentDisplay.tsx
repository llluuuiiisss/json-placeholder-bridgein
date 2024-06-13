import React from "react";
import Container from "react-bootstrap/Container";

interface PostContentDisplayProps {
  postTitle: string;
  postContent: string;
}

const PostContentDisplay: React.FC<PostContentDisplayProps> = ({
  postTitle,
  postContent,
}) => {
  return (
    <Container className="p-0">
      <h1>{postTitle}</h1>
      <p>{postContent}</p>
    </Container>
  );
};

export default PostContentDisplay;
