import React, { useState } from "react";
import { CircleAlert, CameraIcon, Trash, Save } from "lucide-react";
import {
  Container,
  FullContainer,
  InputField,
  ListBox,
} from "../../components";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const langs = [
    { _id: 1, name: "English US" },
    { _id: 2, name: "English UK" },
  ];
  const [lang, setLang] = useState(langs[0]);
  return (
    <FullContainer className="p-10">
      <Container className="max-w-screen-lg">
        <div className="w-full mb-8">
          <h2>Account Settings</h2>
          <p>View and update your account details, profile and more.</p>
        </div>

        {/* Account Info */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg w-full">
          <h4 className="px-8 py-3 border-b dark:border-white/20">
            Account info
          </h4>
          <div className="flex px-8 py-6 gap-9">
            <div className="flex-1">
              <InputField label="First Name" value={user?.first_name} />
              <InputField
                label="Last Name"
                value={user?.last_name}
                className="mt-5"
              />
              <div className="grid grid-cols-2 gap-8 mt-5">
                <InputField label="Site URL Prefix" value="Alan123" />
                <ListBox
                  label="Account Language"
                  options={langs}
                  selectedOption={lang}
                  setSelectedOption={setLang}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-primary font-medium text-sm gap-1 flex items-center">
                Image <CircleAlert className="w-4" />
              </div>
              <img
                src="/img/avatars/avatar-2.jpg"
                className="w-40 rounded-full p-1 bg-white dark:bg-gray-800 overflow-hidden shadow"
                alt=""
              />
              <button
                type="button"
                className="flex items-center justify-center p-1 bg-white dark:bg-gray-900 overflow-hidden shadow-lg w-9 h-9 rounded-full -mt-12 ml-auto active:scale-105 transition-all"
              >
                <CameraIcon className="w-5" />
              </button>
              <div className="flex items-center justify-center text-xs gap-1 font-medium text-gray-700 dark:text-white/80">
                <Trash className="w-3" /> Remove Image
              </div>
            </div>
          </div>
          <div className="px-8 flex items-center justify-end py-4 bg-gray-100 dark:bg-gray-700 mt-2">
            <button className="btnPrimary bg-green-600 dark:bg-green-800 py-1 px-3">
              <Save className="w-4" /> Save & Update
            </button>
          </div>
        </div>

        {/* Login Info */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg w-full mt-7">
          <h4 className="px-8 py-3 border-b dark:border-white/20">
            Login info
          </h4>
          <div className="px-8 py-6">
            <InputField label="Email" type="email" value={user?.email} />
            <InputField
              label="Password"
              type="password"
              value="Alan123"
              className="mt-5"
            />
            <InputField
              label="Phone"
              placeholder="Add Phone Number"
              className="mt-5"
            />
          </div>
          <div className="px-8 flex items-center justify-end py-4 bg-gray-100 dark:bg-gray-700 mt-2">
            <button className="btnPrimary bg-green-600 dark:bg-green-800 py-1 px-3">
              <Save className="w-4" /> Save & Update
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg w-full mt-7">
          <h4 className="px-8 py-3 border-b dark:border-white/20">
            Delete Your Account
          </h4>
          <div className="flex px-8 py-6 gap-9">
            <p>
              To close your account, first move any remaining sites to Trash. If
              your site has any Premium Plans or domains connected, you'll need
              to cancel or transfer them first.{" "}
            </p>
          </div>
          <div className="px-8 flex items-center justify-end py-4 bg-gray-100 dark:bg-gray-700 mt-2">
            <button className="btnPrimary bg-red-500 dark:bg-red-800 py-1 px-3">
              <Trash className="w-4" /> Delete Account
            </button>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
