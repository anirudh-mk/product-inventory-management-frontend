import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../widgets/Sidebar'
import ProductScreen from './ProductScreen'
import ProductDetailsScreen from './ProductDetailsScreen'

function DashboardScreen() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path="products" element={<ProductScreen />} />
                    <Route path='products/:id' element={<ProductDetailsScreen />} />
                </Routes>
            </Sidebar>
        </>
    )
}

export default DashboardScreen