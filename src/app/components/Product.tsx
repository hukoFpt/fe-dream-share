import React, { useEffect, useState } from "react";
import Container from "./Container";
import ProductBox from "./ProductBox";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from 'axios';

const Product = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
  .then(response => {
    setProducts(response.data.products);
    console.log(product);
  })
  .catch(error => console.error('Error:', error));
  }, []);
  
  const router = useRouter();
  const searchParams  = useSearchParams();
  const category = searchParams?.get('category')

  console.log("this is category from url ",product);
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
        
        {filteredProducts.map((product) => (
          console.log("this is item",product),
          <ProductBox
            key={product.id}
            label={product.name}
            image={product.image}
            price={product.price}
            category={product.category}
            collection={product.collection}
          />
        ))}
      </div>
    </Container>
  );
};

export default Product;
