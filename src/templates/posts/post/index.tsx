import { PostProps } from "./index.types";
import styles from "./styles.module.scss";

export const PostTemplate = ({ post }: PostProps) => {
  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{post.title}</h1>
        <time>{post.updatedAt}</time>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </article>
    </main>
  );
};
