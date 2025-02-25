"use client";

import { useEffect, useState } from "react";
import api from "@/app/_lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { useStore } from "@/app/store";
import TextField from "@/app/_components/Input/TextField";
import { errorMessages } from "@/app/_constants/constants";
import SubmitButton from "@/app/_components/Input/SubmitButton";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginOrSignUp = async () => {
    let result = await api.get("/auth/user-exists");
    if (result.data.success) {
      setIsLogin(result.data.result);
    }
  };

  useEffect(() => {
    handleLoginOrSignUp();
  }, []);

  let handleSubmitAndClose = async (e) => {
    if ((e && e.key !== "Enter") || password === "") return;

    let url = "/auth/login";
    if (!isLogin) url = "/auth/signup";

    setIsLoading(true);
    let result = await api.post(url, {
      password,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error(errorMessages[result.data.errorCode]);
      return;
    }
    setPassword("");
    toast(`${isLogin ? "Logged In" : "Registered New User"}`);
    // useStore.setState({
    //   isLoggedIn: true,
    // });
    console.log("Submit");

    router.push("/");
  };
  return (
    <div
      onKeyDown={handleSubmitAndClose}
      className="flex flex-col items-center gap-4 p-2 bg-primary"
    >
      <span className="mx-[2rem] font-semibold text-lg">
        {isLogin ? "Login" : "New User"}
      </span>

      {/* Form */}
      <div className="flex flex-col gap-2 items-center">
        <TextField
          placeholder={"Password"}
          state={password}
          setState={setPassword}
          autoFocus
          hidden
        />
        <SubmitButton
          title={isLogin ? "Login" : "Register"}
          onSubmit={handleSubmitAndClose}
        />
      </div>
    </div>
  );
}
