import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { adminUsersAPI, type TUser } from "../../../../features/cakes/adminUsersAPI";
import { UpdateUserModal } from "./Updateuser";
import { DeleteUserModal } from "./Deleteuser";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null);

  const { data: usersData, isLoading, error, refetch } = adminUsersAPI.useGetUsersQuery();

  return (
    <div className="p-4">
      {/* Loading */}
      {isLoading && <p className="text-center mt-4 text-white">Loading users...</p>}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {(error as any)?.data?.message || "Failed to fetch users. Check your API or token."}
        </p>
      )}

      {/* Users Table */}
      {!isLoading && usersData && usersData.length > 0 ? (
        <div
          className="overflow-x-auto rounded-xl border-2 border-white shadow-lg p-2"
          style={{ background: "linear-gradient(to right, red, yellow)" }}
        >
          <table className="table table-xs w-full bg-gray-900 border border-white text-white">
            <thead>
              <tr className="text-md lg:text-lg">
                <th className="px-4 py-2 border-b border-white">Name</th>
                <th className="px-4 py-2 border-b border-white">Email</th>
                <th className="px-4 py-2 border-b border-white">Phone</th>
                <th className="px-4 py-2 border-b border-white">Role</th>
                <th className="px-4 py-2 border-b border-white">Status</th>
                <th className="px-4 py-2 border-b border-white">Created At</th>
                <th className="px-4 py-2 border-b border-white">Updated At</th>
                <th className="px-4 py-2 border-b border-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.userid} className="hover:opacity-90">
                  <td className="px-4 py-2 border border-white lg:text-base">{user.name}</td>
                  <td className="px-4 py-2 border border-white lg:text-base">{user.email}</td>
                  <td className="px-4 py-2 border border-white lg:text-base">{user.phone || "-"}</td>
                  <td className="px-4 py-2 border border-white lg:text-base">{user.role}</td>
                  <td className="px-4 py-2 border border-white lg:text-base">
                    {user.is_verified ? (
                      <span className="badge bg-green-800 badge-success">Verified</span>
                    ) : (
                      <span className="badge bg-yellow-700 badge-warning">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-white lg:text-base">
                    {user.Created_At ? new Date(user.Created_At).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 border border-white lg:text-base">
                    {user.Updated_At ? new Date(user.Updated_At).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                     data-test="useredit-btn"
                      className="btn bg-cyan-500 btn-sm btn-primary"
                      onClick={() => {
                        setSelectedUser(user);
                        (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                      }}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger text-red-500"
                      onClick={() => {
                        setUserToDelete(user);
                        (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                      }}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading &&
        (!usersData || usersData.length === 0) && (
          <p className="text-center mt-4 text-white">No users found.</p>
        )
      )}

      {/* Update and Delete Modals */}
      <UpdateUserModal selectedUser={selectedUser} refetchUsers={refetch} />
      <DeleteUserModal userToDelete={userToDelete} refetchUsers={refetch} />
    </div>
  );
}
