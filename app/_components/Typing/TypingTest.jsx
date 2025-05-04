"use client";

import { useEffect, useState } from "react";
import TypingComponent from "../TypingComponent";
import api from "@/app/_lib/api";
import LoadingComponent from "../LoadingComponent";
import { GoPlus } from "react-icons/go";
import { MdSpeed } from "react-icons/md";
import { VscTarget } from "react-icons/vsc";

const TypingTest = ({
  chapter,
  selectedSectionIndex,
  close,
  onChangeSectionSelection,
  refresh,
}) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSectionText = async () => {
    setIsLoading(true);
    const result = await api.get(
      `/typing/sections/${chapter.Sections[selectedSectionIndex].id}`
    );
    setIsLoading(false);

    if (result.data.success) {
      setText(result.data.result.text);
    }
  };

  const nextSection = () => {
    if (chapter.Sections.length - 1 === selectedSectionIndex) {
      return;
    }
    onChangeSectionSelection(selectedSectionIndex + 1);
  };

  const previousSection = () => {
    if (selectedSectionIndex === 0) {
      return;
    }
    onChangeSectionSelection(selectedSectionIndex - 1);
  };

  const handleSave = async (currentWPM, currentAccuracy) => {
    setIsLoading(true);
    if (
      chapter.Sections[selectedSectionIndex].WPM === null ||
      chapter.Sections[selectedSectionIndex].WPM < currentWPM
    ) {
      await api.put(
        `/typing/sections/${chapter.Sections[selectedSectionIndex].id}/update-stats`,
        { WPM: currentWPM, accuracy: currentAccuracy }
      );
      refresh();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSectionText();
  }, [chapter, selectedSectionIndex]);

  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center backdrop-blur bg-black/15  ">
      <div
        className="w-[70ch] 2xl:w-[80ch] h-[36rem]   px-2 rounded-lg  bg-secondary  relative shadow shadow-black
        flex flex-col"
      >
        {isLoading && <LoadingComponent />}
        <div className="w-full h-[3rem] flex justify-between items-center border-b border-foreground/5">
          <div className="flex gap-2 h-full items-center text-foreground/80 ">
            <span>Chapter: {chapter.title}</span>

            <div className="w-[1px] h-1/2 bg-foreground/20" />

            <span>
              Section:{" "}
              {`${selectedSectionIndex + 1}/${chapter.Sections.length}`}
            </span>

            <div className="w-[1px] h-1/2 bg-foreground/20" />

            <div className="flex gap-1 items-center pr-2 text-sm">
              <MdSpeed className="w-[1.2rem] h-fit" />
              <span className=" w-[3ch] text-center">
                {chapter.Sections[selectedSectionIndex].WPM || "-"}
              </span>
              <span>wpm</span>
            </div>
            <div className="flex gap-1 items-center pr-2 text-sm">
              <VscTarget className="w-[1.2rem] h-fit" />
              <span className=" w-[3ch] text-center">
                {chapter.Sections[selectedSectionIndex].accuracy || "-"}
              </span>
              <span>%</span>
            </div>
          </div>
          <button
            onClick={close}
            className="p-1 hover:bg-red-600 h-fit rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit rotate-45" strokeWidth={0.7} />
          </button>
        </div>
        <div className="w-full h-[33rem] ">
          {text !== "" && (
            <TypingComponent
              originalText={text}
              next={nextSection}
              previous={previousSection}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
