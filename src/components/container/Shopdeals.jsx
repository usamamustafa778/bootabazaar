import React from "react";
import { Link } from "react-router-dom";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Divider from "../common/Divider";

export default function ShopDeals() {
  return (
    <FullContainer>
      <Container>
        <div className="w-full flex items-center justify-between mt-16">
          <div>
            <h4 className="elementHeading4">Best Selling Plants</h4>
            <Divider className="h-1" />
          </div>
          <button className="btnSecondarySmall">See All</button>
        </div>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-6 mt-6">
          {plantData.map((plant, index) => (
            <PlantCard
              key={index}
              img={plant.img}
              title={plant.title}
              plantName={plant.plantName}
              des={plant.des}
            />
          ))}
        </div>
      </Container>

      <Link to="/all-deals">
        <button className="btnPrimary my-4">See all Deals</button>
      </Link>
    </FullContainer>
  );
}

// PlantCard Component
function PlantCard({ img, title, plantName, des }) {
  return (
    <div className="overflow-hidden bg-white transition-all rounded-md flex flex-col items-center text-center lg:text-left hover:shadow-2xl p-1">
      <div className="h-56 w-full overflow-hidden rounded">
        <img
          src={img}
          alt={plantName || "Plant"} // Use plantName as alt if available
          className="w-full h-full object-cover hover:scale-125 transition-all"
        />
      </div>
      <div className="p-3">
        <p className="font-medium bg-red-600 text-white px-3 w-fit">{title}</p>
        <p className="font-medium mt-1">{plantName || "Plant Name"}</p>
        <p>{des}</p>
      </div>
    </div>
  );
}

// Sample plant data array
const plantData = [
  {
    img: "/img/p1.webp",
    title: "30% off",
    plantName: "Plant 1",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p2.jpg",
    title: "30% off",
    plantName: "Plant 2",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p3.webp",
    title: "30% off",
    plantName: "Plant 3",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p4.webp",
    title: "30% off",
    plantName: "Plant 4",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p5.jpg",
    title: "30% off",
    plantName: "Plant 5",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p6.jpg",
    title: "30% off",
    plantName: "Plant 6",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p7.webp",
    title: "30% off",
    plantName: "Plant 7",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p8.webp",
    title: "30% off",
    plantName: "Plant 8",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p9.jpg",
    title: "30% off",
    plantName: "Plant 9",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p10.jpg",
    title: "30% off",
    plantName: "Plant 10",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p11.jpg",
    title: "30% off",
    plantName: "Plant 11",
    des: "Lorem ipsum dolor sit amet...",
  },
  {
    img: "/img/p13.jpg",
    title: "30% off",
    plantName: "Plant 12",
    des: "Lorem ipsum dolor sit amet...",
  },
];
