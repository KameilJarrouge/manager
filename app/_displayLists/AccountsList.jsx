import moment from "moment";
import React from "react";
import { MdChevronRight, MdInfoOutline } from "react-icons/md";
import copy from "clipboard-copy";
import { toast } from "react-toastify";

function AccountsList({
  accounts,
  onAccountSelect = (f) => f,
  selectedAccount,
}) {
  const copyFunc = async (value) => {
    await copy(value);
    toast("Copied to clipboard", { position: "bottom-center" });
  };
  return (
    <div className="w-full h-full flex gap-0.5 px-2 ">
      <div
        className="w-[calc(100%-30ch-1px-0.250rem)] h-full flex flex-col gap-2 border-collapse pr-2
      "
      >
        <div className="flex w-full border-b border-foreground/50">
          <span className="truncate text-wrap w-[10%] ">Owner</span>
          <span className="truncate text-wrap w-[30%] ">Email</span>
          <span className="truncate text-wrap w-[20%] ">Username</span>
          <span className="truncate text-wrap w-[10%] ">Password</span>
          <span className="truncate text-wrap w-[10%] ">Provider</span>
          <span className="truncate text-wrap w-[12%] ">Created At</span>
          <span className="truncate text-wrap w-[8%] "></span>
        </div>
        <div className="w-full flex flex-col gap-1  overflow-y-auto h-[60vh] 2xl:h-[75vh] ">
          {accounts.map((account, index) => (
            <div
              key={index}
              className={`flex w-full border-b border-input_bg items-center ${
                (selectedAccount?.id || -1) === account.id && "bg-input_bg"
              }`}
            >
              <span className="truncate text-wrap w-[10%] pl-1">
                {account.owner}
              </span>
              <button
                onClick={async () => {
                  await copyFunc(account.email);
                }}
                className="truncate text-wrap w-[30%] hover:text-green-400 text-start"
              >
                {account.email}
              </button>
              <button
                onClick={async () => {
                  await copyFunc(account.username);
                }}
                className="truncate text-wrap w-[20%] hover:text-green-400 text-start"
              >
                {account.username}
              </button>
              <button
                onClick={async () => {
                  await copyFunc(account.password);
                }}
                className="truncate text-wrap w-[10%] hover:text-green-400 text-start"
              >
                {"*".repeat(5)}
              </button>
              <span className="truncate text-wrap w-[10%] ">
                {account.provider}
              </span>
              <span className="truncate text-wrap w-[12%] ">
                {moment(account.createdAt).format("YYYY/MM/DD")}
              </span>
              <div className="w-[8%] flex justify-center items-center gap-2">
                <button
                  onClick={() => onAccountSelect(account, false)}
                  className="truncate text-wrap  hover:text-green-400 flex justify-center "
                >
                  <MdInfoOutline className="w-[1.1rem] h-fit" />
                </button>
                <button
                  onClick={() => onAccountSelect(account, true)}
                  className="truncate text-wrap  hover:text-green-400 flex justify-center "
                >
                  <MdChevronRight className="w-[1.5rem] h-fit" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[1px] h-full bg-input_bg " />
      <div className="w-[30ch] flex flex-col items-center h-full gap-4 pl-2 ">
        <span className="border-b border-input_bg w-full ">
          Additional Information
        </span>
        <div className=" pb-1 w-full overflow-y-auto overflow-x-hidden h-[60vh] 2xl:h-[70vh]  relative flex flex-col gap-2  pr-2">
          {JSON.parse(selectedAccount?.additional || "[]").map(
            (row, index, arr) => (
              <div key={index} className="flex flex-col w-full ">
                <div className="w-full flex justify-between">
                  <span className="w-[20%] truncate text-wrap">
                    {row.key + ":"}
                  </span>
                  <button
                    onClick={async () => {
                      if (!row.canCopy) return;
                      await copyFunc(row.value);
                    }}
                    className={`w-[80%] truncate text-wrap text-end ${
                      row.canCopy ? "hover:text-green-400" : "cursor-default"
                    }`}
                  >
                    {row.hidden ? "*".repeat(5) : row.value}
                  </button>
                </div>
                {arr.length - 1 !== index && (
                  <div className="w-full h-[1px] bg-input_bg" />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountsList;
