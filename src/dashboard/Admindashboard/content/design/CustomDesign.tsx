
import { designAPI, type Design } from "../../../../features/cakes/designsApi";
import { CakeImages } from "../../../../assets/CakeImages";

export default function CustomDesign ()  {
  const { data, isLoading, isError } = designAPI.useGetAllDesignsQuery();
  const designs = data || [];
 

  if (isLoading) return <p className="p-4">Loading designs...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load designs.</p>;
  if (!designs || designs.length === 0) return <p className="p-4">No designs found.</p>;

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
      <h1 className="text-2xl font-bold text-pink-700 mb-6"> Designs Ordered</h1>

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

            

         
              
           
          </div>
        ))}
      </div>
    </div>
  );
};


