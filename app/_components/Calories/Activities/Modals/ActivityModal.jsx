import Modal from "@/app/_components/Modals/Modal";
import React from "react";
import NewActivityForm from "../Forms/NewActivityForm";
import UpdateActivityForm from "../Forms/UpdateActivityForm";

function ActivityModal({ isOpen, close, activity }) {
  return (
    <Modal
      key={"Activity_Modal"}
      id={"Activity_Modal"}
      isOpen={isOpen}
      close={close}
      title={activity ? "Update Activity" : "New Activity"}
      className={"gap-4 relative"}
    >
      {activity ? (
        <UpdateActivityForm activity={activity} closeModal={close} />
      ) : (
        <NewActivityForm closeModal={close} />
      )}
    </Modal>
  );
}

export default ActivityModal;
