import { CommentFilter } from "./comentsFilter.type";

export type CommentsFilterContextType = {
  commentMutation: CommentFilter[];
  setCommentsMutation: (option: CommentFilter[]) => void;
};
