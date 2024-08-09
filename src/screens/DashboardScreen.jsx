import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../widgets/Sidebar'
import ProductScreen from './ProductScreen'
import ProductDetailsScreen from './ProductDetailsScreen'
import ProductCreateScreen from './ProductCreateScreen'
import StockCreateScreen from './StockCreateScreen'

function DashboardScreen() {
    return (
        <>
            <Sidebar>
                <Routes>
                    <Route path="products" element={<ProductScreen />} />
                    <Route path='products/:id' element={<ProductDetailsScreen />} />
                    <Route path='products/create' element={<ProductCreateScreen />} />
                    <Route path='products/:id/create' element={<StockCreateScreen />} />
                </Routes>
            </Sidebar>
        </>
    )
}

export default DashboardScreen