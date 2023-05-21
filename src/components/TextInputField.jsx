import React from "react";

function TextInputField({
  text,
  setText,
  placeholder = "Search Emails",
  onEnter = (f) => f,
}) {
  return (
    <input
      className="min-w-[40ch] w-fit grow text-center bg-white/95 text-dark/80 rounded-lg outline-none py-1"
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === "Enter") onEnter();
      }}
      value={text}
      onChange={(e) => {
        e.preventDefault();
        setText(e.target.value);
      }}
    />
  );
}

export default TextInputField;
