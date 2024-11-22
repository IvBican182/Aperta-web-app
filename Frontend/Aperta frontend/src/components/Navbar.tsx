import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { RootState } from "../Redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

//navbar component, this will always be present on the page
export default function Navbar() {
    const dispatch = useDispatch();
    //getting our token from state, if no token we will not show page links, only "sign in" and "login"
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <div className={style.navbarContainer}>
        <nav className="navbar navbar-expand-lg navbar-dark px-2">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                {/* if authenticated, show homepage, group route, sign out */}
                {token && (
                        <>
                            <li className="nav-link">
                                <NavLink to ="/home" className="nav-link"><span className={style.latoBold}>HOME</span></NavLink>
                            </li>
                            {/* Groups Link - Visible only when logged in */}
                            <li className="nav-link">
                                <NavLink to="/groups" className="nav-link"><span className={style.latoBold}>GROUPS</span></NavLink>
                            </li>
                            {/* Sign Out Link - Visible only when logged in */}
                            <li className="nav-link">
                                {/*navigate to login page after logout */}
                                <NavLink to="/login" className="nav-link"><button onClick={() => dispatch(logout())}>SIGN OUT</button></NavLink>
                            </li>
                        </>
                    )}

                    {/* if not authenticated, show only "sign-in" and "sign-out routes"*/}
                    {!token && (
                        <>
                        <div className={style.navAuth}>
                            <li className="nav-link">
                                <NavLink to="/login" className="nav-link"><button className={style.latoBold}>LOGIN</button></NavLink>
                            </li>
                        </div>
                    </>
                    )}
            </ul>
        </div>
    </nav>
    </div>
    )

}