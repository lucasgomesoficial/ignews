/* eslint-disable @next/next/link-passhref */
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PostProps } from "../index.types";
import styles from "../styles.module.scss";

export const PostPreviewTemplate = ({ post }: PostProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [post.slug, router, session]);

  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{post.title}</h1>
        <time>{post.updatedAt}</time>
        <div
          className={`${styles.postContent} ${styles.postContentPreview}`}
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        <Link href="/">
          <div className={styles.continueReading}>
            Wanna continue reading? <span>Subscribe now</span> 🤗
          </div>
        </Link>
      </article>
    </main>
  );
};
