import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Navbar from './components/comman/Navbar'

const App = () => {
  return (
    <div className=' w-full h-full '>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />

      </Routes>

    </div>
  )
}

export default App
