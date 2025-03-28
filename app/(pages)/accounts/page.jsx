"use client";
import SubmitButton from "@/app/_components/Input/SubmitButton";
import TextField from "@/app/_components/Input/TextField";
import LoadingComponent from "@/app/_components/LoadingComponent";
import SideMenu from "@/app/_components/SideMenu";
import AccountsList from "@/app/_displayLists/AccountsList";
import CreateAccountForm from "@/app/_forms/CreateAccountForm";
import UpdateAccountForm from "@/app/_forms/UpdateAccountForm";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdSearch } from "react-icons/md";

function Accounts() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(undefined);
  const [searchKey, setSearchKey] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAccounts = async () => {
    setSelectedAccount(undefined);
    setIsLoading(true);
    let result = await api.get("/accounts");
    if (result.data.success) {
      setAccounts(result.data.result);
    }
    setIsLoading(false);
  };

  const searchAccounts = async () => {
    setSelectedAccount(undefined);
    if (!searchKey) return;
    setIsLoading(true);
    let result = await api.get(`/accounts/search?searchKey=${searchKey}`);
    setIsLoading(false);
    if (result.data.success) setAccounts(result.data.result);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="w-full h-full relative pr-[4rem]  pl-[2rem]  overflow-x-hidden">
      {/* Main */}
      <div className="w-full  h-full  flex flex-col gap-4">
        {/* Header */}
        <div className="w-full  flex gap-2 pt-0.5 items-center">
          {/* Search */}
          <div className="flex gap-2 items-center h-fit">
            <TextField
              placeholder={"Search Key"}
              state={searchKey}
              setState={setSearchKey}
            />
            <button
              onClick={searchAccounts}
              className="p-1 hover:bg-green-600 rounded transition-colors"
            >
              <MdSearch className="w-[1.5rem] h-fit" />
            </button>
            <button
              onClick={() => {
                setSearchKey("");
                getAccounts();
              }}
              className="p-1 hover:bg-red-600  rounded transition-colors"
            >
              <GoPlus
                className="w-[1.5rem] h-fit rotate-45"
                strokeWidth={0.7}
              />
            </button>
          </div>
          <div className="w-[1px] h-full bg-input_bg" />
          {/* New Button */}
          <button
            onClick={() => {
              setSelectedAccount(undefined);
              setIsSideMenuOpen(true);
            }}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
          </button>
        </div>

        {/* Content */}
        <div className=" w-full h-full relative">
          {isLoading && <LoadingComponent />}
          <AccountsList
            accounts={accounts}
            selectedAccount={selectedAccount}
            onAccountSelect={(selectedAccount, openMenu) => {
              setSelectedAccount(selectedAccount);
              if (openMenu) setIsSideMenuOpen(true);
            }}
          />
        </div>
      </div>
      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"accounts"}
      >
        {!selectedAccount ? (
          <CreateAccountForm
            afterSubmit={() => {
              setIsSideMenuOpen(false);
              getAccounts();
            }}
          />
        ) : (
          <UpdateAccountForm
            afterSubmit={() => {
              setSelectedAccount(undefined);
              setIsSideMenuOpen(false);
              getAccounts();
            }}
            account={selectedAccount}
          />
        )}
      </SideMenu>
    </div>
  );
}

export default Accounts;
