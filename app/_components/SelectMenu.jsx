import React from "react";

function SelectMenu({ items = [{ title: "title", action: (f) => f }] }) {
  return (
    <li>
      {items.map((item) => (
        <option>{item.title}</option>
      ))}
    </li>
  );
}

export default SelectMenu;
