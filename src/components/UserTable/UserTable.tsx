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
    const token = localStorage.getItem('access_token') as string
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    })

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
                return <div>
                    <Button
                        onClick={() => {
                            console.log(record)
                            setIsUpdateModalOpen(true)
                            setUserData(record)
                        }}
                        style={{marginRight: "10px"}}
                    >Edit
                    </Button>
                    <DeleteUserButton token={token} _id={record._id} getData={getData}/>
                </div>
            }
        }

    ]


    const getData = async () => {
        const res2 = await (fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
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
        setMeta({
            current: data2.data.meta.current,
            pageSize: data2.data.meta.pageSize,
            total: data2.data.meta.total,
            pages: data2.data.meta.pages
        })
    }

    const showModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleOnChange = async (page: number, pageSize: number) => {
        const res2 = await (fetch(`http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`, {
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
        setMeta({
            current: data2.data.meta.current,
            pageSize: data2.data.meta.pageSize,
            total: data2.data.meta.total,
            pages: data2.data.meta.pages
        })
    }

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
            <Table dataSource={listUser} columns={columns} rowKey={"_id"} pagination={{
                current: meta.current,
                total: meta.total,
                pageSize: meta.pageSize,
                onChange: handleOnChange,
            }}/>
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