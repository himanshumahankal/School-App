import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 32V8C8 5.79086 9.79086 4 12 4H32V28H12C10.8954 28 10 28.8954 10 30C10 31.1046 10.8954 32 12 32H32V36H12C9.79086 36 8 34.2091 8 32Z" fill="currentColor" />
            <path d="M14 16L22 12L30 16L22 20L14 16Z" fill="white" />
            <path d="M18 18V22C18 22 19 23.5 22 23.5C25 23.5 26 22 26 22V18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M30 16V22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="30" cy="22" r="1.5" fill="white" />
        </svg>
    );
}
