import { GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import { HeadBrowser } from "../../components/headBrowser/index";
import { createClient } from "../../services/prismic";
import { PostsTemplate } from "../../templates/posts";
import { PostsProps } from "../../templates/posts/index.types";
import { formatDate } from "../../utils/format";

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <HeadBrowser text="Posts" />
      <PostsTemplate posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = createClient({ previewData });

  const response = await prismic.getAllByType("post", {
    pageSize: 100,
  });

  const posts = response?.map(({ uid, data, last_publication_date }) => {
    return {
      slug: uid,
      title: RichText.asText(data.title),
      excerpt: data.content.find((content: any) => content.type === "paragraph")
        ?.text,
      updatedAt: formatDate(last_publication_date),
    };
  });

  return {
    props: { posts },
  };
};
