import React from "react";

function FormContainer({ children }) {
  return (
    <div className="flex flex-col gap-4 items-center relative">{children}</div>
  );
}

export default FormContainer;
