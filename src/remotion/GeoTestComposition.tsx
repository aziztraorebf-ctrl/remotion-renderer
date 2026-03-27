import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";

export const GeoTestComposition: React.FC<{
  title: string;
  imageUrl?: string;
}> = ({ title, imageUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageUrl && (
        <Img
          src={imageUrl}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: opacity * 0.4,
          }}
        />
      )}
      <div
        style={{
          color: "#d4a574",
          fontSize: 64,
          fontWeight: "bold",
          fontFamily: "serif",
          textAlign: "center",
          opacity,
          transform: `translateY(${interpolate(titleY, [0, 1], [100, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          padding: "0 60px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          color: "#888",
          fontSize: 24,
          fontFamily: "sans-serif",
          opacity: interpolate(frame, [30, 60], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        GeoAfrique - Rendered on Vercel
      </div>
    </AbsoluteFill>
  );
};
