import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router/dom'
import './App.css'
import { About } from './components/about/Intro'
import Sign_in from './components/sign_in/Sign_in'
import Login from './components/login/Login'
import Landingpage from './pages/Landingpage'
import Contact from './components/contact/Contact'
import Gallery from './components/gallery/Gallery'
import Verification from './components/login/Verification'
import {Toaster} from 'sonner'
import AdminDashboard from './dashboard/Admindashboard/content/AdminDashboard'
import UserDashboard from './dashboard/Userdashboard/content/UserDashboard'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import ReadyCakesAdmin from './dashboard/Admindashboard/content/readycakes/ReadyCakesAdmin';
import ReadyCakesUser from './dashboard/Userdashboard/content/readycakes/ReadyCakesUser';
import { Design } from './dashboard/Userdashboard/content/design/Design'
import Users from './dashboard/Admindashboard/content/users/Users'
import { Profile } from './dashboard/Userdashboard/content/profile/Profile'
import UserOrders from './dashboard/Userdashboard/content/orders/UserOrders'
import CheckoutPage from './dashboard/Userdashboard/content/checkout/Checkoutpage'
import OrderList from './dashboard/Admindashboard/content/orders/Orderlist'
import Analytics from './dashboard/Admindashboard/content/analytics/Analytics'
import Homedashboard from './dashboard/Userdashboard/content/home/Homedashboard';
import CustomDesign from './dashboard/Admindashboard/content/design/CustomDesign'



function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin')
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'customer')
  


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
      path: '/verification',
      element: <Verification />
    },
    {
      path: '/contact',
      element: <Contact />
    },
      {
      path: 'admin/dashboard/',
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
       
        {
          path: 'users',
          element: <Users/> 
        },
        {
          path: 'profile',
          element: <Profile/> 
        },
        {
          path: 'readycakes',
          element: <ReadyCakesAdmin /> 
        },
        {
          path: 'orderlist',
          element: <OrderList/> 
        },
        {
          path: 'customdesign',
          element: <CustomDesign/> 
        },
        {
          path: 'analytics',
          element: <Analytics/>
        },

      ]
    },

    {
    path: 'user/dashboard/',
     element: isUser ? <UserDashboard /> : <Login />,
      children: [
        {
           path: 'dashboard',
          element: <Homedashboard/> 
        },
        {
          path: 'profile',
          element: <Profile/> 
        },
        {
          path: 'readycakes',
          element: <ReadyCakesUser/> 
        },
        {
          path: 'design',
          element: <Design/> 
        },
        {
          path: 'order',
          element: <UserOrders/>
        },
        
        {
          path: 'checkout',
          element: <CheckoutPage />
        },

      ]
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position ='top-center' />

    </>

        
    
  )
}

export default App
