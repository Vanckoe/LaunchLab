import React from "react";

type LeftProps = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};

const Left: React.FC<LeftProps> = ({
  color = "black",
  width = "20",
  height = "11",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.3963 5.94548C19.6423 5.69945 19.6423 5.30055 19.3963 5.05452L15.3869 1.04519C15.1409 0.79916 14.742 0.79916 14.496 1.04519C14.2499 1.29122 14.2499 1.69012 14.496 1.93615L18.0598 5.5L14.496 9.06385C14.2499 9.30988 14.2499 9.70878 14.496 9.95481C14.742 10.2008 15.1409 10.2008 15.3869 9.95481L19.3963 5.94548ZM0.0507812 5.5V6.13H18.9508V5.5V4.87H0.0507812V5.5Z"
        fill={color}
      />
      <path
        d="M19.3963 5.94548C19.6423 5.69945 19.6423 5.30055 19.3963 5.05452L15.3869 1.04519C15.1409 0.79916 14.742 0.79916 14.496 1.04519C14.2499 1.29122 14.2499 1.69012 14.496 1.93615L18.0598 5.5L14.496 9.06385C14.2499 9.30988 14.2499 9.70878 14.496 9.95481C14.742 10.2008 15.1409 10.2008 15.3869 9.95481L19.3963 5.94548ZM0.0507812 5.5V6.13H18.9508V5.5V4.87H0.0507812V5.5Z"
        fill={color}
      />
      <defs>
        <linearGradient
          id="paint0_linear_209_2695"
          x1="0.0507813"
          y1="6"
          x2="19.9666"
          y2="0.917334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF85" />
          <stop offset="1" stopColor="#D6B862" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Left;
