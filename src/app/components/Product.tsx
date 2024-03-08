import React, { useEffect, useState } from "react";
import Container from "./Container";
import ProductBox from "./ProductBox";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from 'axios';

const Product = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://65cd13f5dd519126b8401401.mockapi.io/Product')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);
  
  const router = useRouter();
  const searchParams  = useSearchParams();
  const category = searchParams?.get('category')

  console.log("this is category from url ",category);
  const selectedCategory = category;

  const filteredProducts = selectedCategory
    ? product.filter((item) => item.category === selectedCategory)
    : product;
  console.log(selectedCategory);

  if (filteredProducts.length === 0) {
    return <div className="text-rose-500 font-bold text-xl text-center pt-4">No products found for this category.</div>;
  }

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
            key={item.id}
            label={item.title}
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
