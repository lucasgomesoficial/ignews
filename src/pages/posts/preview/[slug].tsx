import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-dom";
import { HeadBrowser } from "../../../components/headBrowser/index";
import { createClient } from "../../../services/prismic";
import { PostProps } from "../../../templates/posts/post/index.types";
import { PostPreviewTemplate } from "../../../templates/posts/post/preview";
import { formatDate } from "../../../utils/format";

export default function PostPreview({ post }: PostProps) {
  return (
    <>
      <HeadBrowser text={post.title} />
      <PostPreviewTemplate post={post} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params,
}) => {
  const { slug } = params;

  const prismic = createClient({ previewData });

  const response = await prismic.getByUID("post", String(slug));

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: formatDate(response.last_publication_date),
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutes
  };
};
