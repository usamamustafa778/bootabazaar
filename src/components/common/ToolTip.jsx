import React from "react";

export default function ToolTip({ tool, tip, className }) {
  return (
    <div className="navDropdownButton relative w-fit">
      <p className="w-fit">{tool}</p>
      <div
        className={`navDropdown mt-6 top-0 left-1/2 transform -translate-x-1/2 flex-col items-center z-10 w-[500px] absolute ${className}`}
      >
        <Triangle />
        <p
          style={{ fontSize: "12px" }}
          className="bg-dark py-2 px-4 text-white rounded normal-case font-medium max-w-3xl whitespace-pre-wrap text-center"
        >
          {tip}
        </p>
      </div>
    </div>
  );
}

function Triangle() {
  const triangleStyles = {
    width: "0",
    height: "0",
    borderBottom: "10px solid #071827", // Replace 'border-blue-900' with the desired color value
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
  };

  return <div style={triangleStyles}></div>;
}
