import React from "react";
import SectionRow from "../_components/Typing/SectionRow";
import { GoPlus } from "react-icons/go";
import { LuScroll } from "react-icons/lu";

function SectionsList({
  setSelectedSideMenu,
  setIsSideMenuOpen,
  books,
  selectedBookIndex,
  clearSectionSelection,
  setSelectedSectionIndex,
  selectedChapterIndex,
  cacheLastStop,
  selectedSectionIndex,
  lastStop,
  openTypingTest,
}) {
  const handleScrollToCurrent = () => {
    const element = document.getElementById(
      `section-${lastStop.lastSectionId}`
    );
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="w-[24%] px-0.5  flex flex-col gap-4   ">
      <div className="w-full border-b border-b-foreground/30 flex justify-between items-center">
        <span>
          Sections{" "}
          <span className="text-sm text-foreground/50">
            Right Click To Edit
          </span>
        </span>
        <div
          className={`flex gap-2 items-center ${
            selectedChapterIndex === -1 && "invisible"
          }`}
        >
          <button
            className={`p-1 hover:bg-blue-600 rounded transition-colors `}
            onClick={handleScrollToCurrent}
          >
            <LuScroll />
          </button>

          <button
            onClick={() => {
              setSelectedSideMenu("newSection");
              clearSectionSelection();
              setIsSideMenuOpen(true);
            }}
            className={`p-1 hover:bg-accent rounded transition-colors `}
          >
            <GoPlus className="w-[1.2rem] h-fit" />
          </button>
        </div>
      </div>
      {/* List of Chapters */}
      <div className="flex flex-col gap-2 w-full pr-2 pb-0.5  h-[68vh] 2xl:h-[75vh] overflow-y-auto overflow-x-hidden">
        {selectedChapterIndex !== -1 &&
          (
            books[selectedBookIndex].Chapters[selectedChapterIndex]?.Sections ||
            []
          ).map((section, index) => (
            <SectionRow
              key={section.id}
              section={section}
              onClick={() => {
                openTypingTest();
                setSelectedSectionIndex(index);
                cacheLastStop(section.id);
              }}
              isSelected={selectedSectionIndex === index}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedSectionIndex(index);
                setSelectedSideMenu("editSection");
                setIsSideMenuOpen(true);
              }}
              isLastStop={lastStop.lastSectionId === section.id}
            />
          ))}
      </div>
    </div>
  );
}

export default SectionsList;
