import { CardPost } from "./components/cardPost";
import { PostsProps } from "./index.types";
import styles from "./styles.module.scss";

export const PostsTemplate = ({ posts }: PostsProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.posts}>
        {posts.map(({ slug, title, excerpt, updatedAt }) => {
          return (
            <CardPost
              key={slug}
              slug={slug}
              title={title}
              excerpt={excerpt}
              updatedAt={updatedAt}
            />
          );
        })}
      </div>
    </main>
  );
};
