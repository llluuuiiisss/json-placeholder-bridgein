import PostList from "../Componentes/PostDisplay/PostList";
import { Container } from "react-bootstrap";

const ListAllPosts = () => {
  return (
    <div>
      <Container>
        <h1 className="mt-4 mb-4">JSON Placeholder posts</h1>
        <PostList></PostList>
      </Container>
    </div>
  );
};

export default ListAllPosts;
