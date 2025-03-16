"use client";
import React, { useEffect } from "react";
function Modal({
  isOpen,
  close,
  title,
  children,
  onEnter,
  className,
  id = "",
}) {
  const handleOutsideClick = (event) => {
    const content = document.getElementById("content");
    if (!content) {
      return;
    }
    if (!content.contains(event.target)) {
      close();
    }
  };

  const handleEnterPress = async (event) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const modalContainer = document.getElementById("modal-container-" + id);
    if (!modalContainer) {
      return;
    }

    modalContainer.addEventListener("click", handleOutsideClick);

    return () => {
      modalContainer.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      id={"modal-container-" + id}
      tabIndex={"0"}
      onKeyDown={handleEnterPress}
    >
      {isOpen && (
        <div className="fixed left-0 top-0 w-full h-full  bg-black bg-opacity-30 z-50 overflow-auto backdrop-blur flex flex-col justify-center items-center ">
          <div id="content" className="m-auto flex flex-col justify-start ">
            <div
              className={`flex flex-col items-center gap-4 p-2 bg-primary shadow-2xl shadow-black/50 animate-popIn  min-w-[16rem] ${className}`}
            >
              <span className="mx-[2rem] font-semibold text-lg">{title}</span>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
