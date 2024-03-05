"use client";

import Image from "next/image";
import CollectionBox from "../CollectionBox";
import Container from "../Container";
import { useEffect, useState } from "react";

const Collections = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://65cd13f5dd519126b8401401.mockapi.io/Product")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <div className="font-bold pt-4 text-4xl">Our Collection</div>
      <div className="flex flex-row overflow-x-auto">
        {data.map((item: { id: string; title: string; image: string }) => (
          <CollectionBox key={item.id} label={item.title} image={item.image} />
        ))}
      </div>
    </Container>
  );
};

export default Collections;
