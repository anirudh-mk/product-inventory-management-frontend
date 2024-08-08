import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../widgets/Sidebar'

function DashboardScreen() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path="products" element={<h1>create</h1>} />
                    <Route path='products/create' element={<h1>edit</h1>} />
                </Routes>
            </Sidebar>
        </>
    )
}

export default DashboardScreen