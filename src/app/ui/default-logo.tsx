import React from 'react';

export default function DefaultLogo () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      width="60"
      height="60"
      className="hidden md:block mr-2"
      aria-hidden="true"
    >
      <rect width="100%" height="100%" fill="#5a5a95" />
      <circle cx="30" cy="30" r="20" fill="#245763" />
      <rect x="10" y="40" width="40" height="10" fill="#061a2b" />
    </svg>
  );
};