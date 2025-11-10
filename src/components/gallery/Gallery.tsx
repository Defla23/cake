import Navbar from "../nav/Navbar";
import { Footer } from "../footer/Footer";

import gallery1 from "../../assets/images/gallery1.jpeg";
import gallery2 from "../../assets/images/gallery2.jpg";
import gallery3 from "../../assets/images/galley3.jpeg";
import gallery4 from "../../assets/images/gallery4.jpg";
import gallery5 from "../../assets/images/gallery5.jpeg";
import gallery6 from "../../assets/images/gallery6.webp";
import gallery7 from "../../assets/images/gallery7.jpeg";
import gallery8 from "../../assets/images/gallery8.jpg";

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
];

const Gallery = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[rgb(166,197,197)] py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Get a glimpse of our life. We value experience
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gallery;
