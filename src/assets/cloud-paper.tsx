import React from 'react';

interface CloudPaperProps {
  color?: string;
  width?: string;
  height?: string;
}

const CloudPaper: React.FC<CloudPaperProps> = ({ color = '#0D87EF', width = '95', height = '95' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 95 95"
      fill="none"
    >
      <path
        d="M26.5276 76.9529C37.3123 76.9529 46.0551 67.9281 46.0551 56.7954V46.5712C46.0551 43.5205 48.5282 41.0474 51.5789 41.0474H81.4762C84.5269 41.0474 87 43.5205 87 46.5712V53.4767C87 66.4423 76.4893 76.9529 63.5238 76.9529H26.5276ZM26.5276 76.9529C15.7428 76.9529 7 67.9281 7 56.7954C7 45.6628 15.7428 36.6379 26.5276 36.6379"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M33.4569 58.4277C29.5551 54.2414 27.1577 48.562 27.1577 42.3071C27.1577 29.4349 37.3106 19 49.8349 19C61.3198 19 70.8107 27.7749 72.3067 39.1575"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M58.6533 53.016H75.0313"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M58.6533 65.6143H69.9919"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloudPaper;
