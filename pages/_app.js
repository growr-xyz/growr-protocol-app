import { ToastContainer } from "react-toastify";
// import useStore from "@/store/store";
import useEthers from "@/hooks/useEthers";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  // const hasHydrated = useStore(state => state._hasHydrated);

  useEthers();

  // if (!hasHydrated) {
  //   return <p>Loading...</p>
  // }

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </Layout>
  );
}

export default MyApp;
