import image1 from "../../assets/images/image1.jpeg";
import image2 from "../../assets/images/image2.jpeg";
import image3 from "../../assets/images/image3.jpeg";
import image4 from "../../assets/images/image4.jpeg";

export const View = () => {
  const cakes = [
    { id: 1, name: "Chocolate Delight", price: "Ksh 1,000", image: image1 },
    { id: 2, name: "Strawberry Bliss", price: "Ksh 2,000", image: image2 },
    { id: 3, name: "Vanilla Dream", price: "Ksh 3,000", image: image3 },
    { id: 4, name: "Red Velvet Love", price: "Ksh 2,000", image: image4 },
  ];

  return (
    <div className="bg-[rgb(166,197,197)] min-h-screen p-6 md:p-10">
      <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-10">
        View Our Cakes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {cakes.map((cake) => (
          <div
            key={cake.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {cake.name}
              </h3>
              <p className="text-gray-600 mb-3">{cake.price}</p>
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow transition">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
