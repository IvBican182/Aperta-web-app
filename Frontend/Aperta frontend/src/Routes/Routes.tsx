import { createBrowserRouter  } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import WelcomePage from "../Pages/WelcomePage";
import AuthPage from "../Pages/AuthPage";
import Homepage from "../Pages/Homepage";
import OnBoardingPage from "../Pages/OnBoardingPage";
import GroupsPage from "../Pages/GroupsPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../Pages/LoginPage";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <WelcomePage /> },
            { path: "/register", element: <AuthPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/home", element: <Homepage /> },
            { path:"/onboarding", element: <OnBoardingPage /> },
            { path: "/groups", element: <GroupsPage /> }

            /* {
                path: "home",
                element: <ProtectedRoute />,
                children: [{ path: "", element: <Homepage /> }],
            },
            {
                path: "/groups",
                element: <ProtectedRoute />,
                children: [{ path: "", element: <GroupsPage /> }],
            },
        
            { path: "/onboarding" , element: <OnBoardingPage />}, */
            
            
            
            
           /*  { path: "/home", element: <Homepage /> },
            { path: "/groups", element: <GroupsPage /> },
            { path: "/login", element: <Login /> },
            { path: "/signUp", element: <SignUp /> },
            { path: "/profile/:id", element: <UserProfile /> }, */
            
            
        ]
    }

]
/* {
    future: {
        v7_skipActionErrorRevalidation: true ,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        
        
         
    }
} */);

