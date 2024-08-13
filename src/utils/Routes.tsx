import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Agency from "../pages/Agency";
import Services from "../pages/Services";
import Blog from "../pages/Blog";
import Contacts from "../pages/Contacts";
import Cases from "../pages/Cases";
import NotFound from "../pages/NotFound";


const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "*",
            element: <NotFound />, 
        },
        {
        path: "",
        element: <Home />,
        },
        {
        path: "cases",
        element: <Cases />,
        },
        {
        path: "agency",
        element: <Agency />,
        },
        {
        path: "services",
        element: <Services />,
        },
        {
        path: "blog",
        element: <Blog />,
        },
        {
        path: "contacts",
        element: <Contacts />,
        },
    ]
    },
]);

export default router;