import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/animation.json"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-orange-600 text-orange-100 border-[1px] border-orange-500",
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-rose-700 text-rose-200 border-[1px] border-rose-400",
  "bg-emerald-500 text-green-200 border-[1px] border-emerald-300"
];


export const getColor = (color: number) => {
  if (color && color < colors.length) {
    return colors[color]
  };
  return colors[0];
}

export const animationDefaultOptions = {
   loop:true,
   autoplay: true,
   animationData: animationData
}