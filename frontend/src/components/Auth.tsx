import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@aman06yadav/medium-common";
import axios from "axios";
import {BACKEND_URL} from "../../config";

type prop = {
  type : string
}

export const  Auth = ({type} : prop) => {
  const [data , setData] = useState<SignupInput>({
    name : "",
    username : "",
    password : ""
  })
  const navigate = useNavigate();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,data);
    const jwt=res.data;
    localStorage.setItem("token",jwt.token)
    localStorage.setItem("user",jwt.name)
    navigate('/blogs');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black text-center">
            { type ==="signin" ? "SignIn" : "SignUp" }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            { type==="signup" ? <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-black">
                Name
              </Label>
              <Input
                id="name"
                placeholder="john doe"
                className="w-full border-gray-300 text-black"
                onChange={(e) => {
                    setData({
                        ...data,
                        name : e.target.value
                    })
                }}
              />
            </div> : null
            }
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-black"
              >
                Username
              </Label>
              <Input
                id="username"
                placeholder="john@gmail.com"
                required
                className="w-full border-gray-300 text-black"
                onChange={(e) => {
                    setData({
                        ...data,
                        username : e.target.value
                    })
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-black"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="john@123"
                required
                className="w-full border-gray-300 text-black"
                onChange={(e) => {
                    setData({
                        ...data,
                        password : e.target.value
                    })
                }}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              { type ==="signin" ? "SignIn" : "SignUp" }
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
          { type ==="signin" ? "Don't have an account?" : "Already have an account?" }{" "}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="text-black font-semibold hover:underline"
            >
             { type ==="signin" ? "SignUp" : "SignIn" }
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
