import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Divider from "../common/Divider";
import { Link } from "react-router-dom";

export default function Shopcateogary({ categories }) {
  return (
    <FullContainer>
      <Container className="my-7">
        <div className="w-full flex items-center justify-between">
          <div>
            <h4 className="elementHeading4">Shop By Category</h4>
            <Divider className="h-1" />
          </div>
          <button className="btnSecondarySmall">See All</button>
        </div>
        <div className="grid lg:grid-cols-4 gap-5 mt-5">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function CategoryCard({ img, title }) {
  return (
    <div className="overflow-hidden bg-white shadow-xl transition-all rounded-lg flex flex-col items-center text-center">
      <img src={img} height={200} width={500} className="h-64" alt={title} />
      <div className="p-4">
        <p className="text-lg font-bold">{title}</p>
        <Link to={`/products/${title.replaceAll(" ", "-").toLowerCase()}`}>
          <button className="btnPrimarySmall mt-2 text-sm">Explore</button>
        </Link>
      </div>
    </div>
  );
}
