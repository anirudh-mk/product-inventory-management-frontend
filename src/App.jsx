import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard/*" element={<DashboardScreen />} />
      </Routes>
    </>
  )
}

export default App