import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {

    const [user, setUser] = useState([]);
    const [suser, setSuser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {



        var access = localStorage.getItem('accessID');

        // alert(access);

        if (access !== null) {
            window.location.href = 'products';
        }


        //console.log(user.access_token);

        localStorage.setItem('accessTocken', user.access_token);

        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data.id);
                localStorage.setItem('accessID', res.data.id);
                localStorage.setItem('accessName', res.data.name);
                localStorage.setItem('accessEmail', res.data.email);
                localStorage.setItem('accessImage', res.data.picture);


                var allData = res.data;





                axios.post(`http://localhost:8899/api/v1/regUsers`, { allData })
                    .then((res) => {

                        console.log(res);
                    })

                setTimeout(() => {

                    window.location.href = 'products';
                }, 1000);

            })
            .catch((err) => console.log(err));


    }, [user])

    // log out function to log the user out of google and set the profile array to null


    return (
        <>
            <div className='container mt-5'>

                <h2>Login using Gmail</h2>
                <button onClick={() => login()}>Sign in with Google </button>


            </div>

        </>
    );
}
export default App;