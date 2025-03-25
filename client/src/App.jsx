import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'

const App = () => {
  return (
    <div className=' w-full h-full '>

      <Routes>
        <Route path="/" element={<Home/>} />

      </Routes>

    </div>
  )
}

export default App
