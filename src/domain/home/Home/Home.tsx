import React from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./Home.module.css";
import { PostDetail } from "components";
import { useFetchDocuments } from "hooks";
import { useForm } from "react-hook-form";

export const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");

  const { handleSubmit, register, watch } = useForm();

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/search?q=${watch("query")}`);
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          {...register("query")}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {!posts && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
