import { createBrowserRouter  } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import WelcomePage from "../Pages/WelcomePage";
import ClubLoginPage from "../Pages/ClubLoginPage";

export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <WelcomePage /> },
            { path: "/clubLogin", element: <ClubLoginPage /> }
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



