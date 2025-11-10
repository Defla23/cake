export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        
        <div className="text-xl font-bold">
          Cake Éclair
        </div>

       
        <div className="flex space-x-6">
          <a href="#home" className="hover:text-gray-400">Home</a>
          <a href="#services" className="hover:text-gray-400">Services</a>
          <a href="#about" className="hover:text-gray-400">About</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
        </div>

        
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">Instagram</a>
          <a href="#" className="hover:text-gray-400">Facebook</a>
          <a href="#" className="hover:text-gray-400">Twitter</a>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-4 pb-4">
        &copy; {new Date().getFullYear()} Cake Éclair. All rights reserved.
      </div>
    </footer>
  );
};
