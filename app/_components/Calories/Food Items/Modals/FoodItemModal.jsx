import Modal from "@/app/_components/Modals/Modal";
import React from "react";
import NewFoodItemForm from "../Forms/NewFoodItemForm";
import UpdateFoodItemForm from "../Forms/UpdateFoodItemForm";

function FoodItemModal({ isOpen, close, foodItem }) {
  return (
    <Modal
      key={"Food_Item_Modal"}
      id={"Food_Item_Modal"}
      isOpen={isOpen}
      close={close}
      title={foodItem ? "Update Food Item" : "New Food Item"}
      className={"gap-4 relative"}
    >
      {foodItem ? (
        <UpdateFoodItemForm closeModal={close} foodItem={foodItem} />
      ) : (
        <NewFoodItemForm closeModal={close} />
      )}
    </Modal>
  );
}

export default FoodItemModal;
