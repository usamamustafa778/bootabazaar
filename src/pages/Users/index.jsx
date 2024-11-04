import React, { useEffect, useRef, useState } from "react";
import { ComboBox, DataTable, InputField, Modal } from "../../components";
import { PlusCircle, RefreshCw, SquarePen, Users2 } from "lucide-react";
import usePermissions from "../../utils/userPermission";
import Status from "../../components/common/Status";
import PhoneInput from "react-phone-number-input";
import toast, { Toaster } from "react-hot-toast";
import ManageMerchants from "./ManageMerchants";
import "react-phone-number-input/style.css";
import useApi from "../../utils/useApi";
import dayjs from "dayjs";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { isLoading, request } = useApi();

  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    try {
      const data = await request({ method: "get", url: "roles" });
      let dataArray = Array.isArray(data) ? data : [data];
      setRoles(dataArray);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsers = async () => {
    try {
      const data = await request({ method: "get", url: "users" });
      setUsers(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [merchants, setMerchants] = useState([]);
  const getMerchants = async () => {
    try {
      const data = await request({ method: "get", url: "merchants" });
      setMerchants(data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getMerchants();
    getUsers();
    getRoles();
  }, []);

  // Modal
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const handleModal = () => {
    setOpen(!open);
  };

  const activeStatus = [
    { _id: 1, name: "Active", value: true },
    { _id: 2, name: "InActive", value: false },
  ];
  const [modalType, setModalType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setAccountPass] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(null);
  const [active, setActive] = useState({});
  const [primaryMerchant, setPrimaryMerchant] = useState({});
  const [selectedData, setSelectedData] = useState([]);

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleAdd = () => {
    setModalType("new");
    getUsers();
    setEmail("");
    setUsername("");
    setAccountPass("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    setRole("");
    handleModal();
  };
  const handleUpdate = (user) => {
    setModalType("update");
    setEmail(user?.email);
    setUsername(user?.username);
    setAccountPass(user?.password);
    setPhone(user?.phone);
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setAddress(user?.address);
    setRole(user?.role_id);
    setUserId(user?._id);
    const a = activeStatus?.find((item) => item.value === user?.active);
    setActive(a);
    const pMerchant = merchants?.find((item) => item._id === user?.merchant_id);
    setPrimaryMerchant(pMerchant);
    const filtered = merchants.filter((merchant) =>
      user?.merchants.includes(merchant._id)
    );
    setSelectedData(filtered);
    handleModal();
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await request({
        method: "post",
        url: "users",
        data: {
          username,
          account_password: password,
          role_id: role._id,
          first_name,
          last_name,
          email,
          phone,
          address,
          merchant_id: primaryMerchant._id,
          assigned_merchants: selectedData.map((item) => item._id),
        },
      });
      getUsers();
      setEmail("");
      setUsername("");
      setAccountPass("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setRole("");
      handleModal();
      toast.success("New User Created");
    } catch (err) {
      toast.error(
        err.response.data.message ||
          "Operation could not be performed, some error occurred."
      );
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await request({
        method: "put",
        url: `users/${userId}`,
        data: {
          first_name,
          last_name,
          email,
          phone,
          address,
          role_id: role?._id,
          merchant_id: primaryMerchant._id,
          assigned_merchants: selectedData.map((item) => item._id),
          active: active.value,
        },
      });
      getUsers();
      setEmail("");
      setUsername("");
      setAccountPass("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setAddress("");
      setRole("");
      handleModal();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const updateRef = useRef({});
  const [passToUpdate, setPass] = useState(null);
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      await request({
        method: "put",
        url: `users/${userId}/update_password`,
        data: {
          account_password: password,
        },
      });
      toast.success(`Password updated.`);
      setPass(false);
      getUsers();
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setAccountPass("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(updateRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setPass(null);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { hasPermission } = usePermissions();

  return (
    <div>
      <Toaster />
      <DataTable
        title={
          <span className="flex items-center gap-2">
            <Users2 className="w-6 h-6" /> Users
          </span>
        }
        searchBox
        isLoading={isLoading}
        extras={
          <div className="flex items-center gap-5">
            <RefreshCw
              title="Refresh"
              onClick={getUsers}
              className={`w-5 cursor-pointer text-white dark:text-white/80 ${
                isLoading && "animate-spin"
              }`}
            />
            {hasPermission("add user") && (
              <button onClick={handleAdd} className="btnPrimary px-3">
                <PlusCircle className="h-4 w-4" /> Add User
              </button>
            )}
          </div>
        }
        heads={[
          "Sr#",
          (hasPermission("edit user") || hasPermission("change password")) &&
            "Actions",
          "name",
          "username",
          "email",
          "phone",
          "Role",
          "sites",
          "domains",
          "address",
          "status",
          "created by",
          "created at",
          "updated at",
        ]}
        items={users?.map((user, index) => ({
          serial: index + 1,
          actions: (
            <div className="flex items-center gap-3">
              {hasPermission("edit user") && (
                <SquarePen
                  onClick={() => handleUpdate(user)}
                  className="editIcon"
                />
              )}
              {hasPermission("change password") && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setUserId(user._id);
                      setAccountPass("");
                      setPass(index);
                    }}
                    className="btnPrimary bg-blue-950 dark:text-white/90 dark:font-normal font-normal py-1 px-3"
                  >
                    Change Password
                  </button>
                  {passToUpdate === index && (
                    <div
                      ref={(el) => (updateRef.current[index] = el)}
                      className="p-5 absolute top-0 left-0 ml-14 mt-3 rounded-md shadow-xl border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 z-50 w-80"
                    >
                      <InputField
                        name="update"
                        label="Password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setAccountPass(e.target.value)}
                      />
                      <div className="flex items-center justify-end mt-4">
                        <button onClick={() => setPass(null)} className="px-6">
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={updatePassword}
                          className="btnPrimary bg-black"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ),
          name: `${user.first_name} ${user.last_name}`,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user?.role_id?.name,
          sites: "",
          domains: "",
          address: user.address,
          status: user.active ? <Status type="active" /> : "Disabled",
          createdBy: user.createdBy?.username,
          createdAt: dayjs(user.createdAt)?.format("ddd, MMM D, YYYY h:mm A"),
          updatedAt: dayjs(user.updatedAt)?.format("ddd, MMM D, YYYY h:mm A"),
        }))}
      />

      <Modal
        open={open}
        handleModal={handleModal}
        cancelButtonRef={cancelButtonRef}
        className="max-w-2xl"
        title={
          (modalType === "new" && "Add New User") ||
          (modalType === "update" && "Update User Info")
        }
        handleModalSubmit={
          (modalType === "new" && addUser) ||
          (modalType === "update" && updateUser)
        }
        modalType="new"
        disabled={!username}
      >
        <div className="grid grid-cols-2 gap-5">
          <ComboBox
            label="Role"
            name="role"
            selectedOption={role}
            setSelectedOption={setRole}
            options={roles}
            placeholder="Select"
          />
          {modalType === "new" && (
            <InputField
              required={true}
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={modalType === "update"}
            />
          )}
          <InputField
            required={true}
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <InputField
            required={true}
            label="First Name"
            name="firstName"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            required={true}
            label="Last Name"
            name="lastName"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            required={true}
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>
            <label className="inputLabel mb-1">Phone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneChange}
              className="inputField"
            />
          </div>
          {modalType === "new" && (
            <InputField
              label="password"
              name="pass"
              value={password}
              onChange={(e) => setAccountPass(e.target.value)}
            />
          )}
          {modalType === "update" && (
            <ComboBox
              label="User Status"
              selectedOption={active}
              setSelectedOption={setActive}
              options={activeStatus}
            />
          )}
          <ComboBox
            label="Select Primary Merchant"
            placeholder="Select Primary Merchant"
            selectedOption={primaryMerchant}
            setSelectedOption={setPrimaryMerchant}
            options={merchants}
          />
          <ManageMerchants
            merchants={merchants}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
          />
        </div>
      </Modal>
    </div>
  );
}
