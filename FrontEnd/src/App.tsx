
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from './pages/login-page'
import SignupPage from './pages/signup-page'
import { Homepage } from './pages/home-page'
import { DashBoard } from './pages/dashBoard-page'

function App() {


  return (
   <div className='h-screen w-screen'>
   <BrowserRouter>
   <Routes>
    <Route path='/'element={<Homepage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>} />
    <Route path='/dashboard' element={<DashBoard/>} />
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
