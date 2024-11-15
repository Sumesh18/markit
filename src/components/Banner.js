// import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
'use client';

import { useEffect } from "react";

export default function Banner() {
  useEffect(() => {
    const banner = document.querySelector('.banner');

    const handleMouseMove = (e) => {
      const x = e.pageX - banner.offsetLeft;
      const y = e.pageY - banner.offsetTop;
      banner.style.setProperty('--x', `${x}px`);
      banner.style.setProperty('--y', `${y}px`);
    };

    banner.addEventListener('mousemove', handleMouseMove);


    return () => {
      banner.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div className="banner"></div>;
}


{/* <div className="max-w-xs mx-auto p-4">
  <h1 className="text-5xl text-center font-bold mb-2">Sign In</h1>
  <p className="text-center mb-6 text-gray-500">Sign in using any one of the methods</p>
  <LoginWithGoogle />
</div> */}