import React, { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import EmailRow from "../components/EmailRow";
import OrderInputField from "../components/OrderInputField";
import TextInputField from "../components/TextInputField";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHelper from "../api/helper";
import ModalAddEmail from "../Modals/ModalAddEmail";
import LoginModal from "../Modals/LoginModal";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { getToken, removeToken } from "../api/token";
import UserModal from "../Modals/UserModal";

function Main() {
  const [searchKey, setSearchKey] = useState("");
  const [direction, setDirection] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(getToken() !== null);
  const [selectedId, setSelectedId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [emails, setEmails] = useState([]);
  const getEmails = async () => {
    let res = await apiHelper(
      () => api.get("/emails/?searchKey=" + searchKey),
      toast,
      () => setLoginModalOpen(true)
    );
    if (!res) return;
    setEmails(res);
  };

  useEffect(() => {
    getEmails();
  }, [refresh]);

  return (
    <div
      id="top"
      className="w-full   flex flex-col gap-6 justify-start items-center p-[1rem] h-screen relative  "
    >
      <ToastContainer autoClose="1000" />
      <ModalAddEmail
        open={addModalOpen}
        id={selectedId}
        refresh={() => setRefresh((refresh) => !refresh)}
        setLoginModalOpen={() => setLoginModalOpen(true)}
        onClose={() => setAddModalOpen(false)}
      />
      <LoginModal
        open={loginModalOpen}
        setLoggedIn={setLoggedIn}
        onClose={() => setLoginModalOpen(false)}
      />
      <UserModal
        open={userModalOpen}
        setLoggedIn={setLoggedIn}
        onClose={() => setUserModalOpen(false)}
      />

      {/* Search Section */}
      <div className="flex gap-2">
        <TextInputField
          text={searchKey}
          setText={setSearchKey}
          onEnter={() => getEmails()}
        />
        <OrderInputField direction={direction} setDirection={setDirection} />
        <AddButton onClick={() => setAddModalOpen(true)}></AddButton>
        <div
          className={`px-2 py-1 flex justify-center items-center group   bg-primary rounded-lg cursor-pointer`}
          onClick={() => {
            if (!loggedIn) {
              setLoginModalOpen(true);
            } else {
              removeToken();
              toast.success("Logged Out!");
              setLoggedIn(false);
            }
          }}
        >
          {!loggedIn ? (
            <AiOutlineLogin
              className={` stroke-[1rem]  group-hover:fill-black  `}
            />
          ) : (
            <AiOutlineLogout
              className={` stroke-[1rem]  group-hover:fill-black  `}
            />
          )}
        </div>
        <div
          className={`px-2 py-1 flex justify-center items-center group   bg-primary rounded-lg cursor-pointer`}
        >
          <AiOutlineUser
            onClick={() => setUserModalOpen(true)}
            className={` stroke-[1rem]  group-hover:fill-black  `}
          />
        </div>
      </div>

      {/* Emails */}
      <div className="w-[80%] flex flex-col gap-4 items-center ">
        {emails.map((email, index) => (
          <EmailRow
            email={email}
            refresh={() => setRefresh((refresh) => !refresh)}
            key={index}
            setSelectedId={() => setSelectedId(email.id)}
            setAddModalOpen={() => setAddModalOpen(true)}
            setLoginModalOpen={() => setLoginModalOpen(true)}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
