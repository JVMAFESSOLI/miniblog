import { UseMutationResult, useMutation } from "react-query";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

async function createPost(data: any): Promise<unknown> {
  return await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: Timestamp.now(),
  });
}

export const usePostPosts = (): UseMutationResult =>
  useMutation(async (data: any) => await createPost(data), {
    retry: false,
  });
