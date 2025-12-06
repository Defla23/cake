import React from "react";
import { designAPI, type Design } from "../../../../features/cakes/designsApi";
import { useCart } from "../CartContext"; // your existing cart context
import { CakeImages } from "../../../../assets/CakeImages";

const CustomersOrdersPage: React.FC = () => {
  const { data, isLoading, isError } = designAPI.useGetAllDesignsQuery();
  const designs = data || [];
  const { addDesignToCart } = useCart();

  if (isLoading) return <p className="p-4">Loading designs...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load designs.</p>;
  if (!designs || designs.length === 0) return <p className="p-4">No designs found.</p>;

  // Price calculation based on size
  const getPrice = (size?: string) => {
    switch (size?.toLowerCase()) {
      case "small":
        return 1000;
      case "medium":
        return 2000;
      case "large":
        return 3000;
      default:
        return 0;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">Browse Designs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {designs.map((design: Design) => (
          <div
            key={design.DesignID}
            className="border rounded shadow-md p-4 flex flex-col justify-between"
          >
            {design.ImageUrl && (
  <img
    src={CakeImages[design.ImageUrl] || CakeImages["vanilla.jpg"]}
    alt={design.DesignName}
    className="mt-2 w-full h-40 object-cover rounded"
  />
            )}
            <h2 className="text-lg font-bold">{design.DesignName}</h2>
            <p className="text-sm">Base Flavor: {design.BaseFlavor}</p>
            <p className="text-sm">Category: {design.Category}</p>
            <p className="text-sm font-semibold">Price: KES {getPrice(design.Size)}</p>

            

         
              <button
                onClick={() => addDesignToCart(design)}
                className="mt-3 bg-pink-500 text-white px-3 py-2 rounded"
              >
                Add to Cart
              </button>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersOrdersPage;
