import { useAppDispatch } from "../Redux/store";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ChangeEvent } from "react";
import style from "./AdminSignUp.module.css"
import { userSignUp } from "../Redux/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useLocation } from "react-router";
import { ROLE_NAME } from "../config/roles";



export default function AdminSignUp() {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const location = useLocation();  // Get location object which contains query parameters

    const token = new URLSearchParams(location.search).get('token');

    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const { email, groupId, roleId } = useSelector((state: RootState) => state.invitation);    

    const { club } = useSelector((state: RootState) => state.club);

    console.log(club);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        parentFirstName: '',
        parentLastName: '',
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
            setErrorMessage("Passwords don't match.");
            return;
        }

        if (formData.email !== email) {
            setErrorMessage("Please provide the same email in which you received the invitation!");
            return;
        }

        setErrorMessage(null);

        const { confirmed_password, ...dataToSubmit } = {
            ...formData,
            birthDate: new Date(formData.birthDate).toISOString()  // Convert to ISO format with timestamp
        };

        dispatch(userSignUp(dataToSubmit));

        if(club && !club.billingInfo && roleId == ROLE_NAME.GENERAL_ADMIN) {
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

                    {groupId && 
                    <>
                        <div>
                            <label className={style.label}>Parent First Name:</label>
                            <input className={style.input}
                                type="text"
                                name="parentFirstName"
                                value={formData.parentFirstName}
                                onChange={handleChange}
                                
                                />
                        </div>

                        <div>
                            <label className={style.label}>Parent Last Name:</label>
                            <input className={style.input}
                                type="text"
                                name="parentLastName"
                                value={formData.parentLastName}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </>
                    }

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

                    {errorMessage && <p className={style.error}>{errorMessage}</p>}

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

                    <button className={style.button} type="submit" disabled={isLoading}>{isLoading ? "Signing up..." : "Sign Up"}</button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
        
        </>
    )
}