"use client";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { TbArmchair, TbBrandAirtable, TbBedFlat } from "react-icons/tb";

export const categories = [
  {
    label: "Chair",
    icon: TbArmchair,
  },
  {
    label: "Table",
    icon: TbBrandAirtable,
  },
  {
    label: "Bed",
    icon: TbBedFlat,
  },
];

const Categories = () => {
  return (
    <Container>
      <div
        className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            "
      >
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
