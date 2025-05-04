import React from "react";
import { GoPlus } from "react-icons/go";
import ChapterRow from "../_components/Typing/ChapterRow";
import { LuScroll } from "react-icons/lu";

function ChaptersList({
  setSelectedSideMenu,
  setIsSideMenuOpen,
  books,
  selectedBookIndex,
  clearChapterSelection,
  setSelectedChapterIndex,
  selectedChapterIndex,
  lastStop,
}) {
  const handleScrollToCurrent = () => {
    const element = document.getElementById(
      `chapter-${lastStop.lastChapterId}`
    );
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="w-[38%] px-0.5 h-full flex flex-col gap-4 ">
      {/* Header */}
      <div className="w-full border-b border-b-foreground/30 flex justify-between items-center">
        <span>
          Chapters{" "}
          <span className="text-sm text-foreground/50">
            Right Click To Edit
          </span>
        </span>
        <div className="flex gap-1 items-center">
          <button
            className={`p-1 hover:bg-blue-600 rounded transition-colors `}
            onClick={handleScrollToCurrent}
          >
            <LuScroll />
          </button>
          <button
            onClick={() => {
              setSelectedSideMenu("newChapter");
              clearChapterSelection();
              setIsSideMenuOpen(true);
            }}
            className={`p-1 hover:bg-accent rounded transition-colors ${
              selectedBookIndex === -1 && "invisible"
            }`}
          >
            <GoPlus className="w-[1.2rem] h-fit" />
          </button>
        </div>
      </div>
      {/* List of Chapters */}
      <div className="flex flex-col gap-2 w-full pr-2 pb-0.5   h-[68vh] 2xl:h-[75vh] overflow-y-auto overflow-x-hidden">
        {selectedBookIndex !== -1 &&
          books[selectedBookIndex].Chapters.map((chapter, index) => (
            <ChapterRow
              key={chapter.id}
              chapter={chapter}
              onClick={() => setSelectedChapterIndex(index)}
              isSelected={selectedChapterIndex === index}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedChapterIndex(index);
                setSelectedSideMenu("editChapter");
                setIsSideMenuOpen(true);
              }}
              isLastStop={lastStop.lastChapterId === chapter.id}
            />
          ))}
      </div>
    </div>
  );
}

export default ChaptersList;
