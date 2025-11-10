import { Testimonials } from "../components/about/testimonials"
import { View } from "../components/about/View"
import Contact from "../components/contact/Contact"
import { Footer } from "../components/footer/Footer"
import { Home } from "../components/home/Home"
import Navbar from "../components/nav/Navbar"
import { Services } from "../components/services/Services"


function Landingpage() {
  return (
    <div>
        <Navbar/>
        <Home/>
        <Services/>
        <View/>
        <Testimonials/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Landingpage