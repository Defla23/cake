import { NavLink } from "react-router";

const Contact = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 py-10"
        style={{ backgroundColor: "rgb(166,197,197)" }}
      >
        
        <div className="w-full max-w-2xl mb-4">
          <NavLink
            to="/"
            className="text-gray-900 hover:underline font-semibold"
          >
             Back to Home
          </NavLink>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Contact Us
          </h2>

          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-900">
          <h3 className="text-xl font-semibold mb-2">📍 Our Location</h3>
          <p>Opposite 123 Tech Street, Nyeri, Kenya</p>
          <p>Open: Mon – Fri, 8:00 AM – 6:00 PM</p>
          <p>Sat – Sun, 9:00 AM – 6:00 PM</p>
        </div>
      </div>
    </>
  );
};

export default Contact;
