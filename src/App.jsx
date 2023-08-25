import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import FirstPage from './pages/FirstPage'
import Forgotpassword from './pages/Forgotpassword';

function App() {
	const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<FirstPage />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/forgotpassword' element={<Forgotpassword />} />
    </Route>
  ))

  return(
    <>
      <RouterProvider router={router} />
      <ToastContainer
        // position="bottom-center"
        // autoClose={5000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="dark"
      />
    </>
  )
}

export default App