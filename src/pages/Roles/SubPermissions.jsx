import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { CheckBox } from "../../components";
import Checkbox from "../../components/common/CheckBox";

export default function SubPermissions({
  label,
  children,
  selectedData,
  onSingleselect,
  isOpen: initialIsOpen,
  setIsOpen: parentSetIsOpen,
  level = 0,
}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  const renderSubPermissions = (permissions, level = 0) => {
    return permissions.map((permission, index) => (
      <div
        key={index}
        className={`ml-${level * 5} border-t dark:border-white/20 py-1 ${
          level > 0 ? "" : ""
        }`}
      >
        {permission?.sub_permissions?.length ? (
          <SubPermissions
            children={permission.sub_permissions}
            label={permission.name}
            onSingleselect={onSingleselect}
            selectedData={selectedData}
            isOpen={false}
            level={level + 1}
          />
        ) : (
          <Checkbox
            label={permission.name}
            onChange={() => onSingleselect(permission.name)}
            checked={selectedData?.includes(permission.name)}
          />
        )}
      </div>
    ));
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 dark:border-white/20 ${
        isOpen && "pb-1"
      } ${level > 0 ? "ml-5" : "border-b"}`}
    >
      <div
        className={`flex items-center justify-between cursor-pointer py-2`}
        onClick={children?.length > 0 ? toggleOpen : () => {}}
      >
        <Checkbox
          label={label}
          onChange={() => onSingleselect(label)}
          checked={selectedData?.includes(label)}
        />

        {children?.length > 0 && (
          <ChevronUp
            className={`w-6 transition-transform transform text-gray-500 dark:text-gray-300 ${
              isOpen && "rotate-180"
            }`}
          />
        )}
      </div>
      <div
        className={`overflow-hidden pl-5 transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-fit" : "max-h-0"
        }`}
      >
        {renderSubPermissions(children, level + 1)}
      </div>
    </div>
  );
}
