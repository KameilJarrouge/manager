import React from "react";
import { MdPlayArrow, MdSpeed } from "react-icons/md";
import { VscTarget } from "react-icons/vsc";

function SectionRow({
  onClick,
  section,
  isSelected,
  onContextMenu,
  isLastStop,
}) {
  return (
    <button
      id={`section-${section.id}`}
      onClick={() => onClick()}
      onContextMenu={onContextMenu}
      key={section.id}
      className={`flex justify-between items-center w-full py-1 min-h-[3rem] px-0.5 rounded-l-sm rounded-r-3xl 
        shadow shadow-black group relative
       border-l-[6px] 
       ${section.WPM !== null ? "text-foreground/50" : ""}
       ${
         isSelected
           ? "border-l-foreground bg-secondary"
           : "border-l-foreground/50 hover:bg-secondary/60 bg-secondary/30"
       }`}
    >
      {isLastStop && (
        <div className="absolute top-0 left-0 h-full w-[4px] bg-accent " />
      )}
      <div className="w-full h-full px-1 flex justify-between items-center">
        <div className="flex h-full gap-1 items-center">
          <span className="w-[2ch]">{section.order}</span>
          <div className="w-[2px] h-full bg-foreground/5" />
          <div className="flex gap-1 items-center pr-2 text-sm">
            <MdSpeed className="w-[1.2rem] h-fit" />
            <span className="text-center w-[3ch]">{section.WPM || "-"}</span>
            <span>wpm</span>
          </div>
          <div className="flex gap-1 items-center pr-2 text-center">
            <VscTarget className="w-[1.2rem] h-fit" />
            <span className="text-center w-[3ch]">
              {section.accuracy || "-"}
            </span>
            <span>%</span>
          </div>
        </div>
        <MdPlayArrow className="w-[1.5rem] h-fit group-hover:text-green-400" />
      </div>
    </button>
  );
}

export default SectionRow;
