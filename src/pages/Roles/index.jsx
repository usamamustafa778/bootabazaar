import React, { useEffect, useRef, useState, useCallback } from "react";
import dayjs from "dayjs";
import useApi from "../../utils/useApi";
import toast, { Toaster } from "react-hot-toast";
import { DataTable, InputField } from "../../components";
import {
  Edit,
  Group,
  PlusCircle,
  RefreshCw,
  Trash,
  UserRoundCog,
} from "lucide-react";
import ManagePermissions from "./ManagePermissions";
import usePermissions from "../../utils/userPermission";

const Roles = () => {
  const { isLoading, request } = useApi();
  const [roles, setRoles] = useState([]);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(null);
  const [deleteRl, setDelete] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const addRef = useRef(null);
  const deleteRef = useRef({});
  const updateRef = useRef({});

  const getRoles = useCallback(async () => {
    try {
      const data = await request({ method: "get", url: "roles" });
      setRoles(Array.isArray(data) ? data : [data]);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }, [request]);

  useEffect(() => {
    getRoles();
  }, []);

  const addRole = async (e) => {
    e.preventDefault();
    const value = e.target.input.value;
    try {
      await request({
        method: "post",
        url: "roles",
        data: {
          name: value,
          has_all_privileges: false,
        },
      });
      toast.success("New Role Created.");
      getRoles();
      setAdd(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const updateRole = async (e, role) => {
    e.preventDefault();
    const newValue = e.target.update.value;
    try {
      await request({
        method: "put",
        url: `roles`,
        data: {
          id: role._id,
          name: newValue,
          has_all_privileges: true,
          active: true,
        },
      });
      toast.success(`Role ${role.name} updated.`);
      getRoles();
      setUpdate(null);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteRole = async (role) => {
    try {
      await request({
        method: "delete",
        url: "roles",
        data: { id: role._id },
      });
      toast.success(`Role: ${role.name} removed.`);
      getRoles();
      setDelete(null);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addRef.current && !addRef.current.contains(event.target)) {
        setAdd(false);
      }
      Object.entries(deleteRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setDelete(null);
        }
      });
      Object.entries(updateRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setUpdate(null);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handlePermissions = (role) => {
    setSelectedRole(role);
    setSelectedData(role?.menu_permissions || []);
    toggleSidebar();
  };

  const { hasPermission } = usePermissions();

  return (
    hasPermission("View Roles") && (
      <div>
        <Toaster />
        <DataTable
          title={
            <span className="flex items-center gap-2">
              <Group className="w-6 h-6" /> User Roles
            </span>
          }
          searchBox
          isLoading={isLoading}
          heads={[
            "Sr#",
            (hasPermission("Edit Role") ||
              hasPermission("delete role") ||
              hasPermission("manage permissions")) &&
              "Actions",
            "Role Name",
            "Created At",
            "Updated At",
          ]}
          items={roles?.map((role, index) => ({
            serial: index + 1,
            actions: (
              <Actions
                index={index}
                role={role}
                setDelete={setDelete}
                deleteRl={deleteRl}
                deleteRef={deleteRef}
                deleteRole={deleteRole}
                setUpdate={setUpdate}
                update={update}
                updateRef={updateRef}
                updateRole={updateRole}
                handlePermissions={handlePermissions}
                hasPermission={hasPermission}
                roles={roles}
              />
            ),
            name: role.name,
            createdAt: dayjs(role.createdAt).format("ddd, MMM D, YYYY h:mm A"),
            updatedAt: dayjs(role.updatedAt).format("ddd, MMM D, YYYY h:mm A"),
          }))}
          extras={
            <Extras
              add={add}
              setAdd={setAdd}
              addRole={addRole}
              addRef={addRef}
              isLoading={isLoading}
              getRoles={getRoles}
              hasPermission={hasPermission}
            />
          }
        />
        {hasPermission("manage permissions") && (
          <ManagePermissions
            sidebar={sidebar}
            toggleSidebar={toggleSidebar}
            roles={roles}
            selectedRole={selectedRole}
            getRoles={getRoles}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        )}
      </div>
    )
  );
};

const Actions = React.forwardRef(
  (
    {
      index,
      role,
      setDelete,
      deleteRl,
      deleteRef,
      deleteRole,
      setUpdate,
      update,
      updateRef,
      updateRole,
      handlePermissions,
      hasPermission,
      roles,
    },
    ref
  ) => (
    <div className="flex items-center gap-3" ref={ref}>
      {hasPermission("delete role") && (
        <div className="relative">
          <Trash onClick={() => setDelete(index)} className="deleteIcon" />
          {deleteRl === index && (
            <div
              ref={(el) => (deleteRef.current[index] = el)}
              className="p-5 absolute top-0 left-0 ml-5 rounded-md shadow-2xl shadow-black/30 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 z-50"
            >
              <p className="font-medium">
                Please confirm to delete {role.name} role
              </p>
              <div className="flex items-center justify-end mt-4">
                <button onClick={() => setDelete(null)} className="px-6">
                  Cancel
                </button>
                <button
                  onClick={() => deleteRole(role)}
                  className="btnPrimary bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {hasPermission("Edit Role") && (
        <div className="relative">
          <Edit onClick={() => setUpdate(index)} className="editIcon" />
          {update === index && (
            <form
              ref={(el) => (updateRef.current[index] = el)}
              className={`p-5 absolute left-0 ml-5 rounded-md shadow-xl border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 z-50 w-80 ${
                index >= roles.length - 2 ? "bottom-0" : "top-0"
              }`}
              onSubmit={(e) => updateRole(e, role)}
            >
              <InputField
                name="update"
                label="Update Role Name"
                placeholder="Update role name"
                defaultValue={role.name}
              />
              <div className="flex items-center justify-end mt-4">
                <button onClick={() => setUpdate(null)} className="px-6">
                  Cancel
                </button>
                <button type="submit" className="btnPrimary bg-black">
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      {hasPermission("manage permissions") && (
        <button
          onClick={() => handlePermissions(role)}
          className="border-b-2 text-primary hover:border-primary dark:border-white/20 dark:hover:border-primary transition-all flex items-center gap-1 font-medium"
        >
          <UserRoundCog className="h-4 w-4" />
          Permissions
        </button>
      )}
    </div>
  )
);

const Extras = ({
  add,
  setAdd,
  addRole,
  addRef,
  isLoading,
  getRoles,
  hasPermission,
}) => (
  <div className="flex items-center gap-2">
    <RefreshCw
      title="Refresh"
      onClick={getRoles}
      className={`w-5 mr-2 cursor-pointer text-white dark:text-white/80 ${
        isLoading && "animate-spin"
      }`}
    />
    {hasPermission("add role") && (
      <div className="relative text-black dark:text-white/80">
        {add && (
          <form
            onSubmit={addRole}
            ref={addRef}
            className="flex-col w-[300px] z-50 items-center absolute top-0 right-0 mt-10 p-5 bg-white dark:bg-gray-800 rounded-md capitalize shadow-xl"
          >
            <InputField
              name="input"
              label="Name"
              placeholder="Enter role name"
            />
            <div className="flex items-center justify-end mt-3">
              <button type="submit" className="btnPrimary bg-black">
                Add
              </button>
            </div>
          </form>
        )}
        <button
          title="Add Role"
          onClick={() => setAdd(!add)}
          className="btnPrimary px-3"
        >
          <PlusCircle className="h-4 w-4" /> Add Role
        </button>
      </div>
    )}
  </div>
);

export default Roles;
