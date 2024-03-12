import CollectionBox from "../CollectionBox.";
import Container from "../Container";
import { SetStateAction, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

export const collection = [
  {
    id: 1,	
    label: "NARVIK COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_combo_day_du_4_mon_noi_that_moho_narvik__36__b66a0bce8222400f85a4d353cad12fb0_master.jpg",
  },
  {
    id: 2,
    label: "UBEDA COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_ubeda_livingroom_a4a14b63e87d4d0486eefd7402dbf9bd_master.jpg",
  },
  {
    id: 3,
    label: "KROSTER COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_combo_full_house_1_noi_that_moho_koster_e720c470be4a456da8be33fb6717e06b_master.jpg",
  },
  {
    id: 4,
    label: "GRENAA COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_grenaa_moho__7__69d231891277473fbe532e1af7244cbb_master.jpg",
  },
  {
    id: 5,
    label: "LANGO COLLECTION",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_combo_phong_khach_lango_mau_nau__22__d14f5fd0133d4ddf9f2984e2ca9db2f6_master.jpg",
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
