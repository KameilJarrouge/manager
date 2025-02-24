import React from "react";

function SubmitButton({ title = "Submit", onSubmit = (f) => f }) {
  return (
    <button
      onClick={onSubmit}
      className="px-2 py-1 rounded-sm bg-accent/80 hover:bg-accent w-fit mt-2 "
    >
      {title}
    </button>
  );
}

export default SubmitButton;
