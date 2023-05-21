import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import apiHelper from "../api/helper";
import { setToken } from "../api/token";
import AppModal from "./AppModal";

function LoginModal({ open, onClose, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    let res = await apiHelper(
      () =>
        api.post("/login", {
          username: username,
          password: password,
        }),
      toast
    );
    setUsername("");
    setPassword("");
    setToken(res.accessToken);
    setLoggedIn(true);
    toast.success("Logged In!");
    onClose();
  };
  return (
    <AppModal
      closeModal={onClose}
      className="rounded-lg fixed left-0 right-0 top-0 bottom-0 w-fit h-fit p-7 mx-auto mt-1  bg-dark min-w-[25rem]  shadow-md shadow-black outline-none text-white "
      modalIsOpen={open}
    >
      <div className="flex flex-col gap-4 items-center">
        {/* title */}
        <div className="text-lg font-bold text-center border-b-2 border-b-white/70 ">
          Login
        </div>
        {/* form */}
        <div className="flex flex-col gap-2">
          {/* input */}
          <div className="flex flex-col gap-1">
            <span>username</span>
            <input
              type="text"
              className="px-1 py-0.5 bg-white/10 min-w-[30ch] text-white/90 border-b border-b-transparent focus:border-b-white outline-none"
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>
          {/* input */}
          <div className="flex flex-col gap-1">
            <span>password</span>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              type="password"
              className="px-1 py-0.5 bg-white/10 min-w-[30ch] text-white/90 border-b border-b-transparent focus:border-b-white outline-none"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
        </div>
      </div>
    </AppModal>
  );
}

export default LoginModal;
