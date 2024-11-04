import React, { useEffect, useRef, useState, useCallback } from "react";
import { Boxes, PlusCircle, SquarePen, Trash } from "lucide-react";
import { DataTable, InputField } from "../../components";
import usePermissions from "../../utils/userPermission";
import toast, { Toaster } from "react-hot-toast";
import useApi from "../../utils/useApi";
import dayjs from "dayjs";

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [deleteInd, setDelete] = useState(null);
  const [updateInd, setUpdate] = useState(null);
  const { isLoading, request } = useApi();
  const dropdownRef = useRef(null);
  const updateRef = useRef({});
  const deleteRef = useRef({});

  const getIndustries = useCallback(async () => {
    try {
      const { data } = await request({ method: "get", url: "industries" });
      setIndustries(data);
    } catch (err) {
      toast.error("Failed to fetch industries.");
      console.error(err);
    }
  }, [request]);

  useEffect(() => {
    getIndustries();
  }, []);

  const addIndustry = async (e) => {
    e.preventDefault();
    const value = e.target.input.value;
    try {
      await request({
        method: "post",
        url: "industries",
        data: { industry_name: value },
      });
      getIndustries();
      e.target.reset();
      setDropdown(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteIndustry = async (industry) => {
    try {
      await request({ method: "delete", url: `industries/${industry._id}` });
      getIndustries();
      setDelete(null);
      toast.success(`${industry.industry_name} industry removed.`);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const updateIndustry = async (e, industry) => {
    e.preventDefault();
    const newValue = e.target.elements.update.value;
    try {
      await request({
        method: "put",
        url: `industries/${industry._id}`,
        data: { industry_name: newValue },
      });
      getIndustries();
      setUpdate(null);
      toast.success(`${industry.industry_name} industry updated.`);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setDropdown(false);
      Object.entries(deleteRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) setDelete(null);
      });
      Object.entries(updateRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) setUpdate(null);
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { hasPermission } = usePermissions();

  return (
    hasPermission("View Template Categories") && (
      <div>
        <Toaster />
        <DataTable
          searchBox
          title={
            <span className="flex items-center gap-2">
              <Boxes className="w-6 h-6" /> Template Categories
            </span>
          }
          isLoading={isLoading}
          heads={[
            "Sr#",
            (hasPermission("Edit Category") ||
              hasPermission("Delete Category")) &&
              "Actions",
            "Category",
            "Templates",
            "Sites",
            "Created By",
            "Created At",
            "Updated At",
          ]}
          items={industries.map((industry, index) => ({
            serial: index + 1,
            actions: (
              <div className="flex items-center gap-2">
                {hasPermission("Delete Category") && (
                  <DeleteAction
                    index={index}
                    deleteInd={deleteInd}
                    setDelete={setDelete}
                    deleteIndustry={deleteIndustry}
                    industry={industry}
                    ref={deleteRef}
                  />
                )}
                {hasPermission("Edit Category") && (
                  <UpdateAction
                    index={index}
                    updateInd={updateInd}
                    setUpdate={setUpdate}
                    updateIndustry={updateIndustry}
                    industry={industry}
                    ref={updateRef}
                  />
                )}
              </div>
            ),
            industry: industry.industry_name,
            templates: "",
            sites: "",
            createdB: (
              <p className="capitalize">
                {industry?.createdBy?.first_name}{" "}
                {industry?.createdBy?.last_name}
              </p>
            ),
            createdAt: dayjs(industry.createdAt).format(
              "ddd, MMM D, YYYY h:mm A"
            ),
            updatedAt: dayjs(industry.updatedAt).format(
              "ddd, MMM D, YYYY h:mm A"
            ),
          }))}
          extras={
            hasPermission("Add Category") && (
              <AddCategoryForm
                dropdown={dropdown}
                setDropdown={setDropdown}
                addIndustry={addIndustry}
                ref={dropdownRef}
              />
            )
          }
        />
      </div>
    )
  );
};

const DeleteAction = React.forwardRef(
  ({ index, deleteInd, setDelete, deleteIndustry, industry }, ref) => (
    <div className="relative">
      <Trash onClick={() => setDelete(index)} className="deleteIcon" />
      {deleteInd === index && (
        <div
          ref={(el) => (ref.current[index] = el)}
          className="p-5 absolute top-0 left-0 ml-5 rounded-md shadow-2xl shadow-black/30 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 z-50"
        >
          <p className="font-medium">
            Please confirm to delete {industry.industry_name} Industry
          </p>
          <div className="flex items-center justify-end mt-4">
            <button onClick={() => setDelete(null)} className="px-6">
              Cancel
            </button>
            <button
              onClick={() => deleteIndustry(industry)}
              className="btnPrimary bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
);

const UpdateAction = React.forwardRef(
  ({ index, updateInd, setUpdate, updateIndustry, industry }, ref) => (
    <div className="relative">
      <SquarePen
        onClick={() => setUpdate(index)}
        className="w-4 cursor-pointer"
      />
      {updateInd === index && (
        <form
          ref={(el) => (ref.current[index] = el)}
          className="p-5 absolute top-0 left-0 ml-5 rounded-md shadow-xl border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 z-50 w-80"
          onSubmit={(e) => updateIndustry(e, industry)}
        >
          <InputField
            name="update"
            label="Category Name"
            placeholder="Update category name"
            defaultValue={industry.industry_name}
          />
          <div className="flex items-center justify-end mt-4">
            <button
              type="button"
              onClick={() => setUpdate(null)}
              className="px-6"
            >
              Cancel
            </button>
            <button type="submit" className="btnPrimary bg-black">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  )
);

const AddCategoryForm = React.forwardRef(
  ({ dropdown, setDropdown, addIndustry }, ref) => (
    <div className="relative text-black dark:text-white/80">
      {dropdown && (
        <form
          onSubmit={addIndustry}
          ref={ref}
          className="flex-col w-[300px] z-50 items-center absolute top-0 right-0 mt-10 p-5 bg-white dark:bg-gray-800 rounded-md capitalize shadow-xl"
        >
          <InputField
            name="input"
            label="Category Name"
            placeholder="Enter new category name"
          />
          <div className="flex items-center justify-end mt-3">
            <button type="submit" className="btnPrimary bg-black">
              Add
            </button>
          </div>
        </form>
      )}
      <button
        onClick={() => setDropdown(!dropdown)}
        className="btnPrimary px-3"
      >
        <PlusCircle className="h-4 w-4" /> Add Category
      </button>
    </div>
  )
);

export default Industries;
