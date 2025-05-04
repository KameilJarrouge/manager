"use client";
import { useState, useEffect, useRef } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdRestartAlt,
  MdSpeed,
} from "react-icons/md";
import { VscTarget } from "react-icons/vsc";

const TypingComponent = ({ originalText = "", onSave, next, previous }) => {
  const [userInput, setUserInput] = useState("");
  const [highlightedText, setHighlightedText] = useState(
    originalText.split("").map((char) => ({ char, color: "transparent" })) // Default color
  );
  const workerRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  // load worker on original text change
  useEffect(() => {
    handleRestart();
    if (typeof window !== "undefined") {
      workerRef.current = new Worker(
        new URL("../_workers/worker.js", import.meta.url)
      );
      workerRef.current.onmessage = (e) => {
        const updatedText = originalText.split("").map((char, index) => ({
          char,
          color: index < e.data.length ? e.data[index].color : "transparent", // Keep unprocessed text black
        }));
        setHighlightedText(updatedText);
      };
    }

    const input = document.getElementById("input-typing-test");
    if (input) input.focus();

    return () => {
      if (workerRef.current) workerRef.current.terminate(); // Cleanup worker when component unmounts
    };
  }, [originalText]);

  const handleRestart = () => {
    setIsFinished(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setUserInput("");
    setHighlightedText(
      originalText.split("").map((char) => ({ char, color: "transparent" }))
    );
  };

  const handlePostMessage = (userInput) => {
    if (workerRef.current)
      workerRef.current.postMessage({
        originalText: originalText,
        userInput: userInput,
      });
  };

  const handleKeyPress = (e) => {
    if (e.altKey) {
      switch (e.key) {
        case "r":
          handleRestart();
          break;

        case "n":
          next();
          break;
        case "p":
          previous();
          break;
      }
      return;
    }
    if (isFinished) return;
    if (!startTime) setStartTime(Date.now());
    let updatedInput;
    if (e.key.length === 1) {
      updatedInput = userInput + e.key;

      setUserInput(updatedInput);

      // Calculate accuracy
      const correctChars = updatedInput
        .split("")
        .filter((char, index) => char === originalText[index]).length;
      const accuracyPercentage = (correctChars / updatedInput.length) * 100;
      setAccuracy(Math.round(accuracyPercentage));

      // Calculate WPM
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const wordsTyped = updatedInput.length / 5;
      setWpm(Math.round(wordsTyped / elapsedMinutes) || 0);

      handlePostMessage(updatedInput);
      // stops user from writing after finish
      if (updatedInput.length === originalText.length) {
        setIsFinished(true);
      }
      return;
    }

    // Deleting Section
    if (e.key === "Backspace") {
      // Delete with CTRL (to the last space)
      if (e.ctrlKey) {
        // if cursor at a space, find the second to last space index
        const startPosition =
          userInput[userInput.length - 1] === " "
            ? userInput.length - 2
            : userInput.length - 1;

        const lastSpaceIndex = userInput.lastIndexOf(" ", startPosition);
        updatedInput =
          lastSpaceIndex === -1 ? "" : userInput.slice(0, lastSpaceIndex + 1);

        setUserInput(updatedInput);
        handlePostMessage(updatedInput);
        return;
      }

      // single character delete
      setUserInput((prev) => prev.slice(0, -1));
      handlePostMessage(userInput.slice(0, -1));
    }
  };

  useEffect(() => {
    if (isFinished) onSave(wpm, accuracy);
  }, [isFinished]);

  return (
    <div tabIndex={0} style={{ outline: "none" }} className="w-full h-full ">
      <div
        id="input-typing-test"
        className="w-full h-full bg-secondary outline-none border border-transparent group flex flex-col gap-2 "
        tabIndex={0}
        onKeyDown={(e) => handleKeyPress(e)}
        autoFocus={true}
        contentEditable={false}
      >
        <div className="w-full flex gap-2 text-lg py-1 h-[2.5rem] items-center justify-center border-b border-b-foreground/5">
          <MdSpeed className="w-[2rem] h-fit" />
          <span className="w-[2ch] text-center">{wpm}</span>{" "}
          <span className="text-foreground/80">wpm</span>
          <div className="w-[1px] h-full bg-foreground/20" />
          <VscTarget className="w-[1.5rem] h-fit" />
          <span className="w-[2ch] text-center">{accuracy}</span>{" "}
          <span className="text-foreground/80">%</span>
          <div className="w-[1px] h-full bg-foreground/20" />
          <button
            className="p-1 hover:bg-blue-600 h-fit rounded transition-colors relative"
            onClick={handleRestart}
          >
            <MdRestartAlt className="w-[1.5rem] h-fit" />
            <span className="absolute  top-[2px] bottom-0 -right-[6ch] text-foreground/60 w-[6ch]">
              [alt + r]
            </span>
          </button>
        </div>
        <div className="text-lg w-full group-focus-within:bg-input_prefix_bg/80 p-1 rounded  h-[24.5rem] overflow-y-auto overflow-x-hidden">
          {highlightedText.map(({ char, color }, index) => (
            <span key={index} style={{ backgroundColor: color }}>
              {char}
            </span>
          ))}
        </div>
        <div className="w-full h-[4rem] relative flex justify-around items-center">
          <button
            onClick={previous}
            className="relative flex items-center justify-center w-[6ch]"
          >
            <MdChevronLeft className="w-[2.5rem] h-fit" />
            <span className="absolute w-[6ch] text-start -bottom-4 left-0 right-0 text-foreground/60">
              [alt + p]
            </span>
          </button>
          {isFinished ? (
            <span className="font-semibold w-[10ch] text-center">Done!</span>
          ) : (
            <span className="font-semibold w-[10ch] text-center">
              In Progress
            </span>
          )}
          <button
            onClick={next}
            className="relative flex items-center justify-center w-[6ch]"
          >
            <MdChevronRight className="w-[2.5rem] h-fit" />

            <span className="absolute w-[6ch] text-start -bottom-4 left-0 right-0 text-foreground/60">
              [alt + n]
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingComponent;
