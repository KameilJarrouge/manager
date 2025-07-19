import Modal from "@/app/_components/Modals/Modal";
import React from "react";
import DisplayToday from "./DisplayToday";

function TodayModal({ isOpen, close }) {
  return (
    <Modal
      key={"Today_Modal"}
      id={"Today_Modal"}
      isOpen={isOpen}
      close={close}
      title={`Today's Calories Information`}
      className={"gap-4 relative"}
    >
      <DisplayToday />
    </Modal>
  );
}

export default TodayModal;
