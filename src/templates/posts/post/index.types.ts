export type Post = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

export interface PostProps {
  post: Post;
}
