import { ToastContainer } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContext";
import "react-toastify/ReactToastify.css";

export default function Toaster() {
  const { isDark } = useTheme();
  return <ToastContainer position="bottom-right" autoClose={2400} hideProgressBar newestOnTop closeOnClick pauseOnHover theme={isDark ? "dark" : "light"} className="zharpro-toast" />;
}
