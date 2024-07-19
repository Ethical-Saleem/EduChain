import React, { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#5a5a95",
}

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function Loading () {
  return (
    <div style={containerStyle}>
      <RingLoader
      color="#245763"
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
    </div>
  )
}
