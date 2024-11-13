

//interfaces

//SignUp form interface
export interface SignUpFormData { 
    firstName: string;
    lastName: string;
    birthDate: string;
    email: any;
    password: string;
    token: string | null
    
    
    
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