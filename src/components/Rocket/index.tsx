import React from "react";
import spacecraftImage from "../../assets/images/spacecraft.png";

interface SpacecraftProps {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
}

const Spacecraft: React.FC<SpacecraftProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
}) => {
  return (
    <img
      src={spacecraftImage}
      alt="Spacecraft"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${150 * scale}px`,
        height: "auto",
        transform: `rotate(${rotation}deg)`,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
};

export default Spacecraft;