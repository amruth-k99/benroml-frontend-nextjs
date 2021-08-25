import { useEffect } from "react";
import "aos/dist/aos.css";
import "tailwindcss/tailwind.css";
import "./footer.css";
import store from "../redux/store/store";
import Head from "../components/Head";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
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
