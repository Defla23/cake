import  { useState } from "react";
import {orderAPI,type Order,} from "../../../../features/cakes/ordersAPI";
import { designAPI } from "../../../../features/cakes/designsApi";
import { adminUsersAPI } from "../../../../features/cakes/adminUsersAPI";
import {UpdateOrder }from "./UpdateOrder";
import {DeleteOrder} from "./DeleteOrder";
import { SampleImages } from "../../../../assets/SampleImages";

export default function OrderList(){
  const { data: orders, isLoading, isError } = orderAPI.useGetAllOrdersQuery();
  const { data: designs } = designAPI.useGetAllDesignsQuery();
  const { data: users } = adminUsersAPI.useGetUsersQuery();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<Order | null>(null);


  console.log(deleteOrderId)
  // Helpers
  const getDesign = (id: number | null) => designs?.find((d) => d.DesignID === id);
  const getDesignName = (id: number | null) => getDesign(id)?.DesignName || "N/A";
  const getCategory = (id: number | null) => getDesign(id)?.Category || "N/A";
  const getUserName = (id: number) => users?.find((u) => u.userid === id)?.name || "Unknown User";

  if (isLoading) return <p className="p-4">Loading Orders...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load orders.</p>;

  return (
    <div className="p-6">
<UpdateOrder order={selectedOrder}/>
  <DeleteOrder order={deleteOrderId} />
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-yellow-400 mb-6">
        Orders List
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-linear-to-r from-pink-500 to-yellow-500 text-white">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Design</th>
              <th className="border px-4 py-2">Flavor</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-white">
            {orders?.map((order) => (
              <tr key={order.Id} className="text-center">
                <td className="border px-4 py-2">{order.Id}</td>
                <td className="border px-4 py-2">{getUserName(order.userid)}</td>
                <td className="border px-4 py-2">{order.DesignID ? getDesignName(order.DesignID) : "Custom Order"}</td>
                <td className="border px-4 py-2">{order.Flavor}</td>
                <td className="border px-4 py-2">{order.DesignID ? getCategory(order.DesignID) : "Custom Design"}</td>
                <td className="border px-4 py-2">{order.Size}</td>
                <td className="border px-4 py-2">
                  {order.SampleImages ? (
                    <img
                      src={SampleImages[order.SampleImages.split(",")[0]] || SampleImages['image4.jpeg']}
                      alt="Cake"
                      className="w-16 h-16 object-cover rounded mx-auto"
                      onError={(e) => (e.currentTarget.src = SampleImages['image4.jpeg'])}
                    />
                  ) : "No Image"}
                </td>
                <td className="border px-4 py-2">Ksh {order.Price}</td>
                <td className="border px-4 py-2">{order.Status}</td>
                <td className="border px-4 py-2">{order.PaymentStatus || "Not Provided"}</td>
                <td className="border px-4 py-2 space-y-2 flex flex-col items-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                    onClick={() => {
                      setSelectedOrder(order);
                      (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                    onClick={() => {
                      setDeleteOrderId(order);
                      (document.getElementById("delete_modal") as HTMLDialogElement)?.showModal();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr key="no-orders">
                <td colSpan={11} className="text-gray-300 text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

<UpdateOrder
  order={selectedOrder || null}
  //onClose={() => setSelectedOrder(null)} // or whatever closes the modal
/>

<DeleteOrder
  order={deleteOrderId || null}
 //onClose={() => setDeleteOrderId(null)}
/>



    </div>
  );
};


