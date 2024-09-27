import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Root = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div className="max-w-6xl mx-auto font-poppins">
              { noHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}      
        </div>
    );
};

export default Root;