import React, { useState, useContext } from "react";
import CommentForm from "./CommentForm";
import CommentsFilterContext from "../../Providers/CommentsFilterProvider";
import { CommentsFilterContextType } from "../../types/CommentsFilterContextType";
import { ChangeType } from "../../types/comentsFilter.type";

interface WriteCommentProps {
  postId: number;
  lastCommentId: number;
  setLastCommentId: (_: number) => void;
}

const WriteComment: React.FC<WriteCommentProps> = ({
  postId,
  lastCommentId,
  setLastCommentId,
}) => {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [emailText, setEmailText] = useState("");
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

  const writeThisComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (let i = 0; i < commentMutation.length; i++) {
      if (commentMutation[i].id === postId) {
        let arrayCopy = JSON.parse(JSON.stringify(commentMutation)); //deep copy
        arrayCopy[i].changes.push({
          id: lastCommentId - 1,
          changeType: ChangeType.WRITE,
          title: titleText,
          description: descriptionText,
          email: emailText,
        });
        setLastCommentId(lastCommentId - 1);
        setTitleText("");
        setDescriptionText("");
        setEmailText("");
        setCommentsMutation(arrayCopy);

        return;
      }
    }
    setLastCommentId(lastCommentId - 1);
    setTitleText("");
    setDescriptionText("");
    setEmailText("");
    setCommentsMutation([
      ...commentMutation,
      {
        id: postId,
        changes: [
          {
            id: lastCommentId - 1,
            changeType: ChangeType.WRITE,
            title: titleText,
            description: descriptionText,
            email: emailText,
          },
        ],
      },
    ]);
  };

  return (
    <>
      <h4>Comment this post</h4>
      <CommentForm
        emailText={emailText}
        updateEmail={updateEmail}
        titleText={titleText}
        updateTitle={updateTitle}
        descriptionText={descriptionText}
        updateDescription={updateDescription}
        submitFunc={writeThisComment}
        submitBtnText={"Comment"}
      ></CommentForm>
    </>
  );
};

export default WriteComment;
