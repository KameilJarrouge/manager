import React from "react";

function BodyStats({ stats }) {
  return (
    <div className="flex flex-col bg-secondary rounded p-2 gap-1 flex-wrap text-sm text-foreground/80">
      <div className="flex justify-between items-center border-b-[1px] border-foreground/30">
        <h1 className="font-semibold">BMI:</h1>
        <span>{stats.BMI}</span>
      </div>
      <div className="flex justify-between items-center border-b-[1px] border-foreground/30">
        <h1 className="font-semibold">BMR:</h1>
        <span>{stats.BMR} kcal</span>
      </div>
      <div className="flex justify-between items-center border-b-[1px] border-foreground/30">
        <h1 className="font-semibold">Body Fat:</h1>
        <span>{stats.bodyFat} %</span>
      </div>
    </div>
  );
}

export default BodyStats;
