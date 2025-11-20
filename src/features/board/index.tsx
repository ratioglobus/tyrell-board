import { PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router-dom";

export function BoardPage() {
  const params = useParams<PathParams[typeof ROUTES.BOARD]>();
  return <div>board page{params.boardId}</div>;
};
