import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import { useNavigate } from "react-router";
import { updateClubBilling } from "../Redux/clubSlice";


//only navigate to onboarding if roleId is GeneralAdmin
export default function OnBoardingPage() {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { club } = useSelector((state: RootState) => state.club);

    function handleSubmit() {
        if (club) {  // Check if club is not null
            dispatch(updateClubBilling({ clubId: club.id }))
               .then(() => {
                   console.log("Billing info updated successfully in state and database!");
                   navigate("/home");
               })
               .catch(() => {
                   console.error("Failed to update billing info.");
               });
        } else {
            console.error("Club data is not available.");
        }
    };

   

    
    return(
        <>
        <p>onboarding page woohooo</p>
        <p>to finish onboarding process add your club payment details</p>
        <button onClick={handleSubmit}>add payment</button>
        </>
    )
}