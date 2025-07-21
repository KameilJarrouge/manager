import React from "react";
import { MdArrowDownward } from "react-icons/md";
import NewBurnForm from "./Forms/NewBurnForm";
import BurnRow from "./BurnRow";
import ListHeader from "./ListHeader";

function BurnList({ total, burnOptions, triggerRefresh, today }) {
  return (
    <div className="h-full w-full flex flex-col gap-2 ">
      <div className="w-full flex justify-between items-center  border-b border-b-foreground/50">
        <h1 className="font-semibold flex gap-2 items-center">
          Burn
          <MdArrowDownward className="text-red-400" />
        </h1>
        <span className="text-sm text-foreground/80">
          ({total.toLocaleString()} kcal)
        </span>
      </div>
      <NewBurnForm
        options={burnOptions}
        triggerRefresh={triggerRefresh}
        dayId={today.id}
      />
      <div className="overflow-y-auto flex flex-col gap-0.5 py-0.5 relative">
        <ListHeader />
        {(today.burn || []).map((burn) => (
          <BurnRow key={burn.id} burn={burn} triggerRefresh={triggerRefresh} />
        ))}
      </div>
    </div>
  );
}

export default BurnList;
