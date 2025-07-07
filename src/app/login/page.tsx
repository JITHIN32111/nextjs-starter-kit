"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });

  const [loading ,setLoading]=useState(false)

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login data:", user);
    setLoading(true)
     try{
     const res=await axios.post("/api/users/login",user)
     console.log(res);
     toast.success('login success')
     router.push('/profile')
     
     }catch(e:any){
      toast.error(e.message)
      console.log(e);
      
     }finally{
      setLoading(false)
     }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-black">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
          disabled={loading}
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
          >
            {loading?'loading':"Login"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
