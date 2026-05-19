import { useMemo } from "react";
import * as THREE from "three";

interface TextLabelProps {
  text: string;
  position?: [number, number, number];
  color?: string;
  fontSize?: number;
  maxWidth?: number;
  align?: CanvasTextAlign;
  opacity?: number;
}

const createTextTexture = (
  text: string,
  color: string,
  fontSize: number,
  maxWidth: number,
  align: CanvasTextAlign
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 256;

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `600 ${fontSize}px Segoe UI, Arial, sans-serif`;
  context.textAlign = align;
  context.textBaseline = "middle";
  context.shadowColor = color;
  context.shadowBlur = 18;
  context.fillStyle = color;

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  const lineHeight = fontSize * 1.25;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
  const x = align === "left" ? 32 : align === "right" ? canvas.width - 32 : canvas.width / 2;

  lines.forEach((line, index) => {
    context.fillText(line, x, startY + index * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

export const TextLabel = ({
  text,
  position = [0, 0, 0],
  color = "#ffffff",
  fontSize = 64,
  maxWidth = 920,
  align = "center",
  opacity = 1,
}: TextLabelProps) => {
  const texture = useMemo(
    () => createTextTexture(text, color, fontSize, maxWidth, align),
    [align, color, fontSize, maxWidth, text]
  );

  return (
    <sprite position={position} scale={[8, 2, 1]}>
      <spriteMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </sprite>
  );
};

export default TextLabel;
