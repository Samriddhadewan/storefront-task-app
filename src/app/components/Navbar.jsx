import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="mx-auto flex justify-between items-center bg-[#F8F5E8] px-5 sm:px-10 md:px-20 lg:px-40 py-6 shadow-md rounded-xl">
      <div>
         <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-[#592D02]"
        >
          Dhoonki Mini
        </Link>
        
      </div>
      <Link href="/cart">
      <div className="relative">
        <img
          src="/images/cart_icon.png"
          className="w-6 min-w-6"
          alt="Cart Icon"
        />
        <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-bold">
          {0}
        </p>
      </div>
      </Link>
    </div>
  );
}
