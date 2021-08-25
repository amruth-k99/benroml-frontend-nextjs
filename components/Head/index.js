import { DefaultSeo } from "next-seo";
import config from "./seo.json";
import NextHead from "next/head";

const Head = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  );
};

export default Head;
