import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import photo2 from "../../assets/images/photo2.jpg";

export const Home = () => {
  const user = useSelector((state: RootState) => state.user?.user);
  const name = user?.name; 

  const paragraph =
    "Discover a world of sweetness — from soft sponges to creamy layers, every treat is made with love and a touch of magic. Indulge in our delicious delights and make every moment a little sweeter!";
  const words = paragraph.split(" ");

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 bg-white">
        <div className="w-full md:w-1/2 space-y-4">
          <h1
            className={`text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight ${
              animate ? "animate-fadeSlide" : ""
            }`} data-test="Cake Éclair-header"
          >
            {name ? `Welcome ${name} to Cake Éclair!` : "Welcome to Cake Éclair "}
             
          </h1>

          <p className="text-base md:text-lg text-gray-700 flex flex-wrap gap-1">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block opacity-0 animate-fadeSlide`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </p>

          <button
            className={`bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-md transition duration-300 ${
              animate ? "animate-fadeSlide delay-1000" : ""
            }`}
          >
            Explore Treats
          </button>
        </div>

        <div className="relative group w-full md:w-1/2 border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={photo2}
            alt="home"
            className="rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-in-out object-cover w-full h-auto"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent group-hover:opacity-75 transition duration-500"></div>
        </div>
      </div>
    </>
  );
};
