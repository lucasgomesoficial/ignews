import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { HeadBrowser } from "../../components/headBrowser/index";
import { createClient } from "../../services/prismic";
import { PostTemplate } from "../../templates/posts/post";
import { PostProps } from "../../templates/posts/post/index.types";
import { formatDate } from "../../utils/format";

export default function Post({ post }: PostProps) {
  return (
    <>
      <HeadBrowser text={post.title} />
      <PostTemplate post={post} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  previewData,
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = createClient({ previewData });

  const response = await prismic.getByUID("post", String(slug));

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: formatDate(response.last_publication_date),
  };

  return {
    props: { post },
  };
};
