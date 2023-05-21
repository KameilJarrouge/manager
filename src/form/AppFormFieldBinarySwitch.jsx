import { BinarySwitchInput } from "./../components/BinarySwitchInput";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

function AppFormFieldBinarySwitch({
  name,
  title = "",
  svg = null,
  displayOn = "Male",
  displayOff = "Female",
  ...otherProps
}) {
  const [focused, setFocuesd] = useState(true);
  const { setFieldTouched, values, setFieldValue, errors } = useFormikContext();

  return (
    <div className={`text-left my-2  w-full`}>
      <div dir="ltr" className={`flex flex-col text-light   `}>
        {/* title */}
        <div
          className={`
             font-bold text-sm 2xl:text-base flex justify-start items-center gap-2 border-b-2 
          ${
            focused
              ? "border-b-light  transition-all duration-500  font-bold   "
              : "border-b-transparent"
          }`}
        >
          {svg}
          {title}
        </div>
        {/* input */}

        <BinarySwitchInput
          className={"mt-2 py-0.5"}
          setValue={(value) => setFieldValue(name, value)}
          onFocus={() => setFocuesd(true)}
          onBlur={() => {
            setFieldTouched(name, true);
            setFocuesd(false);
          }}
          displayOn={displayOn}
          displayOff={displayOff}
          value={values[name]}
        />
      </div>
    </div>
  );
}

export default AppFormFieldBinarySwitch;
