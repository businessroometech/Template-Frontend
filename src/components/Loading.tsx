import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  loading: boolean;
  color?: string;
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({ loading, color = "#4A90E2", size = 50 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default Loading;
