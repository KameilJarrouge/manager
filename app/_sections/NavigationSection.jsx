"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdOutlineAccountBox,
  MdOutlineBook,
  MdOutlineCheckCircle,
  MdOutlineDateRange,
  MdOutlineHome,
  MdOutlineNote,
} from "react-icons/md";
function NavigationSection() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col gap-6  py-2">
      <Link
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Home"
        data-tooltip-place="top-start"
        href={"/"}
        className={`${
          pathname === "/"
            ? "bg-secondary border-l-accent"
            : " hover:border-secondary "
        } rounded-r-full w-full py-2 px-4 hover:bg-secondary transition-colors border-l-4 border-transparent `}
      >
        <MdOutlineHome className="w-[1.8rem] h-fit " />
      </Link>
      <Link
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Todo"
        data-tooltip-place="top-start"
        href={"#"}
        className={`${
          pathname === "#"
            ? "bg-secondary border-l-accent"
            : " hover:border-secondary "
        } rounded-r-full w-full py-2 px-4 hover:bg-secondary transition-colors border-l-4 border-transparent `}
      >
        <MdOutlineCheckCircle className="w-[1.8rem] h-fit " />
      </Link>
      <Link
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Accounts"
        data-tooltip-place="top-start"
        href={"#"}
        className={`${
          pathname === "#"
            ? "bg-secondary border-l-accent"
            : " hover:border-secondary "
        } rounded-r-full w-full py-2 px-4 hover:bg-secondary transition-colors border-l-4 border-transparent `}
      >
        <MdOutlineAccountBox className="w-[1.8rem] h-fit " />
      </Link>
      <Link
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Notes"
        data-tooltip-place="top-start"
        href={"#"}
        className={`${
          pathname === "#"
            ? "bg-secondary border-l-accent"
            : " hover:border-secondary "
        } rounded-r-full w-full py-2 px-4 hover:bg-secondary transition-colors border-l-4 border-transparent `}
      >
        <MdOutlineNote className="w-[1.8rem] h-fit " />
      </Link>
      <Link
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Journal"
        data-tooltip-place="top-start"
        href={"#"}
        className={`${
          pathname === "#"
            ? "bg-secondary border-l-accent"
            : " hover:border-secondary "
        } rounded-r-full w-full py-2 px-4 hover:bg-secondary transition-colors border-l-4 border-transparent `}
      >
        <MdOutlineBook className="w-[1.8rem] h-fit " />
      </Link>
      <Link
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Dates"
        data-tooltip-place="top-start"
        href={"#"}
        className={`${
          pathname === "#"
            ? "bg-secondary border-l-accent"
            : " hover:border-secondary "
        } rounded-r-full w-full py-2 px-4 hover:bg-secondary transition-colors border-l-4 border-transparent `}
      >
        <MdOutlineDateRange className="w-[1.8rem] h-fit " />
      </Link>
    </div>
  );
}

export default NavigationSection;
