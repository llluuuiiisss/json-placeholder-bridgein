export enum ChangeType {
  WRITE = "write",
  UPDATE = "update",
  DELETE = "Delete",
}

export interface CommentChange {
  id: number;
  changeType: ChangeType;
  email?: string;
  title?: string;
  description?: string;
}

export interface CommentFilter {
  id: number;
  changes: CommentChange[];
}
