import React from "react";

import { Link } from "react-router-dom";
import { Post } from "domain/post/types";

import styles from "./PostDetail.module.css";

type PostDetailProps = {
  post: Post;
};

export const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdBy}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};
