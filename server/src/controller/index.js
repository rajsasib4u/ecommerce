const mysql = require('../config/index');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const secret_key = 'tww0zBnG4Av838gR51XIFoMv';

exports.selectData = (req, res) => {

    var sql = "select * from products";

    mysql.query(sql, ((error, result) => {

        if (error) {

            console.log(error);
        }
        else {

            res.send(result);
        }

    }));
}

exports.postOrders = (req, res) => {

    console.log(req.body.inpDatas);

    var orgData = String(req.body.inpDatas).split('_');

    var userid = orgData[0];
    var id = orgData[1];
    var title = orgData[2];
    var price = orgData[3];
    var qty = orgData[4];



    var startDate = new Date();

    var date = startDate.toISOString().split('T')[0];

    new Promise(function (resolve, reject) {


        let check = "SELECT * from orders where userID=? and prodID=? and others !='paid'";
        let cval = [userid, id];


        mysql.query(check, cval, ((errors, results) => {

            if (errors) {

                console.log(errors);
            }
            else {

                if (results.length === 0) {

                    var sql = "INSERT into orders(userID, prodName, prodID, quantity, orderDate, amount, others) values(?,?,?,?,?,?,?)";
                    var val = [userid, title, id, qty, date, price, 'waiting'];

                    console.log(sql, val);

                    mysql.query(sql, val, ((error, result) => {

                        if (error) {

                            console.log(error);
                        }
                        else {


                            setTimeout(() => resolve('Order Submited'), 3000);

                        }

                    }));


                }
                else {
                    setTimeout(() => resolve('Order already exist'), 3000);

                }
            }



        }))



    }).then(function (result) { // (**)

        res.send(result);

    })





}

exports.myOrders = (req, res) => {

    console.log(req.body.datas.userID);

    let check = "SELECT * from orders where userID=?";
    let cval = [req.body.datas.userID];


    mysql.query(check, cval, ((error, result) => {

        if (error) {

            console.log(error);
        }
        else {

            res.send(result);
        }

    }));


}


exports.regUsers = (req, res) => {

    console.log(req.body.allData.email);

    var startDate = new Date();

    var date = startDate.toISOString().split('T')[0];

    let check = "SELECT * from users where emailid=?";
    let cval = [req.body.allData.email];


    mysql.query(check, cval, ((errors, results) => {

        if (errors) {

            console.log(errors);
        }
        else {

            if (results.length === 0) {

                var sql = "INSERT into users(id, username, emailid, created) values(?,?,?,?)";
                var val = [req.body.allData.id, req.body.allData.name, req.body.allData.email, date];

                console.log(sql, val);

                mysql.query(sql, val, ((error, result) => {

                    if (error) {

                        console.log(error);
                    }
                    else {


                        console.log('user registred');

                    }

                }));


            }
            else {
                console.log('user exist');

            }
        }



    }))




}

exports.orders = async (req, res) => {

    console.log(req.body.inpDatas);
    var inpReq = req.body.inpDatas;
    var planData = String(inpReq).split('=');

    var amounts = parseInt(planData[2]) * 100;

    console.log(planData[2]);
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_9qr4QR7YmT8s8r',
            key_secret: 'tww0zBnG4Av838gR51XIFoMv',

        });

        const options = {
            amount: amounts, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");


        console.log(order);

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }




}


exports.payment = async (req, res) => {

    console.log('Payment Data');



    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            customerId,
            id,
            pName,
            pAmnt,
            pQty,
            porder,
            operation,

        } = req.body;

        console.log(req.body);



        const shasum = crypto.createHmac("sha256", secret_key);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);



        const digest = shasum.digest("hex");



        console.log(digest);
        console.log('razorpaySignature');
        console.log(razorpaySignature);

        var startDate = new Date();

        var date = startDate.toISOString().split('T')[0];

        // comaparing our digest with the actual signature
        if (digest === razorpaySignature) {


            if (operation === 'add') {

                var sql = "INSERT into orders(userID, prodName, prodID, quantity, orderDate, amount, others, razOrderID, razPaymentID) values(?,?,?,?,?,?,?,?,?)";
                var val = [customerId, pName, id, pQty, date, pAmnt, 'paid', razorpayOrderId, razorpayPaymentId];

                console.log(sql, val);

                mysql.query(sql, val, ((error, result) => {

                    if (error) {

                        console.log(error);
                    }
                    else {


                        res.json({
                            msg: "success",
                            orderId: razorpayOrderId,
                            paymentId: razorpayPaymentId,
                        });

                    }

                }))


            }

            if (operation === 'update') {

                var sql = "UPDATE orders set others=?, razOrderID=? razPaymentID=? where userID=? and orderID=?";
                var val = ['paid', razorpayOrderId, razorpayPaymentId, customerId, porder];

                console.log(sql, val);

                mysql.query(sql, val, ((error, result) => {

                    if (error) {

                        console.log(error);
                    }
                    else {


                        res.json({
                            msg: "success",
                            orderId: razorpayOrderId,
                            paymentId: razorpayPaymentId,
                        });

                    }

                }))


            }





            ;






        }
        else {

            return res.status(400).json({ msg: "Transaction not legit!" });

        }








    } catch (error) {
        res.status(500).send(error);
    }


}

