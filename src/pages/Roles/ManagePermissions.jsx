import React, { useEffect, useRef, useState } from "react";
import useApi from "../../utils/useApi";
import toast from "react-hot-toast";
import { LoaderCircle, Save, X } from "lucide-react";
import { CheckBox, SearchBox } from "../../components";
import Checkbox from "../../components/common/CheckBox";
import SubPermissions from "./SubPermissions";

export default function ManagePermissions({
  sidebar,
  toggleSidebar,
  getRoles,
  selectedRole,
  selectedData,
  setSelectedData,
}) {
  const addFromRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addFromRef.current && !addFromRef.current.contains(event.target)) {
        if (sidebar) toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar, toggleSidebar]);

  const [permissions, setPermissions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { request } = useApi();
  const getPermissions = async () => {
    try {
      const res = await request({ method: "get", url: "permissions" });
      setPermissions(res.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const [updating, setUpdting] = useState(false);
  const assignTask = async (e) => {
    e.preventDefault();

    setUpdting(true);
    try {
      await request({
        method: "post",
        url: `roles/${selectedRole?._id}/update_role_permissions`,
        data: {
          menu_permissions: selectedData,
        },
      });
      console.log("Selected Data", selectedData);
      toast.success(`${selectedRole?.name} permissions updated`);
      getRoles();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }

    setUpdting(false);
  };
  const tasks = permissions?.filter((e) => {
    return Object.keys(e)?.some(
      (key) =>
        e[key] &&
        e[key]?.toString()?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
  });
  const onSingleselect = (item) => {
    setSelectedData(handleCheckboxSelection(item));
  };

  function handleCheckboxSelection(name) {
    const findMenuItem = (menu, currentLabel) => {
      for (const item of menu) {
        if (item.name === currentLabel) {
          return item;
        } else if (item.sub_permissions) {
          const foundInChildren = findMenuItem(
            item.sub_permissions,
            currentLabel
          );
          if (foundInChildren) {
            return foundInChildren;
          }
        }
      }
      return null;
    };

    const menuItem = findMenuItem(permissions, name);

    if (!menuItem) {
      console.error("Menu item not found");
      return selectedData;
    }

    const getParentLabel = (menu, currentLabel) => {
      const parentItem = menu.find((item) => {
        if (
          item.sub_permissions &&
          item.sub_permissions.some((child) => child.name === currentLabel)
        ) {
          return true;
        }
        return false;
      });
      return parentItem ? parentItem.name : null;
    };

    const getDescendantLabels = (menu, currentLabel) => {
      const foundItem = findMenuItem(menu, currentLabel);
      if (!foundItem) {
        return [];
      }

      const descendantLabels = [currentLabel];
      if (foundItem.sub_permissions) {
        for (const child of foundItem.sub_permissions) {
          descendantLabels.push(
            ...getDescendantLabels(foundItem.sub_permissions, child.name)
          );
        }
      }
      return descendantLabels;
    };

    const parentLabel = getParentLabel(permissions, name);
    const descendantLabels = getDescendantLabels(permissions, name);

    if (menuItem.sub_permissions) {
      if (selectedData?.includes(name)) {
        const remainingSelectedLabels = selectedData?.filter(
          (selectedLabel) => !descendantLabels?.includes(selectedLabel)
        );

        if (
          remainingSelectedLabels?.includes(name) &&
          parentLabel &&
          !remainingSelectedLabels?.some(
            (selectedLabel) =>
              getParentLabel(permissions, selectedLabel) === parentLabel
          )
        ) {
          remainingSelectedLabels?.push(parentLabel);
        }

        return remainingSelectedLabels?.filter(
          (selectedLabel) => selectedLabel !== name
        );
      } else {
        const updatedSelectedLabels = Array?.from(
          new Set([...selectedData, name, ...descendantLabels])
        );
        if (parentLabel && !updatedSelectedLabels?.includes(parentLabel)) {
          updatedSelectedLabels?.push(parentLabel);
        }
        return updatedSelectedLabels;
      }
    } else {
      if (selectedData.includes(name)) {
        const remainingLabels = selectedData.filter(
          (selectedLabel) => !descendantLabels.includes(selectedLabel)
        );

        if (
          parentLabel &&
          !remainingLabels.some(
            (selectedLabel) =>
              getParentLabel(permissions, selectedLabel) === parentLabel
          )
        ) {
          return remainingLabels.filter(
            (selectedLabel) => selectedLabel !== parentLabel
          );
        }

        return remainingLabels;
      } else {
        const updatedSelectedLabels = [...selectedData, name];

        if (descendantLabels.length > 1) {
          updatedSelectedLabels.push(...descendantLabels.slice(1));
        }
        if (parentLabel && !updatedSelectedLabels.includes(parentLabel)) {
          updatedSelectedLabels.push(parentLabel);
        }

        return updatedSelectedLabels;
      }
    }
  }
  function handleSelectAll() {
    const allLabels = getAllLabels();
    const allLabelsSelected = allLabels.every((name) =>
      selectedData.includes(name)
    );
    if (allLabelsSelected) {
      return selectedData.filter((name) => !allLabels.includes(name));
    } else {
      return Array.from(new Set([...selectedData, ...allLabels]));
    }
  }

  function getAllLabels() {
    const names = [];
    const collectLabels = (menu) => {
      for (const item of menu) {
        names.push(item.name);

        if (item.sub_permissions) {
          collectLabels(item.sub_permissions);
        }
      }
    };

    collectLabels(permissions);
    return names;
  }
  const handleSelectAllCheckboxChange = () => {
    const updatedSelectedData = handleSelectAll();
    setSelectedData(updatedSelectedData);
  };
  const isSelectAll = () => {
    const allLabels = getAllLabels();
    const allLabelsSelected = allLabels?.every((name) =>
      selectedData?.includes(name)
    );
    if (allLabelsSelected) {
      return true;
    } else {
      return false;
    }
  };

  const [expandedCards, setExpandedCards] = useState({});

  return (
    <div
      ref={addFromRef}
      className={`md:w-[600px] h-screen overflow-y-scroll z-50 fixed right-0 top-0 p-6 bg-white dark:bg-gray-800 capitalize ${
        sidebar && "shadow-l shadow-black/20 dark:shadow-gray-600/40"
      }`}
      style={{ transform: sidebar ? "translateX(0)" : "translateX(100%)" }}
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="capitalize">{selectedRole?.name} Permissions</h3>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={toggleSidebar}
            className="btnPrimary bg-red-500 px-2 py-1"
          >
            <X className="w-4 h-4" /> Close
          </button>
          <button
            onClick={assignTask}
            className="btnPrimary bg-green-600 px-2 py-1"
          >
            {updating ? (
              <LoaderCircle className="w-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {updating ? <p>Updating Permissions</p> : <p>Save & Update</p>}
          </button>
        </div>
      </div>

      <SearchBox
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        className="dark:border-white/20 mt-6"
      />
      <div className="mt-5">
        <Checkbox
          label="Select All"
          checked={isSelectAll()}
          onChange={handleSelectAllCheckboxChange}
          className="py-2 border-b dark:border-white/20"
        />
        {tasks.map((item, index) => {
          const { name, sub_permissions } = item;
          return (
            <div key={index}>
              {sub_permissions?.length ? (
                <SubPermissions
                  children={sub_permissions}
                  label={name}
                  onSingleselect={onSingleselect}
                  selectedData={selectedData}
                  isOpen={expandedCards[index]}
                  setIsOpen={() =>
                    setExpandedCards({
                      ...expandedCards,
                      [index]: !expandedCards[index],
                    })
                  }
                  index={index}
                />
              ) : (
                <CheckBox
                  onChange={() => onSingleselect(name)}
                  checked={selectedData?.includes(name)}
                  label={name}
                  className="py-2 border-b dark:border-white/20"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
