import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import img from '../assets/img.png';
import { FaRupeeSign } from 'react-icons/fa'



export default function Products({ state, dispatch }) {


    console.log(state);

    const { products, cart } = state;

    return (
        <>
            <Header />
            <div className='product mt-5'>

                {/* {allProduct} */}

                {
                    products.map((data) => (
                        <>

                            <div className='productItems' key={data.prodID}>

                                <div className='image'>
                                    <img src={img} />
                                </div>
                                <div className='info'>{data.prodName} </div>
                                <div className='subInfo'>
                                    <div className='price'><FaRupeeSign /> {data.prodPrice}</div>
                                    <div className='addItem'>

                                        {cart.some(p => p.prodID === data.prodID) ? <button
                                            style={{ padding: 5, border: 0, borderRadius: 5, backgroundColor: '#e53935', color: 'white' }}
                                            onClick={() => dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: data,
                                            })
                                            }
                                        >
                                            Remove from Cart
                                        </button> : <button
                                            style={{ padding: 5, border: 0, borderRadius: 5, backgroundColor: 'green', color: 'white' }}
                                            onClick={() => dispatch({
                                                type: "ADD_TO_CART",
                                                payload: {
                                                    id: data.prodID,
                                                    title: data.prodName,
                                                    qty: data.qty,
                                                    price: data.prodPrice,
                                                },
                                            })
                                            }
                                        >
                                            Add to Cart
                                        </button>}

                                    </div>
                                </div>

                            </div>

                        </>
                    ))
                }


            </div>
        </>
    )
}
