import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CommentData } from "../types/commentData.type";
import { PostData } from "../types/postData.type";

interface PaginationProps {
  page: number;
  setPage: (_: number) => void;
  pageSize: number;
  totalArray: CommentData[] | PostData[];
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  pageSize,
  totalArray,
}) => {
  return (
    <Row className="align-items-center">
      <Col className="text-end">
        {page > 0 && (
          <Button
            variant="outline-third"
            className="text-right"
            size="sm"
            active
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {"< Prev"}
          </Button>
        )}
      </Col>
      <Col sm={1}>
        <h6 className="text-center">{page + 1}</h6>
      </Col>
      <Col>
        {page !== Math.ceil(totalArray.length / pageSize) - 1 && (
          <Button
            variant="outline-third"
            size="sm"
            active
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {"Next >"}
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Pagination;
