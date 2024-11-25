import { Middleware } from "@reduxjs/toolkit";
import { userLogin } from "../authSlice";
import { getSingleClub } from "../clubSlice";


const fetchClubMiddleware: Middleware = (store: any) => (next) => async (action) => {
    // Pass all actions to the next middleware/reducer
    const result = next(action);
    

    // Listen for the userLogin.fulfilled action
    if (userLogin.fulfilled.match(action)) {
        const user = action.payload.user; // Extract user from the fulfilled payload
        if (user.clubId) {
            // Dispatch getSingleClub with the user's clubId
            store.dispatch(getSingleClub(user.clubId));
        }
    }

    return result;
};

export default fetchClubMiddleware;