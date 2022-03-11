import { ToastContainer } from "react-toastify";
import useEthers from "@/hooks/useEthers";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  useEthers();

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
