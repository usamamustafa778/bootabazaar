import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ className }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const pathSegments = currentPath
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <div
      className={`text-gray-600 dark:text-gray-300 flex items-center space-x-3 w-full ${className}`}
    >
      <Link
        to="/"
        className="flex items-center hover:text-primary dark:hover:text-white gap-1 border-transparent border-b-2 hover:border-primary dark:hover:border-white transition-all"
      >
        Home
        <span>/</span>
      </Link>
      {pathSegments.map((segment, index) => (
        <div key={index} className="flex capitalize justify-between">
          {index !== pathSegments.length - 1 ? (
            <Link
              to={`/${pathSegments.slice(0, index + 1).join("/")}`}
              className="flex items-center hover:text-primary dark:hover:text-white gap-1 border-transparent border-b-2 hover:border-primary dark:hover:border-white transition-all"
            >
              {segment}
              <span>/</span>
            </Link>
          ) : (
            <div className="flex items-center border-transparent font-semibold border-b-2 transition-all">
              {segment}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
