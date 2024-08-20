import {useEffect, useState} from "react"
// import "../../styles/user.css"
import {notification, Table, Tag} from "antd";
import type {TableProps} from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import {Button} from 'antd';
import UserModalCreate from "./UserModalCreate.tsx";
import UpdateModalUser from "./UpdateModalUser.tsx";
import DeleteUserButton from "./DeleteUserButton.tsx";

export interface IUser {
    name: string
    gender: string
    _id: string
    email: string
    role: string
    password: string
    age: string
    address: string

}

const UserTable = () => {
    const [listUser, setListUser] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [userData, setUserData] = useState<null | IUser>(null)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjZiZTI3MjM1OGIxYjVmOTEyMGY2OWJjIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjQxMjI0MjMsImV4cCI6MTgxMDUyMjQyM30.vMtdLWdzpNmn0yk9eUk6DG92Ck4MsTe2cKLOUDwRuMw'

    useEffect(() => {
        getData()
    }, [])

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_, record) => <a>{record.email}</a>,

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
            render: (_, {role}) => {

                const setTag = role == "ADMIN" ? "magenta" : "green"
                return (
                    <>
                        {<Tag color={setTag}>{role}</Tag>}
                    </>
                )
            },
        },
        {
            title: 'Action',
            render: (_, record) => {
                return <div >
                    <Button
                        onClick={() => {
                            console.log(record)
                            setIsUpdateModalOpen(true)
                            setUserData(record)
                        }}
                        style={{marginRight: "10px"}}
                    >Edit
                    </Button>
                  <DeleteUserButton token={token} _id={record._id} getData={getData} />
                </div>
            }
        }

    ]


    const getData = async () => {
        const res2 = await (fetch("http://localhost:8000/api/v1/users/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }))

        const data2 = await res2.json()

        if (!data2.data) {
            notification.error(
                {
                    message: JSON.stringify(data2.message)
                }
            )
        }
        setListUser(data2?.data?.result)
        console.log(data2)
    }

    const showModal = () => {
        setIsCreateModalOpen(true);
    };


    return (
        <div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>User Table</h1>
                <div>
                    <Button
                        icon={<PlusOutlined/>}
                        onClick={showModal}
                    >Add User</Button>
                </div>
            </div>
            <Table dataSource={listUser} columns={columns} rowKey={"_id"}/>
            <UserModalCreate
                getData={getData}
                token={token}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateModalUser
                getData={getData}
                token={token}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={userData}
                setUserData={setUserData}
            />
        </div>
    )
}

export default UserTable