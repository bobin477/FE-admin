import { useEffect, useState } from "react"
import "../../styles/user.css"

interface IUser{
    name:string,
    email:string,
    role:string
}

const UserTable = () => {
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: "admin@gmail.com",
                password: "123456"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjZiZTI3MjM1OGIxYjVmOTEyMGY2OWJjIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjM4MjM4NzUsImV4cCI6MTgxMDIyMzg3NX0.8OMyAuQ33zI_d-uaJyb93SWVZ1_hphNU8Qh10p_qaAI"
        console.log("token", token)
        const res2 = await (fetch("http://localhost:8000/api/v1/users/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }))

        const data2 = await res2.json()
        setListUser(data2.data.result)
        console.log(data2)
    }


    return (
        <div><h2>HTML Table</h2>
            <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Role</td>
                    </tr>
                </thead>


                <tbody>
                    { listUser.map((user: IUser, index) => {
                        return ( 
                            <tr key={index}>
                            <th>{user?.email}</th>
                            <th>{user?.name}</th>
                            <th>{user?.role}</th>
                            </tr>
                        )
                    })}
          </tbody>

            </table></div>
    )
}

export default UserTable