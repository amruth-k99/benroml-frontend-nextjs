import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../footer";
const Layout = ({
  navbar = true,
  sidebar = false,
  footer = true,
  children,
}) => {
  return (
    <div>
      {navbar && (
        <div className="fixed top-0 z-30 bg-black w-full">
          <Navbar />
        </div>
      )}

      {sidebar && <Sidebar />}

      {children}

      {footer && <Footer />}
    </div>
  );
};
export default Layout;
