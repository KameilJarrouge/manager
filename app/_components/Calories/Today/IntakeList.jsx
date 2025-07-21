import React from "react";
import { MdArrowUpward } from "react-icons/md";
import NewIntakeForm from "./Forms/NewIntakeForm";
import IntakeRow from "./IntakeRow";
import ListHeader from "./ListHeader";

function IntakeList({ total, intakeOptions, triggerRefresh, today }) {
  return (
    <div className="h-full w-full flex flex-col gap-2 ">
      <div className="w-full flex justify-between items-center  border-b border-b-foreground/50">
        <h1 className="font-semibold flex gap-2 items-center">
          Intake
          <MdArrowUpward className="text-green-400" />
        </h1>
        <span className="text-sm text-foreground/80">
          ({total.toLocaleString()} kcal)
        </span>
      </div>
      <NewIntakeForm
        options={intakeOptions}
        triggerRefresh={triggerRefresh}
        dayId={today.id}
      />
      <div className="overflow-y-auto flex flex-col gap-0.5 py-0.5 relative">
        <ListHeader />
        {(today.intake || []).map((intake) => (
          <IntakeRow
            key={intake.id}
            intake={intake}
            triggerRefresh={triggerRefresh}
          />
        ))}
      </div>
    </div>
  );
}

export default IntakeList;
