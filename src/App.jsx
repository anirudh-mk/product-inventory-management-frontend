import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/dashboard" element={<h1>Lauout</h1>} />
      </Routes>
    </>
  )
}

export default App