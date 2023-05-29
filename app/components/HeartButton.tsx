'use client';

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartButton = () => {
  const [fav, setFav] = useState(false)
  return (
    <div 
      onClick={() => setFav(true)}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          fav ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default HeartButton;