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

export const categories = [
  {
    label: "Closet",
    icon: RiTableAltLine,
  },
  {
    label: "Bed",
    icon: IoBedOutline,
  },
  {
    label: "Sofa",
    icon: TbSofa,
  },
  {
    label: "Shelf",
    icon: BsBookshelf,
  },
  {
    label: "Cabinet",
    icon: HiTableCells,
  },
  {
    label: "Table",
    icon: MdOutlineTableRestaurant,
  },
  {
    label: "Kitchen",
    icon: MdOutlineKitchen,
  },
  {
    label: "Chair",
    icon: MdChairAlt,
  },
  {
    label: "Desk",
    icon: MdOutlineDesk,
  },
  {
    label: "Office",
    icon: PiOfficeChairBold,
  },
  {
    label: "Decorator",
    icon: PiPottedPlantBold,
  },
  {
    label: "Miscellaneous",
    icon: VscSymbolMisc,
  },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? null : category);
  };

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
            label={item.label}
            icon={item.icon}
            selected={item.label === selectedCategory}
            onClick={() => handleCategoryClick(item.label)}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
