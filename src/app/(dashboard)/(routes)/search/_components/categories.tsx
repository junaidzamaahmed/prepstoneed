"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { TfiWrite } from "react-icons/tfi";
import { PiMathOperations } from "react-icons/pi";
import { IconType } from "react-icons";
import { BsAlphabet } from "react-icons/bs";
import { CiClock1 } from "react-icons/ci";
import { VscFileSubmodule } from "react-icons/vsc";
import { PiExam } from "react-icons/pi";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Practice: TfiWrite,
  Modules: VscFileSubmodule,
  "Full Tests": PiExam,
  "Adaptive Tests": CiClock1,
  English: BsAlphabet,
  Math: PiMathOperations,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-4 gap-y-3 flex-wrap pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
