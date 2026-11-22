import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [pathname]);
  return null;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePageTitle(title) {
  useEffect(() => { document.title = title ? `${title} | ZharpRo` : "ZharpRo | Premium Electronics"; }, [title]);
}
