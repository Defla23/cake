import React, { useState } from 'react';
import { 
  useGetAllDesignsQuery, 
  useCreateDesignMutation, 
  useDeleteDesignMutation 
} from '../../../../features/cakes/designsApi';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'sonner';



export const Design = () => {
  const { data, error, isLoading } = useGetAllDesignsQuery();
  const [createDesign] = useCreateDesignMutation();
  const [deleteDesign] = useDeleteDesignMutation();

  console.log(data);

  const [newDesign, setNewDesign] = useState({
    DesignName: '',
    Description: '',
    BaseFlavor: '',
    Availability: true,
    Size: '',
    Category: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDesign(prev => ({
      ...prev,
      [name]: name === "Availability" ? Number(value) : value
    }));
  };

 const handleCreateDesign = async () => {
  try {
    // Check required fields
    if (!newDesign.DesignName || !newDesign.Size || !newDesign.Category) {
      alert('Please fill in all required fields: Name, Size, Category.');
      return;
    }

    // Add imageUrl to match backend requirement
    const payload = {
      ...newDesign,
      ImageUrl: '', // or a default image URL
    };

    await createDesign(payload).unwrap();

    setNewDesign({
      DesignName: '',
      Description: '',
      BaseFlavor: '',
      Availability: true,
      Size: '',
      Category: ''
    });

   toast.success('Design added successfully!');
  } catch (err) {
    console.error(err);
    toast.error('Failed to add design.');
  }
};

  

  const handleDelete = async (id: number) => {
    try {
      await deleteDesign(id);
      toast.success('Design deleted successfully.');
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete design.');
    }
  };

  if (isLoading) return <p>Loading designs...</p>;
  if (error) return <p>Error loading designs.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">At Cake Éclair, every bite tells a story of sweetness and passion</h2>

      {/* Add New Design Form */}
      <div className="mb-8 p-6 bg-gray-900 border-2 border-gray-900 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-900 pb-2">Add New Design</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="DesignName"
            placeholder="Design Name"
            value={newDesign.DesignName}
            onChange={handleInputChange}
            className="input input-bordered w-full border-2 bg-white placeholder-gray-900 border-gray-900 text-black focus:border-pink-500 focus:ring focus:ring-pink-900"
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={newDesign.Description}
            onChange={handleInputChange}
            className="input input-bordered w-full border-2 bg-white placeholder-gray-900 border-gray-900 text-black focus:border-pink-500 focus:ring focus:ring-pink-900"
          />
          <input
            type="text"
            name="BaseFlavor"
            placeholder="Base Flavor"
            value={newDesign.BaseFlavor}
            onChange={handleInputChange}
            className="input input-bordered w-full border-2 bg-white placeholder-gray-900 border-gray-900 text-black focus:border-pink-500 focus:ring focus:ring-pink-900"
          />

          <div className="form-control">
                        <label className="label cursor-pointer text-white">
                            <span className="label-text mr-4 text-white ">Status</span>
                            <div>
                                <label >
                                    <input type="radio" value="true"
                                      name='Availability'
                                        className="radio radio-success bg-white text-green-500"
                                    /> Available
                                </label>
                                <label >
                                    <input type="radio" value="false"
                                       name='Availability'
                                        className="radio radio-warning bg-white text-red-500" defaultChecked /> Not Available
                                </label>
                            </div>
                        </label>

                    </div>

          {/* <input
            type="number"
            name="Availability"
            placeholder="Availability"
            value={newDesign.Availability}
            onChange={handleInputChange}
            className="input input-bordered w-full border-2 bg-white placeholder-gray-900 border-gray-900 text-black focus:border-pink-500 focus:ring focus:ring-pink-900"
          /> */}
          <select
            name="Size"
            value={newDesign.Size}
            onChange={handleInputChange}
            className="input input-bordered w-full border-2 bg-white placeholder-gray-900 border-gray-900 text-black focus:border-pink-500 focus:ring focus:ring-pink-900"
          >
            <option value="" disabled>Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <input
            type="text"
            name="Category"
            placeholder="Category"
            value={newDesign.Category}
            onChange={handleInputChange}
            className="input input-bordered w-full border-2 bg-white placeholder-gray-900 border-gray-900 text-black focus:border-pink-500 focus:ring focus:ring-pink-900"
          />
        </div>

        <button
          onClick={handleCreateDesign}
          className="btn btn-primary mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-full shadow-md transition-all duration-200"
        >
          Add Design
        </button>
      </div>

      {/* Designs Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-900">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400"></th>
              <th className="border bg-gray-900 text-white border-gray-400">Name</th>
              <th className="border bg-gray-900 text-white border-gray-400">Flavor</th>
              <th className="border bg-gray-900 text-white border-gray-400">Size</th>
              <th className="border bg-gray-900 text-white border-gray-400">Category</th>
              <th className="border bg-gray-900 text-white border-gray-400">Availability</th>
              <th className="border bg-gray-900 text-white border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            { 
            data && data.map(design => (
              <tr key={design.DesignID} className="border-b border-gray-900">
                <th className="border bg-white border-gray-800"></th>
                <td className="border bg-white border-gray-800 font-bold">{design.DesignName}</td>
                <td className="border bg-white border-gray-800">{design.BaseFlavor}</td>
                <td className="border bg-white border-gray-800">{design.Size}</td>
                <td className="border bg-white border-gray-800">{design.Category}</td>
                <td className="border bg-white border-gray-800">{design.Availability ? "Yes" : "No"}</td>
                <td className="border bg-white border-gray-800 flex gap-2 items-center">
                 
                  <button
                    className="btn btn-ghost btn-xs text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(design.DesignID!)}
                  >
                    <MdDeleteForever size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <a href="/userorders" className="btn btn-primary">
  Go to Orders
</a> */}

      </div>
    </div>
  );
};
