import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "tailwindcss/tailwind.css";
import "./footer.css";
import store from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
