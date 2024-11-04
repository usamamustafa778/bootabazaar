import React from "react";

const CircularProgressBar = ({ progress, size, title, quotes }) => {
  const strokeWidth = 8; // Width of the progress bar line
  const radius = (size - strokeWidth) / 2; // Radius of the circular progress bar
  const circumference = radius * 2 * Math.PI; // Circumference of the circle
  const offset = circumference - (progress / 100) * circumference; // How much of the circle is filled

  // Determine the color based on the progress value
  const getColor = (progress) => {
    if (progress >= 80) {
      return "#22c55e"; // Green for progress >= 80%
    } else if (progress < 80 && progress >= 60) {
      return "#fbbf24"; // Warning (yellow) for progress < 80% and >= 60%
    } else {
      return "#ef4444"; // Red for progress < 60%
    }
  };

  const progressColor = getColor(progress);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex justify-center items-center">
        <svg width={size} height={size} className="text-gray-300">
          {/* Background circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset: 0 }}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Foreground circle */}
          <circle
            stroke={progressColor} // Apply the dynamic color based on progress
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 0.5s ease 0s",
            }}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute text-sm font-semibold flex flex-col">
          {`${progress}`}
          <p className="text-xs text-gray-400">Active</p>
        </div>
      </div>
      <p className="mt-2">{title}</p>
      <p className="w-full text-sm">
        <b>Quotes:</b> {quotes}
      </p>
    </div>
  );
};

export default CircularProgressBar;
