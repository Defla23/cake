import photo1 from "../../assets/images/photo7.jpeg";
import photo2 from "../../assets/images/photo6.jpeg";
import photo3 from "../../assets/images/photo7.jpeg";
import photo4 from "../../assets/images/photo6.jpeg";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Jane Mia",
      role: "Happy Customer",
      photo: photo1,
      quote:
        "Cake Éclair delivered exactly what I wanted — the custom wedding cake was stunning and tasted amazing!",
    },
    {
      name: "John Smith",
      role: "Regular Orderer",
      photo: photo2,
      quote:
        "Fast delivery and fantastic service. I get my treats from Cake Éclair and they never disappoint.",
    },
    {
      name: "Mary Johnson",
      role: "Event Planner",
      photo: photo3,
      quote:
        "We booked Cake Éclair for multiple events and they always pulled off amazing pastries — our guests rave about them.",
    },
    {
      name: "Alex Brown",
      role: "Birthday Celebrant",
      photo: photo4,
      quote:
        "The birthday cake was incredible! Beautifully decorated and tasted heavenly. Highly recommend Cake Éclair!",
    },
  ];

  return (
    <section className="bg-gray-800 py-12 text-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-6 rounded-xl shadow-lg flex flex-col items-center text-center 
                         transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-500"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full mb-4 border-2 border-gray-500"
              />
              <p className="mb-4 text-gray-200 italic">“{t.quote}”</p>
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <span className="text-gray-400 text-sm">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
