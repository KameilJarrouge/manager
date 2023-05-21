import { useFormikContext } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function AppFormField({ name, title, type = "text", shouldSubmitOnEnter }) {
  const {
    setFieldTouched,
    values,
    setFieldValue,
    errors,
    handleChange,
    submitForm,
  } = useFormikContext();
  const [isPassword, setIsPassword] = useState(type === "password");
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {title}
        {type === "password" &&
          (isPassword ? (
            <AiFillEye onClick={() => setIsPassword(false)} />
          ) : (
            <AiFillEyeInvisible onClick={() => setIsPassword(true)} />
          ))}
      </div>
      <input
        onKeyDown={(e) => {
          if (!shouldSubmitOnEnter) return;
          if (e.key === "Enter") {
            submitForm();
          }
        }}
        type={type === "password" ? (isPassword ? type : "text") : type}
        className="px-1 py-0.5 bg-white/10 min-w-[30ch] text-white/90 border-b border-b-transparent focus:border-b-white outline-none"
        onChange={handleChange(name)}
        value={values[name]}
      />
    </div>
  );
}

export default AppFormField;
