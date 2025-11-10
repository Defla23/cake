import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './App.css'
import { About } from './components/about/Intro'
import Sign_in from './components/sign_in/Sign_in'
import Login from './components/login/Login'
import Landingpage from './pages/Landingpage'
import Contact from './components/contact/Contact'
import Gallery from './components/gallery/Gallery'


function App() {
  

     const router = createBrowserRouter([
    {
      path: '/',
      element: <Landingpage />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/gallery',
      element: <Gallery />
    },
    {
      path: '/sign_in',
      element: <Sign_in />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/contact',
      element: <Contact />
    },
     

  ])
  return (
    <>
      <RouterProvider router={router} />

    </>

        
    
  )
}

export default App
