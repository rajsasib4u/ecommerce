import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../pages/login";
import Products from '../pages/Allproducts';
import Order from '../pages/Order';


export default function index() {
    return (
        <BrowserRouter>



            <Routes>

                <Route path='*' element={<Login />} />
                <Route path='/' element={<Login />} />
                <Route path='/products' element={<Products />} />
                <Route path='/view-order' element={<Order />} />



            </Routes>
        </BrowserRouter>
    )
}
