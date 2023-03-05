import React from 'react';
import img from '../assets/img.png';
import axios from 'axios';


const Products = ({ state, dispatch }) => {
    const { products, cart } = state;

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const buyProduct = async (data) => {

        var inpData = String(data).split('_');

        //alert(data);

        var id = inpData[0];
        var name = inpData[1];
        var amnt = inpData[2];
        var qunty = inpData[3];

        var cus_id = localStorage.getItem('accessEmail');

        var inpDatas = id + '=' + name + '=' + amnt + '=' + qunty + '=' + cus_id;

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        const result = await axios.post('http://localhost:8899/api/v1/orders', { inpDatas });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_9qr4QR7YmT8s8r",
            amount: amount.toString(),
            currency: currency,
            name: "Ecommerce",
            description: "Selected Product is: " + name,
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    customerId: localStorage.getItem('accessEmail'),
                    id: id,
                    pName: name,
                    pAmnt: amnt,
                    pQty: qunty,
                    porder: id,
                    operation: 'add',

                };



                const result = await axios.post(`http://localhost:8899/api/v1/payment`, data);



                setTimeout(() => {

                    alert('Order ID: ' + result.data.orderId + ' Payment Id: ' + result.data.paymentId + ' Status: ' + result.data.msg);

                    // history.push("/main/dashboard");




                }, 3000);

            },

            prefill: {
                name: localStorage.getItem('accessName'),
                email: localStorage.getItem('accessEmail'),
                contact: '',
            },
            notes: {
                address: "Your Address",
            },


        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }

    return (
        <div className="App" style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-evenly', width: '100%' }}>
            {products.map((prod) => (
                <div key={prod.prodID} style={{ display: 'flex', flexDirection: 'column', padding: 10, border: "1px solid grey", width: "30%", marginTop: 10, gap: 10 }}>
                    <img src={img} alt={prod.prodName} style={{ height: 200, objectFit: 'cover' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{prod.prodName}</span>
                        <b>$ {prod.prodPrice}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {cart.some((p) => p.id === prod.prodID) ? (
                            <button
                                className='btn btn-sm btn-danger'
                                onClick={() => dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: prod,
                                })
                                }
                            >
                                Remove from Cart
                            </button>
                        ) : (
                            <button
                                className='btn btn-sm btn-warning'
                                onClick={() => dispatch({
                                    type: "ADD_TO_CART",
                                    payload: {
                                        id: prod.prodID,
                                        title: prod.prodName,
                                        qty: prod.qty,
                                        price: prod.prodPrice,
                                    },
                                })
                                }
                            >
                                Add to Cart
                            </button>
                        )}
                        <button className='btn btn-sm btn-success'
                            onClick={() => buyProduct(`${prod.prodID}` + '_' + `${prod.prodName}` + '_' + `${prod.prodPrice}` + '_' + `${1}`)}
                        >Buy Now</button>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products