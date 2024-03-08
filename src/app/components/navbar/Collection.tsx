import CollectionBox from "../CollectionBox.";
import Container from "../Container";
import { SetStateAction, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

export const collection = [
  {
    label: "NARVIK COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "UBEDA COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "KROSTER COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "HAVIK COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "NAVI COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
];

const Collection = () => {
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
                  p-4
                  flex
                  flex-row
                  gap-4
                  overflow-x-auto
              "
      >
        {collection.map((item) => (
          <CollectionBox
            key={item.label}
            label={item.label}
            image={item.image}
            className="flex-shrink-0"
          />
        ))}
      </div>
    </Container>
  );
};

export default Collection;
