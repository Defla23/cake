import { readyCakesAPI, type readycakes } from "../../../../features/cakes/readycakeApi";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { DeleteReadyCake } from "./DeleteReadyCake"; // ✅ Import the modal component
import { UpdateReadyCake } from "./UpdateReadyCake";
import { AddReadyCake } from "./AddReadyCake ";
import { CakeImages } from '../../../../../src/assets/CakeImages';


export default function Readycakes() {
  const [selectedCakeToDelete, setSelectedCakeToDelete] = useState<readycakes | null>(null);
  const[selectedCakeToEdit, setSelectedCakeToEdit] = useState<readycakes | null>(null)

  const { data: readycakes, isLoading, error } =
    readyCakesAPI.useGetAllCakesQuery();

  console.log("API RESPONSE:", readycakes);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load cakes</p>;

  return (
    <div>
      <AddReadyCake />
      <UpdateReadyCake readycake={selectedCakeToEdit} />
      <DeleteReadyCake readycake={selectedCakeToDelete} />

      <div className="flex justify-center mb-6">
  <button data-test="cakecreate-btn"
    className="bg-pink-500 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors duration-300"
    onClick={() =>
      (document.getElementById("add_modal") as HTMLDialogElement)?.showModal()
    }
  >
     Add a Cake
  </button>
</div>


      {readycakes && readycakes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {readycakes.map((cake: readycakes) => (
            <div
              key={cake.cakeId}
              className="border p-4 rounded shadow-md bg-white"
            >
               <img 
  src={CakeImages[cake.imageURL] || CakeImages['chocolate.jpg']} 
  alt={cake.cakeName} 
  className="w-full h-48 object-cover rounded-lg mb-3" 
/>

              <h2 className="text-lg font-bold mt-2">{cake.cakeName}</h2>

              <p>Flavors: {cake.flavorsUsed}</p>
              <p>Size: {cake.size}</p>
              <p className="font-semibold">Price: KES {cake.price}</p>
              <p>Available: {cake.quantityAvailable}</p>

              <div className="flex gap-2 mt-3">
                <button data-test="cakeedit-btn"
  className="btn btn-sm btn-primary text-blue-500"
  onClick={() => {
    setSelectedCakeToEdit(cake);
    (document.getElementById("update_modal") as HTMLDialogElement)?.showModal();
  }}
>
  <FiEdit size={20} />
</button>


                <button
                data-test="cakedel-btn"
                  className="btn btn-sm btn-primary text-red-500"
                  onClick={() => {
                    setSelectedCakeToDelete(cake); // ✅ Set cake for deletion
                    (
                      document.getElementById("delete_modal") as HTMLDialogElement
                    )?.showModal();
                  }}
                >
                  <MdDeleteForever size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">No ready made cakes available at the moment.</p>
      )}
    </div>
  );
}
