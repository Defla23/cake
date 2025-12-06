import { useCart } from "../../../Userdashboard/content/CartContext";
import { readyCakesAPI, type readycakes } from "../../../../features/cakes/readycakeApi";
import { CakeImages } from '../../../../assets/CakeImages';

export default function ReadyCakesUser() {
  const { data, isLoading, error } = readyCakesAPI.useGetAllCakesQuery();
  const cakesArray: readycakes[] = data || [];
  const { addToCart } = useCart();

  if (isLoading) return <p className="text-center mt-4">Loading cakes...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Failed to load cakes</p>;

  return (
    <div className="p-4">
      {cakesArray.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cakesArray.map((cake) => (
            <div key={cake.cakeId} className="border p-4 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
<img 
  src={CakeImages[cake.imageURL] || CakeImages['chocolate.jpg']} 
  alt={cake.cakeName} 
  className="w-full h-48 object-cover rounded-lg mb-3" 
/>              <h2 className="text-xl font-semibold mb-1">{cake.cakeName}</h2>
              <p className="text-gray-600 mb-1">Flavors: {cake.flavorsUsed}</p>
              <p className="text-gray-600 mb-1">Size: {cake.size}</p>
              <p className="text-gray-800 font-semibold mb-2">Price: KES {cake.price}</p>
              <p className="text-gray-600 mb-3">Available: {cake.quantityAvailable}</p>

              <button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full font-medium transition-colors duration-300"
                onClick={() => addToCart(cake)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-500">No ready made cakes available at the moment.</p>
      )}
    </div>
  );
}
