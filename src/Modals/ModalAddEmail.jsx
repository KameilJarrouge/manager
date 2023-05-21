import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import apiHelper from "../api/helper";
import AppModal from "./AppModal";
import AppForm from "../form/AppForm";
import AppFormField from "../form/AppFormField";
function ModalAddEmail({ open, onClose, refresh, id = 0, setLoginModalOpen }) {
  const [email, setEmail] = useState({
    name: "",
    email: "",
    createdAt: new Date(),
    username: "",
    password: "",
  });
  const handleSubmit = async (values) => {
    let res = await apiHelper(
      () => api.post("/emails/create", values),
      toast,
      () => {
        onClose();
        setLoginModalOpen(true);
      }
    );
    if (!res) return;
    refresh();
    toast.success("Email Created!");
    onClose();
  };
  const getEmail = async () => {
    let res = await apiHelper(
      () => api.get(`emails/${id}`),
      toast,
      () => {
        onClose();
        setLoginModalOpen(true);
      }
    );
    if (!res) return;
    console.log(res);
    setEmail(res);
  };
  useEffect(() => {
    if (id === 0) return;
    getEmail();
  }, [id]);
  return (
    <AppModal
      closeModal={onClose}
      className="rounded-lg fixed left-0 right-0 top-0 bottom-0 w-fit h-fit p-7 mx-auto mt-1  bg-dark min-w-[25rem]  shadow-md shadow-black outline-none text-white "
      modalIsOpen={open}
    >
      <div className="flex flex-col gap-4 items-center">
        {/* title */}
        <div className="text-lg font-bold text-center border-b-2 border-b-white/70 ">
          {id === 0 ? "New" : "Update"} Email
        </div>
        {/* form */}
        <div className="flex flex-col gap-2">
          <AppForm
            validationSchema={null}
            onSubmit={handleSubmit}
            initialValues={{
              name: email.name,
              email: email.email,
              createdAt: moment(email.createdAt).format("YYYY-MM-DDThh:mm"),
              username: email.username,
              password: email.password,
            }}
          >
            <AppFormField name={"name"} title={"name"} />
            <AppFormField name={"username"} title={"username"} type="email" />
            <AppFormField name={"email"} title={"email"} />
            <AppFormField
              name={"password"}
              title={"password"}
              type="password"
            />
            <AppFormField
              name={"createdAt"}
              title={"created at"}
              type="datetime-local"
              shouldSubmitOnEnter={true}
            />
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default ModalAddEmail;
