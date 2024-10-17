"use server"; 
import { cookies } from "next/headers"; 

// Function to handle user login and set cookies
export async function handleLogin(userId:string, accessToken:string, refreshToken:string) {
  console.log("Setting tokens:", { userId, accessToken, refreshToken });

  // Set a cookie for the user ID
  cookies().set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  // Set a cookie for the access token
  cookies().set('session_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, 
    path: '/'
  });

  // Set a cookie for the refresh token
  cookies().set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

// Function to refresh the access token using the stored refresh token
export async function refreshToken() {
  const refreshToken = cookies().get("session_refresh_token")?.value; 

  if (refreshToken) {
    const response = await fetch('/api/token/refresh/', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }), 
    });

    const data = await response.json(); 

    if (response.ok) { 
      cookies().set('session_access_token', data.access, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, 
        path: '/'
      });
      return data.access; 
    } else {
      console.error("Token refresh failed:", data); 
      resetAuthCookies(); 
      return null; 
    }
  } else {
    return null;
  }
}

// Function to clear all authentication-related cookies.
export async function resetAuthCookies() {
  const pastDate = new Date(0); 

  cookies().set("session_userId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: pastDate,
    path: "/",
  });

  cookies().set("session_access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: pastDate,
    path: "/",
  });

  // Clear refresh token cookie.
  cookies().set("session_refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: pastDate,
    path: "/",
  });
}

// Function to get the user ID from cookies.
export async function getUserId() {
  const userId = cookies().get("session_userId")?.value; 
  console.log(userId); 
  return userId || null; 
}

// Function to get the access token from cookies.
export async function getAccessToken() {
  let accessToken = cookies().get("session_access_token")?.value; 
  return accessToken || null; 
}
