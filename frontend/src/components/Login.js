import "../index.css";
import { useState } from "react";
import { loginUser } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Both email and password are required!");
            return;
        }

        try {
            const data = await loginUser(email, password);
            if (data.access_token){
                Cookies.set("access_token", data.access_token, {
                    secure: true, 
                    sameSite: "Strict",
                });
            }
            setError(null);
            navigate("/profile")
        } catch (error) {
            setError(error.response ? error.response.data.detail : "Invalid email or password!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-mono">
            {/* Outer Box */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg bg-opacity-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Log In</h2>
                </div>
                
                {error && <div className="text-red-500 text-center">{error}</div>}
                {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-3">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Log In
                        </button>
                    </div>
                </form>

                {/* Navigation to Signup */}
                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </div>

                {/* OAuth Section
                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b"></span>
                    <span className="text-xs text-gray-500 uppercase">Or</span>
                    <span className="w-1/5 border-b"></span>
                </div>
                <div className="flex justify-center space-x-4">
                    <a
                        href="#"
                        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                        Google
                    </a>
                    <a
                        href="#"
                        className="px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-900"
                    >
                        GitHub
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
