import React from 'react';

interface AttentionProps {
    color?: string;
    width?: string;
    height?: string;
}

const Attention: React.FC<AttentionProps> = ({
    color = '#004FFF',
    width = "68",
    height = "116"
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 68 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="36.5624"
                cy="36.5624"
                r="36.0624"
                transform="matrix(0.866025 -0.5 2.20305e-08 1 4.19647 36.5625)"
                stroke={color} />
            <circle cx="37.4435"
                cy="37.4435"
                r="36.9435"
                transform="matrix(0.866025 -0.5 2.20305e-08 1 0 40.7471)"
                fill="#F4F4F4"
                stroke={color} />
            <path d="M27.4675 77.9122C27.4675 76.4964 27.8858 75.0468 28.7225 73.5634C29.5752 72.0706 30.806 70.8598 32.4149 69.9309C34.0077 69.0113 35.2305 68.8056 36.0832 69.3137C36.952 69.8125 37.3864 70.7698 37.3864 72.1855C37.3864 73.6012 36.96 75.0555 36.1073 76.5482C35.2546 78.041 34.0238 79.2518 32.4149 80.1807C30.806 81.1096 29.5752 81.32 28.7225 80.8118C27.8858 80.2944 27.4675 79.3279 27.4675 77.9122ZM28.819 67.9864L28.2398 40.7426L36.6141 35.9077L36.0108 63.8342L28.819 67.9864Z"
                fill={color} />

        </svg>
    );
};

export default Attention;