"use client";

import TodoHomeSection from "./_sections/TodoHomeSection";

export default function Home() {
  return (
    <div className="w-full h-full flex gap-4 relative pr-[4rem]  pl-[2rem]">
      <TodoHomeSection />
      <div className="w-[1px] h-full bg-input_bg" />
      <div className=" "></div>
    </div>
  );
}
