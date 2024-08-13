import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Cases from "../pages/Cases";


const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout/>,
    children: [
        {
        path: "",
        element: <Home />,
        },
        {
        path: "cases",
        element: <Cases />,
        }
    ]
    },
]);

export default router;