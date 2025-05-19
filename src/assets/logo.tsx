import React from 'react';

interface LogoProps {
  color?: string;
  width?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ color = '#000000', width = '384', height = '384' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" width={width} height={height}>
      <path
        fill={color}
        d="M1972 3286 c-230 -44 -408 -139 -572 -305 l-96 -96 -64 17 c-191 49 -394 -2 -537 -135 -82 -76 -136 -158 -165 -250 -21 -65 -26 -72 -78 -105 -72 -46 -181 -151 -236 -228 -202 -283 -215 -671 -33 -977 60 -100 203 -240 301 -295 91 -51 188 -87 278 -101 89 -15 2310 -15 2400 0 82 13 209 64 286 115 259 171 400 509 340 816 -56 284 -227 492 -491 599 l-89 36 -13 64 c-81 400 -386 723 -781 826 -121 31 -336 40 -450 19z"
      />
    </svg>
  );
};

export default Logo;
