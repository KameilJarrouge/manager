import Modal from "@/app/_components/Modals/Modal";
import React from "react";
import NewMealForm from "../Forms/NewMealForm";
import UpdateMealForm from "../Forms/UpdateMealForm";

function MealModal({ isOpen, close, meal }) {
  return (
    <Modal
      key={"Meal_Modal"}
      id={"Meal_Modal"}
      isOpen={isOpen}
      close={close}
      title={meal ? "Update Meal" : "New Meal"}
      className={"gap-4 relative"}
    >
      {meal ? (
        <UpdateMealForm closeModal={close} meal={meal} />
      ) : (
        <NewMealForm closeModal={close} />
      )}
    </Modal>
  );
}

export default MealModal;
