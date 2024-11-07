

//interfaces

//SignUp form interface
export interface SignUpFormData { 
    first_name: string;
    last_name: string;
    user_email: string;
    hashed_password: string;
    user_age: number; // Change to 'number' if you want age to be a number
    role_id: number;
    
}

//Login Interface
export interface LoginFormData {
    user_email: string;
    hashed_password: string;
}

//user data interface
export interface User {
    id: number,
    first_name: string,
    last_name: string,
    user_email: string,
    user_age: number,
    role_id: number,
    
    
}