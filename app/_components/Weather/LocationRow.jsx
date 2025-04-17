"use client";
import React, { useState } from "react";
import TextField from "../Input/TextField";
import { MdCheck, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { GoDotFill, GoPlus } from "react-icons/go";

function LocationRow({
  location,
  longitude,
  latitude,
  newLocation = false,
  onAdd,
  onEditLocation,
  onEditLatitude,
  onEditLongitude,
  onDelete,
  onSelect,
  selected,
}) {
  const [inEditMode, setInEditMode] = useState(false);

  return inEditMode || newLocation ? (
    <div className="flex gap-2 items-center ">
      <TextField
        className={"w-[21ch]"}
        placeholder={"Location"}
        state={location}
        setState={(value) => onEditLocation(value)}
      />
      <TextField
        className={"w-[18ch]"}
        placeholder={"Latitude"}
        state={latitude}
        setState={(value) => onEditLatitude(value)}
      />
      <TextField
        className={"w-[18ch]"}
        placeholder={"Longitude"}
        state={longitude}
        setState={(value) => onEditLongitude(value)}
      />
      {newLocation ? (
        <button
          onClick={onAdd}
          className="h-fit p-1 hover:bg-green-600 rounded transition-colors"
        >
          <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
        </button>
      ) : (
        <button
          onClick={() => setInEditMode(false)}
          className="h-fit p-1 hover:bg-blue-600 rounded transition-colors"
        >
          <MdSave className="w-[1.2rem] h-fit" />
        </button>
      )}
    </div>
  ) : (
    <div className="flex gap-2 items-center border-b border-b-foreground/20 pb-1">
      <button onClick={() => onSelect(location)}>
        <MdCheck
          className={`w-[1rem] h-fit ${
            selected === location
              ? "text-green-400"
              : " text-foreground/20 hover:text-foreground"
          }`}
        />
      </button>
      <span className={"w-[25ch]"}>{location}</span>
      <span className={"w-[22ch]"}>{latitude}</span>
      <span className={"w-[22ch]"}>{longitude}</span>
      <button
        onClick={() => setInEditMode(true)}
        className="h-fit p-1 hover:bg-blue-600 rounded transition-colors"
      >
        <MdEdit className="w-[1.2rem] h-fit" />
      </button>
      <button
        onClick={onDelete}
        className="h-fit p-1 hover:bg-red-600 rounded transition-colors"
      >
        <MdDelete className="w-[1.2rem] h-fit" />
      </button>
    </div>
  );
}

export default LocationRow;
