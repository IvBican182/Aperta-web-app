import {  useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import AdminHomepage from "../components/AdminHomepage";
import UserHomepage from "../components/UserHomepage";
import { ROLE_NAME } from "../config/roles";


export default function Homepage() {
    

    
    

    const { role, user } = useSelector((state: RootState) => state.auth);

    if(!user) {
        console.log("no user found");
    }
    
    console.log( role);
    
    

    return (
        <div className="container">
            {role === ROLE_NAME.GENERAL_ADMIN ? <AdminHomepage /> : <UserHomepage />}
          
           
        </div>
    )

}