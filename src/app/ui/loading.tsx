"use client"

import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="logo-container">
        <Image
          src="/educhain-one.jpg"
          alt="Logo"
          className="logo"
          width={100}
          height={100}
        />
        <div className="spinner"></div>
      </div>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5; /* Background color */
        }
        .logo-container {
          position: relative;
        }
        .logo {
          width: 100px; /* Adjust the logo size */
          height: 100px;
          z-index: 1;
        }
        .spinner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 120px; /* Adjust the spinner size */
          height: 120px;
          border: 5px solid transparent;
          border-top: 5px solid #245763; /* Spinner color */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
