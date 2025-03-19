"use client";

import DateHomeSection from "./_sections/DateHomeSection";
import TodoHomeSection from "./_sections/TodoHomeSection";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-between relative pr-[4rem]  pl-[2rem]">
      <TodoHomeSection />
      {/* <div className="w-[1px] h-full bg-input_bg" /> */}
      <DateHomeSection />
    </div>
  );
}
