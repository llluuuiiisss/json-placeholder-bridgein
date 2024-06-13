import { useEffect, useState } from "react";
import useAxiosJson from "../../Hooks/useAxiosJson";
import SinglePost from "./SinglePost";
import { PostData } from "../../types/postData.type";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Pagination from "../Pagination";

const PostList = () => {
  const axiosJson = useAxiosJson();
  const pageSize = 9;

  const [postList, setPostList] = useState<PostData[]>([]);
  const [pagePosts, setPagePosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPostList = () => {
      axiosJson
        .get("/posts")
        .then((response) => {
          const tempPost: PostData[] = [];
          for (let i = 0; i < response.data.length; i++) {
            tempPost.push({
              id: response.data[i].id,
              title: response.data[i].title,
              description: response.data[i].body,
            });
          }
          setPostList(tempPost);
          setPagePosts(tempPost.slice(0, pageSize));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPostList();
  }, []);

  useEffect(() => {
    setPagePosts(postList.slice(page * pageSize, (page + 1) * pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return pagePosts.length > 0 && postList.length > 0 ? (
    <>
      <Row className="gy-5">
        {pagePosts.map((post) => {
          return (
            <SinglePost
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
            ></SinglePost>
          );
        })}
      </Row>
      <Container className="mt-5">
        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          totalArray={postList}
        ></Pagination>
      </Container>
    </>
  ) : (
    <></>
  );
};

export default PostList;
