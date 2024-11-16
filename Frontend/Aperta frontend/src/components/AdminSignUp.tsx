import { useAppDispatch } from "../Redux/store";
import { useNavigate } from "react-router";
import { SignUpFormData } from "../interfaces/interfaces";
import { useState } from "react";
import { ChangeEvent } from "react";
import style from "./AdminSignUp.module.css"
import { userSignUp } from "../Redux/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useLocation } from "react-router";



export default function AdminSignUp() {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const location = useLocation();  // Get location object which contains query parameters

    const token = new URLSearchParams(location.search).get('token');

    const { email, clubId, roleId } = useSelector((state: RootState) => state.invitation);

    const { club } = useSelector((state: RootState) => state.club);

    console.log(club);

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: email,
        password: '',
        confirmed_password: '',
        token: token || null
        
        
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }

        });

    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmed_password) {
            setPasswordError("Passwords don't match.");
            return;
        }

        setPasswordError(null);

        const { confirmed_password, ...dataToSubmit } = {
            ...formData,
            birthDate: new Date(formData.birthDate).toISOString()  // Convert to ISO format with timestamp
        };

        dispatch(userSignUp(dataToSubmit));

        if(club && !club.billingInfo && roleId == "230e7fbd-68ef-4af7-88f5-23b0881419a4") {
            navigate("/onboarding");
        } else {
            navigate('/home');
        }
        //// navigate to onboarding if club.billingInfo == false
        
        console.log("Submitted data:", dataToSubmit); 
    };

    
    return (
        <>
        <div className={style.formContainer}>
            <div className={style.formTextContainer}>
                <div className={style.imageContainer}></div>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h2>Sign-Up</h2>

                    <div>
                        <label className={style.label}>First Name:</label>
                        <input className={style.input}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Last Name:</label>
                        <input className={style.input}
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Birthday:</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            max={new Date().toISOString().split("T")[0]} // Set max date to today to prevent future dates
                            required
                        />
                    </div>

                    {passwordError && <p className={style.error}>{passwordError}</p>}

                    <div>
                        <label className={style.label}>Email:</label>
                        <input className={style.input}
                            type="email"
                            name="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div>
                        <label className={style.label}>Password:</label>
                        <input className={style.input}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={style.label}>Confirm password:</label>
                        <input className={style.input}
                            type="password"
                            name="confirmed_password"
                            value={formData.confirmed_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className={style.button} type="submit">SignUp</button>
                </form>
            </div>
        </div>
        
        </>
    )
}