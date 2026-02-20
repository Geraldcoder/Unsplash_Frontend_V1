import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Canvas from './components/canvas'
import Register from './components/register'
import Login from './components/login'
import Profile from './components/profile'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Canvas />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
