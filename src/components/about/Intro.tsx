import photo1 from "../../assets/images/photo1.webp";
import { Footer } from "../footer/Footer";
import Navbar from "../nav/Navbar";
import { Testimonials } from "./testimonials";

export const About = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-5xl mx-auto">
        <img
          src={photo1}
          alt="aboutimg"
          className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-lg"
        />

        <div className="w-full md:w-1/2 border border-gray-300 rounded-lg p-4 md:p-6 bg-gray-50" >
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800" data-test="about-header">
            About Cake Éclair
          </h1>

          <p className="mb-3 text-gray-700 text-sm md:text-base leading-relaxed">
            We believe every dessert should be made with love, care, and a sprinkle of happiness. 
            From classic pastries to custom-made cakes, each creation is freshly baked to delight 
            your taste buds and warm your heart. At Cake Éclair, every bite tells a story of sweetness and passion.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Our mission is to spread joy through baking — to make people smile, celebrate love, and cherish life’s sweet moments.
          </p>
        </div>
      </div>

      <Testimonials />
      <Footer />
    </>
  );
};
