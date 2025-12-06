import { useState } from "react";
import { readyCakesAPI } from "../../../../features/cakes/readycakeApi";
import { toast } from "sonner";

export const AddReadyCake = () => {
  const [formData, setFormData] = useState({
    cakeName: "",
    flavorsUsed: "",
    size: "Small",
    price: 1000,
    quantityAvailable: 1,
    imageURL: "",
  });

  const [createCake, { isLoading }] = readyCakesAPI.useCreateCakeMutation();

  const calculatePrice = (size: string) => {
    switch (size) {
      case "Small":
        return 1000;
      case "Medium":
        return 2000;
      case "Large":
        return 3000;
      default:
        return 0;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "size") {
      setFormData({ ...formData, size: value, price: calculatePrice(value) });
    } else if (name === "quantityAvailable") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.cakeName || !formData.flavorsUsed || !formData.size) {
        toast.error("Please fill all required fields.");
        return;
      }

      await createCake({
        cakeName: formData.cakeName,
        flavorsUsed: formData.flavorsUsed,
        size: formData.size,
        price: formData.price,
        quantityAvailable: formData.quantityAvailable,
        imageURL: formData.imageURL,
      }).unwrap();

      toast.success("Cake added successfully!");
      (document.getElementById("add_modal") as HTMLDialogElement)?.close();

      setFormData({
        cakeName: "",
        flavorsUsed: "",
        size: "Small",
        price: 1000,
        quantityAvailable: 1,
        imageURL: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add cake. Please try again.");
    }
  };

  return (
    <dialog id="add_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-800 text-white rounded-2xl w-full max-w-md p-6">
        <h3 className="text-2xl font-bold mb-5 text-center">Add Ready Made Cake</h3>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="cakeName"
            className="input input-bordered w-full bg-gray-700 text-white border-pink-400 focus:border-pink-500 focus:ring focus:ring-pink-500 rounded-lg"
            placeholder="Cake Name"
            value={formData.cakeName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="flavorsUsed"
            className="input input-bordered w-full bg-gray-700 text-white border-pink-400 focus:border-pink-500 focus:ring focus:ring-pink-500 rounded-lg"
            placeholder="Flavors Used "
            value={formData.flavorsUsed}
            onChange={handleChange}
          />

          <select
            name="size"
            className="input input-bordered w-full bg-gray-700 text-white border-pink-400 focus:border-pink-500 focus:ring focus:ring-pink-500 rounded-lg"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <input
            type="number"
            name="price"
            className="input input-bordered w-full bg-gray-700 text-gray-200 border-pink-400 rounded-lg"
            value={formData.price}
            readOnly
          />

          <input
            type="number"
            name="quantityAvailable"
            className="input input-bordered w-full bg-gray-700 text-white border-pink-400 focus:border-pink-500 focus:ring focus:ring-pink-500 rounded-lg"
            placeholder="Quantity Available"
            value={formData.quantityAvailable}
            onChange={handleChange}
            min={1}
          />

          <input
            type="text"
            name="imageURL"
            className="input input-bordered w-full bg-gray-700 text-white border-pink-400 focus:border-pink-500 focus:ring focus:ring-pink-500 rounded-lg"
            placeholder="Image URL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>

        <div className="modal-action justify-center mt-5 flex gap-3">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors duration-300"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Cake"}
          </button>

          <button
            className="btn btn-outline btn-white px-6 py-3 rounded-full"
            type="button"
            onClick={() =>
              (document.getElementById("add_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
