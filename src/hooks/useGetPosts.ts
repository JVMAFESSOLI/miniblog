import { db } from "../firebase/config";
import { Post } from "domain/post/types";
import { doc, getDoc } from "firebase/firestore";
import { UseQueryResult, useQuery } from "react-query";

async function getDocument(docCollection: string, id: string) {
  const docRef = await doc(db, docCollection, id);
  const document = await getDoc(docRef);
  return document.data;
}

export const useGetPosts = (
  docCollection: string,
  id: string
): UseQueryResult<Post> =>
  useQuery({
    queryKey: ["document"],
    queryFn: () => getDocument(docCollection, id),
  });
