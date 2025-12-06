import React from "react";
import { useGetAllOrdersQuery } from "../../../../features/cakes/ordersAPI";
import { useGetAllDesignsQuery } from "../../../../features/cakes/designsApi";
import { useGetUsersQuery } from "../../../../features/cakes/adminUsersAPI";
import { ShoppingCartIcon, UsersIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#FBBF24", "#10B981", "#3B82F6", "#EF4444", "#A855F7"];

const Analytics: React.FC = () => {
  const { data: orders, isLoading: loadingOrders, isError: errorOrders } = useGetAllOrdersQuery();
  const { data: designs } = useGetAllDesignsQuery();
  const { data: users } = useGetUsersQuery();

  if (loadingOrders || !designs || !users) return <p>Loading analytics...</p>;
  if (errorOrders) return <p>Failed to load analytics.</p>;

  // --- Totals ---
  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + order.Price, 0) || 0;
  const totalUsers = users?.length || 0;

  // --- Orders by Status ---
  const ordersByStatus = orders?.reduce((acc, order) => {
    acc[order.Status] = (acc[order.Status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};
  const pieDataStatus = Object.entries(ordersByStatus).map(([name, value]) => ({ name, value }));

  // --- Orders by Payment ---
  const ordersByPayment = orders?.reduce((acc, order) => {
    const key = order.PaymentStatus || "Paid on Delivery";
    acc[key] = (acc[key] || 0) + order.Price; // sum revenue per payment type
    return acc;
  }, {} as Record<string, number>) || {};
  const barDataPayment = Object.entries(ordersByPayment).map(([name, value]) => ({ name, value }));

  // --- Orders by Category ---
  const ordersByCategory = orders?.reduce((acc, order) => {
    const category = designs.find(d => d.DesignID === order.DesignID)?.Category || "Custom";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // --- Top Designs ---
  const topDesigns = orders?.reduce((acc, order) => {
    if (order.DesignID) acc[order.DesignID] = (acc[order.DesignID] || 0) + 1;
    return acc;
  }, {} as Record<number, number>) || {};
  const sortedTopDesigns = Object.entries(topDesigns)
    .sort((a, b) => b[1] - a[1])
    .map(([designId, count]) => ({
      designName: designs.find(d => d.DesignID === Number(designId))?.DesignName || "Unknown",
      count,
    }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Totals */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 bg-linear-to-r from-pink-500 to-yellow-500 text-white p-4 rounded-lg flex-1">
          <UsersIcon className="w-8 h-8" />
          <div>
            <p className="text-sm">Total Users</p>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-linear-to-r from-green-500 to-teal-400 text-white p-4 rounded-lg flex-1">
          <ShoppingCartIcon className="w-8 h-8" />
          <div>
            <p className="text-sm">Total Orders</p>
            <p className="text-xl font-bold">{totalOrders}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-indigo-400 text-white p-4 rounded-lg flex-1">
          <CurrencyDollarIcon className="w-8 h-8" />
          <div>
            <p className="text-sm">Revenue</p>
            <p className="text-xl font-bold">Ksh {totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Main Flex */}
      <div className="flex gap-6 flex-wrap">
        {/* Tables */}
        <div className="flex-1 overflow-x-auto shadow-xl rounded-lg">
          <h2 className="font-semibold mb-2">Orders by Category</h2>
          <table className="min-w-full bg-white border rounded-lg mb-4">
            <thead className="bg-linear-to-r from-pink-500 to-yellow-500 text-white">
              <tr>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Orders</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ordersByCategory).map(([category, count]) => (
                <tr key={category} className="text-center">
                  <td className="border px-4 py-2">{category}</td>
                  <td className="border px-4 py-2">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="font-semibold mb-2">Top Designs</h2>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-linear-to-r from-green-500 to-teal-400 text-white">
              <tr>
                <th className="border px-4 py-2">Design</th>
                <th className="border px-4 py-2">Orders</th>
              </tr>
            </thead>
            <tbody>
              {sortedTopDesigns.map((d, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border px-4 py-2">{d.designName}</td>
                  <td className="border px-4 py-2">{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        <div className="flex-1">
          <div className="mb-6 bg-linear-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-white">
            <h2 className="font-semibold mb-4">Orders by Status</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={pieDataStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieDataStatus.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-linear-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-white">
            <h2 className="font-semibold mb-4">Revenue by Payment Status</h2>
            <BarChart width={400} height={300} data={barDataPayment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
