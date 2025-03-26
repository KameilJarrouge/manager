import React from "react";
import {
  GoArrowDown,
  GoArrowDownLeft,
  GoArrowDownRight,
  GoArrowLeft,
  GoArrowRight,
  GoArrowUp,
  GoArrowUpLeft,
  GoArrowUpRight,
} from "react-icons/go";

// Map wind direction ranges to icons
const windDirectionToIcon = [
  { range: [0, 44], icon: GoArrowUp }, // North
  { range: [45, 89], icon: GoArrowUpRight }, // Northeast
  { range: [90, 134], icon: GoArrowRight }, // East
  { range: [135, 179], icon: GoArrowDownRight }, // Southeast
  { range: [180, 224], icon: GoArrowDown }, // South
  { range: [225, 269], icon: GoArrowDownLeft }, // Southwest
  { range: [270, 314], icon: GoArrowLeft }, // West
  { range: [315, 360], icon: GoArrowUpLeft }, // Northwest
];

function WindDirectionIcon({ direction }) {
  // Find the appropriate icon for the wind direction
  const MatchedIcon = windDirectionToIcon.find(
    ({ range }) => direction >= range[0] && direction <= range[1]
  )?.icon;

  // Handle unknown directions gracefully
  if (!MatchedIcon) {
    return <div>?</div>;
  }

  // Render the icon
  return <MatchedIcon className="w-[1rem] h-fit " />;
}

export default WindDirectionIcon;
