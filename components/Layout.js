import Navbar from "./Navbar";
import Footer from "./footer";
const Layout = ({ navbar = true, footer = true, children }) => {
  return (
    <div>
      {navbar && (
        <div className="fixed top-0 z-30 bg-black w-full">
          <Navbar />
        </div>
      )}

      {children}

      {footer && <Footer />}
    </div>
  );
};
export default Layout;
