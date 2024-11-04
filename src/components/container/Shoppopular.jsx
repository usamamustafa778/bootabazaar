import React from "react";
import { plantsData } from "../../localData";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Divider from "../common/Divider";
import PlantCard from "./PlantCard";

export default function Shoppopular() {
  return (
    <FullContainer>
      <Container>
        <div className="w-full flex items-center justify-between">
          <div>
            <h4 className="elementHeading4 mt-6">Most popular indoor plants</h4>
            <Divider className="h-1" />
          </div>
          <button className="btnSecondarySmall">See All</button>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-6 mt-3">
          {plantsData.map((plant, index) => (
            <PlantCard
              key={index}
              plant_name={plant.plant_name}
              img={plant.img}
              category={plant.category.replaceAll(" ", "-").toLowerCase()}
            />
          ))}
        </div>

        <div className="w-full flex items-center justify-between">
          <div>
            <h4 className="elementHeading4 mt-10">
              Most popular Outdoor plants
            </h4>
            <Divider className="h-1" />
          </div>
          <button className="btnSecondarySmall">See All</button>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-6 mt-3">
          {plantsData.map((plant, index) => (
            <PlantCard
              key={index}
              img={plant.img}
              plant_name={plant.plant_name}
              category={plant.category.replaceAll(" ", "-").toLowerCase()}
            />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
