import React, { useState, useEffect } from 'react'
import Header from '../components/header';
import axios from 'axios';

export default function Order() {

    const [data, setData] = useState([]);

    const [datas, setDatas] = useState({

        userID: localStorage.getItem('accessEmail'),

    })

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



    const fetchProducts = async () => {
        await axios.post(`http://localhost:8899/api/v1/myOrders`, { datas })
            .then((res) => {

                console.log(res.data);

                setData(res.data);


            })


    }

    useEffect(() => {

        fetchProducts()
    }, [])

    const buyProduct = async (data) => {

        var inpData = String(data).split('_');

        //alert(data);

        var id = inpData[0];
        var name = inpData[1];
        var amnt = inpData[2];
        var qunty = inpData[3];
        var orderID = inpData[4];

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
                    porder: orderID,
                    operation: 'update',


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

    const allData = data && data.map((data, i) => {

        let status = data.others;
        let cstatus = String(status).toUpperCase();
        return (
            <tr key={i}>

                <td>{data.prodName}</td>
                <td>{data.amount}</td>
                <td>{data.quantity}</td>
                <td>{data.orderDate}</td>
                <td>{(cstatus === null || cstatus === 'WAITING') ? <button onClick={() => buyProduct(`${data.prodID}` + '_' + `${data.prodName}` + '_' + `${data.amount}` + '_' + `${data.quantity}` + '_' + `${data.orderID}`)} className='btn btn-sm btn-primary'> Pay Now</button> : cstatus}</td>

            </tr >
        )
    })
    return (
        <>
            <Header />

            <div className='container'>
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{allData}</tbody>
                </table>

            </div>

        </>
    )
}
