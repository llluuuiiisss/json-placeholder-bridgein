import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <Container className="pb-5">
      <Button
        variant="outline-third"
        size="sm"
        active
        className="mt-4 mb-4"
        onClick={() => {
          navigate("/");
        }}
      >
        {"< Post list"}
      </Button>
      <h1>How it works?</h1>
      <p>
        This is a React application that uses the{" "}
        <a
          href="https://jsonplaceholder.typicode.com/"
          target="_blank"
          rel="noreferrer"
        >
          JSON Placeholder
        </a>
        , since on the free version we cannot really edit the data on the server
        side. Every time you load this website, all the data will be restored,
        since we are only saving it in react states that get clear every time
        you refresh the page or simple make a newer session on this website.
      </p>
    </Container>
  );
};

export default HowItWorks;
