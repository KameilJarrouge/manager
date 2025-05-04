import React from "react";
import CircularProgress from "../CircularProgress";
import { GoDotFill } from "react-icons/go";

function ChapterRow({
  onClick,
  chapter,
  isSelected,
  onContextMenu,
  isLastStop,
}) {
  return (
    <button
      id={`chapter-${chapter.id}`}
      onClick={() => onClick()}
      onContextMenu={onContextMenu}
      key={chapter.id}
      className={`flex justify-between items-center w-full py-1 px-0.5 rounded-l-sm rounded-r-3xl 
        shadow shadow-black relative
       border-l-[6px] 
       ${
         chapter._count.Sections === chapter.Sections.length
           ? "text-foreground/50"
           : ""
       }
       ${
         isSelected
           ? "border-l-foreground bg-secondary"
           : "border-l-foreground/50 hover:bg-secondary/60 bg-secondary/30"
       }`}
    >
      <div className="w-fit text-wrap px-1 h-full gap-1  flex items-center flex-wrap">
        <span className="w-[2ch]">{chapter.order}</span>
        <div className="w-[2px] h-full bg-foreground/5" />
        <span className="w-[34ch] 2xl:w-[54ch] text-start">
          {chapter.title}
          <span className="text-xs px-2 text-foreground/50">
            {`${chapter._count.Sections}/${chapter.Sections.length}`}
          </span>
        </span>
      </div>
      {isLastStop && (
        <div className="absolute top-0 left-0 h-full w-[4px] bg-accent " />
      )}

      <CircularProgress
        progress={Math.round(
          (chapter._count.Sections * 100) / (chapter.Sections.length || 1)
        )}
      />
    </button>
  );
}

export default ChapterRow;
