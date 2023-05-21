import moment from "moment";
import React, { useState } from "react";
import {
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

function EmailCard({
  name = "Kamil",
  email = "hbyhby4747@gmail.com",
  password = "Breaking the habit 2n8 Breaking the habit 2n8Breaking the habit 2n8",
  createdAt = "2021-11-12",
  accounts = ["a", "b", "c"],
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="bg-white/20 rounded-md flex flex-col px-2 py-3 w-[40ch]  grow ">
      {/* Name */}
      <div className="font-semibold text-xl text-important">{name}</div>
      {/* email */}
      <div className="flex justify-between">
        <div className="font-semibold text-lg text-important">{email}</div>
        <AiOutlineCopy className="w-[1.2rem] h-fit fill-less-important hover:fill-primary cursor-pointer" />
      </div>
      {/* password */}
      <div className="flex justify-between items-center">
        <div className="text-less-important ">
          {passwordVisible ? password : "********"}
        </div>
        <div className="flex gap-2">
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
          <AiOutlineCopy className="w-[1.2rem] h-fit fill-less-important hover:fill-primary cursor-pointer" />
        </div>
      </div>
      {/* createdAt */}
      <div className="text-less-important italic">
        {moment(createdAt).format("yyyy-MM-DD")}
      </div>
      {/* accounts */}
      {accounts.map((account, index) => (
        <div key={index}>{account}</div>
      ))}
    </div>
  );
}

export default EmailCard;
