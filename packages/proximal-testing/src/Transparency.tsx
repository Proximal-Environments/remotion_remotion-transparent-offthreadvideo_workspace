import {AbsoluteFill, OffthreadVideo, staticFile} from "remotion";
import React from "react";

export const Transparency: React.FC<{transparent?: boolean}> = ({transparent}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "red" }}>
      <OffthreadVideo
        src={staticFile("transparent-with-dar.webm")}
        muted
        transparent={Boolean(transparent)}
        style={{ width: "100%", height: "100%" }}
      />
    </AbsoluteFill>
  );
};
