"use client";
import LoadingComponent from "@/app/_components/LoadingComponent";
import SideMenu from "@/app/_components/SideMenu";
import BookRow from "@/app/_components/Typing/BookRow";
import ChapterRow from "@/app/_components/Typing/ChapterRow";
import SectionRow from "@/app/_components/Typing/SectionRow";
import TypingTest from "@/app/_components/Typing/TypingTest";
import BooksList from "@/app/_displayLists/BooksList";
import ChaptersList from "@/app/_displayLists/ChaptersList";
import SectionsList from "@/app/_displayLists/SectionsList";
import CreateBookForm from "@/app/_forms/CreateBookForm";
import CreateChapterForm from "@/app/_forms/CreateChapterForm";
import CreateSectionForm from "@/app/_forms/CreateSectionForm";
import UpdateBookForm from "@/app/_forms/UpdateBookForm";
import UpdateChapterForm from "@/app/_forms/UpdateChapterForm";
import UpdateSectionForm from "@/app/_forms/UpdateSectionForm";
import api from "@/app/_lib/api";
import { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";

const Typing = ({}) => {
  const [books, setBooks] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(-1);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(-1);
  const [lastStop, setLastStop] = useState({
    lastBookId: -1,
    lastChapterId: -1,
    lastSectionId: -1,
  });
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedSideMenu, setSelectedSideMenu] = useState("newBook");
  const [isLoading, setIsLoading] = useState(false);
  const [isTypingTestOpen, setIsTypingTestOpen] = useState(false);

  const getBooks = async () => {
    setIsLoading(true);
    const result = await api.get("/typing/books");
    setIsLoading(false);
    if (result.data.success) {
      setBooks(result.data.result);
      console.log(result.data.result);
    }
  };

  const clearBookSelection = () => {
    setSelectedBookIndex(-1);
    setSelectedChapterIndex(-1);
    setSelectedSectionIndex(-1);
  };

  const clearChapterSelection = () => {
    setSelectedChapterIndex(-1);
    setSelectedSectionIndex(-1);
  };
  const clearSectionSelection = () => {
    setSelectedSectionIndex(-1);
  };

  const cacheLastStop = (lastSectionId) => {
    localStorage.setItem(
      "last-stop",
      JSON.stringify({
        lastBookId: books[selectedBookIndex].id,
        lastChapterId:
          books[selectedBookIndex].Chapters[selectedChapterIndex].id,
        lastSectionId: lastSectionId,
      })
    );
    setLastStop({
      lastBookId: books[selectedBookIndex].id,
      lastChapterId: books[selectedBookIndex].Chapters[selectedChapterIndex].id,
      lastSectionId: lastSectionId,
    });
  };

  const loadLastStopFromCache = () => {
    const lastStopCached = localStorage.getItem("last-stop");
    if (lastStopCached && lastStopCached !== "undefined")
      setLastStop(JSON.parse(lastStopCached));
  };

  useEffect(() => {
    getBooks();
    loadLastStopFromCache();
  }, []);

  useEffect(() => {
    clearChapterSelection();
  }, [selectedBookIndex]);
  useEffect(() => {
    clearSectionSelection();
  }, [selectedChapterIndex]);

  return (
    <div className="w-full h-full relative  pl-[2rem] pr-[4rem] overflow-x-hidden flex gap-0.5">
      {isLoading && <LoadingComponent />}

      {isTypingTestOpen && (
        <TypingTest
          chapter={books[selectedBookIndex].Chapters[selectedChapterIndex]}
          selectedSectionIndex={selectedSectionIndex}
          close={() => {
            setIsTypingTestOpen(false);
          }}
          onChangeSectionSelection={(newIndex) => {
            setSelectedSectionIndex(newIndex);
            cacheLastStop(
              books[selectedBookIndex].Chapters[selectedChapterIndex].Sections[
                newIndex
              ].id
            );
          }}
          refresh={getBooks}
        />
      )}
      {/* Books */}
      <BooksList
        books={books}
        clearBookSelection={clearBookSelection}
        selectedBookIndex={selectedBookIndex}
        setIsSideMenuOpen={setIsSideMenuOpen}
        setSelectedBookIndex={setSelectedBookIndex}
        setSelectedSideMenu={setSelectedSideMenu}
        lastStop={lastStop}
      />

      {/* Chapters */}
      <ChaptersList
        books={books}
        clearChapterSelection={clearChapterSelection}
        selectedBookIndex={selectedBookIndex}
        selectedChapterIndex={selectedChapterIndex}
        setIsSideMenuOpen={setIsSideMenuOpen}
        setSelectedChapterIndex={setSelectedChapterIndex}
        setSelectedSideMenu={setSelectedSideMenu}
        lastStop={lastStop}
      />

      {/* Sections */}
      <SectionsList
        books={books}
        cacheLastStop={cacheLastStop}
        clearSectionSelection={clearSectionSelection}
        selectedBookIndex={selectedBookIndex}
        selectedChapterIndex={selectedChapterIndex}
        setIsSideMenuOpen={setIsSideMenuOpen}
        setSelectedSectionIndex={setSelectedSectionIndex}
        setSelectedSideMenu={setSelectedSideMenu}
        selectedSectionIndex={selectedSectionIndex}
        lastStop={lastStop}
        openTypingTest={() => setIsTypingTestOpen(true)}
      />

      <SideMenu
        openState={isSideMenuOpen}
        setOpenState={setIsSideMenuOpen}
        id={"typing"}
      >
        {
          {
            newBook: (
              <CreateBookForm
                afterSubmit={() => {
                  setIsSideMenuOpen(false);
                  getBooks();
                }}
              />
            ),
            editBook: (
              <>
                {selectedBookIndex !== -1 && (
                  <UpdateBookForm
                    book={books[selectedBookIndex]}
                    afterSubmit={() => {
                      setIsSideMenuOpen(false);
                      setSelectedBookIndex(-1);
                      getBooks();
                    }}
                  />
                )}
              </>
            ),
            newChapter: (
              <>
                {selectedBookIndex !== -1 && (
                  <CreateChapterForm
                    book={books[selectedBookIndex]}
                    afterSubmit={() => {
                      setIsSideMenuOpen(false);
                      getBooks();
                    }}
                  />
                )}
              </>
            ),
            editChapter: (
              <>
                {selectedChapterIndex !== -1 && (
                  <UpdateChapterForm
                    chapter={
                      books[selectedBookIndex]?.Chapters[
                        selectedChapterIndex
                      ] || undefined
                    }
                    afterSubmit={() => {
                      setIsSideMenuOpen(false);
                      setSelectedChapterIndex(-1);
                      getBooks();
                    }}
                  />
                )}
              </>
            ),
            newSection: (
              <>
                {selectedChapterIndex !== -1 && (
                  <CreateSectionForm
                    chapter={
                      books[selectedBookIndex].Chapters[selectedChapterIndex]
                    }
                    afterSubmit={() => {
                      setIsSideMenuOpen(false);
                      getBooks();
                    }}
                  />
                )}
              </>
            ),
            editSection: (
              <>
                {selectedSectionIndex !== -1 && (
                  <UpdateSectionForm
                    section={
                      books[selectedBookIndex]?.Chapters[selectedChapterIndex]
                        ?.Sections[selectedSectionIndex] || undefined
                    }
                    afterSubmit={() => {
                      setIsSideMenuOpen(false);
                      setSelectedSectionIndex(-1);
                      getBooks();
                    }}
                  />
                )}
              </>
            ),
          }[selectedSideMenu]
        }
      </SideMenu>
    </div>
  );
};

export default Typing;
