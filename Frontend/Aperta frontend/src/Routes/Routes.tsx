import { createBrowserRouter  } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import WelcomePage from "../Pages/WelcomePage";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <WelcomePage /> },
            //{ path: "/home", element: <Homepage /> },
           /* { path: "/groups", element: <GroupsPage /> },
            { path: "/login", element: <Login /> },
            { path: "/signUp", element: <SignUp /> },
            { path: "/profile/:id", element: <UserProfile /> },
            
            */
        ]
    }

], 
{
    future: {
        v7_skipActionErrorRevalidation: true ,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        
        
         // Enable the future flag
    }
});



