import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import CommentsFilterContext from "../../Providers/CommentsFilterProvider";
import { CommentData } from "../../types/commentData.type";
import { CommentsFilterContextType } from "../../types/CommentsFilterContextType";
import { ChangeType } from "../../types/comentsFilter.type";
import CommentForm from "./CommentForm";

const CommentsDisplay: React.FC<CommentData> = ({
  id,
  postId,
  title,
  description,
  email,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const [descriptionText, setDescriptionText] = useState(description);
  const [emailText, setEmailText] = useState(email);
  const { commentMutation, setCommentsMutation } = useContext(
    CommentsFilterContext
  ) as CommentsFilterContextType;

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
  };

  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionText(event.target.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
  };

  const deleteThisComment = () => {
    for (let i = 0; i < commentMutation.length; i++) {
      if (commentMutation[i].id === postId) {
        let arrayCopy = JSON.parse(JSON.stringify(commentMutation)); //deep copy
        arrayCopy[i].changes.push({ id: id, changeType: ChangeType.DELETE });
        setCommentsMutation(arrayCopy);
        return;
      }
    }

    setCommentsMutation([
      ...commentMutation,
      { id: postId, changes: [{ id: id, changeType: ChangeType.DELETE }] },
    ]);
  };

  const updateThisComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (let i = 0; i < commentMutation.length; i++) {
      if (commentMutation[i].id === postId) {
        let arrayCopy = JSON.parse(JSON.stringify(commentMutation)); //deep copy
        arrayCopy[i].changes.push({
          id: id,
          changeType: ChangeType.UPDATE,
          title: titleText,
          description: descriptionText,
          email: emailText,
        });
        setCommentsMutation(arrayCopy);
        setEditMode(false);
        return;
      }
    }

    setCommentsMutation([
      ...commentMutation,
      {
        id: postId,
        changes: [
          {
            id: id,
            changeType: ChangeType.UPDATE,
            title: titleText,
            description: descriptionText,
            email: emailText,
          },
        ],
      },
    ]);
    setEditMode(false);
  };

  return (
    <Card className="mb-3 p-3">
      {editMode ? (
        <CommentForm
          emailText={emailText}
          updateEmail={updateEmail}
          titleText={titleText}
          updateTitle={updateTitle}
          descriptionText={descriptionText}
          updateDescription={updateDescription}
          submitFunc={updateThisComment}
          submitBtnText={"Edit"}
          cancelEdit={setEditMode}
        ></CommentForm>
      ) : (
        <Card.Body className="p-0">
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Link
            className="cursor-pointer"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </Card.Link>
          <Card.Link
            className="cursor-pointer"
            onClick={() => {
              deleteThisComment();
            }}
          >
            Delete
          </Card.Link>
        </Card.Body>
      )}
    </Card>
  );
};

export default CommentsDisplay;
