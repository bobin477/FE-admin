import {useEffect, useState} from "react"
// import "../../styles/user.css"
import {Table, Tag, Modal, Input} from "antd";
import type {TableProps} from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import {Button} from 'antd';

interface iUser {
    name: string
    gender: string
    _id: string
    email: string
    role: string

}

const columns: TableProps<iUser>['columns'] = [
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

]

const UserTable = () => {
    const [listUser, setListUser] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const data = {
            name, email, role, password, age, address, gender
        }

        console.log(data);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        // const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         username: "admin@gmail.com",
        //         password: "123456"
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })

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
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
                <div>
                    <label>Name</label>
                    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>
                        Email
                    </label>
                    <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label>Age</label>
                    <Input placeholder="Age" value={age} onChange={e => setAge(e.target.value)}/>
                </div>
                <div>
                    <label>Gender</label>
                    <Input placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)}/>
                </div>
                <div>
                    <label>Address</label>
                    <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
                </div>
                <div>
                    <label>Role</label>
                    <Input placeholder="Role" value={role} onChange={e => setRole(e.target.value)}/>
                </div>
            </Modal>
        </div>
    )
}

export default UserTable