import { useEffect } from "react";
import AOS from "aos";
import "tailwindcss/tailwind.css";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true, // whether animation should happen only once - while scrolling down
    });
  });
  return <Component {...pageProps} />;
}

export default MyApp;
