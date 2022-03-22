import { HeadBrowser } from "../../components/headBrowser/index";
import { PostTemplate } from "../../templates/posts";

export default function Home() {
  return (
    <>
      <HeadBrowser text="Posts" />
      <PostTemplate />
    </>
  )
}
