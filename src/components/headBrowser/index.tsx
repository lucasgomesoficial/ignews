import Head from "next/head";

type HeadBrowserProps = {
  text: string;
};

export const HeadBrowser = ({ text }: HeadBrowserProps) => {
  return (
    <Head>
      <title>{text} | ig.news</title>
    </Head>
  );
};
