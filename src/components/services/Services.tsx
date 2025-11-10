import delivery from "../../assets/images/photo3.jpeg";
import cakes from "../../assets/images/photo4.jpeg";
import bookings from "../../assets/images/photo5.jpg";

export const Services = () => {
  const services = [
    { img: delivery, title: "Delivery", subtitle: "Fast & reliable delivery service" },
    { img: cakes, title: "All custom Cakes", subtitle: "Custom cakes for every celebration" },
    { img: bookings, title: "Bookings", subtitle: "Reserve your special order easily with your preference" },
  ];

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 space-y-4">
      <h1 className="text-3xl font-bold">Our Services</h1>

      <p>
        At Cake Éclair, we bring sweetness to your special moments through a variety of delightful services.
      </p>

      <p>
        Custom Cakes, Pastries, Event Catering & Delivery Services — each crafted with care and creativity.
      </p>

     
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {services.map((service, index) => (
          <div key={index} className="relative w-64 h-64 group rounded-lg overflow-hidden shadow-lg">
            
           
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

           
            <div className="absolute inset-0 bg-gray-400 bg-opacity-90 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
              <p className="text-black-700 mt-2">{service.subtitle}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
