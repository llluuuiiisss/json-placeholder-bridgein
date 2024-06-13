import { createContext, useState, useEffect } from "react";
import { CommentFilter } from "../types/comentsFilter.type";

const CommentsFilterContext = createContext({});

export const CommentsFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [commentMutation, setCommentsMutation] = useState<CommentFilter[]>([]);
  return (
    <CommentsFilterContext.Provider
      value={{ commentMutation, setCommentsMutation }}
    >
      {children}
    </CommentsFilterContext.Provider>
  );
};

export default CommentsFilterContext;
