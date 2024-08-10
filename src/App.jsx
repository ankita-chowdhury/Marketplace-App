
import './App.css'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Transaction from './components/Transaction'


function App() {
  

  
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/transaction",
      element:<Transaction/>
    }
  ])

  return (
    <>
   <RouterProvider router={router}/>
    </>
  )
}

export default App
