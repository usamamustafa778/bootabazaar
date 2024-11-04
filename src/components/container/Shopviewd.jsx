import React from "react";
import { Link } from "react-router-dom";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Divider from "../common/Divider";
import StarRating from "./StarRating";

const plantsList = [
  {
    img: "/img/p13.jpg",
    title: "Succulent",
    des: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: "/img/p14.webp",
    title: "Fern",
    des: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: "/img/p15.jpg",
    title: "30% off",
    des: "Lorem ipsum dolor sit amet consecteturs",
  },
  {
    img: "/img/p1.webp",
    title: "Snake Plant",
    des: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: "/img/p2.jpg",
    title: "Rose",
    des: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: "/img/p9.jpg",
    title: "Palm Tree",
    des: "Lorem ipsum dolor sit amet consectetur",
  },
];

export default function ShopViewed() {
  return (
    <FullContainer>
      <Container>
        <div className="w-full flex items-center justify-between mt-16">
          <div>
            <h4 className="elementHeading4">
              Recently viewed from your browser
            </h4>
            <Divider className="h-1" />
          </div>
          <Link to="/all-plants">
            <button className="btnSecondarySmall">See All</button>
          </Link>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-6 mt-5">
          {plantsList.map((plant, index) => (
            <PlantCard key={index} {...plant} />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function PlantCard({ img, title, des }) {
  return (
    <div className="overflow-hidden bg-white transition-all rounded-md flex flex-col items-center text-center lg:text-left text-sm hover:shadow-2xl p-1">
      <div className="h-56 w-full overflow-hidden rounded">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover hover:scale-125 transition-all"
        />
      </div>
      <div className="p-3">
        <p className="font-medium">{title}</p>
        <p className="mb-1">{des}</p>
        <StarRating rating={4} />
      </div>
    </div>
  );
}
