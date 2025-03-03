"use client";
import React, { useEffect, useState } from "react";
import SearchField from "../_components/Input/SearchField";

function SearchSection() {
  const [SearchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isCollapsing, setIsCollapsing] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "/") {
      const searchBar = document.getElementById("search-input");
      if (searchBar && document.activeElement !== searchBar) {
        e.preventDefault();
        searchBar.focus();
      }
    }
  };
  const closeMenu = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      setSearchResultsOpen(false);
    }, 180);
  };
  const openMenu = () => {
    setIsCollapsing(false);
    setSearchResultsOpen(true);
  };

  /**
   * handles hiding the menu when clicked outside
   * @param {Object} e mouse click event
   */
  const handleMouseClick = (e) => {
    const menu = document.getElementById("search-result-menu");
    const searchInput = document.getElementById("search-input");
    if (!menu.contains(e.target) && !searchInput.contains(e.target)) {
      closeMenu();
    }
  };
  useEffect(() => {
    const body = document.getElementById("body");
    if (!body) return;

    body.addEventListener("keypress", handleKeyPress);
    body.addEventListener("mousedown", handleMouseClick);

    return () => {
      body.removeEventListener("keypress", handleKeyPress);
      body.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);
  return (
    <div
      tabIndex={"-1"}
      // onKeyDown={(e) => {
      //   if (e.key === "Tab" || e.key === "CTRL" || e.key === "Alt") return;
      //   if (e.key === "Escape") {
      //     closeMenu();
      //   } else {
      //     openMenu();
      //   }
      // }}
      className="py-2 w-full flex justify-center relative outline-none"
    >
      <SearchField
        id={"search-input"}
        onFocus={() => {
          if (searchKey !== "") {
            openMenu();
          }
        }}
        onKeyDown={(e) => {
          if (
            e.key === "Tab" ||
            e.key === "Control" ||
            e.key === "Alt" ||
            e.key === "Shift"
          )
            return;
          if (e.key === "Escape") {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        state={searchKey}
        setState={setSearchKey}
      />
      <div
        id="search-result-menu"
        className={`  z-20 top-[3rem] ${
          SearchResultsOpen ? "absolute" : "hidden"
        } ${
          isCollapsing ? "animate-collapse" : "animate-expand"
        } bg-secondary h-[30rem] 2xl:h-[40rem] w-[80%] origin-center rounded py-2 px-4 text-justify  shadow shadow-black`}
      ></div>
    </div>
  );
}

export default SearchSection;
