import { RiTableAltLine } from "react-icons/ri";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { TbArmchair, TbBrandAirtable, TbBedFlat, TbSofa } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { BsBookshelf } from "react-icons/bs";
import { HiTableCells } from "react-icons/hi2";
import {
  MdChairAlt,
  MdOutlineDesk,
  MdOutlineKitchen,
  MdOutlineTableRestaurant,
} from "react-icons/md";
import { PiOfficeChairBold, PiPottedPlantBold } from "react-icons/pi";
import { BiCabinet } from "react-icons/bi";
import { VscSymbolMisc } from "react-icons/vsc";
import { SetStateAction, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    id: 1,
    label: "Closet",
    icon: RiTableAltLine,
  },
  {
    id: 2,
    label: "Bed",
    icon: IoBedOutline,
  },
  {
    id: 3,
    label: "Sofa",
    icon: TbSofa,
  },
  {
    id: 4,
    label: "Shelf",
    icon: BsBookshelf,
  },
  {
    id: 5,
    label: "Cabinet",
    icon: HiTableCells,
  },
  {
    id: 6,
    label: "Table",
    icon: MdOutlineTableRestaurant,
  },
  {
    id: 7,
    label: "Kitchen",
    icon: MdOutlineKitchen,
  },
  {
    id: 8,
    label: "Chair",
    icon: MdChairAlt,
  },
  {
    id: 9,
    label: "Desk",
    icon: MdOutlineDesk,
  },
  {
    id: 10,
    label: "Office",
    icon: PiOfficeChairBold,
  },
  {
    id: 11,
    label: "Decorator",
    icon: PiPottedPlantBold,
  },
  {
    id: 12,
    label: "Miscellaneous",
    icon: VscSymbolMisc,
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  
  const isMainPage = pathname === "/";

  if(!isMainPage) {
    return null;
  }

  return (
    <Container zIndex={10}>
      <div
        className="
                pt-4
                flex
                flex-row
                justify-between
                overflow-x-auto
            "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            id ={item.id}
            label={item.label}
            selected={category === item.label}
            icon={item.icon} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
