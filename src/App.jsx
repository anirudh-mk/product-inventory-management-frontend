import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import Sidebar from './widgets/Sidebar'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard/*" element={<Sidebar />} />
      </Routes>
    </>
  )
}

export default App