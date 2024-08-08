import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../widgets/Sidebar'
import ProductScreen from './ProductScreen'

function DashboardScreen() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path="products" element={<ProductScreen />} />
                    <Route path='products/:id' element={<h1>edit</h1>} />
                </Routes>
            </Sidebar>
        </>
    )
}

export default DashboardScreen