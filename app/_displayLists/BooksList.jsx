import React from "react";
import { GoPlus } from "react-icons/go";
import BookRow from "../_components/Typing/BookRow";
import { LuScroll } from "react-icons/lu";

function BooksList({
  setSelectedSideMenu,
  clearBookSelection,
  setIsSideMenuOpen,
  books,
  setSelectedBookIndex,
  selectedBookIndex,
  lastStop,
}) {
  const handleScrollToCurrent = () => {
    const element = document.getElementById(`book-${lastStop.lastBookId}`);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="w-[38%] px-0.5 h-full flex flex-col gap-4 ">
      {/* Header */}
      <div className="w-full border-b border-b-foreground/30 flex justify-between items-center">
        <span>
          Books{" "}
          <span className="text-sm text-foreground/50">
            Right Click To Edit
          </span>
        </span>
        <div className={`flex gap-2 items-center `}>
          <button
            className={`p-1 hover:bg-blue-600 rounded transition-colors `}
            onClick={handleScrollToCurrent}
          >
            <LuScroll />
          </button>
          <button
            onClick={() => {
              setSelectedSideMenu("newBook");
              clearBookSelection();
              setIsSideMenuOpen(true);
            }}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.2rem] h-fit" />
          </button>
        </div>
      </div>
      {/* List of Books */}
      <div className="flex flex-col gap-2 w-full pr-2 pb-0.5  h-[68vh] 2xl:h-[75vh] overflow-y-auto overflow-x-hidden">
        {books.map((book, index) => (
          <BookRow
            key={book.id}
            book={book}
            onClick={() => setSelectedBookIndex(index)}
            isSelected={selectedBookIndex === index}
            onContextMenu={(e) => {
              e.preventDefault();
              setSelectedBookIndex(index);
              setSelectedSideMenu("editBook");
              setIsSideMenuOpen(true);
            }}
            isLastStop={lastStop.lastBookId === book.id}
          />
        ))}
      </div>
    </div>
  );
}

export default BooksList;
