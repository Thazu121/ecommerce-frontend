import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { store } from './redux/store.js'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Navbar />,
    // errorElement
    children:[
      {index:true,element:<Home />},
      // {path:"products",element:<ProductSection />,loader:ProductLoader,hydrateFallbackElement:<p>Loading...</p>},
      // {path:"contact", element:<Contact />},
      // {path:"product/:productId",
    //   element:(<ProtectRoute>
    // <SingleViewProduct />
    // </ProtectRoute>),
    //     loader:SingleProductLoader},
    //   { path: "cart", element: 
    //   <ProtectRoute>
    //     <Cart /> 
    //   </ProtectRoute>},
    //   {path:"Login",element:<AdminLogin/>}


    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      {/* <Provider store={store}> */}
  <RouterProvider router={router} />
  {/* </Provider> */}
  </StrictMode>
)


