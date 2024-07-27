import React, { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#072b4a",
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
      color="#421e06"
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
      />
      <p className="mt-4 text-uiblue-600">Please wait while we check authentication status...</p>
    </div>
  )
}
