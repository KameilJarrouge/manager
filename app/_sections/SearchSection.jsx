"use client";
import React, { useEffect } from "react";
import SearchField from "../_components/Input/SearchField";

function SearchSection() {
  const handleKeyPress = (e) => {
    if (e.key === "/") {
      const searchBar = document.getElementById("search-input");
      // const modalContent = document.getElementById("content");
      // && !modalContent
      if (searchBar && document.activeElement !== searchBar) {
        e.preventDefault();
        searchBar.focus();
      }
      return;
    }
  };

  useEffect(() => {
    const body = document.getElementById("body");
    if (!body) return;

    body.addEventListener("keypress", handleKeyPress);

    return () => {
      body.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  return (
    <div className="py-2">
      <SearchField id={"search-input"} />
    </div>
  );
}

export default SearchSection;
