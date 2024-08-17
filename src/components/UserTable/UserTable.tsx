import { useEffect, useState } from "react"
// import "../../styles/user.css"
import { Table, Tag } from "antd";
import type { TableProps } from 'antd';
interface iUser {
    name: string
    gender: string
    _id: string
    email: string
    role:string

}

const columns: TableProps<iUser>['columns'] = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (email, record) => <a>{record.email}</a>,

    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'role',
        dataIndex: 'role',
        key: 'role',
        render: (_, { role }) => {

            const setTag = role == "ADMIN" ? "magenta" : "green"
            return (
                <>
                    {<Tag color={setTag}>{role}</Tag>}
                </>
            )
        },
    },

]

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
        const res2 = await (fetch("http://localhost:8000/api/v1/users/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }))

        const data2 = await res2.json()
        setListUser(data2?.data?.result)
        console.log(data2)
    }


    return (
        <Table dataSource={listUser} columns={columns} rowKey={"_id"}/>
    )
}

export default UserTable