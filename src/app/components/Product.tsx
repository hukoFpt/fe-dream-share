import { useState } from "react";
import Container from "./Container";
import ProductBox from "./ProductBox";

export const product = [
  {
    label: "Giường Ngủ Gỗ Tràm MOHO MALAGA 302",
    collection: "NARVIK COLLECTION",
    price: 1000,
    category: "Bed",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "Giường Ngủ Gỗ Tràm MOHO MALAGA 301",
    collection: "NARVIK COLLECTION",
    price: 1000,
    category: "Bed",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO NEXO",
    collection: "UBEDA COLLECTION",
    price: 1000,
    category: "Chair",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_ghe_sofa_go_vline_dem_be_2_d671600bc3dd49df994de39312f4ff8b_large.jpg",
  },
  {
    label: "Giường Ngủ Gỗ Tràm MOHO MALAGA 302",
    collection: "NARVIK COLLECTION",
    price: 1000,
    category: "Bed",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "Giường Ngủ Gỗ Tràm MOHO MALAGA 301",
    collection: "NARVIK COLLECTION",
    price: 1000,
    category: "Bed",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO NEXO",
    collection: "UBEDA COLLECTION",
    price: 1000,
    category: "Chair",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_ghe_sofa_go_vline_dem_be_2_d671600bc3dd49df994de39312f4ff8b_large.jpg",
  },
  {
    label: "Giường Ngủ Gỗ Tràm MOHO MALAGA 302",
    collection: "NARVIK COLLECTION",
    price: 1000,
    category: "Bed",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "Giường Ngủ Gỗ Tràm MOHO MALAGA 301",
    collection: "NARVIK COLLECTION",
    price: 1000,
    category: "Bed",
    image:
      "https://product.hstatic.net/200000065946/product/pro_mau_nau_noi_that_moho_narvik_livingroom_full_04c13065d93a456ebf817275c8c54780_master.jpg",
  },
  {
    label: "Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO NEXO",
    collection: "UBEDA COLLECTION",
    price: 1000,
    category: "Chair",
    image:
      "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_ghe_sofa_go_vline_dem_be_2_d671600bc3dd49df994de39312f4ff8b_large.jpg",
  },
];
const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredProducts = selectedCategory
    ? product.filter((item) => item.category === selectedCategory)
    : product;
  console.log(selectedCategory);
  return (
    <Container zIndex={9}>
      <div
        className="
                p-4
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4
                overflow-x-auto
                
              "
      >
        {filteredProducts.map((item) => (
          <ProductBox
            key={item.label}
            label={item.label}
            image={item.image}
            price={item.price}
            category={item.category}
            collection={item.collection}
          />
        ))}
      </div>
    </Container>
  );
};

export default Product;
