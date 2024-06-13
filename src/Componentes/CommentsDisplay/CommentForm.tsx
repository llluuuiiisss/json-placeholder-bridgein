import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";

interface CommentFormProps {
  emailText: string;
  updateEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleText: string;
  updateTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  descriptionText: string;
  updateDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitFunc: (event: React.FormEvent<HTMLFormElement>) => void;
  submitBtnText: string;
  cancelEdit?: (_: boolean) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  emailText,
  updateEmail,
  titleText,
  updateTitle,
  descriptionText,
  updateDescription,
  submitFunc,
  submitBtnText,
  cancelEdit,
}) => {
  return (
    <Form onSubmit={submitFunc}>
      <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
        <Form.Control
          type="email"
          required
          placeholder="author"
          value={emailText}
          onChange={updateEmail}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Post Title"
        className="mb-3"
      >
        <Form.Control
          type="text"
          required
          placeholder="Post Title"
          value={titleText}
          onChange={updateTitle}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Post Content"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          style={{ height: "100px" }}
          type="email"
          placeholder="author"
          required
          value={descriptionText}
          onChange={updateDescription}
        />
      </FloatingLabel>

      <Button variant="primary" type="submit">
        {submitBtnText}
      </Button>
      {cancelEdit && (
        <Card.Link
          className="cursor-pointer p-3"
          onClick={() => {
            cancelEdit(false);
          }}
        >
          Cancel
        </Card.Link>
      )}
    </Form>
  );
};

export default CommentForm;
