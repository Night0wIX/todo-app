import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodosPage } from "@/pages/TodoPage";

const TOAST_AUTO_CLOSE_MS = 5000;

export function App() {
  return (
    <div className="min-h-screen text-zinc-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to content
      </a>

      <TodosPage />

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={TOAST_AUTO_CLOSE_MS}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        pauseOnFocusLoss
        pauseOnHover
        toastClassName="!bg-zinc-900 !border !border-zinc-700/60 !rounded-xl !shadow-2xl"
        bodyClassName="!text-zinc-100 !text-sm"
      />
    </div>
  );
}
