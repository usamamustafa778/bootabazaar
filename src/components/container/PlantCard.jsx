import { Link } from "react-router-dom";

export default function PlantCard({ img, plant_name, category }) {
  return (
    <div className="overflow-hidden bg-white transition-all rounded-md flex flex-col items-center text-center lg:text-left hover:shadow-2xl p-1">
      <Link
        to={`/products/${category}/${plant_name
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        className="h-56 w-full overflow-hidden rounded"
      >
        <img
          src={img}
          height={200}
          width={500}
          className="w-full h-full hover:scale-125 transition-all"
          alt={plant_name} // Use plant_name as alt
        />
      </Link>
      <div className="p-3 w-full">
        <p className="font-medium">{plant_name}</p> {/* Display plant_name */}
        <p>Rs. 1500</p>
      </div>
    </div>
  );
}
