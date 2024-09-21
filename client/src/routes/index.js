import { createBrowserRouter } from "react-router-dom";    // Importing `createBrowserRouter` to define the route structure
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import ForgotPassword from "../pages/ForgotPassword";

// Defining the application's routes
const router = createBrowserRouter([
    {
        path : "/",    // Root path
        element : <App/>,    // Root component that wraps the entire app
        children : [      // Child routes for various pages
            {
                path : "register",
                element : <AuthLayouts><RegisterPage/></AuthLayouts>
            },
            {
                path : "email",
                element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },
            {
                path : "password",
                element : <AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path : "forgot-password",
                element : <AuthLayouts><ForgotPassword/></AuthLayouts>
            },
            {
                path : "",
                element : <Home/>,
                children : [
                    {
                        path : ':userId',        // Dynamic route for user-specific messages, accessed via user ID
                        element : <MessagePage/>    // Message page for displaying messages of a particular user
                    }
                ]
            }
        ]
    }
])

export default router