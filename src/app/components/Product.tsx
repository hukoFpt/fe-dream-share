import React, { useEffect, useState } from "react";
import Container from "./Container";
import ProductBox from "./ProductBox";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { categories } from "./navbar/Categories";

const Product = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");

  const selectedCategory = category;
  const productCategory = categories.find(
    (category) => category.id === product.type_id
  );
  const filteredProducts = product.filter((item) => {
    if (!selectedCategory) {
      return true;
    }

    const productCategory = categories.find(
      (category) => category.id === item.type_id
    );

    return productCategory && productCategory.label === selectedCategory;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-rose-500 font-bold text-xl text-center pt-4">
        No products found for this category.
      </div>
    );
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
        {filteredProducts.map((product) => {
          const productCategory = categories.find(
            (category) => category.id === product.type_id
          );
          return (
            <ProductBox
              key={product.id}
              id={product.id}
              category={productCategory ? productCategory.label : "Unknown"}
              collection={product.brand_id}
              code={product.code}
              name={product.name}
              description={product.description}
              highlight={product.highlight}
              price={product.price}
              quantity={product.quantity}
              size={product.size}
              color={product.color}
              status={product.status}
              image={product.image}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Product;
