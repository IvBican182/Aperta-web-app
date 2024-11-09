import style from "./ClubLoginPage.module.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/store";
import { ChangeEvent } from "react";

export default function ClubLoginPage() {
    const [loginData, setLoginData] = useState({
        user_email: "",
        hashed_password: ""
    });

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoginData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        //dispatch our login thunk, sends data to our backend API
        //dispatch(userLogin(loginData));
        //navigates the user to homepage
       // navigate('/home');
        console.log(loginData); 
    };

    return (
        <>
        <div className={style.formContainer}>
            <div className={style.formTextContainer}>
                <div className={style.imageContainer}></div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <p>enter login information you got from our email</p>

                    <div>
                        <label className={style.label}>Email:</label>
                        <input className={style.input}
                            type="email"
                            name="user_email"
                            value={loginData.user_email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Password:</label>
                        <input className={style.input}
                            type="password"
                            name="hashed_password"
                            value={loginData.hashed_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className={style.button} type="submit">Login</button>
                </form>

            </div>
            
            
        </div>
        
        </>
    )
}
