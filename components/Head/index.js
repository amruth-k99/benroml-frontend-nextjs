import { DefaultSeo } from "next-seo";
import config from "./seo.json";
import AOS from "aos";
import NextHead from "next/head";
import { useEffect } from "react";

const Head = () => {
  useEffect(() => {
    AOS.init({
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </NextHead>
    </>
  );
};

export default Head;
