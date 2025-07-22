import Modal from "@/app/_components/Modals/Modal";
import React from "react";
import DisplayDay from "./DisplayDay";

function TodayModal({
  isOpen,
  close,
  today,
  totals,
  triggerRefresh,
  difference,
  stats,
}) {
  return (
    <Modal
      key={"Today_Modal"}
      id={"Today_Modal"}
      isOpen={isOpen}
      close={close}
      title={`Today's Calories Information`}
      className={"gap-4 relative"}
    >
      <DisplayDay
        day={today}
        triggerRefresh={triggerRefresh}
        totals={totals}
        difference={difference}
        stats={stats}
      />
    </Modal>
  );
}

export default TodayModal;
