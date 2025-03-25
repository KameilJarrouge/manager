import React from "react";
// Import directional icons from react-icons/wi
import {
  WiDirectionUp,
  WiDirectionUpRight,
  WiDirectionRight,
  WiDirectionDownRight,
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionLeft,
  WiDirectionUpLeft,
} from "react-icons/wi";

// Map wind direction ranges to icons
const windDirectionToIcon = [
  { range: [0, 44], icon: WiDirectionUp }, // North
  { range: [45, 89], icon: WiDirectionUpRight }, // Northeast
  { range: [90, 134], icon: WiDirectionRight }, // East
  { range: [135, 179], icon: WiDirectionDownRight }, // Southeast
  { range: [180, 224], icon: WiDirectionDown }, // South
  { range: [225, 269], icon: WiDirectionDownLeft }, // Southwest
  { range: [270, 314], icon: WiDirectionLeft }, // West
  { range: [315, 360], icon: WiDirectionUpLeft }, // Northwest
];

function WindDirectionIcon({ direction }) {
  // Find the appropriate icon for the wind direction
  const MatchedIcon = windDirectionToIcon.find(
    ({ range }) => direction >= range[0] && direction <= range[1]
  )?.icon;

  // Handle unknown directions gracefully
  if (!MatchedIcon) {
    return <div>Unknown Direction</div>;
  }

  // Render the icon
  return <MatchedIcon className="w-[1.2rem] h-fit " />;
}

export default WindDirectionIcon;
