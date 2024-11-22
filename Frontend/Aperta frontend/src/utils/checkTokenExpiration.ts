import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time in seconds since epoch
}

export const checkTokenExpiration = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // True if token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat token as expired if decoding fails
  }
};