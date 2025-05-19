import React from 'react';

interface UserProps {
    color?: string;
    width?: string;
    height?: string;
}

const User: React.FC<UserProps> = ({
    color = '#white',
    width = "24",
    height = "24"
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 2.66012C0 1.19097 1.19016 0 2.66012 0H21.3399C22.8091 0 24 1.19016 24 2.66012V21.3399C24 22.8091 22.8099 24 21.3399 24H2.66012C1.19097 24 0 22.8099 0 21.3399V2.66012ZM4.47583 20H19.7967C18.11 17.582 15.3079 16 12.1363 16C8.96459 16 6.16243 17.582 4.47583 20ZM12 13.3333C14.5773 13.3333 16.6667 11.244 16.6667 8.66667C16.6667 6.08933 14.5773 4 12 4C9.42267 4 7.33333 6.08933 7.33333 8.66667C7.33333 11.244 9.42267 13.3333 12 13.3333Z"
                fill={color}
            />
        </svg>
    );
};

export default User;
