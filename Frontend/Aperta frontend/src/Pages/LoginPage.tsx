import style from "./LoginPage.module.css";
import { ChangeEvent } from "react";
import { RootState, useAppDispatch } from "../Redux/store";
import { useNavigate } from "react-router";
import { useState } from "react";
import { userLogin } from "../Redux/authSlice";
import { useSelector } from "react-redux";


export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoginData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Dispatch the login action
            const data = await dispatch(userLogin(loginData)).unwrap();
      
            // Navigate based on role
            if (data.user) {
                console.log(data.user);
                navigate("/home");
              
            }
          } catch (error) {
            console.error('Login failed', error);
            console.log('Login failed, please try again.');
          }
    };
    return(
    <>
        <div className={style.formContainer}>
            <div className={style.formTextContainer}>
                <div className={style.imageContainer}></div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div>
                        <label className={style.label}>Email:</label>
                        <input className={style.input}
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Password:</label>
                        <input className={style.input}
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className={style.button} type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
                    <span>You don't have an account yet ? Please wait for your club manager to invite you</span>
                </form>
                 {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            
            
        </div>
        </>
    )
}