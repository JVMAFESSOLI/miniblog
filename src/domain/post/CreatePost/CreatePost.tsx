import React from "react";

import styles from "./CreatePost.module.css";

import { useState } from "react";
import { usePostPosts } from "hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "context/AuthContext";

export const CreatePost = () => {
  const { register, watch, handleSubmit, getValues, setValue } = useForm();

  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const {
    mutate: mutateCreatePost,
    isLoading,
    isError,
    error,
  } = usePostPosts();

  const navigate = useNavigate();

  const onSubmit = () => {
    // validate image URL
    try {
      new URL(watch("image"));
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    mutateCreatePost({
      getValues,
      uid: user.uid,
      createdby: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            required
            placeholder="Pense num bom título..."
            {...register("title")}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            required
            placeholder="Insira uma imagem que represente o seu post"
            {...register("image")}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            required
            placeholder="Insira o conteúdo do post"
            {...register("body")}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            required
            placeholder="Insira as tags separadas por vírgula"
            {...register("tags")}
            onChange={(e) =>
              setValue(
                "tags",
                e.target.value.split(",").map((tag) => tag.trim().toLowerCase())
              )
            }
          />
        </label>
        {!isLoading && <button className="btn">Cadastrar</button>}
        {isLoading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {isError && <p className="error">{error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};
