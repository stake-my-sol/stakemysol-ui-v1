import { Rating } from "@mui/material";
import React from "react";

type Props = {
  maxScore: number;
  minScore: number;
  score: number;
  precision: number;
  targetBase: number;
  size?: "small" | "medium" | "large";
};

const TotalScore = ({
  maxScore,
  minScore,
  score,
  precision,
  targetBase,
  size,
}: Props) => {
  const equivalentScore = Math.floor(
    ((score - minScore) / (maxScore - minScore)) * targetBase,
  );

  return (
    <Rating
      name="read-only"
      value={equivalentScore}
      readOnly
      max={targetBase}
      size={size}
    />
  );
};

export default TotalScore;
