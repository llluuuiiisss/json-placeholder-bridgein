/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from "react";
import { PostData } from "../types/postData.type";
import { useParams } from "react-router";
import useAxiosJson from "../Hooks/useAxiosJson";
import CommentsDisplay from "../Componentes/CommentsDisplay/CommentsDisplay";
import { CommentData } from "../types/commentData.type";
import CommentsFilterContext from "../Providers/CommentsFilterProvider";
import { CommentsFilterContextType } from "../types/CommentsFilterContextType";
import { ChangeType } from "../types/comentsFilter.type";
import WriteComment from "../Componentes/CommentsDisplay/WriteComment";
import PostContentDisplay from "../Componentes/PostDisplay/PostContentDisplay";
import Pagination from "../Componentes/Pagination";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Post = () => {
  const axiosJson = useAxiosJson();
  const [post, setPost] = useState<PostData | null>(null);
  const [originalComments, setOriginalComments] = useState<CommentData[]>([]);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentsPage, setCommentsPage] = useState<CommentData[]>([]);
  const [lastCommentId, setLastCommentId] = useState(0);
  const [page, setPage] = useState(0);
  const { commentMutation } = useContext(
    CommentsFilterContext
  ) as CommentsFilterContextType;
  const navigate = useNavigate();
  const { id } = useParams();

  const pageSize = 2;

  const checkFilters = (comList: CommentData[]) => {
    const deleteArray: number[] = [];
    for (let i = 0; i < commentMutation.length; i++) {
      if (commentMutation[i].id === parseInt(id!)) {
        // eslint-disable-next-line no-loop-func
        comList.map((comVal, index) => {
          commentMutation[i].changes.map((changeVal) => {
            if (comVal.id === changeVal.id) {
              if (changeVal.changeType === ChangeType.DELETE) {
                deleteArray.push(comVal.id);
              } else if (changeVal.changeType === ChangeType.UPDATE) {
                comList[index].title = changeVal.title!;
                comList[index].description = changeVal.description!;
                comList[index].email = changeVal.email!;
              }
            }
          });
        });

        // eslint-disable-next-line no-loop-func
        commentMutation[i].changes.map((changeVal) => {
          if (changeVal.changeType === ChangeType.WRITE) {
            comList.unshift({
              id: changeVal.id,
              description: changeVal.description!,
              email: changeVal.email!,
              title: changeVal.title!,
              postId: parseInt(id!),
            });
          }
        });

        comList = comList.filter((com) => {
          for (let i = 0; i < deleteArray.length; i++) {
            if (com.id === deleteArray[i]) {
              return false;
            }
          }
          return true;
        });
        break;
      }
    }

    return comList;
  };

  useEffect(() => {
    const getPost = () => {
      axiosJson
        .get(`/posts/${id}`)
        .then((response) => {
          setPost({
            id: response.data.id,
            title: response.data.title,
            description: response.data.body,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPost();

    const getComments = () => {
      axiosJson
        .get(`/posts/${id}/comments`)
        .then(async (response) => {
          let tempComment: CommentData[] = [];
          for (let i = 0; i < response.data.length; i++) {
            tempComment.push({
              id: response.data[i].id,
              postId: parseInt(id!),
              title: response.data[i].name,
              description: response.data[i].body,
              email: response.data[i].email,
            });
          }
          //   tempComment = await checkFilters(tempComment);
          setOriginalComments(tempComment);
          setComments(tempComment);
          setCommentsPage(tempComment.slice(0, pageSize));
          setLastCommentId(tempComment[tempComment.length - 1].id);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCommentsPage(comments.slice(page * pageSize, (page + 1) * pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (comments.length > 0 && commentsPage.length === 0) {
      setPage(page - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsPage]);

  useEffect(() => {
    const updateComList = async () => {
      const auxComents = await checkFilters(originalComments);
      setComments(auxComents);
      setCommentsPage(auxComents.slice(page * pageSize, (page + 1) * pageSize));
    };

    updateComList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentMutation]);

  return post !== null ? (
    <Container>
      <Button
        variant="outline-third"
        size="sm"
        active
        className="mt-4"
        onClick={() => {
          navigate("/");
        }}
      >
        {"< Post list"}
      </Button>
      <PostContentDisplay
        postTitle={post.title}
        postContent={post.description}
      ></PostContentDisplay>

      <WriteComment
        postId={parseInt(id!)}
        lastCommentId={lastCommentId}
        setLastCommentId={setLastCommentId}
      ></WriteComment>
      <h4 className="mb-3 mt-3">Comments</h4>
      <Container>
        {commentsPage.map((com) => {
          return (
            <CommentsDisplay
              key={com.id}
              id={com.id}
              postId={parseInt(id!)}
              title={com.title}
              description={com.description}
              email={com.email}
            ></CommentsDisplay>
          );
        })}
      </Container>
      <Container className="mt-5 mb-5">
        {comments && comments.length > 0 ? (
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalArray={comments}
          ></Pagination>
        ) : (
          <p id={comments.length.toString()} className="text-center">
            No comments yet
          </p>
        )}
      </Container>
    </Container>
  ) : (
    <>
      {/* Loading animation could be put here, to this cas I think it's not worth it*/}
    </>
  );
};

export default Post;
