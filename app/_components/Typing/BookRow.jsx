import React from "react";
import CircularProgress from "../CircularProgress";
import { MdStar } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

function BookRow({ onClick, book, isSelected, onContextMenu, isLastStop }) {
  return (
    <button
      id={`book-${book.id}`}
      onClick={() => onClick()}
      onContextMenu={onContextMenu}
      key={book.id}
      className={`flex justify-between items-center w-full py-1 px-0.5 rounded-l-sm rounded-r-3xl 
        shadow shadow-black relative
       border-l-[6px]  
       ${
         book._count.Chapters === book.Chapters.length
           ? "text-foreground/50"
           : ""
       }
       ${
         isSelected
           ? "border-l-foreground bg-secondary"
           : "border-l-foreground/50 hover:bg-secondary/60 bg-secondary/30"
       }`}
    >
      {isLastStop && (
        <div className="absolute top-0 left-0 h-full w-[4px] bg-accent " />
      )}
      <h2 className="w-[38ch] 2xl:w-[58ch] text-wrap px-1  text-start">
        {book.title}
        <span className="text-xs px-2 text-foreground/50">
          {`${book._count.Chapters}/${book.Chapters.length}`}
        </span>
      </h2>

      <CircularProgress
        progress={Math.round(
          (book._count.Chapters * 100) / (book.Chapters.length || 1)
        )}
      />
    </button>
  );
}

export default BookRow;
