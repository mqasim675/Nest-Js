"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  getAuth,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./../../../../FirebaseConfiq"; // Make sure to import your Firebase configuration correctly
import jwt from "jsonwebtoken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showGoogleLoginButton, setShowGoogleLoginButton] = useState(true);

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in with email:", user);

      // Handle token and user data as needed
      const token = jwt.sign(
        {
          userId: user.uid,
        },
        "4612359&#7",
        { expiresIn: "1h" }
      );

      localStorage.setItem("token", token);
      console.log("token::", token);
      setEmail("");
      setPassword("");
      setError(null);
      setShowGoogleLoginButton(false);

      // Redirect to a new page after successful login using window.location
      window.location.href = "/component/organisms/header"; 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(`Error (${errorCode}): ${errorMessage}`);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("User signed in with Facebook:", user);

      // Handle token and user data as needed
      const token = jwt.sign(
        {
          userId: user.uid,
        },
        "4612359&#7",
        { expiresIn: "1h" }
      );

      localStorage.setItem("token", token);
      console.log("token::", token);
      setError(null);

      window.location.href = "/components/organisms/header"; 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(`Error (${errorCode}): ${errorMessage}`);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("User signed in with Google:", user);

      // Handle token and user data as needed
      const token = jwt.sign(
        {
          userId: user.uid,
        },
        "4612359&#7",
        { expiresIn: "1h" }
      );

      localStorage.setItem("token", token);
      console.log("token::", token);
      setError(null);
      setShowGoogleLoginButton(false);

      // Redirect to a new page after successful login using window.location
      window.location.href = "/components/organisms/header"; // Change "/main" to the desired URL
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(`Error (${errorCode}): ${errorMessage}`);
    }
  };
  const router = useRouter();
  const goToComponentB = () => {
    router.push('/components/templates/signup');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-md w-full space-y-8 bg-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 text-white">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border
                placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border
                placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleEmailLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in with Email
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in with Facebook
            </button>
          </div>
          {showGoogleLoginButton && (
            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log in with Google
              </button>
            </div>
          )}
          <div className=" text-white text-center flex text-sm font-semibold pb-5">
            <p className="">Donot have an account?</p>
            <a href="/templates/signup" onClick={goToComponentB}>signup</a>
            <Link href={"/signup"}>
              <p className="cursor-pointer ml-4" >Register</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
