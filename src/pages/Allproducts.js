import { useEffect, useReducer } from 'react'
import axios from 'axios'
import Products from '../components/Products';
import Cart from '../components/Cart';
import { cartReducer } from '../reducer/reducerCart';
import Header from '../components/header';

function Allproducts() {
    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: [],
    });

    const fetchProducts = async () => {
        await axios.get("http://localhost:8899/api/v1/selectData")
            .then((res) => {

                console.log(res.data);

                dispatch({
                    type: 'ADD_PRODUCTS',
                    payload: res.data
                })
            })


    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (

        <>
            <Header />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8'>
                        <Products state={state} dispatch={dispatch} />
                    </div>
                    <div className='col-md-4'>
                        <Cart state={state} dispatch={dispatch} />
                    </div>

                </div>

            </div>


        </>

    );
}

export default Allproducts;
