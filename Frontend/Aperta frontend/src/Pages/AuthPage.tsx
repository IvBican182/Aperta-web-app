import { useAppDispatch } from "../Redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyInviteToken, resetInviteState } from "../Redux/invitationSlice";
import { RootState } from "../Redux/store";
import { useLocation } from "react-router";
import AdminSignUp from "../components/AdminSignUp";
import { getSingleClub } from "../Redux/clubSlice";

export default function AuthPage() {
    const dispatch = useAppDispatch();
    const { email, clubId, roleId, isUsed, isLoading, error } = useSelector((state: RootState) => state.invitation);
    
    //const { token } = useParams<{ token: string }>();
    const location = useLocation();  // Get location object which contains query parameters
    const token = new URLSearchParams(location.search).get('token'); 
    useEffect(() => {
        
        

        if (token) {
            dispatch(verifyInviteToken(token));
            console.log(token);
            
        } else {
            console.error("Token not found in URL.");
            
        } 

        return () => {
            dispatch(resetInviteState()); // Clean up on component unmount
        };
    }, [token, dispatch]);

    useEffect(() => {
        if (clubId) {  // Only dispatch if clubId is available
            const fetchClubDetails = async () => {
                try {
                    const club = await dispatch(getSingleClub(clubId)).unwrap();
                    console.log("Club details fetched:", club);
                } catch (err) {
                    console.error("Failed to fetch club details:", err);
                }
            };
            fetchClubDetails();
        } else {
            console.warn("clubId is null or undefined.");
        }
        
 
        
     }, [clubId, dispatch])

    if (isLoading) return <p>Verifying invitation token...</p>;
     if (error) return <p>{error}</p>;
    if (isUsed) return <p>This invitation token has already been used.</p>;  

     console.log("Invitation state:", { email, clubId, roleId, isUsed, isLoading, error }); 

    return (
        <div>
            <AdminSignUp />
        </div>
    )
}