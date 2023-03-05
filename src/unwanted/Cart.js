import { useEffect, useState, useReducer } from 'react'
import Header from '../components/header';
import img from '../assets/img.png';
import { cartReducer } from '../reducer/reducerCart';

const Cart = () => {

    const [state, dispatch] = useReducer(cartReducer, {
        cart: [],
    });

    console.log(state);
    const { cart } = state
    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
        );
    }, [cart]);

    const changeQty = (id, qty) => dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
            id: id,
            qty: qty,
        },
    })

    return (
        <>

            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', margin: 10, backgroundColor: '#ececec', padding: 10, width: '20%' }}>
                <b style={{ fontSize: 30, alignSelf: 'center' }}>Cart</b>
                <b style={{ alignSelf: 'center' }}>Subtotal: $ {total}</b>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {cart.length > 0 ?
                        cart.map((prod) => (
                            <div key={prod.prodName} style={{ display: 'flex', padding: 10, border: "1px solid grey", margin: 5, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <img src={img} alt={prod.prodName} style={{ width: 70, objectFit: 'cover' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <span>{prod.prodName}</span>
                                        <b>$ {prod.prodPrice}</b>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <button onClick={() => changeQty(prod.id, prod.qty - 1)}>-</button>
                                    <span>{prod.qty}</span>
                                    <button onClick={() => changeQty(prod.id, prod.qty + 1)}>+</button>
                                </div>
                            </div>
                        ))
                        :
                        <span style={{ padding: 20, alignSelf: 'center' }}>Cart is empty</span>}
                </div>
            </div>
        </>

    )
}

export default Cart
