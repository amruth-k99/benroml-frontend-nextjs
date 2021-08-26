import { useEffect } from "react";
import "aos/dist/aos.css";
import "tailwindcss/tailwind.css";
import "./footer.css";
import store from "../redux/store/store";
import Head from "../components/Head";
import { Provider } from "react-redux";
import { saveToLocalStorage } from "../redux/localStorage";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.subscribe(() => {
      console.log(store.getState());
      saveToLocalStorage(store.getState());
    });
  }, []);

  return (
    <Provider store={store}>
      <Head />
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
