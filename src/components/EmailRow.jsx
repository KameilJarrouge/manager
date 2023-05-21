import moment from "moment";
import React, { useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { toast } from "react-toastify";
import api from "../api/api";
import apiHelper from "../api/helper";

function EmailRow({
  email,
  setAddModalOpen,
  setSelectedId,
  setLoginModalOpen,
  refresh,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [accountsVisible, setAccountsVisible] = useState(false);
  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied Text!");
  };
  const handleRemove = async () => {
    if (confirm(`delete ${email.email}?`)) {
      let res = await apiHelper(
        () => api.delete(`/emails/${email.id}/delete`),
        toast,
        () => setLoginModalOpen(true)
      );
      if (!res) return;
      toast.success("Email Deleted!");
      refresh();
    }
  };

  return (
    <div className="w-[80%] max-w-[100ch] flex select-none items-center  shadow rounded-md shadow-white/40 ">
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          handleRemove();
        }}
        onDoubleClick={() => {
          setSelectedId();
          setAddModalOpen();
        }}
        className="font-semibold text-lg h-full w-1/4   flex  justify-center items-center bg-white/90 rounded-l-md p-2 text-dark "
      >
        {email.name}
      </div>
      <div className="flex flex-col gap-1 bg-white/20 w-full  rounded-r-md p-2  ">
        {/* email */}
        <div className="flex justify-between items-center ">
          <div className="font-semibold text-lg text-important">
            {email.email}{" "}
            <span className="text-less-important">({email.username})</span>
          </div>
          <AiOutlineCopy
            onClick={() => handleCopy(email.email)}
            className="w-[1.2rem] h-fit fill-less-important hover:fill-primary cursor-pointer"
          />
        </div>
        <div className="w-full h-[1px] bg-white/20"></div>
        {/* password */}
        <div className="flex justify-between  items-center ">
          <div className="text-less-important flex  ">
            {passwordVisible ? email.password : "*".repeat(25)}
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-[1px] h-[1rem] bg-white"></div>
            {passwordVisible ? (
              <AiOutlineEyeInvisible
                className="w-[1.2rem] h-fit fill-less-important hover:fill-primary cursor-pointer"
                onClick={() => setPasswordVisible(false)}
              />
            ) : (
              <AiOutlineEye
                className="w-[1.2rem] h-fit fill-less-important hover:fill-primary cursor-pointer"
                onClick={() => setPasswordVisible(true)}
              />
            )}

            <AiOutlineCopy
              onClick={() => handleCopy(email.password)}
              className="w-[1.2rem] h-fit fill-less-important hover:fill-primary cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/20"></div>
        {/* createdAt */}
        <div className="text-less-important italic">
          {moment(email.createdAt).format("yyyy-MM-DD hh:mm:ss a")}
        </div>
        <div className="w-full h-[1px] bg-white/20"></div>
        {/* accounts */}
        <div className="flex flex-col gap-2 text-less-important ">
          <div className="font-semibold flex justify-between items-center">
            Accounts
            <AiOutlineArrowDown
              className={`w-[1.2rem] h-fit ${
                accountsVisible && "rotate-180"
              } transition-transform hover:fill-primary cursor-pointer`}
              onClick={() => setAccountsVisible((visible) => !visible)}
            />
          </div>
          {accountsVisible && (
            <div className="p-1 flex flex-col gap-2">
              {email.Accounts.map((account, index) => (
                <>
                  <div key={index}>{account.website_name}</div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailRow;
