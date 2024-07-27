import React, { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#072b4a",
}

const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function Loading () {
  return (
    <div style={containerStyle}>
      <RingLoader
      color="#421e06"
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
    </div>
  )
}
