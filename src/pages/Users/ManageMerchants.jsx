import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Checkbox from "../../components/common/CheckBox";

export default function ManageMerchants({
  selectedData,
  setSelectedData,
  merchants = [],
}) {
  const isSelected = (project_id) => {
    if (selectedData?.length > 0) {
      if (selectedData?.filter((item) => item._id === project_id).length > 0) {
        return true;
      }
    } else {
    }
    return false;
  };

  const onSelectAll = (checked) => {
    if (checked) {
      const updatedArray = merchants?.map((item) => item);
      setSelectedData(updatedArray);
    } else {
      setSelectedData([]);
    }
  };

  const onSingleSelect = ({ checked, data }) => {
    if (checked) {
      setSelectedData([...selectedData, data]);
    } else {
      setSelectedData(selectedData?.filter((item) => item._id !== data._id));
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-black dark:text-white/80">
      {dropdownVisible && (
        <div
          ref={dropdownRef}
          className="flex-col w-[290px] py-1 z-50 p-1 items-center absolute bottom-0 left-0 mb-12 ml-5 bg-white dark:bg-gray-800 rounded-md shadow-lg border-2 dark:border-white/20"
        >
          <Checkbox
            label="Select All"
            onChange={(e) => onSelectAll(e.target.checked)}
            checked={
              merchants?.length && merchants?.length === selectedData?.length
            }
            className="p-2 transition-all border-b last:border-none dark:border-white/20 hover:bg-gray-200 dark:hover:bg-gray-800"
          />
          {merchants.map((item, index) => (
            <Checkbox
              key={index}
              label={item.name}
              checked={isSelected(item._id)}
              onChange={(e) =>
                onSingleSelect({
                  checked: e.target.checked,
                  data: item,
                })
              }
              className="p-2 transition-all border-b last:border-none dark:border-white/20 hover:bg-gray-200 dark:hover:bg-gray-800"
            />
          ))}
        </div>
      )}
      <div>
        <p className="inputLabel mb-1">Secondary Merchants</p>
        <button
          title="Assign Merchants To User"
          type="button"
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="inputField flex items-center justify-between text-gray-500"
        >
          <p>Select Secondary Merchants</p>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
