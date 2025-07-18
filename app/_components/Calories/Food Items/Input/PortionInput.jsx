import React, { useState } from "react";
import TextField from "../../../Input/TextField";
import NumberField from "../../../Input/NumberField";
import SubmitButton from "../../../Input/SubmitButton";
import { GoPlus } from "react-icons/go";

function PortionInput({ addPortion }) {
  const [name, setName] = useState("");
  const [factor, setFactor] = useState(null);
  const handleResetFields = () => {
    setName("");
    setFactor("");
  };

  const handleAddPortion = () => {
    if (name === "" || factor === null) return;
    addPortion({ [name]: factor });
    handleResetFields();
  };
  return (
    <div className="flex flex-col gap-1 items-center">
      <TextField placeholder={"Portion Name"} state={name} setState={setName} />
      <NumberField
        placeholder={"Portion Factor"}
        state={factor}
        setState={setFactor}
      />
      <button
        onClick={handleAddPortion}
        className=" p-1 hover:bg-blue-600  rounded transition-colors"
      >
        <GoPlus className="w-[1.5rem] h-fit text-foreground" />
      </button>{" "}
    </div>
  );
}

export default PortionInput;
