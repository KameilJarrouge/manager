import React, { useState } from "react";
import TextField from "../_components/Input/TextField";
import api from "../_lib/api";
import { toast } from "react-toastify";
import DateField from "../_components/Input/DateField";
import KeyValueInput from "../_components/Input/KeyValueInput";
import SubmitButton from "../_components/Input/SubmitButton";
import { GoPlus } from "react-icons/go";
import LoadingComponent from "../_components/LoadingComponent";

function UpdateAccountForm({ account, afterSubmit = (f) => f }) {
  const [owner, setOwner] = useState(account.owner);
  const [email, setEmail] = useState(account.email);
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState(account.password);
  const [provider, setProvider] = useState(account.provider);
  const [createdAt, setCreatedAt] = useState(account.createdAt);
  const [additionalInfo, setAdditionalInfo] = useState(
    JSON.parse(account.additionalInfo)
  );
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setOwner("");
    setEmail("");
    setUsername("");
    setPassword("");
    setProvider("");
    setCreatedAt(new Date());
    setAdditionalInfo([]);
  };

  const restore = () => {
    setOwner(account.owner);
    setEmail(account.email);
    setUsername(account.username);
    setPassword(account.password);
    setProvider(account.provider);
    setCreatedAt(account.createdAt);
    setAdditionalInfo(JSON.parse(account.additionalInfo));
  };

  const handleUpdateAccount = async () => {
    setIsLoading(true);
    let result = await api.put(`/accounts/${account.id}/update`, {
      owner,
      email,
      username,
      password,
      provider,
      createdAt,
      additional: JSON.stringify(additionalInfo),
    });
    setIsLoading(false);
    if (result.data.success) {
      toast("Updated Account!");
    }
    clearForm();
    afterSubmit();
  };

  const handleAddingAdditionalInfo = () => {
    setAdditionalInfo([
      ...additionalInfo,
      { key: "", value: "", canCopy: false, hidden: false },
    ]);
  };

  const handleAddRow = (index, row) => {
    const updatedFields = [...additionalInfo];
    updatedFields[index] = row;
    setAdditionalInfo(updatedFields);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedFields = additionalInfo.filter(
      (_, index) => index !== indexToRemove
    );
    setAdditionalInfo(updatedFields);
  };
  return (
    <div className="flex flex-col items-center w-full h-full py-2 px-2 relative">
      {isLoading && <LoadingComponent />}
      <span className="w-full text-center font-semibold text-lg h-[10%]">
        Update Account
      </span>
      <div className="flex gap-4  py-4 h-[80%]">
        <div className="flex flex-col gap-4 items-center">
          <TextField state={owner} setState={setOwner} placeholder={"Owner"} />
          <TextField state={email} setState={setEmail} placeholder={"Email"} />
          <TextField
            state={username}
            setState={setUsername}
            placeholder={"Username"}
          />
          <TextField
            state={password}
            setState={setPassword}
            placeholder={"Password"}
            hidden
          />
          <TextField
            state={provider}
            setState={setProvider}
            placeholder={"Provider"}
          />
          <DateField state={createdAt} setState={setCreatedAt} />
        </div>
        <div className="h-full w-[1px] bg-input_bg"></div>

        <div className="flex flex-col items-center h-full gap-4 min-w-[33ch]">
          <span className="border-b border-input_bg w-full ">
            Additional Information
          </span>
          <div className=" pb-1 w-full overflow-y-auto overflow-x-hidden  relative flex flex-col gap-2  pr-2">
            {additionalInfo.map((row, index, arr) => (
              <div
                key={index}
                id={index === arr.length - 1 ? "last_row" : undefined}
                className="flex flex-col w-full gap-2"
              >
                <KeyValueInput
                  setRow={(row) => handleAddRow(index, row)}
                  removeKeyValue={() => handleDeleteRow(index)}
                  row={row}
                />
                {arr.length - 1 !== index && (
                  <div className="w-full h-[1px] bg-input_bg" />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddingAdditionalInfo}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
          </button>
        </div>
      </div>
      <SubmitButton title="Update" onSubmit={handleUpdateAccount} />
    </div>
  );
}

export default UpdateAccountForm;
