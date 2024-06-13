import React from "react";
import Card from "react-bootstrap/Card";
import { PostData } from "../../types/postData.type";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const SinglePost: React.FC<PostData> = ({ id, title, description }) => {
  const maxDescriptionChar = 100;
  const navigate = useNavigate();
  return (
    <Col lg={4} md={6} sm={12}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description.substring(0, maxDescriptionChar)}
            {description.length > 100 && "..."}
          </Card.Text>
          <Card.Link
            className="cursor-pointer"
            onClick={() => {
              navigate(`/post/${id}`);
            }}
          >
            View Post
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SinglePost;
