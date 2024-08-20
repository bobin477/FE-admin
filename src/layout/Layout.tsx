import {Outlet} from "react-router-dom"
import Header from "../components/Header/Header"
import {useEffect} from "react";

const LayOut = () => {

    const handleLogin = async () => {
     const res = await fetch('http://localhost:8000/api/v1/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: "admin@gmail.com",
                    password: "123456"
                })
            }
        )

        const data = await res.json();
        if(data){
            localStorage.setItem("access_token",data.data.access_token)
        }
    }

    useEffect(() => {
        handleLogin()
    }, []);

    return <div>
        <Header/>
        <Outlet/>
        <div>footer</div>
    </div>
}

export default LayOut