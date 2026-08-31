import { useEffect } from "react";
import { useLayout } from "../context/LayoutContext";

function NotFoundPage() {
  const { setLayout } = useLayout()

  useEffect(()=> {
    setLayout({
      main: null,
      topbar: null
    })
  }, [])
  
  return (
    <div>
      <h1>404</h1>
      <p>The page you requested does not exist.</p>
    </div>
  );
}
export default NotFoundPage;