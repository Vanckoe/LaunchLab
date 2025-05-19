import React from 'react';

interface CloudSearchProps {
  color?: string;
  width?: string;
  height?: string;
}

const CloudSearch: React.FC<CloudSearchProps> = ({ color = '#0D87EF', width = '95', height = '95' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 95 95" fill="none">
      <path d="M68.4492 33.2322C78.6945 33.2322 86.9999 41.5376 86.9999 51.7829C86.9999 56.4414 85.2828 60.6989 82.4469 63.9568" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M47.5797 72.8336C48.9604 72.8336 50.0797 71.7143 50.0797 70.3336C50.0797 68.9529 48.9604 67.8336 47.5797 67.8336V72.8336ZM24.971 67.8336C16.5008 67.8336 9.5 60.7229 9.5 51.7829H4.5C4.5 63.3335 13.591 72.8336 24.971 72.8336V67.8336ZM9.5 51.7829C9.5 42.8429 16.5008 35.7322 24.971 35.7322V30.7322C13.591 30.7322 4.5 40.2323 4.5 51.7829H9.5ZM24.971 72.8336H47.5797V67.8336H24.971V72.8336Z" fill={color}/>
      <ellipse cx="46.4203" cy="38.4493" rx="20.8696" ry="21.4493" stroke={color} strokeWidth="5"/>
      <path d="M72.5725 56.4185C69.2191 61.5583 64.4652 65.6143 58.9327 68.0818" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M37.145 38.4491C37.145 33.0063 41.5573 28.594 47.0001 28.594" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      <path d="M68.4492 64.5361L82.3623 78.4492" stroke={color} strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
};

export default CloudSearch;
