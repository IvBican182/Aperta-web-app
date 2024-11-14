import {  useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import AdminHomepage from "../components/AdminHomepage";
//import AdminHomepage from "../components/AdminHomepage";
//import UserHomepage from "../components/UserHomepage";


export default function Homepage() {
    

    /* const user = useSelector((state: RootState) => state.auth.user );
    console.log(user);
    
    
    if (!user) {
        return <p>Loading...</p>; // or redirect to login
      } */
    
    

    return (
        <div className="container">
           {/*  {user.role_id === 1 ? <AdminHomepage /> : <UserHomepage />} */}
           <AdminHomepage />
           
        </div>
    )

}