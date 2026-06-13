import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import BackToTop from "../BackToTop";

function App() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
        <BackToTop />
      </div>
      <Footer />
    </>
  );
}

export default App;
