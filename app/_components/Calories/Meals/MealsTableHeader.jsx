import React from "react";

function MealsTableHeader() {
  return (
    <>
      <h1 className="sticky top-0 border border-foreground/20 bg-secondary text-base pl-1 col-span-1 min-h-[1.5rem]">
        Edit
      </h1>
      <h1 className="sticky top-0 border border-foreground/20 bg-secondary text-base pl-1 col-span-4 min-h-[1.5rem]">
        Name
      </h1>

      <h1 className="sticky top-0 border border-foreground/20 bg-secondary text-base pl-1 col-span-7 min-h-[1.5rem]">
        Food Items
      </h1>
    </>
  );
}

export default MealsTableHeader;
