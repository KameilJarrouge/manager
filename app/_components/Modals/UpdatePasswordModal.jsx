"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import api from "../../_lib/api.js";
import { toast } from "react-toastify";
import { errorMessages } from "../../_constants/constants.js";
import TextField from "../Input/TextField.jsx";
import SubmitButton from "../Input/SubmitButton.jsx";
import LoadingComponent from "../LoadingComponent.jsx";
function UpdatePasswordModal({ isOpen, close }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let handleSubmitAndClose = async () => {
    if (!newPassword || !oldPassword) {
      return;
    }

    setIsLoading(true);
    let result = await api.post("/update-password", {
      oldPassword,
      newPassword,
    });
    setIsLoading(false);
    if (!result.data.success) {
      toast.error(errorMessages[result.data.errorCode]);
      return;
    }
    setOldPassword("");
    setNewPassword("");
    toast(`Updated Password`);
    close();
  };

  return (
    <Modal
      key={"Update_Password"}
      isOpen={isOpen}
      close={() => {
        setOldPassword("");
        setNewPassword("");
        close();
      }}
      title={"Update Password"}
      onEnter={handleSubmitAndClose}
      className={"gap-4 relative"}
    >
      {isLoading && <LoadingComponent />}
      <div className="flex flex-col gap-2 items-center ">
        <TextField
          state={oldPassword}
          placeholder={"Old Password"}
          setState={setOldPassword}
          hidden
          autoFocus
        />
        <TextField
          state={newPassword}
          placeholder={"New Password"}
          setState={setNewPassword}
          hidden
        />
        <SubmitButton onSubmit={handleSubmitAndClose} title="Submit" />
      </div>
    </Modal>
  );
}

export default UpdatePasswordModal;
