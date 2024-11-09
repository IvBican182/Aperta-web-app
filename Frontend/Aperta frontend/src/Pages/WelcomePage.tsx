import style from "./WelcomePage.module.css";
import { NavLink, useNavigate } from "react-router-dom";



//welcome component, renders at the start of application
export default function WelcomePage() {

    const navigate = useNavigate();
    
    function handleSubmit() {
        navigate('/clubLogin');
    }

    return(
        <div className={style.welcomeContainer}>
            <div className={style.textContainer}>
                <h3 className={style.welcomeHeader}>Welcome to Aperta!</h3>
                <span className={style.span}>Are you ready to take your sports team to the next level?</span> 
                <p className={style.welcomeText}>
                  Whether you're a player, coach, or club administrator, our app is designed to streamline 
                  team management and enhance your experience on and off the field. From scheduling games and tracking 
                  player stats to managing club logistics and communicating with teammates, we've got you covered.
                </p>
                <p>Did you get your login information yet ?</p>
                <p>Click "start" to begin with our onboarding process</p>
                <button onClick={handleSubmit}>Start</button>
            </div>
            <div className={style.img}>
                {/* <img src={running} /> */}
            </div>  
        </div>
    )
}