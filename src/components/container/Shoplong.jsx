import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";

const plants = [
  { title: "Air Purifying Plant", image: "/img/long1.jpg" },
  { title: "Perfect Office Plant", image: "/img/long2.png" },
  { title: "Fresh Aloe Vera Gel", image: "/img/long3.avif" },
  { title: "Pet Friendly Plant", image: "/img/long4.jpg" },
  { title: "Air Purifying Plant", image: "/img/long5.webp" },
  { title: "Room Plants", image: "/img/longg.avif" },
];

export default function Shoplong() {
  return (
    <FullContainer>
      <Container>
        <div className="grid gap-6 lg:grid-cols-3 w-full mt-12">
          {plants.map((plant, index) => (
            <div
              key={index}
              className="relative h-80 bg-cover bg-center rounded-lg overflow-hidden"
              style={{ backgroundImage: `url(${plant.image})` }}
            >
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-200 w-48 py-4 text-center rounded">
                <h5 className="text-lg font-semibold text-gray-700">
                  {plant.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
