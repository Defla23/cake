import { useState, useEffect } from "react";
import { readyCakesAPI, type readycakes } from "../../../../features/cakes/readycakeApi";
import { toast } from "sonner";

type UpdateReadyCakeProps = {
  readycake: readycakes | null;
};

export const UpdateReadyCake = ({ readycake }: UpdateReadyCakeProps) => {
  const [updateCake, { isLoading }] = readyCakesAPI.useUpdateCakeMutation();

  const [formData, setFormData] = useState({
    cakeName: "",
    flavorsUsed: "",
    size: "Small",
    price: 1000,
    quantityAvailable: 1,
    imageURL: "",
  });

  useEffect(() => {
    if (readycake) {
      setFormData({
        cakeName: readycake.cakeName,
        flavorsUsed: readycake.flavorsUsed,
        size: readycake.size || "Small",
        price: readycake.price || 1000,
        quantityAvailable: readycake.quantityAvailable || 1,
        imageURL: readycake.imageURL || "",
      });
    }
  }, [readycake]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "size") {
      setFormData({ ...formData, size: value, price: calculatePrice(value) });
    } else if (name === "quantityAvailable") {
      setFormData({ ...formData, [name]: Number(value) });
    } else if (name === "price") {
      setFormData({ ...formData, price: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      if (!readycake) return;

      await updateCake({
        id: readycake.cakeId,
        cake: {
          cakeName: formData.cakeName,
          flavorsUsed: formData.flavorsUsed,
          size: formData.size,
          price: Number(formData.price),
          quantityAvailable: Number(formData.quantityAvailable),
          imageURL: formData.imageURL,
        },
      }).unwrap();

      toast.success("Cake updated successfully");
      (document.getElementById("update_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cake");
    }
  };

  return (
    <dialog id="update_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-800 text-white rounded-2xl w-full max-w-md p-6">
        <h3 className="text-2xl font-bold mb-5 text-center">Update Cake</h3>

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
            placeholder="Flavors Used"
            value={formData.flavorsUsed}
            onChange={handleChange}
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

          
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-pink-400 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
        </div>

        <div className="modal-action justify-center mt-5 flex gap-3">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors duration-300"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Cake"}
          </button>

          <button
            className="btn btn-outline btn-white px-6 py-3 rounded-full"
            type="button"
            onClick={() =>
              (document.getElementById("update_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
