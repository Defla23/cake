// src/dashboard/Userdashboard/content/Profile.tsx

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useUpdateUserMutation } from "../../../../features/cakes/adminUsersAPI";
import { logOut } from "../../../../features/auth/userSlice";
import dayjs from "dayjs";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [updateUser] = useUpdateUserMutation();
  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email,
    phone: user?.phone,
    address: user?.address || "",
  });

  if (!user) return <p>No user logged in.</p>;

  const handleEditClick = () => setEditable(true);

  const handleSave = async () => {
    try {
      await updateUser({
        id: user.id,
        updates: formData,
      }).unwrap();

      setEditable(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("token"); // optional if token stored
    window.location.href = "/login";   // redirect to login page
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div
      className="max-w-md mx-auto p-6 rounded-xl shadow-lg text-white"
      style={{ background: "linear-gradient(to right, gray, white)" }}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-pink-500">
          {getInitials(user.name)}
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">{user.name}</h1>

      {/* Always Verified Badge */}
      <div className="text-center mb-6">
        <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-600">
          Verified Account
        </span>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="font-semibold">Email:</label>
        {editable ? (
          <input
            type="text"
            className="w-full text-black rounded p-1"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="font-semibold">Phone:</label>
        {editable ? (
          <input
            type="text"
            className="w-full text-black rounded p-1"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        ) : (
          <p>{user.phone}</p>
        )}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="font-semibold">Address:</label>
        {editable ? (
          <textarea
            className="w-full text-black rounded p-1"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        ) : (
          <p>{user.address || "No address added"}</p>
        )}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="font-semibold">Role:</label>
        <p>{user.role}</p>
      </div>

      {/* Account Creation */}
      <div className="mb-6">
        <label className="font-semibold">Account Created:</label>
        <p>{dayjs(user.Created_At).format("MMMM D, YYYY")}</p>
      </div>

      {/* Edit / Save Button */}
      <button
        onClick={editable ? handleSave : handleEditClick}
        className="bg-white text-pink-500 font-bold py-2 px-4 rounded hover:bg-gray-200 w-full mb-4"
      >
        {editable ? "Save" : "Edit Profile"}
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 w-full"
      >
        Logout
      </button>
    </div>
  );
};
