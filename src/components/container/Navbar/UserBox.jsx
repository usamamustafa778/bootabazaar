import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserBox() {
  const router = useRouter();
  const getUserDataFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // Clear user data from local storage
      localStorage.removeItem("userData");
      router.push("/login");
    }
  };

  const user = getUserDataFromLocalStorage();

  const userOptions = [
    { name: "Profile", link: `/${user?.name.replaceAll(" ", "-")}` },
    { name: "Become a Seller", link: "/signup" },
    { name: "Settings", link: "/" },
    { name: "Billing & Payments", link: "/" },
    { name: "Help & Support", link: "/help" },
  ];

  return user?.name ? (
    <div className="navDropdownButton relative">
      <div className="navDropdown flex-col w-[200px] text-black items-center absolute top-0 right-0 mt-10 p-2 bg-white rounded-md capitalize shadow-xl shadow-black/25">
        {userOptions.map((item, index) => (
          <Link
            key={index}
            type="button"
            href={item.link}
            className="px-4 py-2 capitalize hover:rounded border-b text-left hover:bg-gray-100 w-full transition-all flex items-center justify-between"
          >
            {item.name}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout} // Call handleLogout when the logout button is clicked
          className="px-4 py-2 capitalize hover:rounded border-b text-left hover:bg-gray-100 w-full transition-all flex items-center justify-between"
        >
          Logout
        </button>
      </div>
      <div className="flex items-center justify-end mr-2 gap-3 cursor-pointer w-fit">
        <div className="text-right">
          <p className="whitespace-nowrap font-semibold">{user?.name}</p>
          <p className="whitespace-nowrap text-gray-500 -mt-1 text-sm">
            {user?.email}
          </p>
        </div>
        <Image
          height={40}
          width={40}
          src="/img/user1.png"
          className="w-11 h-11"
          alt="User Image"
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link className="navLink whitespace-nowrap" href="/login">
        Sign In
      </Link>
      <Link className="btnSecondarySmall" href="/signup">
        Join Us
      </Link>
    </div>
  );
}
