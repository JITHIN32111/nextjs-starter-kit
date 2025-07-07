"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast,Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = useState({ email: "", password: "", userName: "" });
  const [loading ,setLoading]=useState(false)
  const router = useRouter();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup data:", user);
    setLoading(true)
     try{
     const res=await axios.post("/api/users/signup",user)
     console.log(res);
     
     toast.success('signup success')
     setTimeout(()=>{
     router.push('/login')

     ,2000})
     
     }catch(e:any){
      toast.error(e?.response?.data?.error)
      console.log(e);
      
     }finally{
      setLoading(false)
     }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <Toaster/>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleData}
            placeholder="Enter Username"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleData}
            placeholder="Enter Email"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleData}
            placeholder="Enter Password"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
          disabled={loading}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          >
           {loading?'loading':"signup"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
