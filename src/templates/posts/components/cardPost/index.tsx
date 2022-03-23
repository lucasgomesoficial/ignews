import Link from "next/link";
import { Post } from "./index.types";
import styles from "./styles.module.scss";

export const CardPost = ({ slug, title, excerpt, updatedAt }: Post) => {
  return (
    <Link href={`/posts/${slug}`}>
      <a className={styles.card}>
        <time>{updatedAt}</time>
        <strong>{title}</strong>
        <p>{excerpt}</p>
      </a>
    </Link>
  );
};
