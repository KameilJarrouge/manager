import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

/**
 *
 * @param {bool} direction  true meaning desc,
 * @param {function} setDirection
 * @returns OrderInputFiled
 */
function OrderInputField({ direction, setDirection }) {
  return (
    <div
      className={`px-2 py-1 flex justify-center items-center group   bg-white rounded-lg cursor-pointer`}
      onClick={() => setDirection((direction) => !direction)}
    >
      <AiOutlineArrowDown
        className={`${
          direction && "rotate-180"
        } stroke-[1rem] group-hover:stroke-[2rem] transition-transform `}
      />
    </div>
  );
}

export default OrderInputField;
