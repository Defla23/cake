
import Cake1 from "../../../../assets/images/chocolate.jpg";
import Cake2 from "../../../../assets/images/vanilla.jpg";
import Cake3 from "../../../../assets/images/anniversary.webp";

function Homedashboard() {
  const cakes = [
    { img: Cake1, title: "Delicious Chocolate Cake", desc: "Rich, creamy, and irresistibly sweet." },
    { img: Cake2, title: "Vanilla Dream", desc: "Soft and fluffy vanilla delight for any occasion." },
    { img: Cake3, title: "Happy Anniversary", desc: "Celebrating Love!" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-yellow-400">
        Welcome to Sweet Treats Dashboard at CAKE ECLARE
      </h1>

      <p className="text-center mb-12 text-lg text-gray-700">
        Explore our cake designs, design cake and order, and delight your customers with mouth-watering creations!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cakes.map((cake, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
            <img src={cake.img} alt={cake.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cake.title}</h2>
              <p className="text-gray-600">{cake.desc}</p>
            </div>
          </div>
        ))}
      </div></div>
  )
}

export default Homedashboard